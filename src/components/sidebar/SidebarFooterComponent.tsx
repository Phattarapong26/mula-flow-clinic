
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';
import { SidebarFooter } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SidebarFooterComponentProps {
  isStaffMode: boolean;
  isCollapsed: boolean;
}

const SidebarFooterComponent: React.FC<SidebarFooterComponentProps> = ({ 
  isStaffMode, 
  isCollapsed 
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "ออกจากระบบ",
      description: "กำลังออกจากระบบ...",
    });
    logout();
  };

  const handleBackToMenu = () => {
    const menuPath = isStaffMode ? '/staff-menu' : '/main-menu';
    navigate(menuPath);
  };

  return (
    <SidebarFooter className="p-6 border-t border-gray-100">
      <div className="space-y-3">
        {/* Back to Menu Button */}
        <button
          onClick={handleBackToMenu}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {!isCollapsed && (
            <span className="font-medium text-sm">
              {isStaffMode ? 'กลับไปเมนูพนักงาน' : 'กลับไปเมนูหลัก'}
            </span>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-300"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && (
            <span className="font-medium text-sm">ออกจากระบบ</span>
          )}
        </button>
      </div>
    </SidebarFooter>
  );
};

export default SidebarFooterComponent;
