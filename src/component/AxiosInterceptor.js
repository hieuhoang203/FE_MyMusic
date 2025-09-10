import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { notification } from "antd";
import axiosHelper from "../api/myApi";
import { STORAGE_KEYS, ROUTES } from "../constants";
import "../css/animation.css";

const AxiosInterceptor = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const interceptor = axiosHelper.interceptors.response.use(
            (response) => response,
            (error) => {
                // Don't handle login/register errors
                if (error.config?.url?.includes('/login') || error.config?.url?.includes('/register')) {
                    return Promise.reject(error);
                }

                // Handle 401 Unauthorized
                if (error.response?.status === 401) {
                    // Clear auth data
                    localStorage.removeItem(STORAGE_KEYS.ACCOUNT);
                    localStorage.removeItem(STORAGE_KEYS.TOKEN);
                    
                    // Show notification
                    notification.error({
                        message: "Session Expired",
                        description: "Your session has expired. Please login again.",
                        duration: 3,
                        style: {
                            animation: 'fadeInOut 5s ease-in-out',
                        },
                    });
                    
                    // Redirect to login
                    navigate(ROUTES.LOGIN);
                    return Promise.reject(error);
                }

                // Handle 403 Forbidden
                if (error.response?.status === 403) {
                    notification.error({
                        message: "Access Denied",
                        description: "You don't have permission to access this resource.",
                        duration: 3,
                    });
                    return Promise.reject(error);
                }

                // Handle 500 Server Error
                if (error.response?.status >= 500) {
                    notification.error({
                        message: "Server Error",
                        description: "Something went wrong on our end. Please try again later.",
                        duration: 3,
                    });
                    return Promise.reject(error);
                }

                // Handle network errors
                if (!error.response) {
                    notification.error({
                        message: "Network Error",
                        description: "Please check your internet connection and try again.",
                        duration: 3,
                    });
                    return Promise.reject(error);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosHelper.interceptors.response.eject(interceptor);
        };
    }, [navigate]);
    
    return null;
};

export default AxiosInterceptor;