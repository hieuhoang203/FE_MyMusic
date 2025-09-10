import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Card, Typography, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "../../../css/login.css";
import "../../../css/animation.css";
import useAuth from "../../../hooks/useAuth";
import { validateEmail, validatePassword, validateName } from "../../../utils/validation";
import { ROUTES } from "../../../constants";

const { Title, Text } = Typography;

const LoginAndRegister = () => {
    const navigate = useNavigate();
    const { login: loginUser, register: registerUser, isLoading } = useAuth();
    
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loginForm] = Form.useForm();
    const [registerForm] = Form.useForm();


    // Handle mode switching
    const handleModeSwitch = useCallback((mode) => {
        setIsLoginMode(mode);
        if (mode) {
            navigate(ROUTES.LOGIN);
            registerForm.resetFields();
        } else {
            navigate(ROUTES.REGISTER);
            loginForm.resetFields();
        }
    }, [navigate, loginForm, registerForm]);

    // Handle login
    const handleLogin = useCallback(async (values) => {
        const result = await loginUser(values);
        if (result.success) {
            // Navigation is handled by useAuth hook
        }
    }, [loginUser]);

    // Handle register
    const handleRegister = useCallback(async (values) => {
        const result = await registerUser(values);
        if (result.success) {
            // Switch to login mode after successful registration
            handleModeSwitch(true);
        }
    }, [registerUser, handleModeSwitch]);

    // Set initial mode based on URL
    useEffect(() => {
        const isRegisterPage = window.location.pathname === ROUTES.REGISTER;
        setIsLoginMode(!isRegisterPage);
    }, []);

    return (
        <div className="body-login">
            <div className="box-container" id="container">
                {/* Register Form */}
                <div className={`form-container sign-up ${!isLoginMode ? 'active' : ''}`}>
                    <Card className="auth-card">
                        <Title level={2}>Create Account</Title>
                        <div className="social-icon">
                            <Button type="text" icon={<i className='bx bxl-google bx-sm'></i>} />
                            <Button type="text" icon={<i className='bx bxl-facebook bx-sm'></i>} />
                        </div>
                        <Text type="secondary">or use email for registration</Text>
                        
                        <Form
                            form={registerForm}
                            onFinish={handleRegister}
                            layout="vertical"
                            className="auth-form"
                        >
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    { required: true, message: 'Please input your name!' },
                                    { validator: (_, value) => {
                                        const result = validateName(value);
                                        return result.isValid ? Promise.resolve() : Promise.reject(new Error(result.message));
                                    }}
                                ]}
                            >
                                <Input 
                                    prefix={<UserOutlined />} 
                                    placeholder="Enter your name" 
                                />
                            </Form.Item>

                            <Form.Item
                                name="login"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { validator: (_, value) => {
                                        const result = validateEmail(value);
                                        return result.isValid ? Promise.resolve() : Promise.reject(new Error(result.message));
                                    }}
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined />} 
                                    placeholder="Enter your email" 
                                    type="email"
                                />
                            </Form.Item>

                            <Form.Item
                                name="pass"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    { validator: (_, value) => {
                                        const result = validatePassword(value);
                                        return result.isValid ? Promise.resolve() : Promise.reject(new Error(result.message));
                                    }}
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="Enter your password" 
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={isLoading}
                                    block
                                >
                                    Sign Up
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>

                {/* Login Form */}
                <div className={`form-container sign-in ${isLoginMode ? 'active' : ''}`}>
                    <Card className="auth-card">
                        <Title level={2}>Sign In</Title>
                        <div className="social-icon">
                            <Button type="text" icon={<i className='bx bxl-google bx-sm'></i>} />
                            <Button type="text" icon={<i className='bx bxl-facebook bx-sm'></i>} />
                        </div>
                        <Text type="secondary">or use email password</Text>
                        
                        <Form
                            form={loginForm}
                            onFinish={handleLogin}
                            layout="vertical"
                            className="auth-form"
                        >
                            <Form.Item
                                name="login"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { validator: (_, value) => {
                                        const result = validateEmail(value);
                                        return result.isValid ? Promise.resolve() : Promise.reject(new Error(result.message));
                                    }}
                                ]}
                            >
                                <Input 
                                    prefix={<MailOutlined />} 
                                    placeholder="Enter your email" 
                                    type="email"
                                />
                            </Form.Item>

                            <Form.Item
                                name="pass"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    { validator: (_, value) => {
                                        const result = validatePassword(value);
                                        return result.isValid ? Promise.resolve() : Promise.reject(new Error(result.message));
                                    }}
                                ]}
                            >
                                <Input.Password 
                                    prefix={<LockOutlined />} 
                                    placeholder="Enter your password" 
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={isLoading}
                                    block
                                >
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>

                {/* Toggle Container */}
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <Title level={1}>Welcome back 👋</Title>
                            <Text>Enter your personal details to use all of site features</Text>
                            <Button 
                                className="hidden" 
                                onClick={() => handleModeSwitch(true)}
                                type="primary"
                            >
                                Sign In
                            </Button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <Title level={1}>Hello, Friend 😘</Title>
                            <Text>Register with your personal details to use all of site features</Text>
                            <Button 
                                className="hidden" 
                                onClick={() => handleModeSwitch(false)}
                                type="primary"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAndRegister;