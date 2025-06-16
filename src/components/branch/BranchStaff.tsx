import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, Edit, Eye, Phone, Mail, Calendar, Award, UserCheck, UserX, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { branchService, BranchStaff, CreateStaffData } from '@/services/branchService';
import { z } from 'zod';
import DOMPurify from 'dompurify';

// Validation schema for staff form
const staffSchema = z.object({
  branchId: z.string().min(1, "Branch is required"),
  name: z.string().min(1, "Name is required"),
  position: z.enum(['doctor', 'optometrist', 'nurse', 'receptionist', 'technician', 'manager']),
  department: z.enum(['medical', 'customer_service', 'administration', 'technical']),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  hire_date: z.string(),
  salary: z.number().min(0, "Salary must be positive"),
  qualifications: z.string(),
  performance_score: z.number().min(0).max(100)
});

const BranchStaffComponent = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<BranchStaff | null>(null);
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [staff, setStaff] = useState<BranchStaff[]>([]);
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);

  const [newStaff, setNewStaff] = useState<CreateStaffData>({
    branchId: '',
    name: '',
    position: 'receptionist',
    department: 'customer_service',
    email: '',
    phone: '',
    hire_date: new Date().toISOString().split('T')[0],
    salary: 0,
    qualifications: '',
    performance_score: 80
  });

  useEffect(() => {
    fetchBranches();
    fetchStaff();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await branchService.getBranches();
      setBranches(response.data.map(branch => ({
        id: branch.id,
        name: branch.name
      })));
    } catch (err) {
      setError('Failed to fetch branches');
      toast({
        title: "Error",
        description: "Failed to fetch branches. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await branchService.getBranchStaff(filterBranch === 'all' ? undefined : filterBranch);
      setStaff(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch staff data');
      toast({
        title: "Error",
        description: "Failed to fetch staff data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaff = async () => {
    try {
      // Validate form data
      const validatedData = staffSchema.parse(newStaff);
      
      // Sanitize input data
      const sanitizedData: CreateStaffData = {
        branchId: validatedData.branchId,
        name: DOMPurify.sanitize(validatedData.name),
        position: validatedData.position,
        department: validatedData.department,
        email: DOMPurify.sanitize(validatedData.email),
        phone: DOMPurify.sanitize(validatedData.phone),
        hire_date: validatedData.hire_date,
        salary: validatedData.salary,
        qualifications: DOMPurify.sanitize(validatedData.qualifications),
        performance_score: validatedData.performance_score
      };

      // Create staff member
      await branchService.createStaff(sanitizedData);
      
      // Refresh staff list
      await fetchStaff();
      
      // Reset form and close dialog
      setNewStaff({
        branchId: '',
        name: '',
        position: 'receptionist',
        department: 'customer_service',
        email: '',
        phone: '',
        hire_date: new Date().toISOString().split('T')[0],
        salary: 0,
        qualifications: '',
        performance_score: 80
      });
      setIsCreateDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Staff member created successfully"
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create staff member. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const getPositionText = (position: BranchStaff['position']) => {
    const labels = {
      doctor: 'Doctor',
      optometrist: 'Optometrist',
      nurse: 'Nurse',
      receptionist: 'Receptionist',
      technician: 'Technician',
      manager: 'Manager'
    };
    return labels[position];
  };

  const getDepartmentText = (department: BranchStaff['department']) => {
    const labels = {
      medical: 'Medical Department',
      customer_service: 'Customer Service',
      administration: 'Administration',
      technical: 'Technical'
    };
    return labels[department];
  };

  const getStatusText = (status: BranchStaff['status']) => {
    const labels = {
      active: 'Active',
      inactive: 'Inactive',
      on_leave: 'On Leave'
    };
    return labels[status];
  };

  const filteredStaff = staff.filter(member => {
    const matchesBranch = filterBranch === 'all' || member.branchId === filterBranch;
    const matchesPosition = filterPosition === 'all' || member.position === filterPosition;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    return matchesBranch && matchesPosition && matchesStatus;
  });

  // Summary statistics
  const totalStaff = filteredStaff.length;
  const activeStaff = filteredStaff.filter(s => s.status === 'active').length;
  const averagePerformance = filteredStaff.length > 0 
    ? filteredStaff.reduce((sum, s) => sum + s.performance_score, 0) / filteredStaff.length 
    : 0;
  const totalSalary = filteredStaff.reduce((sum, s) => sum + s.salary, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Staff Data</h3>
        <p className="text-gray-600">{error}</p>
        <Button onClick={fetchStaff} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">พนักงานแยกสาขา</h1>
          <p className="text-gray-600">จัดการข้อมูลพนักงานและติดตามผลงาน</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มพนักงาน
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>เพิ่มพนักงานใหม่</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="branchId">สาขา *</Label>
                  <Select value={newStaff.branchId} onValueChange={(value) => setNewStaff({...newStaff, branchId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกสาขา" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                    placeholder="ชื่อ-นามสกุล"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>ตำแหน่ง *</Label>
                  <Select value={newStaff.position} onValueChange={(value: BranchStaff['position']) => setNewStaff({...newStaff, position: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="optometrist">Optometrist</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="technician">Technician</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>แผนก *</Label>
                  <Select value={newStaff.department} onValueChange={(value: BranchStaff['department']) => setNewStaff({...newStaff, department: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Department</SelectItem>
                      <SelectItem value="customer_service">Customer Service</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">อีเมล *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    placeholder="example@visioncare.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                  <Input
                    id="phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                    placeholder="081-234-5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="hire_date">วันที่เริ่มงาน</Label>
                  <Input
                    id="hire_date"
                    type="date"
                    value={newStaff.hire_date}
                    onChange={(e) => setNewStaff({...newStaff, hire_date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary">เงินเดือน (บาท)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={newStaff.salary}
                    onChange={(e) => setNewStaff({...newStaff, salary: parseFloat(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="qualifications">คุณวุฒิ/ใบประกอบวิชาชีพ</Label>
                <Textarea
                  id="qualifications"
                  value={newStaff.qualifications}
                  onChange={(e) => setNewStaff({...newStaff, qualifications: e.target.value})}
                  placeholder="คุณวุฒิ/ใบประกอบวิชาชีพ (คั่นด้วยเครื่องหมายจุลภาค)"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="performance_score">คะแนนประเมินผลงาน (0-100)</Label>
                <Input
                  id="performance_score"
                  type="number"
                  min="0"
                  max="100"
                  value={newStaff.performance_score}
                  onChange={(e) => setNewStaff({...newStaff, performance_score: parseInt(e.target.value) || 80})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>ยกเลิก</Button>
              <Button onClick={handleCreateStaff}>บันทึก</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">จำนวนพนักงานรวม</p>
                <p className="text-2xl font-bold">{totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ปฏิบัติงาน</p>
                <p className="text-2xl font-bold text-green-600">{activeStaff}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold text-purple-600">{averagePerformance.toFixed(1)}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เงินเดือนรวม</p>
                <p className="text-2xl font-bold text-orange-600">฿{totalSalary.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="สาขาทั้งหมด" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สาขาทั้งหมด</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="ตำแหน่งทั้งหมด" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ตำแหน่งทั้งหมด</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="optometrist">Optometrist</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="สถานะทั้งหมด" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            รายชื่อพนักงาน ({filteredStaff.length} คน)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStaff.map((member) => (
              <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <Badge variant="outline">{getPositionText(member.position)}</Badge>
                      <Badge className={
                        member.status === 'active' ? 'bg-green-100 text-green-800' :
                        member.status === 'on_leave' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {member.status === 'active' ? (
                          <UserCheck className="h-3 w-3 mr-1" />
                        ) : (
                          <UserX className="h-3 w-3 mr-1" />
                        )}
                        {getStatusText(member.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium">สาขา:</span> {member.branchName}
                      </div>
                      <div>
                        <span className="font-medium">แผนก:</span> {getDepartmentText(member.department)}
                      </div>
                      <div>
                        <span className="font-medium">เงินเดือน:</span> ฿{member.salary.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">คะแนนผลงาน:</span> {member.performance_score}/100
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>เริ่มงาน: {new Date(member.hire_date).toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>

                    {member.qualifications.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">คุณวุฒิ/ใบประกอบวิชาชีพ:</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.qualifications.map((qual, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog open={isViewDialogOpen && selectedStaff?.id === member.id} onOpenChange={(open) => {
                      setIsViewDialogOpen(open);
                      if (!open) setSelectedStaff(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedStaff(member)}>
                          <Eye className="h-4 w-4 mr-1" />
                          ดูรายละเอียด
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>ข้อมูลพนักงาน</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center border-b pb-4">
                            <h2 className="text-xl font-bold">{member.name}</h2>
                            <p className="text-gray-600">{getPositionText(member.position)}</p>
                            <Badge className={
                              member.status === 'active' ? 'bg-green-100 text-green-800' :
                              member.status === 'on_leave' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {getStatusText(member.status)}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label>รหัสพนักงาน:</Label>
                              <p>{member.id}</p>
                            </div>
                            <div>
                              <Label>สาขา:</Label>
                              <p>{member.branchName}</p>
                            </div>
                            <div>
                              <Label>แผนก:</Label>
                              <p>{getDepartmentText(member.department)}</p>
                            </div>
                            <div>
                              <Label>วันที่เริ่มงาน:</Label>
                              <p>{new Date(member.hire_date).toLocaleDateString('th-TH')}</p>
                            </div>
                            <div>
                              <Label>เงินเดือน:</Label>
                              <p>฿{member.salary.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>คะแนนผลงาน:</Label>
                              <p>{member.performance_score}/100</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>ข้อมูลติดต่อ:</Label>
                            <div className="p-3 bg-gray-50 rounded space-y-2">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span>{member.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span>{member.phone}</span>
                              </div>
                            </div>
                          </div>

                          {member.qualifications.length > 0 && (
                            <div className="space-y-2">
                              <Label>คุณวุฒิ/ใบประกอบวิชาชีพ:</Label>
                              <div className="p-3 bg-gray-50 rounded">
                                <div className="flex flex-wrap gap-2">
                                  {member.qualifications.map((qual, index) => (
                                    <Badge key={index} variant="secondary">
                                      {qual}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      แก้ไข
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">ไม่พบข้อมูลพนักงาน</h3>
              <p className="text-sm">ลองเปลี่ยนเงื่อนไขการกรองข้อมูล</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchStaffComponent;
