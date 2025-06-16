
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Save, ArrowLeft, Search, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { mockPatients, mockDoctors, mockServices } from '@/data/staffMockData';

const StaffTreatmentCreate = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customer_id: '',
    doctor_id: '',
    service_id: '',
    treatment_date: new Date().toISOString().split('T')[0],
    treatment_time: new Date().toTimeString().slice(0, 5),
    notes: '',
    symptoms: '',
    diagnosis: '',
    prescription: '',
    next_appointment: ''
  });
  const [searchPatient, setSearchPatient] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchPatient.toLowerCase()) ||
    patient.phone.includes(searchPatient)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.customer_id || !formData.doctor_id || !formData.service_id) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "ผู้ป่วย, หมอ และบริการ เป็นข้อมูลที่จำเป็น",
        variant: "destructive"
      });
      return;
    }

    const selectedPatient = mockPatients.find(p => p.id === formData.customer_id);
    const selectedService = mockServices.find(s => s.id === formData.service_id);
    
    console.log('Creating treatment record:', formData);
    
    toast({
      title: "บันทึกการรักษาสำเร็จ",
      description: `บันทึกการรักษา ${selectedService?.name} สำหรับ ${selectedPatient?.name} เรียบร้อยแล้ว`,
    });

    // Reset form
    setFormData({
      customer_id: '',
      doctor_id: '',
      service_id: '',
      treatment_date: new Date().toISOString().split('T')[0],
      treatment_time: new Date().toTimeString().slice(0, 5),
      notes: '',
      symptoms: '',
      diagnosis: '',
      prescription: '',
      next_appointment: ''
    });
    setSearchPatient('');
  };

  const handleInputChange = (field: string, value: string) => {
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

  const selectedPatient = mockPatients.find(p => p.id === formData.customer_id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">บันทึกการรักษาใหม่</h1>
          <p className="text-gray-600">สร้างบันทึกการรักษาและผลการรักษา</p>
        </div>
        <Link to="/staff/treatments">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            บันทึกการรักษา
          </CardTitle>
          <CardDescription>กรอกข้อมูลการรักษาและผลการรักษาให้ครบถ้วน</CardDescription>
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
                        {patient.medical_history && (
                          <div className="text-xs text-gray-500 mt-1">ประวัติ: {patient.medical_history}</div>
                        )}
                        {patient.allergies && patient.allergies !== 'ไม่มี' && (
                          <div className="text-xs text-orange-600 mt-1">แพ้: {patient.allergies}</div>
                        )}
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
                
                {formData.customer_id && selectedPatient && (
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="font-medium text-green-800 mb-2">
                      ✓ ผู้ป่วย: {selectedPatient.name}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>เบอร์โทร:</strong> {selectedPatient.phone}
                      </div>
                      <div>
                        <strong>อายุ:</strong> {new Date().getFullYear() - new Date(selectedPatient.dob).getFullYear()} ปี
                      </div>
                      {selectedPatient.medical_history && (
                        <div className="md:col-span-2">
                          <strong>ประวัติการรักษา:</strong> {selectedPatient.medical_history}
                        </div>
                      )}
                      {selectedPatient.allergies && selectedPatient.allergies !== 'ไม่มี' && (
                        <div className="md:col-span-2 text-orange-700">
                          <strong>ภูมิแพ้:</strong> {selectedPatient.allergies}
                        </div>
                      )}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
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

            {/* Treatment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">ข้อมูลการรักษา</h3>
                
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
                  <Label htmlFor="service_id">บริการ/การรักษา *</Label>
                  <Select value={formData.service_id} onValueChange={(value) => handleInputChange('service_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกบริการ" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ฿{service.price?.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">วันเวลา</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="treatment_date">วันที่รักษา</Label>
                  <Input
                    id="treatment_date"
                    type="date"
                    value={formData.treatment_date}
                    onChange={(e) => handleInputChange('treatment_date', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatment_time">เวลารักษา</Label>
                  <Input
                    id="treatment_time"
                    type="time"
                    value={formData.treatment_time}
                    onChange={(e) => handleInputChange('treatment_time', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Medical Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">รายละเอียดทางการแพทย์</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="symptoms">อาการและการตรวจพบ</Label>
                    <Textarea
                      id="symptoms"
                      value={formData.symptoms}
                      onChange={(e) => handleInputChange('symptoms', e.target.value)}
                      placeholder="อาการที่ผู้ป่วยมา หรือการตรวจพบ"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">การวินิจฉัย</Label>
                    <Textarea
                      id="diagnosis"
                      value={formData.diagnosis}
                      onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                      placeholder="การวินิจฉัยโรค หรือสาเหตุของปัญหา"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prescription">การรักษาและยา</Label>
                    <Textarea
                      id="prescription"
                      value={formData.prescription}
                      onChange={(e) => handleInputChange('prescription', e.target.value)}
                      placeholder="วิธีการรักษา, ยาที่จ่าย, และคำแนะนำ"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="next_appointment">นัดครั้งถัดไป</Label>
                    <Input
                      id="next_appointment"
                      type="date"
                      value={formData.next_appointment}
                      onChange={(e) => handleInputChange('next_appointment', e.target.value)}
                      min={formData.treatment_date}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Notes */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">บันทึกเพิ่มเติม</h3>
              <div className="space-y-2">
                <Label htmlFor="notes">หมายเหตุการรักษา</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="บันทึกผลการรักษา, การตอบสนองของผู้ป่วย, หรือข้อมูลเพิ่มเติม"
                  rows={4}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <Link to="/staff/treatments">
                <Button type="button" variant="outline">
                  ยกเลิก
                </Button>
              </Link>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                บันทึกการรักษา
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTreatmentCreate;
