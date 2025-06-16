import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Clock, User, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const StaffCrmTasks = () => {
  const [tasks] = React.useState([
    {
      id: '1',
      title: 'ติดตามลูกค้า - คุณสมใจ ใจดี',
      description: 'โทรสอบถามความคืบหนา หลังการรักษา 1 สัปดาห์',
      customer_name: 'คุณสมใจ ใจดี',
      due_date: '2024-01-15T14:00:00',
      priority: 'high',
      status: 'pending',
      task_type: 'follow_call',
      assigned_by: 'ผู้จัดการ'
    },
    {
      id: '2',
      title: 'ส่ง SMS แจ้งเตือนนัดหมาย',
      description: 'แจ้งเตือนนัดหมายพรุ่งนี้ให้ลูกค้า 5 ราย',
      customer_name: 'ลูกค้าหลายราย',
      due_date: '2024-01-14T16:00:00',
      priority: 'medium',
      status: 'completed',
      task_type: 'reminder',
      assigned_by: 'ระบบอัตโนมัติ'
    },
    {
      id: '3',
      title: 'ติดตามการชำระเงิน',
      description: 'ติดตามใบเสร็จที่ยังไม่ได้ชำระ 3 ใบ',
      customer_name: 'คุณมานะ ทำดี',
      due_date: '2024-01-16T10:00:00',
      priority: 'high',
      status: 'in_progress',
      task_type: 'payment_follow',
      assigned_by: 'แผนกบัญชี'
    }
  ]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return { variant: 'destructive' as const, label: 'สูง', icon: AlertCircle };
      case 'medium':
        return { variant: 'secondary' as const, label: 'ปานกลาง', icon: Clock };
      case 'low':
        return { variant: 'outline' as const, label: 'ต่ำ', icon: Clock };
      default:
        return { variant: 'secondary' as const, label: priority, icon: Clock };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { variant: 'default' as const, label: 'เสร็จสิ้น', icon: CheckCircle };
      case 'in_progress':
        return { variant: 'secondary' as const, label: 'กำลังดำเนินการ', icon: Clock };
      case 'pending':
        return { variant: 'outline' as const, label: 'รอดำเนินการ', icon: AlertCircle };
      default:
        return { variant: 'secondary' as const, label: status, icon: Clock };
    }
  };

  const getTaskTypeLabel = (type: string) => {
    switch (type) {
      case 'follow_call':
        return 'โทรติดตาม';
      case 'reminder':
        return 'แจ้งเตือน';
      case 'payment_follow':
        return 'ติดตามการชำระ';
      default:
        return type;
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">งานที่ได้รับมอบหมาย</h1>
          <p className="text-gray-600">จัดการงาน CRM และการติดตามลูกค้า</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          สร้างงานใหม่
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รอดำเนินการ</p>
                <p className="text-2xl font-bold text-orange-600">{pendingTasks.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">กำลังดำเนินการ</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เสร็จสิ้น</p>
                <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-600">{tasks.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">รอดำเนินการ ({pendingTasks.length})</TabsTrigger>
          <TabsTrigger value="in_progress">กำลังดำเนินการ ({inProgressTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">เสร็จสิ้น ({completedTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                งานที่รอดำเนินการ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => {
                  const priorityInfo = getPriorityBadge(task.priority);
                  const statusInfo = getStatusBadge(task.status);
                  
                  return (
                    <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge variant={priorityInfo.variant}>
                              {priorityInfo.label}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{task.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>กำหนด: {new Date(task.due_date).toLocaleDateString('th-TH')}</span>
                            </div>
                            <div>ประเภท: {getTaskTypeLabel(task.task_type)}</div>
                            <div>มอบหมายโดย: {task.assigned_by}</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            เริ่มงาน
                          </Button>
                          <Button size="sm">
                            ดูรายละเอียด
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {pendingTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    ไม่มีงานที่รอดำเนินการ
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in_progress">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                งานที่กำลังดำเนินการ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inProgressTasks.map((task) => {
                  const priorityInfo = getPriorityBadge(task.priority);
                  
                  return (
                    <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{task.title}</h3>
                            <Badge variant={priorityInfo.variant}>
                              {priorityInfo.label}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{task.customer_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>กำหนด: {new Date(task.due_date).toLocaleDateString('th-TH')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            หยุดชั่วคราว
                          </Button>
                          <Button size="sm">
                            เสร็จสิ้น
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {inProgressTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    ไม่มีงานที่กำลังดำเนินการ
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                งานที่เสร็จสิ้น
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 bg-green-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <Badge variant="default">เสร็จสิ้น</Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{task.customer_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>เสร็จสิ้นแล้ว</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                ))}
                
                {completedTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    ไม่มีงานที่เสร็จสิ้น
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffCrmTasks;
