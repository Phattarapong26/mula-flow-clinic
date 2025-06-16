
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Clock, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const timeSlotRevenue = [
  { time: '08:00-10:00', revenue: 85000, appointments: 12, avgRevenue: 7083 },
  { time: '10:00-12:00', revenue: 120000, appointments: 18, avgRevenue: 6667 },
  { time: '12:00-14:00', revenue: 95000, appointments: 14, avgRevenue: 6786 },
  { time: '14:00-16:00', revenue: 140000, appointments: 20, avgRevenue: 7000 },
  { time: '16:00-18:00', revenue: 110000, appointments: 16, avgRevenue: 6875 },
  { time: '18:00-20:00', revenue: 75000, appointments: 10, avgRevenue: 7500 }
];

const dailyRevenue = [
  { day: 'จันทร์', revenue: 145000, appointments: 22 },
  { day: 'อังคาร', revenue: 132000, appointments: 20 },
  { day: 'พุธ', revenue: 156000, appointments: 24 },
  { day: 'พฤหัส', revenue: 168000, appointments: 26 },
  { day: 'ศุกร์', revenue: 142000, appointments: 21 },
  { day: 'เสาร์', revenue: 98000, appointments: 15 },
  { day: 'อาทิตย์', revenue: 89000, appointments: 12 }
];

const AppointmentRevenue = () => {
  const totalRevenue = timeSlotRevenue.reduce((sum, slot) => sum + slot.revenue, 0);
  const totalAppointments = timeSlotRevenue.reduce((sum, slot) => sum + slot.appointments, 0);
  const avgRevenuePerAppointment = totalRevenue / totalAppointments;

  const peakHour = timeSlotRevenue.reduce((max, slot) => 
    slot.revenue > max.revenue ? slot : max
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">รายได้ต่อช่วงเวลา</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์รายได้จากการจองนัดหมายในแต่ละช่วงเวลา</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">รายได้รวมวันนี้</p>
                <p className="text-2xl font-bold">฿{(totalRevenue / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">นัดหมายทั้งหมด</p>
                <p className="text-2xl font-bold">{totalAppointments}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">รายได้เฉลี่ย/นัด</p>
                <p className="text-2xl font-bold">฿{Math.round(avgRevenuePerAppointment).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Peak Hour</p>
                <p className="text-2xl font-bold">{peakHour.time.split('-')[0]}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>รายได้ตามช่วงเวลา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeSlotRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'รายได้']} />
                <Bar dataKey="revenue" fill="#10b981" name="รายได้" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>รายได้รายวัน</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'รายได้']} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} name="รายได้รายวัน" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดช่วงเวลา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ช่วงเวลา</th>
                  <th className="px-6 py-3">รายได้</th>
                  <th className="px-6 py-3">จำนวนนัด</th>
                  <th className="px-6 py-3">รายได้เฉลี่ย/นัด</th>
                  <th className="px-6 py-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {timeSlotRevenue.map((slot, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{slot.time}</td>
                    <td className="px-6 py-4">฿{slot.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">{slot.appointments}</td>
                    <td className="px-6 py-4">฿{slot.avgRevenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        slot.revenue > 120000 ? 'bg-green-100 text-green-800' : 
                        slot.revenue > 100000 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {slot.revenue > 120000 ? 'สูง' : slot.revenue > 100000 ? 'ปานกลาง' : 'ต่ำ'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentRevenue;
