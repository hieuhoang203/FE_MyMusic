import { useNavigate } from "react-router-dom"
import axiosHelper from "../api/myApi"
import { useEffect } from "react";
import { notification } from "antd";
import "../css/animation.css";

const AxiosInterceptor = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const interceptor = axiosHelper.interceptors.response.use(
            response => response,
            error => {
                
                if (error.config?.url.includes('/login')) {
                    return Promise.reject(error);
                }

                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    notification.error({
                        message: "Login",
                        description: "Session expired!",
                        duration: 3,
                        style: {
                            animation: 'fadeInOut 5s ease-in-out',
                        },
                    });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosHelper.interceptors.response.eject(interceptor);
        };
    }, [navigate]);
    return null;
}

export default AxiosInterceptor;