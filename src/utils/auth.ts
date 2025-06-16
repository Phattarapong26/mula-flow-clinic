import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  sub: string;
  role: string;
  tenant_id: string;
}

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const getDecodedToken = (): DecodedToken | null => {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  return !isTokenExpired(token);
};

export const getUserRole = (): string | null => {
  const decoded = getDecodedToken();
  return decoded?.role || null;
};

export const getTenantId = (): string | null => {
  const decoded = getDecodedToken();
  return decoded?.tenant_id || null;
}; 