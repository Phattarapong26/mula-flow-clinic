
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, Plus, Search, Eye, Edit, Calendar, Phone, Mail, MapPin, AlertTriangle, Heart, FileText, ClipboardList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Patient {
  id: string;
  hn_number: string;
  title: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female';
  id_card_number: string;
  phone: string;
  email?: string;
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  medical_history: string[];
  allergies: string[];
  current_medications: string[];
  insurance_provider?: string;
  insurance_policy_number?: string;
  last_visit_date?: string;
  next_appointment_date?: string;
  prescription_history: PrescriptionRecord[];
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface PrescriptionRecord {
  id: string;
  date: string;
  od_sphere: string;
  od_cylinder: string;
  od_axis: string;
  os_sphere: string;
  os_cylinder: string;
  os_axis: string;
  add_power?: string;
  notes: string;
}

const StaffPatientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  // Mock data - optometry clinic patients
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "PAT001",
      hn_number: "HN2025001",
      title: "นาย",
      first_name: "สมชาย",
      last_name: "ใจดี",
      date_of_birth: "1985-03-15",
      gender: "male",
      id_card_number: "1234567890123",
      phone: "081-234-5678",
      email: "somchai@email.com",
      address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
      emergency_contact_name: "นางสาว สุชาดา ใจดี",
      emergency_contact_phone: "082-345-6789",
      medical_history: ["ความดันโลหิตสูง", "เบาหวาน"],
      allergies: ["ยาปฏิชีวนะ Penicillin"],
      current_medications: ["Metformin 500mg", "Amlodipine 5mg"],
      insurance_provider: "บริษัทประกันสุขภาพ ABC",
      insurance_policy_number: "ABC123456789",
      last_visit_date: "2025-06-10",
      next_appointment_date: "2025-07-10",
      prescription_history: [
        {
          id: "PRESC001",
          date: "2025-06-10",
          od_sphere: "-2.50",
          od_cylinder: "-0.75",
          od_axis: "180",
          os_sphere: "-2.25",
          os_cylinder: "-0.50",
          os_axis: "175",
          add_power: "+1.25",
          notes: "Progressive lenses แนะนำ"
        }
      ],
      status: "active",
      created_at: "2025-01-15T09:00:00Z",
      updated_at: "2025-06-10T14:30:00Z"
    },
    {
      id: "PAT002",
      hn_number: "HN2025002",
      title: "นางสาว",
      first_name: "วิภา",
      last_name: "สุขใส",
      date_of_birth: "1992-08-22",
      gender: "female",
      id_card_number: "9876543210987",
      phone: "089-876-5432",
      email: "vipa@email.com",
      address: "456 ซอยลาดพร้าว 101 แขวงคลองจั่น เขตบางกะปิ กรุงเทพมหานคร 10240",
      emergency_contact_name: "นาย ประยุทธ สุขใส",
      emergency_contact_phone: "088-765-4321",
      medical_history: [],
      allergies: [],
      current_medications: [],
      last_visit_date: "2025-06-16",
      prescription_history: [
        {
          id: "PRESC002",
          date: "2025-06-16",
          od_sphere: "-1.75",
          od_cylinder: "0.00",
          od_axis: "0",
          os_sphere: "-1.50",
          os_cylinder: "0.00",
          os_axis: "0",
          notes: "คอนแทคเลนส์ Daily disposable"
        }
      ],
      status: "active",
      created_at: "2025-02-20T10:15:00Z",
      updated_at: "2025-06-16T11:45:00Z"
    }
  ]);

  const [newPatient, setNewPatient] = useState({
    title: 'นาย',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'male' as Patient['gender'],
    id_card_number: '',
    phone: '',
    email: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    medical_history: '',
    allergies: '',
    current_medications: '',
    insurance_provider: '',
    insurance_policy_number: ''
  });

  const [newPrescription, setNewPrescription] = useState({
    od_sphere: '',
    od_cylinder: '',
    od_axis: '',
    os_sphere: '',
    os_cylinder: '',
    os_axis: '',
    add_power: '',
    notes: ''
  });

  const filteredPatients = patients.filter(patient => {
    const searchString = `${patient.hn_number} ${patient.first_name} ${patient.last_name} ${patient.phone}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'all' || patient.gender === genderFilter;
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const handleCreatePatient = () => {
    if (!newPatient.first_name || !newPatient.last_name || !newPatient.phone || !newPatient.date_of_birth) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    const patient: Patient = {
      id: `PAT${String(Date.now()).slice(-3)}`,
      hn_number: `HN2025${String(patients.length + 1).padStart(3, '0')}`,
      ...newPatient,
      medical_history: newPatient.medical_history ? newPatient.medical_history.split(',').map(s => s.trim()).filter(s => s) : [],
      allergies: newPatient.allergies ? newPatient.allergies.split(',').map(s => s.trim()).filter(s => s) : [],
      current_medications: newPatient.current_medications ? newPatient.current_medications.split(',').map(s => s.trim()).filter(s => s) : [],
      prescription_history: [],
      status: 'active' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setPatients([...patients, patient]);
    setNewPatient({
      title: 'นาย',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: 'male',
      id_card_number: '',
      phone: '',
      email: '',
      address: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      medical_history: '',
      allergies: '',
      current_medications: '',
      insurance_provider: '',
      insurance_policy_number: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "เพิ่มผู้ป่วยสำเร็จ",
      description: `ผู้ป่วย ${patient.first_name} ${patient.last_name} ถูกเพิ่มในระบบแล้ว`
    });
  };

  const handleAddPrescription = () => {
    if (!selectedPatient || (!newPrescription.od_sphere && !newPrescription.os_sphere)) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลค่าสายตาอย่างน้อยข้างหนึ่ง",
        variant: "destructive"
      });
      return;
    }

    const prescription: PrescriptionRecord = {
      id: `PRESC${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...newPrescription
    };

    setPatients(patients.map(patient => 
      patient.id === selectedPatient.id ? {
        ...patient,
        prescription_history: [...patient.prescription_history, prescription],
        updated_at: new Date().toISOString()
      } : patient
    ));

    setNewPrescription({
      od_sphere: '',
      od_cylinder: '',
      od_axis: '',
      os_sphere: '',
      os_cylinder: '',
      os_axis: '',
      add_power: '',
      notes: ''
    });
    setIsPrescriptionDialogOpen(false);
    
    toast({
      title: "บันทึกข้อมูลสายตาสำเร็จ",
      description: "ข้อมูลค่าสายตาถูกบันทึกแล้ว"
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getGenderText = (gender: Patient['gender']) => {
    return gender === 'male' ? 'ชาย' : 'หญิง';
  };

  const getStatusBadge = (status: Patient['status']) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      active: 'ใช้งาน',
      inactive: 'ไม่ใช้งาน'
    };
    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  // Summary statistics
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'active').length;
  const todayVisits = patients.filter(p => 
    p.last_visit_date === new Date().toISOString().split('T')[0]
  ).length;
  const upcomingAppointments = patients.filter(p => 
    p.next_appointment_date && new Date(p.next_appointment_date) > new Date()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ข้อมูลผู้ป่วย</h1>
          <p className="text-gray-600">จัดการข้อมูลและประวัติผู้ป่วย ({filteredPatients.length} ราย)</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                เพิ่มผู้ป่วยใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>เพิ่มผู้ป่วยใหม่</DialogTitle>
                <DialogDescription>
                  กรอกข้อมูลพื้นฐานของผู้ป่วย
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>คำนำหน้า</Label>
                    <Select value={newPatient.title} onValueChange={(value) => setNewPatient({...newPatient, title: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="นาย">นาย</SelectItem>
                        <SelectItem value="นาง">นาง</SelectItem>
                        <SelectItem value="นางสาว">นางสาว</SelectItem>
                        <SelectItem value="เด็กชาย">เด็กชาย</SelectItem>
                        <SelectItem value="เด็กหญิง">เด็กหญิง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">ชื่อ *</Label>
                    <Input
                      id="first_name"
                      value={newPatient.first_name}
                      onChange={(e) => setNewPatient({...newPatient, first_name: e.target.value})}
                      placeholder="ชื่อจริง"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">นามสกุล *</Label>
                    <Input
                      id="last_name"
                      value={newPatient.last_name}
                      onChange={(e) => setNewPatient({...newPatient, last_name: e.target.value})}
                      placeholder="นามสกุล"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date_of_birth">วันเกิด *</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={newPatient.date_of_birth}
                      onChange={(e) => setNewPatient({...newPatient, date_of_birth: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>เพศ</Label>
                    <Select value={newPatient.gender} onValueChange={(value: Patient['gender']) => setNewPatient({...newPatient, gender: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ชาย</SelectItem>
                        <SelectItem value="female">หญิง</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="id_card">เลขบัตรประชาชน</Label>
                    <Input
                      id="id_card"
                      value={newPatient.id_card_number}
                      onChange={(e) => setNewPatient({...newPatient, id_card_number: e.target.value})}
                      placeholder="1234567890123"
                      maxLength={13}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                    <Input
                      id="phone"
                      value={newPatient.phone}
                      onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">ที่อยู่</Label>
                  <Textarea
                    id="address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    placeholder="ที่อยู่ปัจจุบัน..."
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="emergency_name">ชื่อผู้ติดต่อฉุกเฉิน</Label>
                    <Input
                      id="emergency_name"
                      value={newPatient.emergency_contact_name}
                      onChange={(e) => setNewPatient({...newPatient, emergency_contact_name: e.target.value})}
                      placeholder="ชื่อญาติ"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emergency_phone">เบอร์ผู้ติดต่อฉุกเฉิน</Label>
                    <Input
                      id="emergency_phone"
                      value={newPatient.emergency_contact_phone}
                      onChange={(e) => setNewPatient({...newPatient, emergency_contact_phone: e.target.value})}
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="medical_history">ประวัติการเจ็บป่วย</Label>
                  <Textarea
                    id="medical_history"
                    value={newPatient.medical_history}
                    onChange={(e) => setNewPatient({...newPatient, medical_history: e.target.value})}
                    placeholder="ระบุโรคประจำตัว คั่นด้วยเครื่องหมายจุลภาค เช่น ความดันโลหิตสูง, เบาหวาน"
                    rows={2}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="allergies">ประวัติแพ้ยา/อาหาร</Label>
                  <Textarea
                    id="allergies"
                    value={newPatient.allergies}
                    onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                    placeholder="ระบุสิ่งที่แพ้ คั่นด้วยเครื่องหมายจุลภาค เช่น Penicillin, กุ้ง"
                    rows={2}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="medications">ยาที่ใช้ประจำ</Label>
                  <Textarea
                    id="medications"
                    value={newPatient.current_medications}
                    onChange={(e) => setNewPatient({...newPatient, current_medications: e.target.value})}
                    placeholder="ยาที่กำลังใช้ คั่นด้วยเครื่องหมายจุลภาค เช่น Metformin 500mg, Amlodipine 5mg"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="insurance_provider">บริษัทประกัน</Label>
                    <Input
                      id="insurance_provider"
                      value={newPatient.insurance_provider}
                      onChange={(e) => setNewPatient({...newPatient, insurance_provider: e.target.value})}
                      placeholder="ชื่อบริษัทประกัน"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="insurance_policy">เลขที่กรมธรรม์</Label>
                    <Input
                      id="insurance_policy"
                      value={newPatient.insurance_policy_number}
                      onChange={(e) => setNewPatient({...newPatient, insurance_policy_number: e.target.value})}
                      placeholder="หมายเลขกรมธรรม์"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleCreatePatient}>
                  เพิ่มผู้ป่วย
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalPatients}</div>
              <div className="text-sm text-gray-600">ผู้ป่วยทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activePatients}</div>
              <div className="text-sm text-gray-600">ผู้ป่วยใช้งาน</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{todayVisits}</div>
              <div className="text-sm text-gray-600">มาตรวจวันนี้</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{upcomingAppointments}</div>
              <div className="text-sm text-gray-600">นัดที่จะมา</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            รายชื่อผู้ป่วย
          </CardTitle>
          <CardDescription>จัดการข้อมูลและประวัติผู้ป่วย</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหา HN, ชื่อ, นามสกุล, หรือเบอร์โทร..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="เพศ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">เพศทั้งหมด</SelectItem>
                <SelectItem value="male">ชาย</SelectItem>
                <SelectItem value="female">หญิง</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="active">ใช้งาน</SelectItem>
                <SelectItem value="inactive">ไม่ใช้งาน</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {patient.title} {patient.first_name} {patient.last_name}
                      </h3>
                      {getStatusBadge(patient.status)}
                      {patient.medical_history.length > 0 && (
                        <Badge variant="outline" className="bg-red-50 text-red-600">
                          <Heart className="h-3 w-3 mr-1" />
                          มีประวัติ
                        </Badge>
                      )}
                      {patient.allergies.length > 0 && (
                        <Badge variant="outline" className="bg-orange-50 text-orange-600">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          แพ้ยา
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium">HN:</span> {patient.hn_number}
                      </div>
                      <div>
                        <span className="font-medium">อายุ:</span> {calculateAge(patient.date_of_birth)} ปี ({getGenderText(patient.gender)})
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span>{patient.phone}</span>
                      </div>
                      <div>
                        <span className="font-medium">มาครั้งล่าสุด:</span> {patient.last_visit_date ? new Date(patient.last_visit_date).toLocaleDateString('th-TH') : 'ยังไม่เคย'}
                      </div>
                    </div>

                    {patient.next_appointment_date && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>นัดหมายครั้งถัดไป: {new Date(patient.next_appointment_date).toLocaleDateString('th-TH')}</span>
                      </div>
                    )}

                    {patient.prescription_history.length > 0 && (
                      <div className="p-3 bg-gray-50 rounded-lg mb-3">
                        <div className="text-sm font-medium mb-1">ข้อมูลสายตาล่าสุด:</div>
                        {(() => {
                          const latest = patient.prescription_history[patient.prescription_history.length - 1];
                          return (
                            <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
                              <div>ขวา (OD): SPH {latest.od_sphere} CYL {latest.od_cylinder} AX {latest.od_axis}</div>
                              <div>ซ้าย (OS): SPH {latest.os_sphere} CYL {latest.os_cylinder} AX {latest.os_axis}</div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {patient.address && (
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                        <span className="line-clamp-2">{patient.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog open={isViewDialogOpen && selectedPatient?.id === patient.id} onOpenChange={(open) => {
                      setIsViewDialogOpen(open);
                      if (!open) setSelectedPatient(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          ดู
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            {patient.title} {patient.first_name} {patient.last_name}
                          </DialogTitle>
                          <DialogDescription>
                            HN: {patient.hn_number} | อายุ: {calculateAge(patient.date_of_birth)} ปี
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label>วันเกิด:</Label>
                              <p>{new Date(patient.date_of_birth).toLocaleDateString('th-TH')}</p>
                            </div>
                            <div>
                              <Label>เพศ:</Label>
                              <p>{getGenderText(patient.gender)}</p>
                            </div>
                            <div>
                              <Label>เบอร์โทรศัพท์:</Label>
                              <p>{patient.phone}</p>
                            </div>
                            <div>
                              <Label>อีเมล:</Label>
                              <p>{patient.email || '-'}</p>
                            </div>
                            <div className="col-span-2">
                              <Label>เลขบัตรประชาชน:</Label>
                              <p>{patient.id_card_number || '-'}</p>
                            </div>
                            <div className="col-span-2">
                              <Label>ที่อยู่:</Label>
                              <p className="text-sm text-gray-600">{patient.address || '-'}</p>
                            </div>
                          </div>

                          {(patient.emergency_contact_name || patient.emergency_contact_phone) && (
                            <div className="border-t pt-4">
                              <Label className="text-base font-medium">ผู้ติดต่อฉุกเฉิน:</Label>
                              <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                <div>
                                  <Label>ชื่อ:</Label>
                                  <p>{patient.emergency_contact_name || '-'}</p>
                                </div>
                                <div>
                                  <Label>เบอร์โทร:</Label>
                                  <p>{patient.emergency_contact_phone || '-'}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {patient.medical_history.length > 0 && (
                            <div className="border-t pt-4">
                              <Label className="text-base font-medium text-red-600">ประวัติการเจ็บป่วย:</Label>
                              <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                                {patient.medical_history.map((condition, index) => (
                                  <li key={index}>{condition}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {patient.allergies.length > 0 && (
                            <div className="border-t pt-4">
                              <Label className="text-base font-medium text-orange-600">ประวัติแพ้ยา/อาหาร:</Label>
                              <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                                {patient.allergies.map((allergy, index) => (
                                  <li key={index}>{allergy}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {patient.current_medications.length > 0 && (
                            <div className="border-t pt-4">
                              <Label className="text-base font-medium">ยาที่ใช้ประจำ:</Label>
                              <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                                {patient.current_medications.map((medication, index) => (
                                  <li key={index}>{medication}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {(patient.insurance_provider || patient.insurance_policy_number) && (
                            <div className="border-t pt-4">
                              <Label className="text-base font-medium">ข้อมูลประกัน:</Label>
                              <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                <div>
                                  <Label>บริษัท:</Label>
                                  <p>{patient.insurance_provider || '-'}</p>
                                </div>
                                <div>
                                  <Label>เลขกรมธรรม์:</Label>
                                  <p>{patient.insurance_policy_number || '-'}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {patient.prescription_history.length > 0 && (
                            <div className="border-t pt-4">
                              <Label className="text-base font-medium">ประวัติการตรวจสายตา:</Label>
                              <div className="space-y-3 mt-2">
                                {patient.prescription_history.slice(-3).reverse().map((prescription) => (
                                  <div key={prescription.id} className="border rounded-lg p-3 bg-gray-50">
                                    <div className="text-sm font-medium mb-2">
                                      วันที่: {new Date(prescription.date).toLocaleDateString('th-TH')}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <strong>ตาขวา (OD):</strong><br />
                                        SPH: {prescription.od_sphere} CYL: {prescription.od_cylinder} AX: {prescription.od_axis}
                                      </div>
                                      <div>
                                        <strong>ตาซ้าย (OS):</strong><br />
                                        SPH: {prescription.os_sphere} CYL: {prescription.os_cylinder} AX: {prescription.os_axis}
                                      </div>
                                    </div>
                                    {prescription.add_power && (
                                      <div className="text-sm mt-1">
                                        <strong>ADD:</strong> {prescription.add_power}
                                      </div>
                                    )}
                                    {prescription.notes && (
                                      <div className="text-sm text-gray-600 mt-2">
                                        <strong>หมายเหตุ:</strong> {prescription.notes}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            ปิด
                          </Button>
                          <Link to={`/staff/appointments/create?patient_id=${patient.id}`}>
                            <Button variant="outline">
                              <Calendar className="h-4 w-4 mr-1" />
                              นัดหมาย
                            </Button>
                          </Link>
                          <Button onClick={() => {
                            setIsViewDialogOpen(false);
                            setIsPrescriptionDialogOpen(true);
                          }}>
                            <ClipboardList className="h-4 w-4 mr-1" />
                            บันทึกค่าสายตา
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={isPrescriptionDialogOpen && selectedPatient?.id === patient.id} onOpenChange={(open) => {
                      setIsPrescriptionDialogOpen(open);
                      if (!open) {
                        setSelectedPatient(null);
                        setNewPrescription({
                          od_sphere: '',
                          od_cylinder: '',
                          od_axis: '',
                          os_sphere: '',
                          os_cylinder: '',
                          os_axis: '',
                          add_power: '',
                          notes: ''
                        });
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <ClipboardList className="h-4 w-4 mr-1" />
                          ตรวจสายตา
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>บันทึกข้อมูลการตรวจสายตา</DialogTitle>
                          <DialogDescription>
                            ผู้ป่วย: {patient.title} {patient.first_name} {patient.last_name} (HN: {patient.hn_number})
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid gap-4">
                            <div>
                              <Label className="text-base font-medium">ตาขวา (OD - Oculus Dexter)</Label>
                              <div className="grid grid-cols-3 gap-3 mt-2">
                                <div className="grid gap-2">
                                  <Label htmlFor="od_sphere">Sphere (SPH)</Label>
                                  <Input
                                    id="od_sphere"
                                    value={newPrescription.od_sphere}
                                    onChange={(e) => setNewPrescription({...newPrescription, od_sphere: e.target.value})}
                                    placeholder="เช่น -2.50"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="od_cylinder">Cylinder (CYL)</Label>
                                  <Input
                                    id="od_cylinder"
                                    value={newPrescription.od_cylinder}
                                    onChange={(e) => setNewPrescription({...newPrescription, od_cylinder: e.target.value})}
                                    placeholder="เช่น -0.75"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="od_axis">Axis (AX)</Label>
                                  <Input
                                    id="od_axis"
                                    value={newPrescription.od_axis}
                                    onChange={(e) => setNewPrescription({...newPrescription, od_axis: e.target.value})}
                                    placeholder="เช่น 180"
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <Label className="text-base font-medium">ตาซ้าย (OS - Oculus Sinister)</Label>
                              <div className="grid grid-cols-3 gap-3 mt-2">
                                <div className="grid gap-2">
                                  <Label htmlFor="os_sphere">Sphere (SPH)</Label>
                                  <Input
                                    id="os_sphere"
                                    value={newPrescription.os_sphere}
                                    onChange={(e) => setNewPrescription({...newPrescription, os_sphere: e.target.value})}
                                    placeholder="เช่น -2.25"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="os_cylinder">Cylinder (CYL)</Label>
                                  <Input
                                    id="os_cylinder"
                                    value={newPrescription.os_cylinder}
                                    onChange={(e) => setNewPrescription({...newPrescription, os_cylinder: e.target.value})}
                                    placeholder="เช่น -0.50"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="os_axis">Axis (AX)</Label>
                                  <Input
                                    id="os_axis"
                                    value={newPrescription.os_axis}
                                    onChange={(e) => setNewPrescription({...newPrescription, os_axis: e.target.value})}
                                    placeholder="เช่น 175"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="add_power">ADD Power (สำหรับแว่นสายตาสองชั้น)</Label>
                              <Input
                                id="add_power"
                                value={newPrescription.add_power}
                                onChange={(e) => setNewPrescription({...newPrescription, add_power: e.target.value})}
                                placeholder="เช่น +1.25"
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="prescription_notes">หมายเหตุ</Label>
                              <Textarea
                                id="prescription_notes"
                                value={newPrescription.notes}
                                onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
                                placeholder="หมายเหตุเพิ่มเติม เช่น แนะนำให้ใช้ Progressive lenses"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsPrescriptionDialogOpen(false)}>
                            ยกเลิก
                          </Button>
                          <Button onClick={handleAddPrescription}>
                            บันทึกข้อมูล
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">
                {searchTerm || genderFilter !== 'all' || statusFilter !== 'all' ? 'ไม่พบผู้ป่วยที่ค้นหา' : 'ยังไม่มีข้อมูลผู้ป่วย'}
              </h3>
              <p className="text-sm">
                {searchTerm || genderFilter !== 'all' || statusFilter !== 'all' ? 
                  'ลองเปลี่ยนเงื่อนไขการค้นหา' : 
                  'เริ่มต้นโดยการเพิ่มผู้ป่วยใหม่'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPatientsList;
