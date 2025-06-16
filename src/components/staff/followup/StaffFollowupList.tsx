
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Plus, Search, Phone, Calendar, Eye, Edit, UserCheck } from 'lucide-react';
import { mockFollowUps } from '@/data/staffMockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StaffFollowupList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [resultFilter, setResultFilter] = useState('all');
  const [followups, setFollowups] = useState(mockFollowUps);

  const filteredFollowups = followups.filter(followup => {
    const matchesSearch = followup.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         followup.staff_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         followup.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'all' || followup.method === methodFilter;
    const matchesResult = resultFilter === 'all' || followup.result === resultFilter;
    return matchesSearch && matchesMethod && matchesResult;
  });

  const getMethodBadge = (method: string) => {
    const variants = {
      phone: 'bg-blue-100 text-blue-800',
      line: 'bg-green-100 text-green-800',
      email: 'bg-purple-100 text-purple-800',
      visit: 'bg-orange-100 text-orange-800'
    };
    const labels = {
      phone: 'โทรศัพท์',
      line: 'LINE',
      email: 'อีเมล',
      visit: 'เข้าพบ'
    };
    return (
      <Badge className={variants[method as keyof typeof variants]}>
        {labels[method as keyof typeof labels] || method}
      </Badge>
    );
  };

  const getResultBadge = (result: string) => {
    const variants = {
      contacted: 'bg-green-100 text-green-800',
      no_answer: 'bg-orange-100 text-orange-800',
      interested: 'bg-blue-100 text-blue-800',
      not_interested: 'bg-red-100 text-red-800',
      scheduled: 'bg-purple-100 text-purple-800'
    };
    const labels = {
      contacted: 'ติดต่อได้',
      no_answer: 'ไม่รับสาย',
      interested: 'สนใจ',
      not_interested: 'ไม่สนใจ',
      scheduled: 'นัดแล้ว'
    };
    return (
      <Badge className={variants[result as keyof typeof variants]}>
        {labels[result as keyof typeof labels] || result}
      </Badge>
    );
  };

  const handleMarkAsCompleted = (followupId: string) => {
    toast({
      title: "อัพเดทสถานะสำเร็จ",
      description: "เปลี่ยนสถานะการติดตามเป็น 'เสร็จสิ้น' เรียบร้อย",
    });
  };

  // Summary calculations
  const totalFollowups = followups.length;
  const todayFollowups = followups.filter(f => {
    const followupDate = new Date(f.next_follow_date || '').toDateString();
    const today = new Date().toDateString();
    return followupDate === today;
  }).length;
  const contactedCount = followups.filter(f => f.result === 'contacted').length;
  const pendingCount = followups.filter(f => f.result === 'no_answer').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ติดตามลูกค้า</h1>
          <p className="text-gray-600">จัดการและติดตามการสื่อสารกับลูกค้า ({filteredFollowups.length} รายการ)</p>
        </div>
        <div className="flex gap-2">
          <Link to="/staff/followup/tasks">
            <Button variant="outline" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              งานที่ได้รับ
            </Button>
          </Link>
          <Link to="/staff/followup/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              ติดตามใหม่
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalFollowups}</div>
              <div className="text-sm text-gray-600">รายการทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{contactedCount}</div>
              <div className="text-sm text-gray-600">ติดต่อได้</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{todayFollowups}</div>
              <div className="text-sm text-gray-600">ต้องติดตามวันนี้</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">รอติดตาม</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            รายการติดตามทั้งหมด
          </CardTitle>
          <CardDescription>ติดตามและบันทึกการสื่อสารกับลูกค้า</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหาชื่อลูกค้า, พนักงาน, หรือหมายเหตุ..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="วิธีการติดต่อ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">วิธีการทั้งหมด</SelectItem>
                <SelectItem value="phone">โทรศัพท์</SelectItem>
                <SelectItem value="line">LINE</SelectItem>
                <SelectItem value="email">อีเมล</SelectItem>
                <SelectItem value="visit">เข้าพบ</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resultFilter} onValueChange={setResultFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="ผลการติดต่อ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ผลการติดต่อทั้งหมด</SelectItem>
                <SelectItem value="contacted">ติดต่อได้</SelectItem>
                <SelectItem value="no_answer">ไม่รับสาย</SelectItem>
                <SelectItem value="interested">สนใจ</SelectItem>
                <SelectItem value="not_interested">ไม่สนใจ</SelectItem>
                <SelectItem value="scheduled">นัดแล้ว</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredFollowups.map((followup) => (
              <div key={followup.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{followup.customer_name}</h3>
                      {getMethodBadge(followup.method)}
                      {getResultBadge(followup.result)}
                      <span className="text-sm text-gray-500">
                        {new Date(followup.created_at).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>พนักงาน: {followup.staff_name}</span>
                      </div>
                      {followup.next_follow_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>นัดติดตาม: {new Date(followup.next_follow_date).toLocaleDateString('th-TH')}</span>
                        </div>
                      )}
                      <div className="text-gray-600">
                        เวลา: {new Date(followup.created_at).toLocaleTimeString('th-TH', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MessageCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div>
                          <span className="font-medium text-gray-700 text-sm">บันทึกการติดตาม:</span>
                          <p className="text-gray-600 text-sm mt-1">{followup.note}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {followup.next_follow_date && new Date(followup.next_follow_date).toDateString() === new Date().toDateString() && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMarkAsCompleted(followup.id)}
                        className="text-green-600 hover:text-green-700"
                      >
                        เสร็จสิ้น
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      ดูรายละเอียด
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      แก้ไข
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFollowups.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || methodFilter !== 'all' || resultFilter !== 'all' ? 'ไม่พบรายการติดตามที่ค้นหา' : 'ยังไม่มีรายการติดตาม'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffFollowupList;
