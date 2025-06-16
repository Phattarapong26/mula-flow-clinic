
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Phone, Mail, MapPin, AlertTriangle, FileText, Calendar, Receipt } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { mockPatients, mockTreatments, mockAppointments, mockInvoices } from '@/data/staffMockData';

const StaffPatientProfile = () => {
  const { id } = useParams();
  const patient = mockPatients.find(p => p.id === id);
  
  if (!patient) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">ไม่พบข้อมูลผู้ป่วย</p>
        <Link to="/staff/patients">
          <Button className="mt-4">กลับไปรายชื่อผู้ป่วย</Button>
        </Link>
      </div>
    );
  }

  const patientTreatments = mockTreatments.filter(t => t.customer_id === patient.id);
  const patientAppointments = mockAppointments.filter(a => a.customer_id === patient.id);
  const patientInvoices = mockInvoices.filter(i => i.customer_id === patient.id);

  const getGenderLabel = (gender: string) => {
    const labels = { male: 'ชาย', female: 'หญิง', other: 'อื่นๆ' };
    return labels[gender as keyof typeof labels] || gender;
  };

  const getAppointmentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { variant: 'default' as const, label: 'เสร็จสิ้น' };
      case 'booked':
        return { variant: 'secondary' as const, label: 'จองแล้ว' };
      case 'cancelled':
        return { variant: 'destructive' as const, label: 'ยกเลิก' };
      case 'no_show':
        return { variant: 'destructive' as const, label: 'ไม่มา' };
      default:
        return { variant: 'secondary' as const, label: status };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">โปรไฟล์ผู้ป่วย</h1>
          <p className="text-gray-600">ข้อมูลรายละเอียดผู้ป่วย</p>
        </div>
        <div className="flex gap-2">
          <Link to="/staff/patients">
            <Button variant="outline">กลับ</Button>
          </Link>
          <Button>แก้ไขข้อมูล</Button>
        </div>
      </div>

      {/* Patient Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            ข้อมูลส่วนตัว
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">{patient.name}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">เพศ:</span>
                  <Badge>{getGenderLabel(patient.gender)}</Badge>
                </div>
                <div>
                  <span className="font-medium">วันเกิด:</span>
                  <span className="ml-2">{new Date(patient.dob).toLocaleDateString('th-TH')}</span>
                  <span className="text-gray-500 ml-2">
                    (อายุ {new Date().getFullYear() - new Date(patient.dob).getFullYear()} ปี)
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">ข้อมูลการติดต่อ</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">ข้อมูลฉุกเฉิน</h4>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">ติดต่อฉุกเฉิน:</span>
                  <div className="text-sm text-gray-600">{patient.emergency_contact}</div>
                </div>
                <div>
                  <span className="font-medium">ลงทะเบียนเมื่อ:</span>
                  <div className="text-sm text-gray-600">
                    {new Date(patient.created_at).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            ข้อมูลทางการแพทย์
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">ประวัติการรักษา</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">
                {patient.medical_history || 'ไม่มีประวัติการรักษา'}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                ภูมิแพ้
              </h4>
              <p className={`p-3 rounded ${patient.allergies !== 'ไม่มี' ? 'bg-orange-50 text-orange-800' : 'bg-gray-50 text-gray-700'}`}>
                {patient.allergies || 'ไม่มี'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for History */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">นัดหมาย ({patientAppointments.length})</TabsTrigger>
          <TabsTrigger value="treatments">การรักษา ({patientTreatments.length})</TabsTrigger>
          <TabsTrigger value="invoices">ใบเสร็จ ({patientInvoices.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                ประวัตินัดหมาย
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientAppointments.map((appointment) => {
                  const statusInfo = getAppointmentStatusBadge(appointment.status);
                  return (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{appointment.type_name}</h4>
                          <p className="text-sm text-gray-600">{appointment.doctor_name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(appointment.scheduled_at).toLocaleDateString('th-TH')} เวลา {new Date(appointment.scheduled_at).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                          )}
                        </div>
                        <Badge variant={statusInfo.variant}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {patientAppointments.length === 0 && (
                  <p className="text-center text-gray-500 py-4">ไม่มีประวัตินัดหมาย</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                ประวัติการรักษา
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientTreatments.map((treatment) => (
                  <div key={treatment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{treatment.service_name}</h4>
                        <p className="text-sm text-gray-600">{treatment.doctor_name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(treatment.treatment_date).toLocaleDateString('th-TH')}
                        </p>
                        {treatment.notes && (
                          <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">{treatment.notes}</p>
                        )}
                      </div>
                      <Badge>{treatment.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}</Badge>
                    </div>
                  </div>
                ))}
                {patientTreatments.length === 0 && (
                  <p className="text-center text-gray-500 py-4">ไม่มีประวัติการรักษา</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                ประวัติใบเสร็จ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientInvoices.map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">ใบเสร็จ #{invoice.external_ref}</h4>
                        <p className="text-sm text-gray-600">{invoice.payment_method_name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(invoice.created_at).toLocaleDateString('th-TH')}
                        </p>
                        <div className="mt-2">
                          {invoice.items.map((item, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {item.service_name} x{item.quantity} = ฿{item.total_price.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">฿{invoice.total_amount.toLocaleString()}</div>
                        <Badge variant={invoice.payment_status === 'paid' ? 'default' : 'destructive'}>
                          {invoice.payment_status === 'paid' ? 'ชำระแล้ว' : 'รอชำระ'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                {patientInvoices.length === 0 && (
                  <p className="text-center text-gray-500 py-4">ไม่มีประวัติใบเสร็จ</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffPatientProfile;
