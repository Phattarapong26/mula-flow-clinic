
import React from 'react';
import { SidebarHeader } from '@/components/ui/sidebar';
import { Eye, Users, Sparkles } from 'lucide-react';

interface SidebarHeaderComponentProps {
  isStaffMode: boolean;
  systemTitle: string;
  isCollapsed: boolean;
}

const SidebarHeaderComponent: React.FC<SidebarHeaderComponentProps> = ({
  isStaffMode,
  systemTitle,
  isCollapsed
}) => {
  return (
    <SidebarHeader className="p-8 border-b border-gray-100">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className={`w-12 h-12 ${isStaffMode ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-gradient-to-br from-emerald-600 to-teal-600'} rounded-2xl flex items-center justify-center shadow-lg`}>
            {isStaffMode ? <Users className="h-7 w-7 text-white" /> : <Eye className="h-7 w-7 text-white" />}
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-2 w-2 text-white" />
          </div>
        </div>
        {!isCollapsed && (
          <div>
            <h1 className={`text-xl font-bold ${isStaffMode ? 'bg-gradient-to-r from-blue-700 to-indigo-700' : 'bg-gradient-to-r from-emerald-700 to-teal-700'} bg-clip-text text-transparent`}>
              {isStaffMode ? 'Staff Portal' : 'VisionCare Elite'}
            </h1>
            <p className={`text-sm ${isStaffMode ? 'text-blue-600' : 'text-emerald-600'} font-medium`}>{systemTitle}</p>
          </div>
        )}
      </div>
    </SidebarHeader>
  );
};

export default SidebarHeaderComponent;
