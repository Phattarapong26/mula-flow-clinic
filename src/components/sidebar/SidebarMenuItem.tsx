
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem as ShadcnSidebarMenuItem } from '@/components/ui/sidebar';
import { MenuItem } from '@/config/menuItems';

interface SidebarMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  isStaffMode: boolean;
  isCollapsed: boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ 
  item, 
  isActive, 
  isStaffMode, 
  isCollapsed 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(item.path);
  };

  return (
    <ShadcnSidebarMenuItem>
      <SidebarMenuButton 
        onClick={handleClick}
        isActive={isActive}
        className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group cursor-pointer ${
          isActive 
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl' 
            : 'text-gray-700 hover:bg-gray-50 hover:shadow-md'
        }`}
      >
        <div className="flex items-center space-x-3">
          <item.icon className={`h-5 w-5 ${
            isActive ? 'text-white' : 'text-gray-500'
          }`} />
          {!isCollapsed && (
            <span className="font-semibold text-sm">{item.label}</span>
          )}
        </div>
      </SidebarMenuButton>
    </ShadcnSidebarMenuItem>
  );
};

export default SidebarMenuItem;
