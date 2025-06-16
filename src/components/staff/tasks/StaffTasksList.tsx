import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckSquare, Plus, Search, Calendar, User, Clock, AlertCircle, Eye, Edit, CheckCircle, X, Star } from 'lucide-react';
import { mockTasks, Task } from '@/data/staffMockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Extend the Task interface to include created_at and updated_at
interface ExtendedTask extends Task {
  created_at: string;
  updated_at: string;
}

const StaffTasksList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  // Use ExtendedTask type for tasks with created_at/updated_at
  const [tasks, setTasks] = useState<ExtendedTask[]>(
    mockTasks.map(task => ({
      ...task,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))
  );
  const [selectedTask, setSelectedTask] = useState<ExtendedTask | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form states with proper typing
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'follow_up' as Task['category'],
    priority: 'medium' as Task['priority'],
    assigned_to: '',
    due_date: ''
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assigned_to.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description || !newTask.assigned_to || !newTask.due_date) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive"
      });
      return;
    }

    const task: ExtendedTask = {
      id: `TASK${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      assigned_to: newTask.assigned_to,
      due_date: newTask.due_date,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      category: 'follow_up',
      priority: 'medium',
      assigned_to: '',
      due_date: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "สร้างงานสำเร็จ",
      description: "งานใหม่ถูกสร้างและมอบหมายแล้ว"
    });
  };

  const handleUpdateStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { 
        ...task, 
        status: newStatus,
        updated_at: new Date().toISOString()
      } : task
    ));
    
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `สถานะงานถูกเปลี่ยนเป็น ${getStatusText(newStatus)}`
    });
  };

  const getStatusBadge = (status: Task['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      in_progress: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      completed: 'bg-green-100 text-green-800 hover:bg-green-200'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: Task['status']) => {
    const labels = {
      pending: 'รอดำเนินการ',
      in_progress: 'กำลังดำเนินการ',
      completed: 'เสร็จสิ้น'
    };
    return labels[status] || status;
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-orange-100 text-orange-800',
      high: 'bg-red-100 text-red-800'
    };
    return variants[priority] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityText = (priority: Task['priority']) => {
    const labels = {
      low: 'ต่ำ',
      medium: 'ปานกลาง',
      high: 'สูง'
    };
    return labels[priority] || priority;
  };

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'follow_up': return <User className="h-4 w-4" />;
      case 'appointment': return <Calendar className="h-4 w-4" />;
      case 'inventory': return <CheckSquare className="h-4 w-4" />;
      case 'administrative': return <AlertCircle className="h-4 w-4" />;
      default: return <CheckSquare className="h-4 w-4" />;
    }
  };

  const getCategoryText = (category: Task['category']) => {
    const labels = {
      follow_up: 'ติดตามลูกค้า',
      appointment: 'นัดหมาย',
      inventory: 'จัดการสต็อก',
      administrative: 'งานบริหาร'
    };
    return labels[category] || category;
  };

  // Summary statistics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const todayDueTasks = tasks.filter(t => {
    const dueDate = new Date(t.due_date).toDateString();
    const today = new Date().toDateString();
    return dueDate === today;
  }).length;
  const overdueTasks = tasks.filter(t => {
    const dueDate = new Date(t.due_date);
    const today = new Date();
    return dueDate < today && t.status !== 'completed';
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">รายการงาน</h1>
          <p className="text-gray-600">จัดการและติดตามงานที่ได้รับมอบหมาย ({filteredTasks.length} รายการ)</p>
        </div>
        <div className="flex gap-2">
          <Link to="/staff/tasks/calendar">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              ปฏิทิน
            </Button>
          </Link>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                งานใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>สร้างงานใหม่</DialogTitle>
                <DialogDescription>
                  กรอกรายละเอียดงานที่ต้องการมอบหมาย
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">หัวข้องาน *</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="เช่น ติดตามลูกค้านัดตรวจตา"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">รายละเอียด *</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="อธิบายรายละเอียดงานที่ต้องทำ..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>หมวดหมู่</Label>
                    <Select value={newTask.category} onValueChange={(value: Task['category']) => setNewTask({...newTask, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="follow_up">ติดตามลูกค้า</SelectItem>
                        <SelectItem value="appointment">นัดหมาย</SelectItem>
                        <SelectItem value="inventory">จัดการสต็อก</SelectItem>
                        <SelectItem value="administrative">งานบริหาร</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>ความสำคัญ</Label>
                    <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">ต่ำ</SelectItem>
                        <SelectItem value="medium">ปานกลาง</SelectItem>
                        <SelectItem value="high">สูง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="assigned_to">ผู้รับผิดชอบ *</Label>
                    <Input
                      id="assigned_to"
                      value={newTask.assigned_to}
                      onChange={(e) => setNewTask({...newTask, assigned_to: e.target.value})}
                      placeholder="ชื่อผู้รับผิดชอบ"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="due_date">กำหนดส่ง *</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={newTask.due_date}
                      onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleCreateTask}>
                  สร้างงาน
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
              <div className="text-sm text-gray-600">งานทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingTasks}</div>
              <div className="text-sm text-gray-600">รอดำเนินการ</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{todayDueTasks}</div>
              <div className="text-sm text-gray-600">ครบกำหนดวันนี้</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
              <div className="text-sm text-gray-600">เกินกำหนด</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            รายการงานทั้งหมด
          </CardTitle>
          <CardDescription>งานที่ได้รับมอบหมายและติดตามความคืบหน้า</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหางาน, คำอธิบาย, หรือผู้รับผิดชอบ..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="pending">รอดำเนินการ</SelectItem>
                <SelectItem value="in_progress">กำลังดำเนินการ</SelectItem>
                <SelectItem value="completed">เสร็จสิ้น</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกความสำคัญ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ความสำคัญทั้งหมด</SelectItem>
                <SelectItem value="high">สูง</SelectItem>
                <SelectItem value="medium">ปานกลาง</SelectItem>
                <SelectItem value="low">ต่ำ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getCategoryIcon(task.category)}
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <Badge className={getStatusBadge(task.status)} onClick={() => handleUpdateStatus(task.id, task.status === 'pending' ? 'in_progress' : task.status === 'in_progress' ? 'completed' : 'pending')}>
                        {getStatusText(task.status)}
                      </Badge>
                      <Badge className={getPriorityBadge(task.priority)}>
                        {task.priority === 'high' && <Star className="h-3 w-3 mr-1" />}
                        {getPriorityText(task.priority)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>ผู้รับผิดชอบ: {task.assigned_to}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>กำหนดส่ง: {new Date(task.due_date).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>หมวดหมู่: {getCategoryText(task.category)}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 text-sm">{task.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog open={isViewDialogOpen && selectedTask?.id === task.id} onOpenChange={(open) => {
                      setIsViewDialogOpen(open);
                      if (!open) setSelectedTask(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedTask(task)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          ดู
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {getCategoryIcon(task.category)}
                            {task.title}
                          </DialogTitle>
                          <DialogDescription>
                            รายละเอียดงาน
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Badge className={getStatusBadge(task.status)}>
                              {getStatusText(task.status)}
                            </Badge>
                            <Badge className={getPriorityBadge(task.priority)}>
                              {getPriorityText(task.priority)}
                            </Badge>
                          </div>
                          <div className="grid gap-2">
                            <Label>รายละเอียด:</Label>
                            <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded">{task.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label>ผู้รับผิดชอบ:</Label>
                              <p>{task.assigned_to}</p>
                            </div>
                            <div>
                              <Label>กำหนดส่ง:</Label>
                              <p>{new Date(task.due_date).toLocaleDateString('th-TH')}</p>
                            </div>
                            <div>
                              <Label>หมวดหมู่:</Label>
                              <p>{getCategoryText(task.category)}</p>
                            </div>
                            <div>
                              <Label>สร้างเมื่อ:</Label>
                              <p>{new Date(task.created_at).toLocaleDateString('th-TH')}</p>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            ปิด
                          </Button>
                          <Button onClick={() => {
                            setIsViewDialogOpen(false);
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="h-4 w-4 mr-1" />
                            แก้ไข
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const nextStatus = task.status === 'pending' ? 'in_progress' : 
                                         task.status === 'in_progress' ? 'completed' : 'pending';
                        handleUpdateStatus(task.id, nextStatus);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {task.status === 'pending' ? 'เริ่ม' : 
                       task.status === 'in_progress' ? 'เสร็จ' : 'เปิด'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">
                {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' ? 'ไม่พบงานที่ค้นหา' : 'ยังไม่มีงานที่ได้รับมอบหมาย'}
              </h3>
              <p className="text-sm">
                {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' ? 
                  'ลองเปลี่ยนเงื่อนไขการค้นหา' : 
                  'เริ่มต้นโดยการสร้างงานใหม่'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTasksList;
