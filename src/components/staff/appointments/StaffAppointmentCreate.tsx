
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarPlus, Save, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { mockPatients, mockDoctors, mockServices } from '@/data/staffMockData';

const StaffAppointmentCreate = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customer_id: '',
    doctor_id: '',
    service_id: '',
    scheduled_date: '',
    scheduled_time: '',
    duration_minutes: 60,
    notes: ''
  });
  const [searchPatient, setSearchPatient] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
    patient.phone.includes(searchPatient)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.customer_id || !formData.doctor_id || !formData.scheduled_date || !formData.scheduled_time) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "ผู้ป่วย, หมอ, วันที่ และเวลา เป็นข้อมูลที่จำเป็น",
        variant: "destructive"
      });
      return;
    }

    // Check if appointment time is in the past
    const appointmentDateTime = new Date(`${formData.scheduled_date}T${formData.scheduled_time}`);
    if (appointmentDateTime < new Date()) {
      toast({
        title: "วันเวลาไม่ถูกต้อง",
        description: "ไม่สามารถจองนัดย้อนหลังได้",
        variant: "destructive"
      });
      return;
    }

    const selectedPatient = mockPatients.find(p => p.id === formData.customer_id);
    const selectedDoctor = mockDoctors.find(d => d.id === formData.doctor_id);
    
    console.log('Creating appointment:', formData);
    
    toast({
      title: "จองนัดหมายสำเร็จ",
      description: `จองนัดหมายสำหรับ ${selectedPatient?.name} กับ ${selectedDoctor?.name} เรียบร้อยแล้ว`,
    });

    // Reset form
    setFormData({
      customer_id: '',
      doctor_id: '',
      service_id: '',
      scheduled_date: '',
      scheduled_time: '',
      duration_minutes: 60,
      notes: ''
    });
    setSearchPatient('');
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePatientSelect = (patientId: string) => {
    setFormData(prev => ({ ...prev, customer_id: patientId }));
    const patient = mockPatients.find(p => p.id === patientId);
    if (patient) {
      setSearchPatient(patient.name);
    }
  };

  const selectedService = mockServices.find(s => s.id === formData.service_id);
  if (selectedService && formData.duration_minutes !== selectedService.duration_minutes) {
    setFormData(prev => ({ ...prev, duration_minutes: selectedService.duration_minutes }));
  }

  // Generate time slots (every 30 minutes from 9:00 to 17:00)
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break; // Don't go past 17:00
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeSlots.push(timeString);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">จองนัดหมายใหม่</h1>
          <p className="text-gray-600">สร้างนัดหมายใหม่สำหรับผู้ป่วย</p>
        </div>
        <Link to="/staff/appointments">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5" />
            ข้อมูลนัดหมาย
          </CardTitle>
          <CardDescription>กรอกข้อมูลการจองนัดหมายให้ครบถ้วน</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">เลือกผู้ป่วย</h3>
              
              <div className="space-y-2">
                <Label htmlFor="patient_search">ค้นหาผู้ป่วย *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="patient_search"
                    value={searchPatient}
                    onChange={(e) => setSearchPatient(e.target.value)}
                    placeholder="พิมพ์ชื่อหรือเบอร์โทรผู้ป่วย"
                    className="pl-10"
                  />
                </div>
                
                {searchPatient && !formData.customer_id && (
                  <div className="border rounded-lg max-h-48 overflow-y-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                        onClick={() => handlePatientSelect(patient.id)}
                      >
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-gray-600">{patient.phone} • {patient.email}</div>
                      </div>
                    ))}
                    {filteredPatients.length === 0 && (
                      <div className="p-3 text-gray-500 text-center">
                        ไม่พบผู้ป่วย
                        <Link to="/staff/patients/create" className="text-blue-600 hover:underline ml-2">
                          เพิ่มผู้ป่วยใหม่
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                
                {formData.customer_id && (
                  <div className="border rounded-lg p-3 bg-green-50">
                    <div className="font-medium text-green-800">
                      ✓ เลือกผู้ป่วย: {mockPatients.find(p => p.id === formData.customer_id)?.name}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, customer_id: '' }));
                        setSearchPatient('');
                      }}
                    >
                      เปลี่ยนผู้ป่วย
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">รายละเอียดการนัด</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="doctor_id">แพทย์ผู้รักษา *</Label>
                  <Select value={formData.doctor_id} onValueChange={(value) => handleInputChange('doctor_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกแพทย์" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service_id">บริการ</Label>
                  <Select value={formData.service_id} onValueChange={(value) => handleInputChange('service_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกบริการ (ไม่บังคับ)" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ฿{service.price?.toLocaleString()} ({service.duration_minutes} นาที)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">วันเวลา</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="scheduled_date">วันที่นัด *</Label>
                  <Input
                    id="scheduled_date"
                    type="date"
                    value={formData.scheduled_date}
                    onChange={(e) => handleInputChange('scheduled_date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduled_time">เวลานัด *</Label>
                  <Select value={formData.scheduled_time} onValueChange={(value) => handleInputChange('scheduled_time', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกเวลา" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration_minutes">ระยะเวลา (นาที)</Label>
                  <Input
                    id="duration_minutes"
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => handleInputChange('duration_minutes', parseInt(e.target.value))}
                    min="15"
                    max="240"
                    step="15"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">หมายเหตุ</h3>
              <div className="space-y-2">
                <Label htmlFor="notes">หมายเหตุเพิ่มเติม</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="ระบุรายละเอียดเพิ่มเติม หรือข้อมูลสำคัญที่ต้องการแจ้ง"
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Link to="/staff/appointments">
                <Button type="button" variant="outline">
                  ยกเลิก
                </Button>
              </Link>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                จองนัดหมาย
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAppointmentCreate;
