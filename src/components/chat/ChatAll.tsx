
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Pin, Archive, Clock } from 'lucide-react';
import { chats } from '@/data/chatMockData';

const ChatAll = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'group':
        return <Users className="h-4 w-4" />;
      case 'support':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'group':
        return <Badge variant="default">กลุ่ม</Badge>;
      case 'support':
        return <Badge variant="outline">ซัพพอร์ต</Badge>;
      case 'direct':
        return <Badge variant="secondary">ส่วนตัว</Badge>;
      default:
        return <Badge variant="secondary">ไม่ระบุ</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">แชททั้งหมด</h1>
        <div className="flex gap-2">
          <Button variant="outline">สร้างกลุ่มใหม่</Button>
          <Button>แชทใหม่</Button>
        </div>
      </div>

      <div className="space-y-3">
        {chats.map((chat) => (
          <Card key={chat.id} className={`hover:shadow-lg transition-shadow cursor-pointer ${chat.isPinned ? 'border-l-4 border-l-blue-500' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(chat.type)}
                    {chat.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                      {getTypeBadge(chat.type)}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {new Date(chat.lastMessageTime).toLocaleString('th-TH')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {chat.unreadCount > 0 && (
                    <Badge variant="destructive" className="rounded-full">
                      {chat.unreadCount}
                    </Badge>
                  )}
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm">เปิด</Button>
                    {!chat.isArchived && (
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <Archive className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChatAll;
