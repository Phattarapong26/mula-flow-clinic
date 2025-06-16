import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MessageCircle, User, Search, Filter, Phone, Mail } from 'lucide-react';

const StaffChatHistory = () => {
  const [chatHistory] = React.useState([
    {
      id: '1',
      customer_name: 'คุณสมใจ ใจดี',
      customer_phone: '081-234-5678',
      platform: 'line',
      last_message: 'ขอบคุณครับ สำหรับการดูแลที่ดี',
      message_count: 12,
      last_activity: '2024-01-15T14:30:00',
      status: 'resolved',
      agent_name: 'คุณมานะ',
      topic: 'สอบถามผลการรักษา'
    },
    {
      id: '2',
      customer_name: 'คุณมานะ ทำดี',
      customer_phone: '082-345-6789',
      platform: 'facebook',
      last_message: 'อยากจองคิวเพิ่มครับ',
      message_count: 8,
      last_activity: '2024-01-15T16:45:00',
      status: 'active',
      agent_name: 'คุณสมใจ',
      topic: 'จองคิวเพิ่ม'
    },
    {
      id: '3',
      customer_name: 'คุณใจดี รักสะอาด',
      customer_phone: '083-456-7890',
      platform: 'line',
      last_message: 'เข้าใจแล้วครับ ขอบคุณมากค่ะ',
      message_count: 25,
      last_activity: '2024-01-14T11:20:00',
      status: 'resolved',
      agent_name: 'คุณมานะ',
      topic: 'แนะนำการดูแลหลังรักษา'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedPlatform, setSelectedPlatform] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');

  const filteredHistory = chatHistory.filter(chat => {
    if (searchTerm && !chat.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !chat.topic.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedPlatform && chat.platform !== selectedPlatform) return false;
    if (selectedStatus && chat.status !== selectedStatus) return false;
    return true;
  });

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'line':
        return { variant: 'default' as const, label: 'LINE', color: 'bg-green-500' };
      case 'facebook':
        return { variant: 'secondary' as const, label: 'Facebook', color: 'bg-blue-500' };
      case 'phone':
        return { variant: 'outline' as const, label: 'โทรศัพท์', color: 'bg-gray-500' };
      default:
        return { variant: 'secondary' as const, label: platform, color: 'bg-gray-500' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { variant: 'default' as const, label: 'กำลังดำเนินการ' };
      case 'resolved':
        return { variant: 'secondary' as const, label: 'เสร็จสิ้น' };
      case 'pending':
        return { variant: 'destructive' as const, label: 'รอตอบกลับ' };
      default:
        return { variant: 'secondary' as const, label: status };
    }
  };

  const activeChats = filteredHistory.filter(chat => chat.status === 'active');
  const resolvedChats = filteredHistory.filter(chat => chat.status === 'resolved');
  const pendingChats = filteredHistory.filter(chat => chat.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ประวัติการแชท</h1>
          <p className="text-gray-600">ประวัติการสนทนาทั้งหมด</p>
        </div>
        <Button>
          <Search className="h-4 w-4 mr-2" />
          ค้นหาขั้นสูง
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            ค้นหาและกรอง
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ค้นหา</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ชื่อลูกค้า, หัวข้อ..."
                  className="w-full pl-10 p-2 border rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">แพลตฟอร์ม</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">ทั้งหมด</option>
                <option value="line">LINE</option>
                <option value="facebook">Facebook</option>
                <option value="phone">โทรศัพท์</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">สถานะ</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">ทั้งหมด</option>
                <option value="active">กำลังดำเนินการ</option>
                <option value="resolved">เสร็จสิ้น</option>
                <option value="pending">รอตอบกลับ</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedPlatform('');
                setSelectedStatus('');
              }}>
                ล้างตัวกรอง
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat History Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">ทั้งหมด ({filteredHistory.length})</TabsTrigger>
          <TabsTrigger value="active">กำลังดำเนินการ ({activeChats.length})</TabsTrigger>
          <TabsTrigger value="resolved">เสร็จสิ้น ({resolvedChats.length})</TabsTrigger>
          <TabsTrigger value="pending">รอตอบกลับ ({pendingChats.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                ประวัติการแชททั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredHistory.map((chat) => {
                  const platformInfo = getPlatformBadge(chat.platform);
                  const statusInfo = getStatusBadge(chat.status);
                  
                  return (
                    <div key={chat.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{chat.customer_name}</h3>
                            <Badge variant={platformInfo.variant}>
                              {platformInfo.label}
                            </Badge>
                            <Badge variant={statusInfo.variant}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{chat.customer_phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>ดูแลโดย: {chat.agent_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              <span>{chat.message_count} ข้อความ</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(chat.last_activity).toLocaleDateString('th-TH')}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm font-medium mb-1">หัวข้อ: {chat.topic}</p>
                            <p className="text-sm text-gray-600">ข้อความล่าสุด: "{chat.last_message}"</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            ดูประวัติ
                          </Button>
                          {chat.status === 'active' && (
                            <Button size="sm">
                              ตอบกลับ
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {filteredHistory.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    ไม่พบประวัติการแชท
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>แชทที่กำลังดำเนินการ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                แชทที่กำลังดำเนินการ - รายละเอียดเหมือนแท็บทั้งหมด
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>แชทที่เสร็จสิ้น</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                แชทที่เสร็จสิ้น - รายละเอียดเหมือนแท็บทั้งหมด
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>แชทที่รอตอบกลับ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                แชทที่รอตอบกลับ - รายละเอียดเหมือนแท็บทั้งหมด
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffChatHistory;
