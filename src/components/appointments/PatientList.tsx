
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Phone, Mail, Eye, Calendar, User, FileText } from 'lucide-react';
import { mockPatients } from '@/data/staffMockData';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getGenderBadge = (gender: string) => {
    return (
      <Badge variant={gender === 'male' ? 'default' : 'secondary'}>
        {gender === 'male' ? 'ชาย' : 'หญิง'}
      </Badge>
    );
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">รายชื่อผู้ป่วย</h2>
          <p className="text-gray-600">จัดการข้อมูลผู้ป่วยทั้งหมด ({filteredPatients.length} คน)</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มผู้ป่วยใหม่
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            รายชื่อผู้ป่วย
          </CardTitle>
          <CardDescription>ผู้ป่วยทั้งหมดในระบบ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหาชื่อ, เบอร์โทร, หรืออีเมล..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      {getGenderBadge(patient.gender)}
                      <span className="text-sm text-gray-500">อายุ {calculateAge(patient.dob)} ปี</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{patient.phone}</span>
                      </div>
                      {patient.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{patient.email}</span>
                        </div>
                      )}
                      {patient.insurance_provider && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span>ประกัน: {patient.insurance_provider}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      {patient.visual_acuity_right && patient.visual_acuity_left && (
                        <div>
                          <span className="font-medium text-gray-700">ความคมชัดสายตา: </span>
                          <span className="text-gray-600">
                            ขวา {patient.visual_acuity_right} | ซ้าย {patient.visual_acuity_left}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-700">สมาชิกตั้งแต่: </span>
                        <span className="text-gray-600">{new Date(patient.created_at).toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>

                    {patient.medical_history && (
                      <div className="text-sm mb-2">
                        <span className="font-medium text-gray-700">ประวัติการรักษา: </span>
                        <span className="text-gray-600">{patient.medical_history}</span>
                      </div>
                    )}

                    {patient.allergies && patient.allergies !== 'ไม่มี' && (
                      <div className="text-sm">
                        <span className="font-medium text-red-700">อาการแพ้: </span>
                        <span className="text-red-600">{patient.allergies}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      ดูข้อมูล
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      จองนัด
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'ไม่พบผู้ป่วยที่ค้นหา' : 'ยังไม่มีข้อมูลผู้ป่วย'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientList;
