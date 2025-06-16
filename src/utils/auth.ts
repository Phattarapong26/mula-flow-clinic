
import { jwtDecode } from 'jwt-decode';
import { security } from './security';

interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  exp: number;
  iat: number;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('jwt_token', token);
};

export const clearAuthToken = (): void => {
  localStorage.removeItem('jwt_token');
  security.clearSensitiveData();
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

export const getUserFromToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    if (isTokenExpired(token)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
};

export const refreshTokenIfNeeded = async (): Promise<string | null> => {
  const token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    clearAuthToken();
    return null;
  }
  return token;
};
