import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Send, Phone, Clock, User, Bot, Search, Filter, AlertCircle } from 'lucide-react';
import { chatService, ChatMessage, ChatStats } from '@/services/chatService';
import { useToast } from '@/hooks/use-toast';
import DOMPurify from 'dompurify';

const StaffChatSupport = () => {
  const { toast } = useToast();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({});
  const [stats, setStats] = useState<ChatStats>({
    totalChats: 0,
    botResponses: 0,
    avgResponseTime: 0,
    botRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChatStats();
  }, []);

  const loadChatStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await chatService.getChatStats();
      setStats(data);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลสถิติได้');
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถโหลดข้อมูลสถิติได้',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !activeChat) return;

    try {
      const sanitizedMessage = DOMPurify.sanitize(message);
      await chatService.sendMessage(activeChat, sanitizedMessage);
      setMessage('');
      
      // Refresh chat messages
      const messages = await chatService.getMessages(activeChat);
      setChats(prev => ({
        ...prev,
        [activeChat]: messages
      }));
    } catch (err) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถส่งข้อความได้',
        variant: 'destructive'
      });
    }
  };

  const getPlatformBadge = (platform: string) => {
    const variants = {
      line: 'bg-green-100 text-green-800',
      facebook: 'bg-blue-100 text-blue-800',
      website: 'bg-purple-100 text-purple-800'
    };
    const labels = {
      line: 'LINE',
      facebook: 'Facebook',
      website: 'เว็บไซต์'
    };
    return (
      <Badge className={variants[platform as keyof typeof variants]}>
        {labels[platform as keyof typeof labels]}
      </Badge>
    );
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">เกิดข้อผิดพลาด</h2>
        <p className="text-gray-600">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={loadChatStats}
        >
          ลองใหม่อีกครั้ง
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">แชทสนับสนุนลูกค้า</h1>
          <p className="text-gray-600">จัดการการสื่อสารกับลูกค้าผ่านระบบแชท</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            ประวัติ
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            ตั้งค่าบอท
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalChats}</div>
              <div className="text-sm text-gray-600">การสนทนาทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.botResponses}</div>
              <div className="text-sm text-gray-600">ตอบกลับอัตโนมัติ</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.avgResponseTime.toFixed(0)}s</div>
              <div className="text-sm text-gray-600">เวลาตอบกลับเฉลี่ย</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.botRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">อัตราบอท</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              รายการแชท
            </CardTitle>
            <CardDescription>ลูกค้าที่ติดต่อเข้ามา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="ค้นหาผู้ส่ง..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                value={platformFilter} 
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">แพลตฟอร์มทั้งหมด</option>
                <option value="line">LINE</option>
                <option value="facebook">Facebook</option>
                <option value="website">เว็บไซต์</option>
              </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.entries(chats).map(([sender, messages]) => {
                const latestMessage = messages[messages.length - 1];
                const isActive = activeChat === sender;
                
                return (
                  <div
                    key={sender}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      isActive ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveChat(sender)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{sender}</span>
                      {getPlatformBadge(latestMessage.platform)}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {latestMessage.message}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(latestMessage.received_at).toLocaleString('th-TH')}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {activeChat || 'เลือกการสนทนา'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeChat ? (
              <div className="flex flex-col h-96">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 space-y-3">
                  {chats[activeChat]?.map((chat) => (
                    <div
                      key={chat.id}
                      className={`flex ${chat.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          chat.sender === 'staff'
                            ? 'bg-blue-500 text-white'
                            : chat.is_bot
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="text-sm">{chat.message}</div>
                        <div className="text-xs mt-1 opacity-70">
                          {new Date(chat.received_at).toLocaleTimeString('th-TH', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {chat.is_bot && <span className="ml-1">(Bot)</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="พิมพ์ข้อความ..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500">
                เลือกการสนทนาเพื่อดูข้อความ
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>จัดการแพลตฟอร์ม</CardTitle>
          <CardDescription>การตั้งค่าและสถิติแต่ละแพลตฟอร์ม</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="line" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="line">LINE</TabsTrigger>
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="website">เว็บไซต์</TabsTrigger>
            </TabsList>
            
            <TabsContent value="line" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.totalChats}
                    </div>
                    <div className="text-sm text-gray-600">ข้อความ LINE</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <div className="text-sm text-gray-600">อัตราตอบกลับ</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">2.3min</div>
                    <div className="text-sm text-gray-600">เวลาตอบกลับเฉลี่ย</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="facebook" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.totalChats}
                    </div>
                    <div className="text-sm text-gray-600">ข้อความ Facebook</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">78%</div>
                    <div className="text-sm text-gray-600">อัตราตอบกลับ</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">3.1min</div>
                    <div className="text-sm text-gray-600">เวลาตอบกลับเฉลี่ย</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="website" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.totalChats}
                    </div>
                    <div className="text-sm text-gray-600">ข้อความเว็บไซต์</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <div className="text-sm text-gray-600">อัตราตอบกลับ</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">1.8min</div>
                    <div className="text-sm text-gray-600">เวลาตอบกลับเฉลี่ย</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffChatSupport;
