
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, hasRole } from '@/utils/jwt';

interface RouteGuardOptions {
  requiredRole?: string;
  requiredPermission?: string;
  redirectTo?: string;
}

export const useRouteGuard = (options: RouteGuardOptions = {}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { requiredRole, requiredPermission, redirectTo = '/login' } = options;

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated || !user) {
      navigate(redirectTo);
      return;
    }

    // Mock JWT payload from user context
    const mockPayload = {
      sub: user.username,
      role: user.role as 'ceo' | 'staff' | 'doctor' | 'admin',
      permissions: user.role === 'ceo' 
        ? ['admin:all'] 
        : ['read:patients', 'write:appointments'],
      tenant_id: 'tenant-123',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000)
    };

    // Check role-based access
    if (requiredRole && !hasRole(mockPayload, requiredRole)) {
      console.error(`Access denied: Required role ${requiredRole}, user has ${mockPayload.role}`);
      navigate('/unauthorized');
      return;
    }

    // Check permission-based access
    if (requiredPermission && !hasPermission(mockPayload, requiredPermission)) {
      console.error(`Access denied: Required permission ${requiredPermission}`);
      navigate('/unauthorized');
      return;
    }

  }, [isAuthenticated, user, requiredRole, requiredPermission, navigate, redirectTo]);

  return {
    isAuthorized: isAuthenticated && user !== null,
    userRole: user?.role,
    userPermissions: user?.role === 'ceo' ? ['admin:all'] : ['read:patients', 'write:appointments']
  };
};
