
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatVolume from '@/components/alerts/ChatVolume';
import ResponseTime from '@/components/alerts/ResponseTime';
import OffScript from '@/components/alerts/OffScript';
import BotFailRate from '@/components/alerts/BotFailRate';

const Alerts = () => {
  return (
    <div>
      <Routes>
        <Route path="/chat-volume" element={<ChatVolume />} />
        <Route path="/response-time" element={<ResponseTime />} />
        <Route path="/off-script" element={<OffScript />} />
        <Route path="/bot-fail" element={<BotFailRate />} />
        <Route index element={
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ประสิทธิภาพการสื่อสาร</h1>
            <p className="text-gray-600">จัดการและวิเคราะห์การสื่อสารจากทุกช่องทาง</p>
            <div className="mt-8 bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">กรุณาเลือกเมนูจากแถบด้านข้างเพื่อดูรายละเอียด</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default Alerts;
