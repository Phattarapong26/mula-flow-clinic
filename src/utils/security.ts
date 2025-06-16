
import DOMPurify from 'dompurify';

export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const security = {
  // Sanitize sensitive data by removing potentially harmful content
  sanitizeSensitiveData<T>(data: T): T {
    if (typeof data === 'string') {
      return DOMPurify.sanitize(data) as T;
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeSensitiveData(item)) as T;
    }
    
    if (data && typeof data === 'object') {
      const sanitized = {} as T;
      for (const [key, value] of Object.entries(data)) {
        (sanitized as any)[key] = this.sanitizeSensitiveData(value);
      }
      return sanitized;
    }
    
    return data;
  },

  // Validate input against common attack patterns
  validateInput(input: string): boolean {
    const maliciousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /data:text\/html/gi
    ];
    
    return !maliciousPatterns.some(pattern => pattern.test(input));
  },

  // Escape HTML characters
  escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

// Role-based access control functions
export const hasRequiredRole = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    'admin': 4,
    'manager': 3,
    'staff': 2,
    'user': 1
  };
  
  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
  
  return userLevel >= requiredLevel;
};

export const hasRequiredPermission = (userPermissions: string[], requiredPermission: string): boolean => {
  return userPermissions.includes(requiredPermission);
};

export const checkSessionTimeout = (lastActivity: number): boolean => {
  return Date.now() - lastActivity > SESSION_TIMEOUT;
};

export const sanitizeInput = (input: string): string => {
  return security.escapeHtml(input);
};
