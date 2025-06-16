
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { mockAppointments } from '@/data/staffMockData';
import { Link } from 'react-router-dom';

const StaffAppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const calendarDays = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return mockAppointments.filter(apt => {
      const aptDate = new Date(apt.scheduled_at);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'no_show': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'booked': return 'จองแล้ว';
      case 'completed': return 'เสร็จสิ้น';
      case 'cancelled': return 'ยกเลิก';
      case 'no_show': return 'ไม่มา';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ปฏิทินนัดหมาย</h1>
          <p className="text-gray-600">ดูนัดหมายในรูปแบบปฏิทิน</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={goToToday} variant="outline">วันนี้</Button>
          <Link to="/staff/appointments/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              จองนัดใหม่
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {currentDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long' })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map(day => (
                  <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const appointments = getAppointmentsForDate(day);
                  const isCurrentMonth = day.getMonth() === month;
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate?.toDateString() === day.toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] p-1 border rounded cursor-pointer transition-colors ${
                        isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                      } ${isToday ? 'ring-2 ring-blue-500' : ''} ${
                        isSelected ? 'bg-blue-50' : ''
                      } hover:bg-gray-50`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`text-sm font-medium ${
                        isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                      } ${isToday ? 'text-blue-600' : ''}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1 mt-1">
                        {appointments.slice(0, 2).map((apt, aptIndex) => (
                          <div
                            key={aptIndex}
                            className={`text-xs p-1 rounded text-white ${getStatusColor(apt.status)}`}
                            title={`${apt.customer_name} - ${apt.type_name}`}
                          >
                            {apt.customer_name.substring(0, 8)}...
                          </div>
                        ))}
                        {appointments.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{appointments.length - 2} อื่นๆ
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>จองแล้ว</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>เสร็จสิ้น</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>ไม่มา</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>ยกเลิก</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate 
                  ? selectedDate.toLocaleDateString('th-TH', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'เลือกวันที่เพื่อดูรายละเอียด'
                }
              </CardTitle>
              <CardDescription>
                {selectedDateAppointments.length > 0 
                  ? `มีนัดหมาย ${selectedDateAppointments.length} รายการ`
                  : 'ไม่มีนัดหมาย'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedDateAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{appointment.customer_name}</h4>
                        <p className="text-xs text-gray-600">{appointment.type_name}</p>
                      </div>
                      <Badge className={getStatusColor(appointment.status) + ' text-white text-xs'}>
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>เวลา: {new Date(appointment.scheduled_at).toLocaleTimeString('th-TH', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</div>
                      <div>หมอ: {appointment.doctor_name}</div>
                      <div>ระยะเวลา: {appointment.duration_minutes} นาที</div>
                      {appointment.notes && (
                        <div className="text-gray-500">หมายเหตุ: {appointment.notes}</div>
                      )}
                    </div>
                  </div>
                ))}
                
                {selectedDate && selectedDateAppointments.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <p>ไม่มีนัดหมายในวันนี้</p>
                    <Link to="/staff/appointments/create">
                      <Button size="sm" className="mt-2">เพิ่มนัดหมาย</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffAppointmentCalendar;
