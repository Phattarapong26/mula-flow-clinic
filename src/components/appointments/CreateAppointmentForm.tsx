
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { branches } from '@/data/branchMockData';

const CreateAppointmentForm = () => {
  const [formData, setFormData] = useState({
    // Patient info
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    // Emergency contact
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    // Medical history
    allergies: '',
    chronicDiseases: '',
    currentMedications: '',
    bloodType: '',
    // Appointment details
    appointmentDate: '',
    appointmentTime: '',
    branchId: '',
    doctorId: '',
    serviceType: '',
    duration: '30',
    reason: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>สร้างนัดหมายใหม่</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ข้อมูลผู้ป่วย</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ชื่อ</label>
                  <input 
                    type="text" 
                    name="firstName"
                    className="w-full p-2 border rounded-lg" 
                    placeholder="ชื่อจริง"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">นามสกุล</label>
                  <input 
                    type="text" 
                    name="lastName"
                    className="w-full p-2 border rounded-lg" 
                    placeholder="นามสกุล"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">วันเกิด</label>
                  <input 
                    type="date" 
                    name="dateOfBirth"
                    className="w-full p-2 border rounded-lg"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">เพศ</label>
                  <select 
                    name="gender"
                    className="w-full p-2 border rounded-lg"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">เลือกเพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full p-2 border rounded-lg" 
                    placeholder="0XX-XXX-XXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">อีเมล</label>
                  <input 
                    type="email" 
                    name="email"
                    className="w-full p-2 border rounded-lg" 
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">ที่อยู่</label>
                <textarea 
                  name="address"
                  className="w-full p-2 border rounded-lg" 
                  rows={2} 
                  placeholder="ที่อยู่ผู้ป่วย"
                  value={formData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ผู้ติดต่อฉุกเฉิน</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ชื่อผู้ติดต่อ</label>
                  <input 
                    type="text" 
                    name="emergencyName"
                    className="w-full p-2 border rounded-lg"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ความสัมพันธ์</label>
                  <input 
                    type="text" 
                    name="emergencyRelationship"
                    className="w-full p-2 border rounded-lg" 
                    placeholder="เช่น พ่อ แม่ สามี ภรรยา"
                    value={formData.emergencyRelationship}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
                  <input 
                    type="tel" 
                    name="emergencyPhone"
                    className="w-full p-2 border rounded-lg"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Medical History Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ประวัติการรักษา</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">ประวัติการแพ้ยา/อาหาร</label>
                  <textarea 
                    name="allergies"
                    className="w-full p-2 border rounded-lg" 
                    rows={3} 
                    placeholder="ระบุสิ่งที่แพ้ (ถ้ามี)"
                    value={formData.allergies}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">โรคประจำตัว</label>
                  <textarea 
                    name="chronicDiseases"
                    className="w-full p-2 border rounded-lg" 
                    rows={3} 
                    placeholder="ระบุโรคประจำตัว (ถ้ามี)"
                    value={formData.chronicDiseases}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ยาที่ใช้ประจำ</label>
                  <textarea 
                    name="currentMedications"
                    className="w-full p-2 border rounded-lg" 
                    rows={2} 
                    placeholder="ระบุยาที่ใช้ประจำ (ถ้ามี)"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">กรุ๊ปเลือด</label>
                  <select 
                    name="bloodType"
                    className="w-full p-2 border rounded-lg"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                  >
                    <option value="">เลือกกรุ๊ปเลือด</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appointment Details Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">รายละเอียดการนัดหมาย</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">วันที่</label>
                  <input 
                    type="date" 
                    name="appointmentDate"
                    className="w-full p-2 border rounded-lg"
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">เวลา</label>
                  <input 
                    type="time" 
                    name="appointmentTime"
                    className="w-full p-2 border rounded-lg"
                    value={formData.appointmentTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">สาขา</label>
                  <select 
                    name="branchId"
                    className="w-full p-2 border rounded-lg"
                    value={formData.branchId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">เลือกสาขา</option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>{branch.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">แพทย์</label>
                  <select 
                    name="doctorId"
                    className="w-full p-2 border rounded-lg"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">เลือกแพทย์</option>
                    <option value="D001">นพ.สมชาย รักษาดี</option>
                    <option value="D002">นพ.หญิง วิภาวดี ใสสะอาด</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">บริการ</label>
                  <select 
                    name="serviceType"
                    className="w-full p-2 border rounded-lg"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">เลือกบริการ</option>
                    <option value="ตรวจสายตาทั่วไป">ตรวจสายตาทั่วไป</option>
                    <option value="ผ่าตัดต้อกระจก">ผ่าตัดต้อกระจก</option>
                    <option value="ตรวจจอประสาทตา">ตรวจจอประสาทตา</option>
                    <option value="จัดแว่นตา">จัดแว่นตา</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ระยะเวลา (นาที)</label>
                  <input 
                    type="number" 
                    name="duration"
                    className="w-full p-2 border rounded-lg" 
                    placeholder="30"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">เหตุผลการนัด</label>
                <textarea 
                  name="reason"
                  className="w-full p-2 border rounded-lg" 
                  rows={2} 
                  placeholder="อาการหรือเหตุผลที่ต้องมาตรวจ"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">หมายเหตุ</label>
                <textarea 
                  name="notes"
                  className="w-full p-2 border rounded-lg" 
                  rows={3} 
                  placeholder="หมายเหตุเพิ่มเติม"
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3">
              บันทึกนัดหมาย
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAppointmentForm;
