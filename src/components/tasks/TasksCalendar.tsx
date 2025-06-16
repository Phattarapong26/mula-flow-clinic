
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock } from 'lucide-react';

const TasksCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 15)); // June 15, 2025

  const tasks = [
    { id: 1, title: 'ประชุมทีมบริหาร', date: '2025-06-15', time: '09:00', priority: 'สูง', assignee: 'ทีมบริหาร' },
    { id: 2, title: 'รายงานรายได้', date: '2025-06-15', time: '14:00', priority: 'ปานกลาง', assignee: 'ฝ่ายการเงิน' },
    { id: 3, title: 'วิเคราะห์ประสิทธิภาพ', date: '2025-06-18', time: '10:30', priority: 'สูง', assignee: 'ฝ่าย Analytics' },
    { id: 4, title: 'อบรมพนักงาน', date: '2025-06-20', time: '13:00', priority: 'ปานกลาง', assignee: 'ฝ่าย HR' },
    { id: 5, title: 'ตรวจสอบระบบ', date: '2025-06-22', time: '11:00', priority: 'ต่ำ', assignee: 'ทีม IT' },
    { id: 6, title: 'ประชุมสาขา', date: '2025-06-25', time: '15:30', priority: 'สูง', assignee: 'ผู้จัดการสาขา' }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getTasksForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return tasks.filter(task => task.date === dateStr);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'สูง': return 'bg-red-100 text-red-800 border-red-200';
      case 'ปานกลาง': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ต่ำ': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const dayNames = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (day: number) => {
    return today.getFullYear() === currentDate.getFullYear() &&
           today.getMonth() === currentDate.getMonth() &&
           today.getDate() === day;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ปฏิทินงาน</h1>
          <p className="text-gray-600">ดูตารางงานและกิจกรรมทั้งหมด</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มงานใหม่
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
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
              {dayNames.map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-600 bg-gray-50 rounded">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="h-24"></div>;
                }
                
                const dayTasks = getTasksForDate(day);
                
                return (
                  <div 
                    key={day} 
                    className={`h-24 p-1 border rounded cursor-pointer hover:bg-gray-50 ${
                      isToday(day) ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(day) ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayTasks.slice(0, 2).map(task => (
                        <div 
                          key={task.id} 
                          className={`text-xs p-1 rounded border ${getPriorityColor(task.priority)}`}
                        >
                          <div className="font-medium truncate">{task.title}</div>
                          <div className="text-xs opacity-75">{task.time}</div>
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayTasks.length - 2} เพิ่มเติม
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              งานวันนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks
                .filter(task => task.date === '2025-06-15')
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(task => (
                  <div key={task.id} className="border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">{task.title}</div>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.time}
                      </div>
                      <div>{task.assignee}</div>
                    </div>
                  </div>
                ))}
              
              {tasks.filter(task => task.date === '2025-06-15').length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-sm">ไม่มีงานวันนี้</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Tasks Summary */}
      <Card>
        <CardHeader>
          <CardTitle>งานที่กำลังจะมาถึง</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter(task => new Date(task.date) > new Date('2025-06-15'))
              .slice(0, 6)
              .map(task => (
                <div key={task.id} className="border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-sm">{task.title}</div>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>{new Date(task.date).toLocaleDateString('th-TH')} {task.time}</div>
                    <div>{task.assignee}</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksCalendar;
