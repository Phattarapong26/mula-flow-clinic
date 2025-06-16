import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { hasRequiredRole, hasRequiredPermission, checkSessionTimeout, SESSION_TIMEOUT } from '@/utils/security';
import { useToast } from '@/hooks/use-toast';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredRole,
  requiredPermission,
  fallback
}) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lastActivity, setLastActivity] = React.useState(Date.now());

  // Track user activity
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());
    
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, []);

  // Check session timeout
  useEffect(() => {
    const checkTimeout = () => {
      if (checkSessionTimeout(lastActivity)) {
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
        logout();
      }
    };

    const timeoutId = setInterval(checkTimeout, 60000); // Check every minute
    return () => clearInterval(timeoutId);
  }, [lastActivity, logout, toast]);

  // Check authentication and authorization
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (requiredRole && !hasRequiredRole(user.role, requiredRole)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive"
      });
      navigate('/unauthorized');
      return;
    }

    if (requiredPermission && !hasRequiredPermission(user.permissions || [], requiredPermission)) {
      toast({
        title: "Access Denied",
        description: "You don't have the required permissions to access this page.",
        variant: "destructive"
      });
      navigate('/unauthorized');
      return;
    }
  }, [isAuthenticated, user, requiredRole, requiredPermission, navigate, toast]);

  if (!isAuthenticated || !user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole && !hasRequiredRole(user.role, requiredRole)) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredPermission && !hasRequiredPermission(user.permissions || [], requiredPermission)) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have the required permissions to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;
