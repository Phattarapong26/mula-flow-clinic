
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Bell, MessageSquare, Bot, Clock, User } from 'lucide-react';

const StaffChatSettings = () => {
  const [settings, setSettings] = React.useState({
    notifications: {
      newMessage: true,
      urgentMessage: true,
      dailySummary: false,
      weeklyReport: true
    },
    autoResponse: {
      enabled: true,
      greeting: 'สวัสดีครับ/ค่ะ ยินดีให้บริการ',
      workingHours: true,
      offlineMessage: 'ขณะนี้อยู่นอกเวลาทำการ จะติดต่อกลับในเวลาทำการ'
    },
    chatLimits: {
      maxActiveChats: 5,
      responseTime: 3, // minutes
      autoAssign: true
    }
  });

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ตั้งค่าแชท</h1>
          <p className="text-gray-600">จัดการการตั้งค่าระบบแชท</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          บันทึกการตั้งค่า
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">การแจ้งเตือน</TabsTrigger>
          <TabsTrigger value="autoresponse">ตอบกลับอัตโนมัติ</TabsTrigger>
          <TabsTrigger value="limits">ข้อจำกัดแชท</TabsTrigger>
          <TabsTrigger value="templates">เทมเพลต</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                การแจ้งเตือน
              </CardTitle>
              <CardDescription>ตั้งค่าการแจ้งเตือนต่างๆ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">การแจ้งเตือนข้อความ</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">ข้อความใหม่</label>
                      <input
                        type="checkbox"
                        checked={settings.notifications.newMessage}
                        onChange={(e) => handleSettingChange('notifications', 'newMessage', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">ข้อความด่วน</label>
                      <input
                        type="checkbox"
                        checked={settings.notifications.urgentMessage}
                        onChange={(e) => handleSettingChange('notifications', 'urgentMessage', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">สรุปรายวัน</label>
                      <input
                        type="checkbox"
                        checked={settings.notifications.dailySummary}
                        onChange={(e) => handleSettingChange('notifications', 'dailySummary', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm">รายงานรายสัปดาห์</label>
                      <input
                        type="checkbox"
                        checked={settings.notifications.weeklyReport}
                        onChange={(e) => handleSettingChange('notifications', 'weeklyReport', e.target.checked)}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">รูปแบบการแจ้งเตือน</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="sound" className="w-4 h-4" />
                      <label htmlFor="sound" className="text-sm">เสียงแจ้งเตือน</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="popup" className="w-4 h-4" />
                      <label htmlFor="popup" className="text-sm">Pop-up แจ้งเตือน</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="email" className="w-4 h-4" />
                      <label htmlFor="email" className="text-sm">แจ้งเตือนทางอีเมล</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autoresponse">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                ตอบกลับอัตโนมัติ
              </CardTitle>
              <CardDescription>ตั้งค่าข้อความตอบกลับอัตโนมัติ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">เปิดใช้งานตอบกลับอัตโนมัติ</h3>
                  <p className="text-sm text-gray-600">ระบบจะตอบกลับข้อความอัตโนมัติ</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoResponse.enabled}
                  onChange={(e) => handleSettingChange('autoResponse', 'enabled', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ข้อความทักทาย</label>
                <textarea
                  value={settings.autoResponse.greeting}
                  onChange={(e) => handleSettingChange('autoResponse', 'greeting', e.target.value)}
                  rows={3}
                  className="w-full p-3 border rounded-lg"
                  placeholder="ข้อความทักทายลูกค้า..."
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">ตรวจสอบเวลาทำการ</h3>
                  <p className="text-sm text-gray-600">ส่งข้อความต่างกันในและนอกเวลาทำการ</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoResponse.workingHours}
                  onChange={(e) => handleSettingChange('autoResponse', 'workingHours', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ข้อความนอกเวลาทำการ</label>
                <textarea
                  value={settings.autoResponse.offlineMessage}
                  onChange={(e) => handleSettingChange('autoResponse', 'offlineMessage', e.target.value)}
                  rows={3}
                  className="w-full p-3 border rounded-lg"
                  placeholder="ข้อความสำหรับนอกเวลาทำการ..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                ข้อจำกัดและกฎการแชท
              </CardTitle>
              <CardDescription>กำหนดข้อจำกัดในการจัดการแชท</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">จำนวนแชทพร้อมกันสูงสุด</label>
                  <input
                    type="number"
                    value={settings.chatLimits.maxActiveChats}
                    onChange={(e) => handleSettingChange('chatLimits', 'maxActiveChats', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                    min="1"
                    max="20"
                  />
                  <p className="text-xs text-gray-500 mt-1">แนะนำ 3-7 แชท</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">เวลาตอบกลับเป้าหมาย (นาที)</label>
                  <input
                    type="number"
                    value={settings.chatLimits.responseTime}
                    onChange={(e) => handleSettingChange('chatLimits', 'responseTime', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                    min="1"
                    max="60"
                  />
                  <p className="text-xs text-gray-500 mt-1">เวลาที่ควรตอบกลับ</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">มอบหมายแชทอัตโนมัติ</h3>
                  <p className="text-sm text-gray-600">ระบบจะมอบหมายแชทใหม่อัตโนมัติ</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.chatLimits.autoAssign}
                  onChange={(e) => handleSettingChange('chatLimits', 'autoAssign', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">ประสิทธิภาพปัจจุบัน</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">แชทเปิดอยู่:</span>
                    <span className="font-medium ml-2">3/5</span>
                  </div>
                  <div>
                    <span className="text-blue-600">เวลาตอบเฉลี่ย:</span>
                    <span className="font-medium ml-2">2.5 นาที</span>
                  </div>
                  <div>
                    <span className="text-blue-600">แชทวันนี้:</span>
                    <span className="font-medium ml-2">12 แชท</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                เทมเพลตข้อความ
              </CardTitle>
              <CardDescription>จัดการข้อความสำเร็จรูป</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">เทมเพลตที่ใช้บ่อย</h3>
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    เพิ่มเทมเพลต
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'ทักทาย', text: 'สวัสดีครับ/ค่ะ ยินดีให้บริการ มีอะไรให้ช่วยไหมครับ/ค่ะ' },
                    { name: 'สอบถามรายละเอียด', text: 'ขอรายละเอียดเพิ่มเติมหน่อยครับ/ค่ะ เพื่อจะได้ให้คำแนะนำที่ตรงกับความต้องการ' },
                    { name: 'นัดหมาย', text: 'สำหรับการนัดหมาย สามารถติดต่อเบอร์ 02-xxx-xxxx หรือจองผ่านเว็บไซต์ได้ครับ/ค่ะ' },
                    { name: 'ขอบคุณ', text: 'ขอบคุณมากครับ/ค่ะ หากมีข้อสงสัยเพิ่มเติม สามารถสอบถามได้ตลอดเวลา' }
                  ].map((template, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{template.text}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">แก้ไข</Button>
                          <Button size="sm" variant="outline">ใช้งาน</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffChatSettings;
