
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Plus,
  Search,
  Filter,
  Heart
} from 'lucide-react';
import { appointments } from '@/data/patientMockData';

const AppointmentList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">ยืนยันแล้ว</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">จองแล้ว</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800">กำลังตรวจ</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-100 text-emerald-800">เสร็จสิ้น</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ยกเลิก</Badge>;
      case 'no-show':
        return <Badge className="bg-gray-100 text-gray-800">ไม่มาตามนัด</Badge>;
      default:
        return <Badge>ไม่ทราบสถานะ</Badge>;
    }
  };

  const getPaymentStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="text-green-700 border-green-200">ชำระแล้ว</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-200">รอชำระ</Badge>;
      case 'partial':
        return <Badge variant="outline" className="text-orange-700 border-orange-200">ชำระบางส่วน</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-red-700 border-red-200">ยกเลิกการชำระ</Badge>;
      default:
        return null;
    }
  };

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">รายการนัดหมาย</h2>
          <p className="text-gray-600">จัดการนัดหมายและการรักษา</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          นัดหมายใหม่
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="ค้นหาผู้ป่วย, แพทย์, หรือบริการ..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          ตัวกรอง
        </Button>
      </div>

      {/* Appointments Grid */}
      <div className="grid gap-6">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{appointment.patient.fullName}</h3>
                    <p className="text-sm text-gray-600">อายุ {appointment.patient.age} ปี • {appointment.patient.gender === 'male' ? 'ชาย' : 'หญิง'}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {appointment.patient.phone}
                      </span>
                      {appointment.patient.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {appointment.patient.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{appointment.appointmentTime}</span>
                    <Calendar className="h-4 w-4 text-gray-500 ml-2" />
                    <span>{new Date(appointment.appointmentDate).toLocaleDateString('th-TH')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(appointment.status)}
                    {getPaymentStatusBadge(appointment.paymentStatus)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">แพทย์:</span>
                    <span className="ml-2 font-medium">{appointment.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">บริการ:</span>
                    <span className="ml-2 font-medium">{appointment.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">สาขา:</span>
                    <span className="ml-2">{appointment.branchName}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">ระยะเวลา:</span>
                    <span className="ml-2">{appointment.duration} นาที</span>
                  </div>
                  {appointment.cost && (
                    <div>
                      <span className="text-gray-600 text-sm">ค่าใช้จ่าย:</span>
                      <span className="ml-2 font-medium">{appointment.cost.toLocaleString()} บาท</span>
                    </div>
                  )}
                  {appointment.followUpRequired && (
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">ต้องติดตาม</span>
                      {appointment.followUpDate && (
                        <span className="text-sm text-gray-600">
                          ({new Date(appointment.followUpDate).toLocaleDateString('th-TH')})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="mb-2">
                  <span className="text-gray-600">เหตุผลการนัด:</span>
                  <span className="ml-2">{appointment.reason}</span>
                </div>
                {appointment.notes && (
                  <div>
                    <span className="text-gray-600">หมายเหตุ:</span>
                    <span className="ml-2">{appointment.notes}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">ไม่พบนัดหมาย</h3>
            <p className="text-gray-500">ไม่มีนัดหมายที่ตรงกับคำค้นหา</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentList;
