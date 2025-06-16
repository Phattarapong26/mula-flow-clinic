
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, AlertTriangle, Clock, CheckCircle, Plus } from 'lucide-react';
import { mockTasks, mockFollowUps, mockAppointments } from '@/data/staffMockData';
import { Link } from 'react-router-dom';

const TasksDashboard = () => {
  const pendingTasks = mockTasks.filter(task => task.status === 'pending');
  const inProgressTasks = mockTasks.filter(task => task.status === 'in_progress');
  const completedTasks = mockTasks.filter(task => task.status === 'completed');
  const highPriorityTasks = mockTasks.filter(task => task.priority === 'high');

  const todayFollowUps = mockFollowUps.filter(followUp => {
    const today = new Date().toDateString();
    const followUpDate = new Date(followUp.scheduled_date).toDateString();
    return followUpDate === today && followUp.status === 'pending';
  });

  const todayAppointments = mockAppointments.filter(apt => {
    const today = new Date().toDateString();
    const aptDate = new Date(apt.scheduled_at).toDateString();
    return aptDate === today;
  });

  const getTaskPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    const labels = {
      high: 'ด่วนมาก',
      medium: 'ปานกลาง',
      low: 'ไม่ด่วน'
    };
    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      follow_up: <Users className="h-4 w-4" />,
      appointment: <Calendar className="h-4 w-4" />,
      inventory: <AlertTriangle className="h-4 w-4" />,
      administrative: <Clock className="h-4 w-4" />
    };
    return icons[category as keyof typeof icons] || <Clock className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ภาพรวมงาน</h1>
          <p className="text-gray-600">จัดการงานและติดตามผู้ป่วยรายวัน</p>
        </div>
        <Link to="/tasks/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            สร้างงานใหม่
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">งานรอดำเนินการ</p>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">กำลังดำเนินการ</p>
                <p className="text-2xl font-bold">{inProgressTasks.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">เสร็จสิ้นแล้ว</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">ติดตามผู้ป่วยวันนี้</p>
                <p className="text-2xl font-bold">{todayFollowUps.length}</p>
              </div>
              <Users className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              งานด่วนที่ต้องดำเนินการ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {highPriorityTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(task.category)}
                      <h4 className="font-medium">{task.title}</h4>
                      {getTaskPriorityBadge(task.priority)}
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">ผู้รับผิดชอบ: {task.assigned_to}</p>
                  </div>
                </div>
              ))}
              {highPriorityTasks.length === 0 && (
                <p className="text-gray-500 text-center py-4">ไม่มีงานด่วน</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Today's Follow-ups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              ติดตามผู้ป่วยวันนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayFollowUps.slice(0, 5).map((followUp) => (
                <div key={followUp.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{followUp.customer_name}</h4>
                    <p className="text-sm text-gray-600">{followUp.note}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {followUp.type === 'appointment_reminder' ? 'เตือนนัด' :
                         followUp.type === 'treatment_follow_up' ? 'ติดตามรักษา' :
                         followUp.type === 'check_up' ? 'ตรวจตามนัด' : 'เตือนยา'}
                      </Badge>
                      <span className="text-xs text-gray-500">โดย {followUp.staff_name}</span>
                    </div>
                  </div>
                </div>
              ))}
              {todayFollowUps.length === 0 && (
                <p className="text-gray-500 text-center py-4">ไม่มีการติดตามวันนี้</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-500" />
            นัดหมายวันนี้
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{todayAppointments.length}</div>
              <div className="text-sm text-gray-600">นัดทั้งหมด</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {todayAppointments.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">เสร็จสิ้น</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {todayAppointments.filter(a => a.status === 'confirmed' || a.status === 'scheduled').length}
              </div>
              <div className="text-sm text-gray-600">รอการรักษา</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {todayAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{appointment.customer_name}</h4>
                  <p className="text-sm text-gray-600">{appointment.type_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.appointment_time}</p>
                  <p className="text-xs text-gray-500">{appointment.doctor_name}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksDashboard;
