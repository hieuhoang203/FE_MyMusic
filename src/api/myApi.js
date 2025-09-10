import axios from "axios";
import { API_CONFIG, STORAGE_KEYS } from "../constants";
import { handleError, retry } from "../utils/helpers";

const axiosHelper = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosHelper.interceptors.request.use(
    (config) => {
        // Add auth token to requests
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Add timestamp to prevent caching
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                _t: Date.now(),
            };
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosHelper.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Clear stored auth data
            localStorage.removeItem(STORAGE_KEYS.ACCOUNT);
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            
            // Redirect to login (handled by AxiosInterceptor component)
            return Promise.reject(error);
        }
        
        // Handle network errors with retry
        if (!error.response && error.code === 'ECONNABORTED') {
            if (originalRequest._retryCount < API_CONFIG.RETRY_ATTEMPTS) {
                originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
                
                try {
                    return await retry(() => axiosHelper(originalRequest));
                } catch (retryError) {
                    return Promise.reject(retryError);
                }
            }
        }
        
        return Promise.reject(error);
    }
);

// Enhanced error handling
export const apiRequest = async (config) => {
    try {
        const response = await axiosHelper(config);
        return response;
    } catch (error) {
        const errorMessage = handleError(error);
        throw new Error(errorMessage);
    }
};

export default axiosHelper;