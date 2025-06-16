import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Plus, Search, Clock, User, Phone, Eye, Edit, CheckCircle, Video, MessageSquare, Bell } from 'lucide-react';
import { mockAppointments, MockAppointment } from '@/data/staffMockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StaffAppointmentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form states
  const [newAppointment, setNewAppointment] = useState({
    customer_name: '',
    customer_phone: '',
    doctor_name: '',
    service_type: '',
    appointment_date: '',
    appointment_time: '',
    duration_minutes: 60,
    notes: ''
  });

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      const appointmentDate = new Date(appointment.appointment_date).toDateString();
      const today = new Date().toDateString();
      matchesDate = appointmentDate === today;
    } else if (dateFilter === 'tomorrow') {
      const appointmentDate = new Date(appointment.appointment_date).toDateString();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      matchesDate = appointmentDate === tomorrow.toDateString();
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleCreateAppointment = () => {
    if (!newAppointment.customer_name || !newAppointment.customer_phone || !newAppointment.doctor_name || 
        !newAppointment.service_type || !newAppointment.appointment_date || !newAppointment.appointment_time) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบทุกช่อง",
        variant: "destructive"
      });
      return;
    }

    const appointment: MockAppointment = {
      id: `APT${Date.now()}`,
      patientName: newAppointment.customer_name,
      doctorName: newAppointment.doctor_name,
      date: newAppointment.appointment_date,
      time: newAppointment.appointment_time,
      service: newAppointment.service_type,
      status: 'booked',
      customerName: newAppointment.customer_name,
      customerPhone: newAppointment.customer_phone,
      branch: 'สาขาหลัก',
      customer_id: `CUS${Date.now()}`,
      doctor_id: `DOC${Date.now()}`,
      customer_name: newAppointment.customer_name,
      doctor_name: newAppointment.doctor_name,
      service_type: newAppointment.service_type,
      type_name: newAppointment.service_type,
      appointment_date: newAppointment.appointment_date,
      appointment_time: newAppointment.appointment_time,
      scheduled_at: new Date(`${newAppointment.appointment_date}T${newAppointment.appointment_time}`).toISOString(),
      duration_minutes: newAppointment.duration_minutes,
      notes: newAppointment.notes,
      external_ref: `APT${Date.now()}`,
      cost: 2500,
      created_at: new Date().toISOString()
    };

    setAppointments([appointment, ...appointments]);
    setNewAppointment({
      customer_name: '',
      customer_phone: '',
      doctor_name: '',
      service_type: '',
      appointment_date: '',
      appointment_time: '',
      duration_minutes: 60,
      notes: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "สร้างนัดหมายสำเร็จ",
      description: `นัดหมายสำหรับ ${appointment.customer_name} ถูกจองแล้ว`
    });
  };

  const handleUpdateStatus = (appointmentId, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
    ));
    
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `สถานะนัดหมายถูกเปลี่ยนเป็น ${getStatusText(newStatus)}`
    });
  };

  const handleSendReminder = (appointment) => {
    toast({
      title: "ส่งการแจ้งเตือนแล้ว",
      description: `ส่งการแจ้งเตือนให้ ${appointment.customer_name} ผ่าน SMS และ Line`
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      booked: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      confirmed: 'bg-green-100 text-green-800 hover:bg-green-200',
      completed: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      cancelled: 'bg-red-100 text-red-800 hover:bg-red-200',
      no_show: 'bg-orange-100 text-orange-800 hover:bg-orange-200'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const labels = {
      booked: 'จองแล้ว',
      confirmed: 'ยืนยันแล้ว',
      completed: 'เสร็จสิ้น',
      cancelled: 'ยกเลิก',
      no_show: 'ไม่มาตามนัด'
    };
    return labels[status] || status;
  };

  // Summary statistics
  const totalAppointments = appointments.length;
  const todayAppointments = appointments.filter(a => {
    const appointmentDate = new Date(a.appointment_date).toDateString();
    const today = new Date().toDateString();
    return appointmentDate === today;
  }).length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">รายการนัดหมาย</h1>
          <p className="text-gray-600">จัดการและติดตามนัดหมายผู้ป่วย ({filteredAppointments.length} รายการ)</p>
        </div>
        <div className="flex gap-2">
          <Link to="/staff/appointments/calendar">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              ปฏิทิน
            </Button>
          </Link>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                นัดใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>จองนัดหมายใหม่</DialogTitle>
                <DialogDescription>
                  กรอกข้อมูลการจองนัดหมายสำหรับผู้ป่วย
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer_name">ชื่อผู้ป่วย *</Label>
                    <Input
                      id="customer_name"
                      value={newAppointment.customer_name}
                      onChange={(e) => setNewAppointment({...newAppointment, customer_name: e.target.value})}
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customer_phone">เบอร์โทร *</Label>
                    <Input
                      id="customer_phone"
                      value={newAppointment.customer_phone}
                      onChange={(e) => setNewAppointment({...newAppointment, customer_phone: e.target.value})}
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>แพทย์ *</Label>
                    <Select value={newAppointment.doctor_name} onValueChange={(value) => setNewAppointment({...newAppointment, doctor_name: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกแพทย์" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="นพ.สมชาย ใสใส">นพ.สมชาย ใสใส</SelectItem>
                        <SelectItem value="นพ.สุดา งดงาม">นพ.สุดา งดงาม</SelectItem>
                        <SelectItem value="นพ.ประเสริฐ ดูแล">นพ.ประเสริฐ ดูแล</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>บริการ *</Label>
                    <Select value={newAppointment.service_type} onValueChange={(value) => setNewAppointment({...newAppointment, service_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกบริการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ตรวจวัดสายตา">ตรวจวัดสายตา</SelectItem>
                        <SelectItem value="ตรวจสายตาเด็ก">ตรวจสายตาเด็ก</SelectItem>
                        <SelectItem value="ตรวจโรคตา">ตรวจโรคตา</SelectItem>
                        <SelectItem value="ตรวจต่อคอนแทคเลนส์">ตรวจต่อคอนแทคเลนส์</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="appointment_date">วันที่ *</Label>
                    <Input
                      id="appointment_date"
                      type="date"
                      value={newAppointment.appointment_date}
                      onChange={(e) => setNewAppointment({...newAppointment, appointment_date: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="appointment_time">เวลา *</Label>
                    <Input
                      id="appointment_time"
                      type="time"
                      value={newAppointment.appointment_time}
                      onChange={(e) => setNewAppointment({...newAppointment, appointment_time: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration_minutes">ระยะเวลา (นาที)</Label>
                    <Select 
                      value={newAppointment.duration_minutes.toString()} 
                      onValueChange={(value) => setNewAppointment({...newAppointment, duration_minutes: parseInt(value)})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 นาที</SelectItem>
                        <SelectItem value="45">45 นาที</SelectItem>
                        <SelectItem value="60">60 นาที</SelectItem>
                        <SelectItem value="90">90 นาที</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">หมายเหตุ</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    placeholder="หมายเหตุเพิ่มเติม..."
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleCreateAppointment}>
                  จองนัดหมาย
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalAppointments}</div>
              <div className="text-sm text-gray-600">นัดทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{todayAppointments}</div>
              <div className="text-sm text-gray-600">วันนี้</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{confirmedAppointments}</div>
              <div className="text-sm text-gray-600">ยืนยันแล้ว</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{completedAppointments}</div>
              <div className="text-sm text-gray-600">เสร็จสิ้น</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            รายการนัดหมายทั้งหมด
          </CardTitle>
          <CardDescription>จัดการนัดหมายและติดตามสถานะ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหาชื่อผู้ป่วย, หมอ, หรือบริการ..." 
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
                <SelectItem value="booked">จองแล้ว</SelectItem>
                <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                <SelectItem value="cancelled">ยกเลิก</SelectItem>
                <SelectItem value="no_show">ไม่มาตามนัด</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกวันที่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">วันที่ทั้งหมด</SelectItem>
                <SelectItem value="today">วันนี้</SelectItem>
                <SelectItem value="tomorrow">พรุ่งนี้</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{appointment.customer_name}</h3>
                      <Badge className={getStatusBadge(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {appointment.external_ref}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{appointment.doctor_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{new Date(appointment.appointment_date).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{appointment.appointment_time} ({appointment.duration_minutes} นาที)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <span>{appointment.service_type}</span>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="p-3 bg-gray-50 rounded-lg mb-3">
                        <p className="text-gray-600 text-sm">{appointment.notes}</p>
                      </div>
                    )}
                    
                    {appointment.cost && (
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-green-600">
                          ค่าบริการ: ฿{appointment.cost.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendReminder(appointment)}
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      แจ้งเตือน
                    </Button>
                    
                    <Dialog open={isViewDialogOpen && selectedAppointment?.id === appointment.id} onOpenChange={(open) => {
                      setIsViewDialogOpen(open);
                      if (!open) setSelectedAppointment(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          ดู
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>รายละเอียดนัดหมาย</DialogTitle>
                          <DialogDescription>
                            ข้อมูลนัดหมาย {selectedAppointment?.external_ref}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Badge className={getStatusBadge(selectedAppointment?.status)}>
                              {getStatusText(selectedAppointment?.status)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label>ผู้ป่วย:</Label>
                              <p className="font-medium">{selectedAppointment?.customer_name}</p>
                            </div>
                            <div>
                              <Label>แพทย์:</Label>
                              <p>{selectedAppointment?.doctor_name}</p>
                            </div>
                            <div>
                              <Label>บริการ:</Label>
                              <p>{selectedAppointment?.service_type}</p>
                            </div>
                            <div>
                              <Label>ค่าบริการ:</Label>
                              <p className="text-green-600 font-medium">฿{selectedAppointment?.cost?.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>วันที่:</Label>
                              <p>{selectedAppointment && new Date(selectedAppointment.appointment_date).toLocaleDateString('th-TH')}</p>
                            </div>
                            <div>
                              <Label>เวลา:</Label>
                              <p>{selectedAppointment?.appointment_time} ({selectedAppointment?.duration_minutes} นาที)</p>
                            </div>
                          </div>
                          {selectedAppointment?.notes && (
                            <div className="grid gap-2">
                              <Label>หมายเหตุ:</Label>
                              <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded">{selectedAppointment.notes}</p>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            ปิด
                          </Button>
                          <Button onClick={() => {
                            setIsViewDialogOpen(false);
                            setIsRescheduleDialogOpen(true);
                          }}>
                            <Calendar className="h-4 w-4 mr-1" />
                            เลื่อนนัด
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const nextStatus = appointment.status === 'booked' ? 'confirmed' : 
                                         appointment.status === 'confirmed' ? 'completed' : 'booked';
                        handleUpdateStatus(appointment.id, nextStatus);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {appointment.status === 'booked' ? 'ยืนยัน' : 
                       appointment.status === 'confirmed' ? 'เสร็จ' : 'เปิด'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? 'ไม่พบนัดหมายที่ค้นหา' : 'ยังไม่มีนัดหมาย'}
              </h3>
              <p className="text-sm">
                {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? 
                  'ลองเปลี่ยนเงื่อนไขการค้นหา' : 
                  'เริ่มต้นโดยการจองนัดหมายใหม่'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffAppointmentsList;
