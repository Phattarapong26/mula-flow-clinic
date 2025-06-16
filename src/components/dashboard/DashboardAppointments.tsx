
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Phone } from 'lucide-react';

export const DashboardAppointments = () => {
  // Mock data for today's appointments
  const todayAppointments = [
    {
      id: '1',
      time: '09:00',
      customerName: 'คุณสมชาย ใจดี',
      service: 'ตรวจวัดสายตา',
      phone: '081-234-5678',
      status: 'confirmed'
    },
    {
      id: '2',
      time: '10:30',
      customerName: 'คุณสมหญิง รักสะอาด',
      service: 'เลเซอร์รักแร้',
      phone: '082-345-6789',
      status: 'pending'
    },
    {
      id: '3',
      time: '14:00',
      customerName: 'คุณวิชัย มีสุข',
      service: 'ทำแว่นตา',
      phone: '083-456-7890',
      status: 'confirmed'
    },
    {
      id: '4',
      time: '15:30',
      customerName: 'คุณมาลี สวยงาม',
      service: 'ฉีดโบท็อกซ์',
      phone: '084-567-8901',
      status: 'cancelled'
    },
    {
      id: '5',
      time: '16:45',
      customerName: 'คุณประยุทธ มั่นคง',
      service: 'ผิวหน้าใส',
      phone: '085-678-9012',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'ยืนยันแล้ว';
      case 'pending':
        return 'รอยืนยัน';
      case 'cancelled':
        return 'ยกเลิก';
      default:
        return 'ไม่ทราบ';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          นัดหมายวันนี้
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todayAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{appointment.time}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <User className="h-3 w-3" />
                    <span>{appointment.customerName}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <Phone className="h-3 w-3" />
                    <span>{appointment.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {appointment.service}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              รวม {todayAppointments.length} นัดหมาย
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ดูทั้งหมด →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
