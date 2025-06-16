
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Clock, Users, Tag, Save, X, Plus } from 'lucide-react';

const TasksCreate = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: '',
    assignee: '',
    dueDate: '',
    dueTime: '',
    estimatedHours: '',
    category: '',
    tags: [] as string[]
  });

  const [newTag, setNewTag] = useState('');

  const teams = [
    'ทีมบริหาร',
    'ฝ่ายการเงิน',
    'ฝ่าย HR',
    'ทีม IT',
    'ทีมปฏิบัติการ',
    'ทีมพัฒนา',
    'ฝ่าย Analytics'
  ];

  const categories = [
    'กลยุทธ์',
    'การเงิน',
    'ทรัพยากรบุคคล',
    'เทคโนโลยี',
    'ปฏิบัติการ',
    'การตลาด',
    'ลูกค้าสัมพันธ์'
  ];

  const handleInputChange = (field: string, value: string) => {
    setTaskData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !taskData.tags.includes(newTag.trim())) {
      setTaskData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTaskData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating task:', taskData);
    // Here you would typically save the task
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'สูง': return 'bg-red-100 text-red-800 border-red-200';
      case 'ปานกลาง': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ต่ำ': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">สร้างงานใหม่</h1>
        <p className="text-gray-600">กำหนดรายละเอียดและมอบหมายงานให้ทีม</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>รายละเอียดงาน</CardTitle>
              <CardDescription>กรอกข้อมูลพื้นฐานของงาน</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">ชื่องาน *</Label>
                <Input
                  id="title"
                  value={taskData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="ระบุชื่องานที่ต้องการสร้าง"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">รายละเอียด</Label>
                <textarea
                  id="description"
                  value={taskData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="อธิบายรายละเอียดของงาน เป้าหมาย และขั้นตอนการดำเนินงาน"
                  className="w-full min-h-[100px] p-3 border border-input rounded-md resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">ความสำคัญ *</Label>
                  <Select value={taskData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกระดับความสำคัญ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="สูง">สูง</SelectItem>
                      <SelectItem value="ปานกลาง">ปานกลาง</SelectItem>
                      <SelectItem value="ต่ำ">ต่ำ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <Select value={taskData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่งาน" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="assignee">มอบหมายให้ *</Label>
                <Select value={taskData.assignee} onValueChange={(value) => handleInputChange('assignee', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกทีมที่รับผิดชอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team} value={team}>{team}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dueDate">วันที่กำหนดส่ง *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={taskData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dueTime">เวลากำหนดส่ง</Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={taskData.dueTime}
                    onChange={(e) => handleInputChange('dueTime', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="estimatedHours">ประมาณการเวลา (ชั่วโมง)</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    value={taskData.estimatedHours}
                    onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                    placeholder="8"
                    min="0"
                    step="0.5"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <Label>แท็ก</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="เพิ่มแท็ก..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {taskData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {taskData.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>ตัวอย่างงาน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{taskData.title || 'ชื่องาน'}</h3>
                  {taskData.description && (
                    <p className="text-sm text-gray-600 mt-1">{taskData.description}</p>
                  )}
                </div>

                {taskData.priority && (
                  <Badge className={getPriorityColor(taskData.priority)}>
                    {taskData.priority}
                  </Badge>
                )}

                {taskData.assignee && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {taskData.assignee}
                  </div>
                )}

                {taskData.dueDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(taskData.dueDate).toLocaleDateString('th-TH')}
                    {taskData.dueTime && ` ${taskData.dueTime}`}
                  </div>
                )}

                {taskData.estimatedHours && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    ประมาณ {taskData.estimatedHours} ชั่วโมง
                  </div>
                )}

                {taskData.category && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="h-4 w-4" />
                    {taskData.category}
                  </div>
                )}

                {taskData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {taskData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!taskData.title || !taskData.priority || !taskData.assignee || !taskData.dueDate}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    สร้างงาน
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    บันทึกร่าง
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    ยกเลิก
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TasksCreate;
