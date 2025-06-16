
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { httpClient } from '@/utils/httpClient';
import { security } from '@/utils/security';
import { validateForm, loginSchema, registerSchema } from '@/utils/validation';

// Define response types
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    permissions: string[];
  };
}

interface RefreshResponse {
  token: string;
}

interface AuthContextType {
  user: {
    id: string;
    email: string;
    role: string;
    permissions: string[];
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await httpClient.get<AuthResponse>('/auth/me');
      setUser(security.sanitizeSensitiveData(response.data.user));
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const validation = validateForm({ username: email, password }, loginSchema);
      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors)[0] || 'ข้อมูลไม่ถูกต้อง';
        throw new Error(errorMessage);
      }

      const sanitizedEmail = DOMPurify.sanitize(email);
      const response = await httpClient.post<AuthResponse>('/auth/login', {
        email: sanitizedEmail,
        password
      });

      setUser(security.sanitizeSensitiveData(response.data.user));
      navigate('/dashboard');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    }
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    try {
      const validation = validateForm({ email, password, confirmPassword }, registerSchema);
      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors)[0] || 'ข้อมูลไม่ถูกต้อง';
        throw new Error(errorMessage);
      }

      const sanitizedEmail = DOMPurify.sanitize(email);
      const response = await httpClient.post<AuthResponse>('/auth/register', {
        email: sanitizedEmail,
        password,
        confirmPassword
      });

      setUser(security.sanitizeSensitiveData(response.data.user));
      navigate('/dashboard');
      toast.success('Registration successful');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await httpClient.post('/auth/logout', {});
      setUser(null);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      await httpClient.post<RefreshResponse>('/auth/refresh', {});
      // Token is automatically handled by httpClient
    } catch (error) {
      setUser(null);
      navigate('/login');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
