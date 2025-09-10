import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { USER_ROLES, STORAGE_KEYS, ROUTES } from '../constants';
import { getAccount, getUserWhenLogin, saveAccount } from '../service/loginService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.ACCOUNT);
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        clearAuth();
      }
    }
  }, []);

  // Clear authentication data
  const clearAuth = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCOUNT);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Login function
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const response = await getAccount(credentials);
      
      if (response.data.result.responseCode !== '200') {
        throw new Error(response.data.result.responseMessage || 'Login failed');
      }

      const userResponse = await getUserWhenLogin(credentials.login);
      const userData = userResponse.data.data;
      const token = response.data.data.accessToken;

      // Store auth data
      localStorage.setItem(STORAGE_KEYS.ACCOUNT, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);

      setUser(userData);
      setIsAuthenticated(true);

      notification.success({
        message: 'Login Success',
        description: 'Welcome back!',
        duration: 3,
      });

      // Redirect based on role
      const redirectPath = getRedirectPath(userData.role);
      navigate(redirectPath);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      notification.error({
        message: 'Login Failed',
        description: error.message || 'Invalid credentials',
        duration: 3,
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Register function
  const register = useCallback(async (userData) => {
    setIsLoading(true);
    try {
      const response = await saveAccount(userData);
      
      if (response.data.result.responseCode !== '200') {
        throw new Error(response.data.result.responseMessage || 'Registration failed');
      }

      notification.success({
        message: 'Registration Success',
        description: 'Account created successfully!',
        duration: 3,
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      notification.error({
        message: 'Registration Failed',
        description: error.message || 'Registration failed',
        duration: 3,
      });
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearAuth();
    notification.success({
      message: 'Logged Out',
      description: 'You have been logged out successfully',
      duration: 2,
    });
    navigate(ROUTES.LOGIN);
  }, [clearAuth, navigate]);

  // Get redirect path based on user role
  const getRedirectPath = useCallback((role) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return ROUTES.ADMIN;
      case USER_ROLES.ARTIS:
        return ROUTES.ARTIS;
      default:
        return ROUTES.HOME;
    }
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  // Check if user has any of the specified roles
  const hasAnyRole = useCallback((roles) => {
    return roles.includes(user?.role);
  }, [user]);

  return {
    // State
    user,
    isLoading,
    isAuthenticated,
    
    // Actions
    login,
    register,
    logout,
    clearAuth,
    
    // Helpers
    hasRole,
    hasAnyRole,
    getRedirectPath,
  };
};

export default useAuth;
