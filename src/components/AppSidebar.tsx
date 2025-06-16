
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import { useSidebarLogic } from '@/hooks/useSidebarLogic';
import SidebarHeaderComponent from '@/components/sidebar/SidebarHeaderComponent';
import SidebarFooterComponent from '@/components/sidebar/SidebarFooterComponent';
import SidebarMenuItem from '@/components/sidebar/SidebarMenuItem';

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  const {
    isStaffMode,
    currentMenuItems,
    systemTitle,
    isActiveLink
  } = useSidebarLogic();

  // Debug log to check if menu items are loaded
  console.log('Sidebar Debug:', {
    isStaffMode,
    currentMenuItems: currentMenuItems?.length || 0,
    systemTitle,
    isCollapsed
  });

  return (
    <Sidebar className="bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-100">
      <SidebarHeaderComponent 
        isStaffMode={isStaffMode}
        systemTitle={systemTitle}
        isCollapsed={isCollapsed}
      />

      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-semibold text-xs uppercase tracking-wide mb-4">
            {!isCollapsed ? (isStaffMode ? 'เมนูพนักงาน' : 'เมนูหลัก') : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {currentMenuItems && currentMenuItems.length > 0 ? (
                currentMenuItems.map((item, index) => (
                  <SidebarMenuItem
                    key={`${item.path}-${index}`}
                    item={item}
                    isActive={isActiveLink(item.path)}
                    isStaffMode={isStaffMode}
                    isCollapsed={isCollapsed}
                  />
                ))
              ) : (
                <div className="text-gray-500 text-sm p-4">
                  {!isCollapsed ? 'ไม่พบรายการเมนู' : ''}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooterComponent 
        isStaffMode={isStaffMode}
        isCollapsed={isCollapsed}
      />
    </Sidebar>
  );
}
