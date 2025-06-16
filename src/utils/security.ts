
import DOMPurify from 'dompurify';

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
