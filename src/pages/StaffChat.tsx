
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffChatSupport from '@/components/staff/chat/StaffChatSupport';
import StaffChatHistory from '@/components/staff/chat/StaffChatHistory';
import StaffChatSettings from '@/components/staff/chat/StaffChatSettings';

const StaffChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">แชทสนับสนุนลูกค้า</h1>
          <p className="text-gray-600">จัดการการสื่อสารกับลูกค้าผ่านระบบแชท</p>
        </div>
        
        <Routes>
          <Route index element={<StaffChatSupport />} />
          <Route path="social" element={<StaffChatSupport />} />
          <Route path="history" element={<StaffChatHistory />} />
          <Route path="settings" element={<StaffChatSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffChat;
