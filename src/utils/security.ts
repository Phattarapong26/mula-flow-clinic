
import DOMPurify from 'dompurify';
import { config } from '@/config/app';

export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const security = {
  // Sanitize all user input
  sanitizeInput: (input: string): string => {
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [] 
    });
  },

  // Sanitize response data from backend
  sanitizeResponse: <T>(data: T): T => {
    if (typeof data === 'string') {
      return DOMPurify.sanitize(data) as T;
    }
    
    if (Array.isArray(data)) {
      return data.map(item => security.sanitizeResponse(item)) as T;
    }
    
    if (data && typeof data === 'object') {
      const sanitized = {} as T;
      Object.keys(data).forEach(key => {
        const value = (data as any)[key];
        if (typeof value === 'string') {
          (sanitized as any)[key] = DOMPurify.sanitize(value);
        } else {
          (sanitized as any)[key] = security.sanitizeResponse(value);
        }
      });
      return sanitized;
    }
    
    return data;
  },

  // Sanitize sensitive data to prevent memory leaks
  sanitizeSensitiveData: <T>(data: T): T => {
    if (!data || typeof data !== 'object') return data;
    
    const sanitized = { ...data } as any;
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
    
    Object.keys(sanitized).forEach(key => {
      if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
        delete sanitized[key];
      }
    });
    
    return sanitized;
  },

  // Clear sensitive data from memory
  clearSensitiveData: (): void => {
    // Clear localStorage sensitive data
    const sensitiveKeys = ['jwt_token', 'refresh_token', 'user_data'];
    sensitiveKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    });
  },

  // Check if user has required role
  hasRequiredRole: (userRole: string, requiredRole: string): boolean => {
    const roleHierarchy = {
      'admin': 4,
      'manager': 3,
      'staff': 2,
      'user': 1
    };
    
    return (roleHierarchy[userRole as keyof typeof roleHierarchy] || 0) >= 
           (roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0);
  },

  // Check if user has required permission
  hasRequiredPermission: (userPermissions: string[], requiredPermission: string): boolean => {
    return userPermissions.includes(requiredPermission) || userPermissions.includes('admin');
  },

  // Check session timeout
  checkSessionTimeout: (lastActivity: number): boolean => {
    return Date.now() - lastActivity > SESSION_TIMEOUT;
  },

  // Validate and sanitize API paths
  validateApiPath: (path: string): string => {
    // Remove any path traversal attempts
    const sanitizedPath = path.replace(/\.\./g, '').replace(/\/+/g, '/');
    
    // Ensure path starts with /api/
    if (!sanitizedPath.startsWith('/api/')) {
      throw new Error('Invalid API path');
    }
    
    return sanitizedPath;
  },

  // Generate CSP header
  generateCSP: (): string => {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; ');
  }
};

// Export individual functions for convenience
export const {
  sanitizeInput,
  sanitizeResponse,
  sanitizeSensitiveData,
  clearSensitiveData,
  hasRequiredRole,
  hasRequiredPermission,
  checkSessionTimeout,
  validateApiPath,
  generateCSP
} = security;

export default security;
