
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Plus, Search, Phone, Mail, Building, UserPlus } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  department: string;
  branch: string;
  phone: string;
  email: string;
  startDate: string;
  salary: number;
  status: 'active' | 'leave' | 'inactive';
  certifications: string[];
  specializations?: string[];
}

const AllStaff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for optometry clinic staff
  const staffMembers: StaffMember[] = [
    {
      id: 'ST001',
      name: 'นพ.สมชาย รักษาดี',
      position: 'จักษุแพทย์หัวหน้า',
      department: 'การแพทย์',
      branch: 'สาขาสยาม',
      phone: '081-111-1111',
      email: 'somchai@clinic.com',
      startDate: '2020-01-15',
      salary: 120000,
      status: 'active',
      certifications: ['จักษุแพทย์', 'ใบอนุญาตแพทย์'],
      specializations: ['ผ่าตัดต้อกระจก', 'การรักษาจอประสาทตา']
    },
    {
      id: 'ST002',
      name: 'นพ.หญิงวิภาวดี ใสสะอาด',
      position: 'จักษุแพทย์',
      department: 'การแพทย์',
      branch: 'สาขาเอกมัย',
      phone: '081-222-2222',
      email: 'wipawadee@clinic.com',
      startDate: '2019-06-20',
      salary: 100000,
      status: 'active',
      certifications: ['จักษุแพทย์', 'ใบอนุญาตแพทย์'],
      specializations: ['ผ่าตัดเลเซอร์', 'การรักษาโรคตา']
    },
    {
      id: 'ST003',
      name: 'พยาบาลสมหญิง ใจดี',
      position: 'พยาบาลวิชาชีพ',
      department: 'การพยาบาล',
      branch: 'สาขาสยาม',
      phone: '081-333-3333',
      email: 'somying@clinic.com',
      startDate: '2020-03-01',
      salary: 35000,
      status: 'active',
      certifications: ['พยาบาลวิชาชีพ', 'การดูแลผู้ป่วยตา']
    },
    {
      id: 'ST004',
      name: 'นายพิเชษฐ์ เทคนิค',
      position: 'เทคนิคการแพทย์',
      department: 'เทคนิค',
      branch: 'สาขาทองหล่อ',
      phone: '081-444-4444',
      email: 'pichet@clinic.com',
      startDate: '2021-01-15',
      salary: 28000,
      status: 'active',
      certifications: ['เทคนิคการแพทย์', 'การใช้เครื่องมือวัดสายตา']
    },
    {
      id: 'ST005',
      name: 'นางสาวมานี รับเคาน์เตอร์',
      position: 'เจ้าหน้าที่ต้อนรับ',
      department: 'บริการลูกค้า',
      branch: 'สาขาสยาม',
      phone: '081-555-5555',
      email: 'manee@clinic.com',
      startDate: '2021-08-01',
      salary: 22000,
      status: 'active',
      certifications: ['การให้บริการลูกค้า', 'ระบบจองนัด']
    },
    {
      id: 'ST006',
      name: 'นายสมศักดิ์ การเงิน',
      position: 'เจ้าหน้าที่การเงิน',
      department: 'การเงิน',
      branch: 'สาขาเอกมัย',
      phone: '081-666-6666',
      email: 'somsak@clinic.com',
      startDate: '2020-11-01',
      salary: 32000,
      status: 'leave',
      certifications: ['การบัญชี', 'การเงิน']
    }
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || staff.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      leave: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-red-100 text-red-800'
    };
    const labels = {
      active: 'ปฏิบัติงาน',
      leave: 'ลาพักงาน',
      inactive: 'ไม่ได้ปฏิบัติงาน'
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getDepartmentColor = (department: string) => {
    const colors = {
      'การแพทย์': 'bg-blue-100 text-blue-800',
      'การพยาบาล': 'bg-green-100 text-green-800',
      'เทคนิค': 'bg-purple-100 text-purple-800',
      'บริการลูกค้า': 'bg-orange-100 text-orange-800',
      'การเงิน': 'bg-red-100 text-red-800'
    };
    return colors[department as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">รายชื่อพนักงานทั้งหมด</h1>
          <p className="text-gray-600">จัดการข้อมูลพนักงานและเจ้าหน้าที่ ({filteredStaff.length} คน)</p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          เพิ่มพนักงานใหม่
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">พนักงานทั้งหมด</p>
                <p className="text-2xl font-bold">{staffMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">ปฏิบัติงาน</p>
                <p className="text-2xl font-bold">{staffMembers.filter(s => s.status === 'active').length}</p>
              </div>
              <UserPlus className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">ลาพักงาน</p>
                <p className="text-2xl font-bold">{staffMembers.filter(s => s.status === 'leave').length}</p>
              </div>
              <Building className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">แพทย์/พยาบาล</p>
                <p className="text-2xl font-bold">
                  {staffMembers.filter(s => s.department === 'การแพทย์' || s.department === 'การพยาบาล').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            รายชื่อพนักงาน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหาชื่อ, ตำแหน่ง, หรืออีเมล..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกแผนก" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">แผนกทั้งหมด</SelectItem>
                <SelectItem value="การแพทย์">การแพทย์</SelectItem>
                <SelectItem value="การพยาบาล">การพยาบาล</SelectItem>
                <SelectItem value="เทคนิค">เทคนิค</SelectItem>
                <SelectItem value="บริการลูกค้า">บริการลูกค้า</SelectItem>
                <SelectItem value="การเงิน">การเงิน</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="active">ปฏิบัติงาน</SelectItem>
                <SelectItem value="leave">ลาพักงาน</SelectItem>
                <SelectItem value="inactive">ไม่ได้ปฏิบัติงาน</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredStaff.map((staff) => (
              <div key={staff.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{staff.name}</h3>
                      {getStatusBadge(staff.status)}
                      <Badge className={getDepartmentColor(staff.department)}>
                        {staff.department}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">ตำแหน่ง: </span>
                        <span className="text-gray-600">{staff.position}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">สาขา: </span>
                        <span className="text-gray-600">{staff.branch}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{staff.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{staff.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">วันที่เริ่มงาน: </span>
                        <span className="text-gray-600">{new Date(staff.startDate).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">เงินเดือน: </span>
                        <span className="text-gray-600">฿{staff.salary.toLocaleString()}</span>
                      </div>
                    </div>

                    {staff.certifications.length > 0 && (
                      <div className="text-sm mb-2">
                        <span className="font-medium text-gray-700">ใบประกาศนียบัตร: </span>
                        <span className="text-gray-600">{staff.certifications.join(', ')}</span>
                      </div>
                    )}

                    {staff.specializations && staff.specializations.length > 0 && (
                      <div className="text-sm">
                        <span className="font-medium text-emerald-700">ความเชี่ยวชาญ: </span>
                        <span className="text-emerald-600">{staff.specializations.join(', ')}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      ดูรายละเอียด
                    </Button>
                    <Button variant="outline" size="sm">
                      แก้ไข
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || departmentFilter !== 'all' || statusFilter !== 'all' ? 'ไม่พบพนักงานที่ค้นหา' : 'ยังไม่มีข้อมูลพนักงาน'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AllStaff;
