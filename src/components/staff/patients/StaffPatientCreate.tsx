
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StaffPatientCreate = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    emergency_contact: '',
    medical_history: '',
    allergies: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "ชื่อ, เบอร์โทรศัพท์, และอีเมล เป็นข้อมูลที่จำเป็น",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Creating patient:', formData);
    
    toast({
      title: "เพิ่มผู้ป่วยใหม่สำเร็จ",
      description: `เพิ่มข้อมูลผู้ป่วย ${formData.name} เรียบร้อยแล้ว`,
    });

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      dob: '',
      gender: '',
      address: '',
      emergency_contact: '',
      medical_history: '',
      allergies: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">เพิ่มผู้ป่วยใหม่</h1>
          <p className="text-gray-600">กรอกข้อมูลผู้ป่วยใหม่เข้าสู่ระบบ</p>
        </div>
        <Link to="/staff/patients">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            ข้อมูลผู้ป่วยใหม่
          </CardTitle>
          <CardDescription>กรอกข้อมูลผู้ป่วยให้ครบถ้วนสำหรับการลงทะเบียน</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">ข้อมูลส่วนตัว</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="กรอกชื่อ-นามสกุล"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">เพศ</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกเพศ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ชาย</SelectItem>
                      <SelectItem value="female">หญิง</SelectItem>
                      <SelectItem value="other">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">วันเกิด</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange('dob', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">ข้อมูลการติดต่อ</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="081-234-5678"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency_contact">เบอร์ติดต่อฉุกเฉิน</Label>
                  <Input
                    id="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                    placeholder="085-999-8888"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">ที่อยู่</h3>
              <div className="space-y-2">
                <Label htmlFor="address">ที่อยู่</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="บ้านเลขที่, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
                  rows={3}
                />
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">ข้อมูลทางการแพทย์</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="medical_history">ประวัติการรักษา</Label>
                  <Textarea
                    id="medical_history"
                    value={formData.medical_history}
                    onChange={(e) => handleInputChange('medical_history', e.target.value)}
                    placeholder="โรคประจำตัว, การผ่าตัด, ยาที่กินอยู่ประจำ"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">ภูมิแพ้</Label>
                  <Textarea
                    id="allergies"
                    value={formData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    placeholder="อาหาร, ยา, หรือสารที่แพ้ (หากไม่มีให้ใส่ 'ไม่มี')"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Link to="/staff/patients">
                <Button type="button" variant="outline">
                  ยกเลิก
                </Button>
              </Link>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                บันทึกข้อมูล
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPatientCreate;
