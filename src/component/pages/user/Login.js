import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "../../../css/login.css";
import "../../../css/spotify-theme.css";
import useAuth from "../../../hooks/useAuth";
import { validateEmail, validatePassword, validateName } from "../../../utils/validation";
import { ROUTES } from "../../../constants";

const { Text } = Typography;

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
        try {
            const result = await loginUser(values);
            if (result.success) {
                message.success('Đăng nhập thành công!');
                // Navigation is handled by useAuth hook
            } else {
                message.error(result.message || 'Đăng nhập thất bại!');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi đăng nhập!');
        }
    }, [loginUser]);

    // Handle register
    const handleRegister = useCallback(async (values) => {
        try {
            const result = await registerUser(values);
            if (result.success) {
                message.success('Đăng ký thành công! Vui lòng đăng nhập.');
                // Switch to login mode after successful registration
                handleModeSwitch(true);
            } else {
                message.error(result.message || 'Đăng ký thất bại!');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi đăng ký!');
        }
    }, [registerUser, handleModeSwitch]);

    // Check current route to set mode
    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === ROUTES.REGISTER) {
            setIsLoginMode(false);
        } else {
            setIsLoginMode(true);
        }
    }, []);

    return (
        <div style={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #1db954 0%, #1ed760 50%, #1db954 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '12px',
                padding: '48px 40px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        marginBottom: '16px'
                    }}>
                        <i className='bx bx-pulse' style={{ fontSize: '40px', color: '#1db954' }}></i>
                        <h1 style={{ 
                            fontSize: '32px', 
                            fontWeight: '700', 
                            margin: 0, 
                            color: '#fff',
                            letterSpacing: '-1px'
                        }}>
                            My Music
                        </h1>
                    </div>
                    <Text style={{ 
                        color: '#b3b3b3', 
                        fontSize: '16px',
                        fontWeight: '400'
                    }}>
                        {isLoginMode ? 'Chào mừng bạn quay trở lại!' : 'Tạo tài khoản mới để bắt đầu'}
                    </Text>
                </div>

                {/* Form */}
                {isLoginMode ? (
                    <Form
                        form={loginForm}
                        name="login"
                        onFinish={handleLogin}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="username"
                            label={<span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Tên đăng nhập</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' }
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined style={{ color: '#b3b3b3' }} />} 
                                placeholder="Nhập tên đăng nhập"
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                className="spotify-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Mật khẩu</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { validator: validatePassword }
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined style={{ color: '#b3b3b3' }} />} 
                                placeholder="Nhập mật khẩu"
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                className="spotify-input"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '24px' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={isLoading}
                                block
                                className="spotify-btn spotify-btn-primary"
                                style={{
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    borderRadius: '24px',
                                    border: 'none',
                                    background: '#1db954',
                                    color: '#000'
                                }}
                            >
                                Đăng Nhập
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Form
                        form={registerForm}
                        name="register"
                        onFinish={handleRegister}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="name"
                            label={<span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Họ và tên</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập họ và tên!' },
                                { validator: validateName }
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined style={{ color: '#b3b3b3' }} />} 
                                placeholder="Nhập họ và tên"
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                className="spotify-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Email</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { validator: validateEmail }
                            ]}
                        >
                            <Input 
                                prefix={<MailOutlined style={{ color: '#b3b3b3' }} />} 
                                placeholder="Nhập email"
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                className="spotify-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            label={<span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Tên đăng nhập</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                                { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' }
                            ]}
                        >
                            <Input 
                                prefix={<UserOutlined style={{ color: '#b3b3b3' }} />} 
                                placeholder="Nhập tên đăng nhập"
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                className="spotify-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Mật khẩu</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { validator: validatePassword }
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined style={{ color: '#b3b3b3' }} />} 
                                placeholder="Nhập mật khẩu"
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                className="spotify-input"
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label={<span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Xác nhận mật khẩu</span>}
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password 
                                prefix={<LockOutlined style={{ color: '#b3b3b3' }} />} 
                                placeholder="Xác nhận mật khẩu"
                                style={{
                                    backgroundColor: '#121212',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    height: '48px',
                                    fontSize: '16px'
                                }}
                                className="spotify-input"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: '24px' }}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={isLoading}
                                block
                                className="spotify-btn spotify-btn-primary"
                                style={{
                                    height: '48px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    borderRadius: '24px',
                                    border: 'none',
                                    background: '#1db954',
                                    color: '#000'
                                }}
                            >
                                Đăng Ký
                            </Button>
                        </Form.Item>
                    </Form>
                )}

                {/* Footer */}
                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#b3b3b3', fontSize: '14px' }}>
                        {isLoginMode ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                    </Text>
                    <Button 
                        type="link" 
                        onClick={() => handleModeSwitch(!isLoginMode)}
                        style={{
                            color: '#1db954',
                            fontWeight: '700',
                            fontSize: '14px',
                            padding: '0 8px',
                            height: 'auto'
                        }}
                    >
                        {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginAndRegister;