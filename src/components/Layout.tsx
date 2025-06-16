import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { 
  Search, 
  Bell, 
  AlertTriangle,
  Menu
} from 'lucide-react';

const Layout = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if we're in staff mode
  const isStaffMode = location.pathname.startsWith('/staff/');

  // Critical alerts mock data
  const criticalAlerts = [
    { type: 'high-priority', message: 'ผู้ป่วยฉุกเฉิน - ห้อง 201', time: '2 นาทีที่แล้ว' },
    { type: 'inventory', message: 'วัสดุทางการแพทย์ใกล้หมด - 3 รายการ', time: '15 นาทีที่แล้ว' },
    { type: 'schedule', message: 'แพทย์เวรบ่าย delay 30 นาที', time: '25 นาทีที่แล้ว' }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Premium Header */}
          <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-30">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="p-2 rounded-xl hover:bg-gray-100" />
                  <div>
                    <h2 className={`text-xl font-bold ${isStaffMode ? 'bg-gradient-to-r from-blue-900 to-blue-700' : 'bg-gradient-to-r from-gray-900 to-gray-700'} bg-clip-text text-transparent`}>
                      {isStaffMode ? 'Staff Portal' : 'Executive Dashboard'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {currentTime.toLocaleDateString('th-TH', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} • {currentTime.toLocaleTimeString('th-TH', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Link 
                    to={isStaffMode ? "/staff-menu" : "/main-menu"}
                    className={`flex items-center gap-2 px-3 py-2 ${isStaffMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-teal-600 hover:bg-teal-700'} text-white rounded-xl transition-colors font-semibold text-sm`}
                  >
                    <Menu className="h-4 w-4" />
                    {isStaffMode ? 'Staff Menu' : 'Main Menu'}
                  </Link>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder={isStaffMode ? "ค้นหาผู้ป่วย, นัดหมาย..." : "ค้นหาข้อมูลผู้ป่วย, รายงาน..."}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64 bg-white shadow-sm text-sm"
                    />
                  </div>
                  <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">3</span>
                  </button>
                  <select className="px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm font-semibold text-sm">
                    <option value="today">วันนี้</option>
                    <option value="week">สัปดาห์นี้</option>
                    <option value="month">เดือนนี้</option>
                    <option value="quarter">ไตรมาสนี้</option>
                  </select>
                </div>
              </div>
            </div>
          </header>

          {/* Critical Alerts Banner */}
          {criticalAlerts.length > 0 && (
            <div className="px-4 py-3 bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 text-sm">การแจ้งเตือนสำคัญ</h3>
                  <div className="flex space-x-4 mt-1">
                    {criticalAlerts.slice(0, 2).map((alert, index) => (
                      <span key={index} className="text-xs text-red-700">
                        • {alert.message}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm">
                  จัดการทั้งหมด
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
