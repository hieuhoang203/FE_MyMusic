import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Card, Typography, Space } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "../../../css/login.css";
import "../../../css/animation.css";
import "../../../css/modern-forms.css";
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
        <div className="modern-form-container">
            <div className="box-container" id="container">
                {/* Register Form */}
                <div className={`form-container sign-up ${!isLoginMode ? 'active' : ''}`}>
                    <div className="modern-form-card">
                        <div className="modern-form-header">
                            <h1 className="modern-form-title">Create Account</h1>
                            <p className="modern-form-subtitle">Join our music community today</p>
                        </div>
                        
                        <div className="modern-form-social">
                            <button className="modern-social-btn" type="button">
                                <GoogleOutlined style={{ fontSize: '20px', color: '#4285f4' }} />
                            </button>
                            <button className="modern-social-btn" type="button">
                                <FacebookOutlined style={{ fontSize: '20px', color: '#1877f2' }} />
                            </button>
                        </div>
                        
                        <div className="modern-form-divider">
                            <span>or use email for registration</span>
                        </div>
                        
                        <Form
                            form={registerForm}
                            onFinish={handleRegister}
                            layout="vertical"
                            className="modern-form"
                        >
                            <Form.Item
                                name="name"
                                label="Full Name"
                                className="modern-form-item"
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
                                    placeholder="Enter your full name" 
                                    className="modern-form-input"
                                />
                            </Form.Item>

                            <Form.Item
                                name="login"
                                label="Email Address"
                                className="modern-form-item"
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
                                    placeholder="Enter your email address" 
                                    type="email"
                                    className="modern-form-input"
                                />
                            </Form.Item>

                            <Form.Item
                                name="pass"
                                label="Password"
                                className="modern-form-item"
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
                                    placeholder="Create a strong password" 
                                    className="modern-form-input"
                                />
                            </Form.Item>

                            <Form.Item className="modern-form-item">
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={isLoading}
                                    block
                                    className="modern-form-button"
                                >
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                        
                        <div className="modern-form-footer">
                            <Text type="secondary">
                                Already have an account?{' '}
                                <a 
                                    href="#" 
                                    className="modern-form-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleModeSwitch(true);
                                    }}
                                >
                                    Sign in here
                                </a>
                            </Text>
                        </div>
                    </div>
                </div>

                {/* Login Form */}
                <div className={`form-container sign-in ${isLoginMode ? 'active' : ''}`}>
                    <div className="modern-form-card">
                        <div className="modern-form-header">
                            <h1 className="modern-form-title">Welcome Back</h1>
                            <p className="modern-form-subtitle">Sign in to your account to continue</p>
                        </div>
                        
                        <div className="modern-form-social">
                            <button className="modern-social-btn" type="button">
                                <GoogleOutlined style={{ fontSize: '20px', color: '#4285f4' }} />
                            </button>
                            <button className="modern-social-btn" type="button">
                                <FacebookOutlined style={{ fontSize: '20px', color: '#1877f2' }} />
                            </button>
                        </div>
                        
                        <div className="modern-form-divider">
                            <span>or use email password</span>
                        </div>
                        
                        <Form
                            form={loginForm}
                            onFinish={handleLogin}
                            layout="vertical"
                            className="modern-form"
                        >
                            <Form.Item
                                name="login"
                                label="Email Address"
                                className="modern-form-item"
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
                                    placeholder="Enter your email address" 
                                    type="email"
                                    className="modern-form-input"
                                />
                            </Form.Item>

                            <Form.Item
                                name="pass"
                                label="Password"
                                className="modern-form-item"
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
                                    className="modern-form-input"
                                />
                            </Form.Item>

                            <Form.Item className="modern-form-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <a href="#" className="modern-form-link" style={{ fontSize: '14px' }}>
                                        Forgot password?
                                    </a>
                                </div>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={isLoading}
                                    block
                                    className="modern-form-button"
                                >
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                        
                        <div className="modern-form-footer">
                            <Text type="secondary">
                                Don't have an account?{' '}
                                <a 
                                    href="#" 
                                    className="modern-form-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleModeSwitch(false);
                                    }}
                                >
                                    Create one here
                                </a>
                            </Text>
                        </div>
                    </div>
                </div>

                {/* Toggle Container */}
                <div className="modern-form-toggle">
                    <div className="modern-toggle-content">
                        {isLoginMode ? (
                            <>
                                <h1 className="modern-toggle-title">Hello, Friend! 👋</h1>
                                <p className="modern-toggle-description">
                                    Join our music community and discover amazing songs from talented artists around the world.
                                </p>
                                <Button 
                                    className="modern-toggle-button"
                                    onClick={() => handleModeSwitch(false)}
                                    size="large"
                                >
                                    Create Account
                                </Button>
                            </>
                        ) : (
                            <>
                                <h1 className="modern-toggle-title">Welcome Back! 🎵</h1>
                                <p className="modern-toggle-description">
                                    Sign in to continue your musical journey and access your personalized playlists.
                                </p>
                                <Button 
                                    className="modern-toggle-button"
                                    onClick={() => handleModeSwitch(true)}
                                    size="large"
                                >
                                    Sign In
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginAndRegister;