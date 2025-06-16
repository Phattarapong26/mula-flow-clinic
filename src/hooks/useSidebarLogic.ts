
import { useLocation } from 'react-router-dom';
import { systemMenus, staffMenus, systemTitles, staffTitles } from '@/config/menuItems';

export const useSidebarLogic = () => {
  const location = useLocation();

  const getCurrentSystem = () => {
    const path = location.pathname;
    
    // Staff mode detection with exact matching
    if (path.startsWith('/staff/patients')) return 'patients';
    if (path.startsWith('/staff/appointments')) return 'appointments';
    if (path.startsWith('/staff/treatments')) return 'treatments';
    if (path.startsWith('/staff/invoicing')) return 'invoicing';
    if (path.startsWith('/staff/followup')) return 'followup';
    if (path.startsWith('/staff/chat')) return 'chat';
    if (path.startsWith('/staff/tasks')) return 'tasks';
    if (path.startsWith('/staff/product')) return 'product';
    if (path.startsWith('/staff/claim')) return 'claim';
    
    // Executive/Admin mode detection
    if (path.startsWith('/tasks')) return 'tasks';
    if (path.startsWith('/expenses')) return 'expenses';
    if (path.startsWith('/inventory')) return 'inventory';
    
    // Analytics routes
    if (path.startsWith('/analytics')) return 'analytics';
    
    // Executive dashboard routes with better matching
    if (path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/appointments')) return 'appointment';
    if (path.startsWith('/hr-dashboard')) return 'hr';
    if (path.startsWith('/branch')) return 'branch';
    if (path.startsWith('/feedback')) return 'feedback';
    if (path.startsWith('/alerts')) return 'chat';
    if (path.startsWith('/finance')) return 'finance';
    
    // Default fallback
    return 'dashboard';
  };

  const isStaffMode = location.pathname.startsWith('/staff/');
  const currentSystem = getCurrentSystem();
  
  // Ensure we always have menu items
  const currentMenuItems = isStaffMode 
    ? (staffMenus[currentSystem] || staffMenus['patients']) 
    : (systemMenus[currentSystem] || systemMenus['dashboard']);
    
  const systemTitle = isStaffMode 
    ? (staffTitles[currentSystem] || staffTitles['patients'])
    : (systemTitles[currentSystem] || systemTitles['dashboard']);

  const isActiveLink = (path: string) => {
    const currentPath = location.pathname;
    
    // Handle exact matches first
    if (currentPath === path) return true;
    
    // Handle special cases for base routes
    if (path === '/dashboard' && (currentPath === '/dashboard' || currentPath === '/')) return true;
    if (path === '/tasks' && currentPath === '/tasks') return true;
    if (path === '/expenses' && currentPath === '/expenses') return true;
    if (path === '/inventory' && currentPath === '/inventory') return true;
    if (path === '/staff/patients' && currentPath === '/staff/patients') return true;
    if (path === '/staff/appointments' && currentPath === '/staff/appointments') return true;
    if (path === '/staff/treatments' && currentPath === '/staff/treatments') return true;
    if (path === '/staff/invoicing' && currentPath === '/staff/invoicing') return true;
    if (path === '/staff/followup' && currentPath === '/staff/followup') return true;
    if (path === '/staff/chat' && currentPath === '/staff/chat') return true;
    if (path === '/staff/tasks' && currentPath === '/staff/tasks') return true;
    if (path === '/staff/product/inventory' && currentPath === '/staff/product') return true;
    if (path === '/staff/claim' && currentPath === '/staff/claim') return true;
    
    // For sub-routes, only match if current path starts with menu path followed by '/'
    if (path !== '/' && currentPath.startsWith(path + '/')) {
      return true;
    }
    
    return false;
  };

  // Debug logging
  console.log('Sidebar Debug:', {
    currentPath: location.pathname,
    currentSystem,
    isStaffMode,
    menuItemsCount: currentMenuItems?.length || 0,
    systemTitle
  });

  return {
    currentSystem,
    isStaffMode,
    currentMenuItems,
    systemTitle,
    isActiveLink,
    location
  };
};
