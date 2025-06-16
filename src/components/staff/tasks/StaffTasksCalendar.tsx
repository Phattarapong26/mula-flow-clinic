
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';

const StaffTasksCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const tasks = [
    { id: 1, title: 'ติดตาม Claim', time: '09:00', duration: 2, priority: 'high' },
    { id: 2, title: 'จัดเตรียมเอกสาร', time: '13:00', duration: 1.5, priority: 'medium' },
    { id: 3, title: 'อัพเดทข้อมูลผู้ป่วย', time: '15:30', duration: 1, priority: 'low' }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ปฏิทินงาน</h1>
          <p className="text-gray-600">ดูตารางงานและนัดหมายในรูปแบบปฏิทิน</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                  <div key={day} className="text-center p-2 text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDay }, (_, i) => (
                  <div key={`empty-${i}`} className="h-20 p-1"></div>
                ))}
                
                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const isToday = day === new Date().getDate() && 
                                 currentDate.getMonth() === new Date().getMonth() &&
                                 currentDate.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <div key={day} className={`h-20 p-1 border rounded ${isToday ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}>
                      <div className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
                        {day}
                      </div>
                      {day === 16 && (
                        <div className="mt-1">
                          <div className="bg-red-100 text-red-800 text-xs px-1 rounded mb-1">
                            สูง
                          </div>
                        </div>
                      )}
                      {day === 17 && (
                        <div className="mt-1">
                          <div className="bg-yellow-100 text-yellow-800 text-xs px-1 rounded">
                            ปานกลาง
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>งานวันนี้</CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('th-TH', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                      {task.priority === 'high' ? 'สูง' : task.priority === 'medium' ? 'กลาง' : 'ต่ำ'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{task.time} ({task.duration} ชม.)</span>
                  </div>
                </div>
              ))}
              
              {tasks.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  ไม่มีงานในวันนี้
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Week View Summary */}
      <Card>
        <CardHeader>
          <CardTitle>สรุปงานรายสัปดาห์</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-sm font-medium mb-2">{day}</div>
                <div className="bg-gray-50 rounded-lg p-2 min-h-[60px]">
                  {index === 1 && (
                    <div className="space-y-1">
                      <div className="bg-red-100 text-red-800 text-xs px-1 rounded">3 งาน</div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="space-y-1">
                      <div className="bg-yellow-100 text-yellow-800 text-xs px-1 rounded">2 งาน</div>
                    </div>
                  )}
                  {index === 4 && (
                    <div className="space-y-1">
                      <div className="bg-green-100 text-green-800 text-xs px-1 rounded">1 งาน</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTasksCalendar;
