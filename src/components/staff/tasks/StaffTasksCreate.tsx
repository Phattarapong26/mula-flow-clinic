
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Save, Clock, User, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const StaffTasksCreate = () => {
  const { toast } = useToast();
  const [dueDate, setDueDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
    assignee: '',
    estimatedHours: '',
    tags: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.priority || !formData.category || !dueDate) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive",
      });
      return;
    }

    console.log('Creating task:', { ...formData, dueDate });
    
    toast({
      title: "สร้างงานสำเร็จ",
      description: `งาน "${formData.title}" ถูกสร้างเรียบร้อยแล้ว`,
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: '',
      category: '',
      assignee: '',
      estimatedHours: '',
      tags: ''
    });
    setDueDate(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">สร้างงานใหม่</h1>
          <p className="text-gray-600">เพิ่มงานใหม่เข้าระบบ</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            รายละเอียดงาน
          </CardTitle>
          <CardDescription>
            กรอกข้อมูลงานที่ต้องการสร้าง
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Task Title */}
              <div className="md:col-span-2">
                <Label htmlFor="title">ชื่องาน *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="เช่น ติดตาม Claim ของคุณสมชาย"
                  className="mt-1"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Label htmlFor="description">รายละเอียด</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="อธิบายรายละเอียดงาน..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {/* Priority */}
              <div>
                <Label>ความสำคัญ *</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="เลือกความสำคัญ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">สูง</SelectItem>
                    <SelectItem value="medium">ปานกลาง</SelectItem>
                    <SelectItem value="low">ต่ำ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div>
                <Label>ประเภทงาน *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="เลือกประเภทงาน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claim">Claim</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="patient">Patient Management</SelectItem>
                    <SelectItem value="billing">Bill</SelectItem>
                    <SelectItem value="support">Chat Support</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assignee */}
              <div>
                <Label>ผู้รับผิดชอบ</Label>
                <Select value={formData.assignee} onValueChange={(value) => handleInputChange('assignee', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="เลือกผู้รับผิดชอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mana">คุณมานะ</SelectItem>
                    <SelectItem value="supaporn">คุณสุภาพร</SelectItem>
                    <SelectItem value="wilai">คุณวิไล</SelectItem>
                    <SelectItem value="self">ตัวเอง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Estimated Hours */}
              <div>
                <Label htmlFor="estimatedHours">เวลาที่คาดว่าจะใช้ (ชั่วโมง)</Label>
                <div className="relative mt-1">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="estimatedHours"
                    type="number"
                    step="0.5"
                    min="0"
                    value={formData.estimatedHours}
                    onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                    placeholder="2.5"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div>
                <Label>วันที่กำหนดส่ง</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full mt-1 justify-start text-left font-normal ${
                        !dueDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "dd/MM/yyyy") : "เลือกวันที่"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="tags">แท็ก</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="urgent, follow-up, review"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">คั่นแท็กด้วยเครื่องหมายจุลภาค</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                สร้างงาน
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                ยกเลิก
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>งานด่วน</CardTitle>
          <CardDescription>สร้างงานด่วนแบบรวดเร็ว</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="bg-red-100 p-2 rounded-full">
                <Tag className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm">ติดตาม Claim</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm">จัดการ Appointment</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <div className="bg-green-100 p-2 rounded-full">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm">อัพเดทข้อมูลผู้ป่วย</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTasksCreate;
