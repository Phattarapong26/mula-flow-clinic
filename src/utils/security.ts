import DOMPurify from 'dompurify';
import Joi from 'joi';

// Input Sanitization
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input);
};

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

// XSS Prevention for display
export const safeDisplayText = (text: string): string => {
  if (!text) return '';
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

// SQL Injection Prevention (for future backend calls)
export const escapeSql = (input: string): string => {
  if (!input) return '';
  return input.replace(/'/g, "''").replace(/;/g, '');
};

// CSRF Token Generator
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

// Rate Limiting Helper
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;
  
  constructor(maxAttempts = 100, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }
  
  isAllowed(key: string, maxAttempts = this.maxAttempts, windowMs = this.windowMs): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Clean old attempts
    const validAttempts = attempts.filter(time => now - time < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// Role-based Access Control
export const hasRequiredRole = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy: Record<string, string[]> = {
    'admin': ['admin', 'doctor', 'staff', 'ceo'],
    'doctor': ['doctor', 'staff'],
    'staff': ['staff'],
    'ceo': ['ceo']
  };

  return roleHierarchy[userRole]?.includes(requiredRole) || false;
};

// Permission-based Access Control
export const hasRequiredPermission = (
  userPermissions: string[],
  requiredPermission: string
): boolean => {
  return userPermissions.includes('admin:all') || userPermissions.includes(requiredPermission);
};

// Session Management
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const checkSessionTimeout = (lastActivity: number): boolean => {
  return Date.now() - lastActivity > SESSION_TIMEOUT;
};

// Security Headers
export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.yourdomain.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// Sensitive data types that should be handled carefully
const SENSITIVE_FIELDS = [
  'password',
  'token',
  'secret',
  'key',
  'credit_card',
  'ssn',
  'social_security',
  'bank_account',
  'phone',
  'email',
  'address'
];

// Cache for sensitive data with expiration
const sensitiveDataCache = new Map<string, { data: any; expires: number }>();

// Cache expiration time (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

export const security = {
  // Sanitize sensitive data
  sanitizeSensitiveData<T extends Record<string, any>>(data: T): T {
    const sanitized = { ...data } as T;
    
    for (const key in sanitized) {
      if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field))) {
        if (typeof sanitized[key] === 'string') {
          (sanitized[key] as any) = '********';
        } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
          sanitized[key] = this.sanitizeSensitiveData(sanitized[key]);
        }
      } else if (typeof sanitized[key] === 'string') {
        (sanitized[key] as any) = DOMPurify.sanitize(sanitized[key]);
      } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
        sanitized[key] = this.sanitizeSensitiveData(sanitized[key]);
      }
    }
    
    return sanitized;
  },

  // Store sensitive data with expiration
  storeSensitiveData(key: string, data: any): void {
    const expires = Date.now() + CACHE_EXPIRATION;
    sensitiveDataCache.set(key, { data, expires });
  },

  // Get sensitive data if not expired
  getSensitiveData(key: string): any | null {
    const cached = sensitiveDataCache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expires) {
      sensitiveDataCache.delete(key);
      return null;
    }
    
    return cached.data;
  },

  // Clear sensitive data
  clearSensitiveData(key?: string): void {
    if (key) {
      sensitiveDataCache.delete(key);
    } else {
      sensitiveDataCache.clear();
    }
  },

  // Clear expired sensitive data
  clearExpiredSensitiveData(): void {
    const now = Date.now();
    for (const [key, value] of sensitiveDataCache.entries()) {
      if (now > value.expires) {
        sensitiveDataCache.delete(key);
      }
    }
  },

  // Sanitize URL parameters
  sanitizeUrlParams(params: Record<string, string>): Record<string, string> {
    const sanitized: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      sanitized[key] = DOMPurify.sanitize(value);
    }
    return sanitized;
  },

  // Validate and sanitize user input
  sanitizeUserInput(input: string): string {
    return DOMPurify.sanitize(input.trim());
  },

  // Mask sensitive data for display
  maskSensitiveData(value: string, type: string): string {
    if (!value) return '';
    
    switch (type) {
      case 'email':
        const [username, domain] = value.split('@');
        return `${username.charAt(0)}${'*'.repeat(username.length - 2)}${username.slice(-1)}@${domain}`;
      case 'phone':
        return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      case 'credit_card':
        return value.replace(/(\d{4})\d{8}(\d{4})/, '$1********$2');
      default:
        return '********';
    }
  }
};

// Start cleanup interval
setInterval(() => {
  security.clearExpiredSensitiveData();
}, CACHE_EXPIRATION);

export default security;
