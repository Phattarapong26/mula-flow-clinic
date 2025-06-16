
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Plus, Search, Calendar, User, FileText, Eye, Edit } from 'lucide-react';
import { mockTreatments } from '@/data/staffMockData';
import { Link } from 'react-router-dom';

const StaffTreatmentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [treatments] = useState(mockTreatments);

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || treatment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'bg-green-100 text-green-800',
      active: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    const labels = {
      completed: 'เสร็จสิ้น',
      active: 'กำลังรักษา',
      cancelled: 'ยกเลิก'
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  // Summary statistics
  const totalTreatments = treatments.length;
  const completedTreatments = treatments.filter(t => t.status === 'completed').length;
  const todayTreatments = treatments.filter(t => {
    const treatmentDate = new Date(t.treatment_date).toDateString();
    const today = new Date().toDateString();
    return treatmentDate === today;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">บันทึกการรักษา</h1>
          <p className="text-gray-600">จัดการและติดตามบันทึกการรักษาทั้งหมด ({filteredTreatments.length} รายการ)</p>
        </div>
        <div className="flex gap-2">
          <Link to="/staff/treatments/history">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              ประวัติ
            </Button>
          </Link>
          <Link to="/staff/treatments/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              บันทึกใหม่
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalTreatments}</div>
              <div className="text-sm text-gray-600">รายการทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedTreatments}</div>
              <div className="text-sm text-gray-600">เสร็จสิ้นแล้ว</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{todayTreatments}</div>
              <div className="text-sm text-gray-600">วันนี้</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(completedTreatments / totalTreatments * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">อัตราสำเร็จ</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            รายการการรักษาทั้งหมด
          </CardTitle>
          <CardDescription>บันทึกการรักษาและติดตามผลการรักษา</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหาชื่อผู้ป่วย, บริการ, หรือหมอ..." 
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
                <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                <SelectItem value="active">กำลังรักษา</SelectItem>
                <SelectItem value="cancelled">ยกเลิก</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredTreatments.map((treatment) => (
              <div key={treatment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{treatment.customer_name}</h3>
                      {getStatusBadge(treatment.status)}
                      <span className="text-sm text-gray-500">
                        {new Date(treatment.treatment_date).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{treatment.service_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{treatment.doctor_name}</span>
                      </div>
                      <div className="text-gray-600">
                        เวลา: {new Date(treatment.treatment_date).toLocaleTimeString('th-TH', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    
                    {treatment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-700 text-sm">บันทึกการรักษา:</span>
                            <p className="text-gray-600 text-sm mt-1">{treatment.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      ดูรายละเอียด
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      แก้ไข
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTreatments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || statusFilter !== 'all' ? 'ไม่พบบันทึกการรักษาที่ค้นหา' : 'ยังไม่มีบันทึกการรักษา'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffTreatmentsList;
