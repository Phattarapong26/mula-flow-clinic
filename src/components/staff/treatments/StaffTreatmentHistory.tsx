
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, User, Calendar, Search, Filter } from 'lucide-react';
import { mockTreatments, mockPatients } from '@/data/staffMockData';

const StaffTreatmentHistory = () => {
  const [selectedDoctor, setSelectedDoctor] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');

  const filteredTreatments = mockTreatments.filter(treatment => {
    if (selectedDoctor && treatment.doctor_name !== selectedDoctor) return false;
    if (selectedStatus && treatment.status !== selectedStatus) return false;
    return true;
  });

  const uniqueDoctors = [...new Set(mockTreatments.map(t => t.doctor_name))];

  const getPatientName = (customerId: string) => {
    const patient = mockPatients.find(p => p.id === customerId);
    return patient?.name || 'ไม่ระบุ';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ประวัติการรักษา</h1>
          <p className="text-gray-600">รายการประวัติการรักษาทั้งหมด</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          ส่งออกรายงาน
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            ตัวกรอง
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">แพทย์</label>
              <select 
                value={selectedDoctor} 
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">ทุกคน</option>
                {uniqueDoctors.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">สถานะ</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">ทั้งหมด</option>
                <option value="completed">เสร็จสิ้น</option>
                <option value="in_progress">กำลังดำเนินการ</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSelectedDoctor('');
                setSelectedStatus('');
              }}>
                ล้างตัวกรอง
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment History List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการประวัติ ({filteredTreatments.length} รายการ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTreatments.map((treatment) => (
              <div key={treatment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-lg">{treatment.service_name}</h3>
                      <Badge variant={treatment.status === 'completed' ? 'default' : 'secondary'}>
                        {treatment.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>ผู้ป่วย: {getPatientName(treatment.customer_id)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>แพทย์: {treatment.doctor_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>วันที่: {new Date(treatment.treatment_date).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>หมายเหตุ: {treatment.notes || 'ไม่มี'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    ดูรายละเอียด
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredTreatments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                ไม่พบประวัติการรักษา
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTreatmentHistory;
