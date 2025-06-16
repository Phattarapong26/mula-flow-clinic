
// Mock JWT utilities with real logic structure
export interface JWTPayload {
  sub: string;
  role: 'ceo' | 'staff' | 'doctor' | 'admin';
  permissions: string[];
  tenant_id: string;
  branch_id?: string;
  exp: number;
  iat: number;
}

export interface RefreshTokenPayload {
  sub: string;
  type: 'refresh';
  exp: number;
}

// Mock JWT decode (in real app, use jose or similar)
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    // Mock implementation - in real app would decode actual JWT
    if (!token || token === 'invalid') return null;
    
    // Mock payload based on role selection
    const mockPayload: JWTPayload = {
      sub: 'user-123',
      role: token.includes('staff') ? 'staff' : 'ceo',
      permissions: token.includes('staff') 
        ? ['read:patients', 'write:appointments', 'read:invoices']
        : ['read:all', 'write:all', 'admin:all'],
      tenant_id: 'tenant-123',
      branch_id: token.includes('staff') ? 'branch-456' : undefined,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      iat: Math.floor(Date.now() / 1000)
    };
    
    return mockPayload;
  } catch (error) {
    console.error('JWT decode error:', error);
    return null;
  }
};

export const isTokenExpired = (payload: JWTPayload): boolean => {
  return payload.exp < Math.floor(Date.now() / 1000);
};

export const hasPermission = (payload: JWTPayload, requiredPermission: string): boolean => {
  if (payload.permissions.includes('admin:all')) return true;
  return payload.permissions.includes(requiredPermission);
};

export const hasRole = (payload: JWTPayload, role: string): boolean => {
  return payload.role === role;
};
