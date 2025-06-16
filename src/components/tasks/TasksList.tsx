
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Trash2, Search, Filter, Plus, Calendar, User } from 'lucide-react';

const TasksList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [tasks] = useState([
    {
      id: 1,
      title: 'ประชุมวางแผนไตรมาส Q2',
      description: 'วางแผนกลยุทธ์และเป้าหมายสำหรับไตรมาสที่ 2',
      status: 'กำลังดำเนินการ',
      priority: 'สูง',
      assignee: 'ทีมบริหาร',
      dueDate: '2025-06-20',
      progress: 65,
      tags: ['กลยุทธ์', 'วางแผน', 'ไตรมาส']
    },
    {
      id: 2,
      title: 'วิเคราะห์ประสิทธิภาพสาขา',
      description: 'ทำการวิเคราะห์ข้อมูลประสิทธิภาพการทำงานของแต่ละสาขา',
      status: 'เสร็จสิ้น',
      priority: 'ปานกลาง',
      assignee: 'ฝ่ายการเงิน',
      dueDate: '2025-06-18',
      progress: 100,
      tags: ['วิเคราะห์', 'สาขา', 'ประสิทธิภาพ']
    },
    {
      id: 3,
      title: 'จัดทำรายงานรายได้ประจำเดือน',
      description: 'สรุปและจัดทำรายงานรายได้และกำไรประจำเดือนพฤษภาคม',
      status: 'เกินกำหนด',
      priority: 'สูง',
      assignee: 'ฝ่าย HR',
      dueDate: '2025-06-15',
      progress: 40,
      tags: ['รายงาน', 'รายได้', 'การเงิน']
    },
    {
      id: 4,
      title: 'อบรมพนักงานใหม่',
      description: 'จัดอบรมปฐมนิเทศและการฝึกอบรมสำหรับพนักงานใหม่',
      status: 'รอดำเนินการ',
      priority: 'ปานกลาง',
      assignee: 'ทีมพัฒนา',
      dueDate: '2025-06-25',
      progress: 0,
      tags: ['อบรม', 'พนักงาน', 'พัฒนา']
    },
    {
      id: 5,
      title: 'ปรับปรุงระบบ CRM',
      description: 'อัพเกรดและปรับปรุงฟีเจอร์ระบบ CRM เพื่อประสิทธิภาพที่ดีขึ้น',
      status: 'กำลังดำเนินการ',
      priority: 'สูง',
      assignee: 'ทีม IT',
      dueDate: '2025-07-01',
      progress: 25,
      tags: ['CRM', 'ระบบ', 'ปรับปรุง']
    }
  ]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'สูง': return 'bg-red-100 text-red-800';
      case 'ปานกลาง': return 'bg-yellow-100 text-yellow-800';
      case 'ต่ำ': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'เสร็จสิ้น': return 'bg-green-100 text-green-800';
      case 'กำลังดำเนินการ': return 'bg-blue-100 text-blue-800';
      case 'เกินกำหนด': return 'bg-red-100 text-red-800';
      case 'รอดำเนินการ': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">รายการงานทั้งหมด</h1>
          <p className="text-gray-600">จัดการและติดตามงานในองค์กร</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          สร้างงานใหม่
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหางาน..."
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกสถานะ</SelectItem>
                <SelectItem value="รอดำเนินการ">รอดำเนินการ</SelectItem>
                <SelectItem value="กำลังดำเนินการ">กำลังดำเนินการ</SelectItem>
                <SelectItem value="เสร็จสิ้น">เสร็จสิ้น</SelectItem>
                <SelectItem value="เกินกำหนด">เกินกำหนด</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ความสำคัญ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกระดับ</SelectItem>
                <SelectItem value="สูง">สูง</SelectItem>
                <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
                <SelectItem value="ต่ำ">ต่ำ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Grid */}
      <div className="grid gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{task.title}</h3>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>ความคืบหน้า</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(task.progress)}`}
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {task.assignee}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(task.dueDate).toLocaleDateString('th-TH')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-medium mb-2">ไม่พบงาน</h3>
              <p>ลองเปลี่ยนตัวกรองหรือสร้างงานใหม่</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TasksList;
