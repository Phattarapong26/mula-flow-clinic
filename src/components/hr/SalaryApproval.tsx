
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Clock, Search, DollarSign, Users } from 'lucide-react';

interface SalaryApproval {
  id: string;
  employeeName: string;
  position: string;
  department: string;
  baseSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  totalSalary: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: string;
  submittedDate: string;
  period: string;
}

const SalaryApproval = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const salaryApprovals: SalaryApproval[] = [
    {
      id: 'SA001',
      employeeName: 'นายสมชาย ใจดี',
      position: 'พนักงานขาย',
      department: 'ขาย',
      baseSalary: 25000,
      overtime: 3500,
      bonus: 5000,
      deductions: 1200,
      totalSalary: 32300,
      status: 'pending',
      submittedBy: 'นางมานี รักสวย',
      submittedDate: '2025-06-15',
      period: 'มิถุนายน 2025'
    },
    {
      id: 'SA002',
      employeeName: 'นางสาวสุดา ใสใส',
      position: 'นักตรวจสายตา',
      department: 'การแพทย์',
      baseSalary: 35000,
      overtime: 2800,
      bonus: 3000,
      deductions: 1500,
      totalSalary: 39300,
      status: 'approved',
      submittedBy: 'นายประเสริฐ มั่งมี',
      submittedDate: '2025-06-14',
      period: 'มิถุนายน 2025'
    },
    {
      id: 'SA003',
      employeeName: 'นายวิชัย มีสุข',
      position: 'ผู้จัดการสาขา',
      department: 'บริหาร',
      baseSalary: 45000,
      overtime: 0,
      bonus: 8000,
      deductions: 2000,
      totalSalary: 51000,
      status: 'rejected',
      submittedBy: 'นางใจดี สบายดี',
      submittedDate: '2025-06-13',
      period: 'มิถุนายน 2025'
    }
  ];

  const filteredApprovals = salaryApprovals.filter(approval => {
    const matchesSearch = approval.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || approval.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'อนุมัติแล้ว';
      case 'pending': return 'รออนุมัติ';
      case 'rejected': return 'ปฏิเสธ';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const pendingCount = salaryApprovals.filter(s => s.status === 'pending').length;
  const approvedCount = salaryApprovals.filter(s => s.status === 'approved').length;
  const totalAmount = salaryApprovals.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.totalSalary, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">อนุมัติเงินเดือน</h1>
          <p className="text-gray-600">อนุมัติและจัดการการจ่ายเงินเดือนพนักงาน</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          อนุมัติทั้งหมด
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">รออนุมัติ</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">อนุมัติแล้ว</p>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">ยอดรวมอนุมัติ</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">พนักงานทั้งหมด</p>
                <p className="text-2xl font-bold">{salaryApprovals.length}</p>
              </div>
              <Users className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาพนักงาน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                ทั้งหมด
              </Button>
              <Button 
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                รออนุมัติ
              </Button>
              <Button 
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
              >
                อนุมัติแล้ว
              </Button>
              <Button 
                variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('rejected')}
              >
                ปฏิเสธ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการอนุมัติเงินเดือน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">พนักงาน</th>
                  <th className="text-center p-4">แผนก</th>
                  <th className="text-right p-4">เงินเดือนพื้นฐาน</th>
                  <th className="text-right p-4">โอที/โบนัส</th>
                  <th className="text-right p-4">รวมสุทธิ</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredApprovals.map((approval) => (
                  <tr key={approval.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{approval.employeeName}</p>
                        <p className="text-sm text-gray-600">{approval.position}</p>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline">{approval.department}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      {formatCurrency(approval.baseSalary)}
                    </td>
                    <td className="p-4 text-right">
                      {formatCurrency(approval.overtime + approval.bonus)}
                    </td>
                    <td className="p-4 text-right font-bold">
                      {formatCurrency(approval.totalSalary)}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(approval.status)}
                        <Badge className={getStatusColor(approval.status)}>
                          {getStatusText(approval.status)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        {approval.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          ดูรายละเอียด
                        </Button>
                      </div>
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

export default SalaryApproval;
