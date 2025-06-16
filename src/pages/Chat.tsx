
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatAll from '@/components/chat/ChatAll';
import ChatGroups from '@/components/chat/ChatGroups';
import ChatSearch from '@/components/chat/ChatSearch';
import ChatArchived from '@/components/chat/ChatArchived';
import ChatSettings from '@/components/chat/ChatSettings';
import ChatNotifications from '@/components/chat/ChatNotifications';

const Chat = () => {
  return (
    <div>
      <Routes>
        <Route index element={<ChatAll />} />
        <Route path="all" element={<ChatAll />} />
        <Route path="groups" element={<ChatGroups />} />
        <Route path="search" element={<ChatSearch />} />
        <Route path="archived" element={<ChatArchived />} />
        <Route path="settings" element={<ChatSettings />} />
        <Route path="notifications" element={<ChatNotifications />} />
      </Routes>
    </div>
  );
};

export default Chat;
