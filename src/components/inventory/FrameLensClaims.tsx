
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface Claim {
  id: string;
  type: 'frame' | 'lens';
  itemName: string;
  customerName: string;
  issueDescription: string;
  claimDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  submittedBy: string;
  claimAmount: number;
  supplier: string;
}

const FrameLensClaims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const claims: Claim[] = [
    {
      id: 'CLM001',
      type: 'frame',
      itemName: 'กรอบแว่น Ray-Ban RB3025',
      customerName: 'นายสมชาย รักสวย',
      issueDescription: 'กรอบหักตรงจุดต่อแขน ภายใน 1 เดือนหลังซื้อ',
      claimDate: '2025-06-15',
      status: 'pending',
      submittedBy: 'นางมานี ใสใส',
      claimAmount: 8500,
      supplier: 'Ray-Ban Thailand'
    },
    {
      id: 'CLM002',
      type: 'lens',
      itemName: 'เลนส์ Progressive Varilux',
      customerName: 'นางสาวสุดา งดงาม',
      issueDescription: 'เลนส์มีรอยขีดข่วน ไม่สามารถใช้งานได้',
      claimDate: '2025-06-14',
      status: 'approved',
      submittedBy: 'นายประเสริฐ ดูแล',
      claimAmount: 12000,
      supplier: 'Essilor Thailand'
    },
    {
      id: 'CLM003',
      type: 'frame',
      itemName: 'กรอบแว่น Oakley Holbrook',
      customerName: 'นายมาลี สวยมาก',
      issueDescription: 'สีจาง และเคลือบหลุด',
      claimDate: '2025-06-13',
      status: 'processing',
      submittedBy: 'นางสาวใสใส ดีมาก',
      claimAmount: 6800,
      supplier: 'Oakley Thailand'
    }
  ];

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || claim.type === filterType;
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'รอพิจารณา';
      case 'approved': return 'อนุมัติ';
      case 'rejected': return 'ปฏิเสธ';
      case 'processing': return 'กำลังดำเนินการ';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    return type === 'frame' ? 'กรอบ' : 'เลนส์';
  };

  const totalClaims = claims.length;
  const pendingClaims = claims.filter(claim => claim.status === 'pending').length;
  const totalAmount = claims.reduce((sum, claim) => sum + claim.claimAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">เคลมกรอบ / เคลมเลนส์</h1>
          <p className="text-gray-600">จัดการเคลมสินค้าที่มีปัญหา</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          สร้างเคลมใหม่
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เคลมทั้งหมด</p>
                <p className="text-2xl font-bold">{totalClaims}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รอพิจารณา</p>
                <p className="text-2xl font-bold">{pendingClaims}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">อนุมัติแล้ว</p>
                <p className="text-2xl font-bold">{claims.filter(c => c.status === 'approved').length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">มูลค่ารวม</p>
                <p className="text-2xl font-bold">₿{(totalAmount / 1000).toFixed(0)}K</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 relative min-w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาเคลม..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                ทั้งหมด
              </Button>
              <Button 
                variant={filterType === 'frame' ? 'default' : 'outline'}
                onClick={() => setFilterType('frame')}
              >
                กรอบ
              </Button>
              <Button 
                variant={filterType === 'lens' ? 'default' : 'outline'}
                onClick={() => setFilterType('lens')}
              >
                เลนส์
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                รอพิจารณา
              </Button>
              <Button 
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
              >
                อนุมัติแล้ว
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการเคลม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รหัส</th>
                  <th className="text-center p-4">ประเภท</th>
                  <th className="text-left p-4">สินค้า</th>
                  <th className="text-left p-4">ลูกค้า</th>
                  <th className="text-left p-4">ปัญหา</th>
                  <th className="text-right p-4">มูลค่า</th>
                  <th className="text-center p-4">วันที่</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((claim) => (
                  <tr key={claim.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{claim.id}</td>
                    <td className="p-4 text-center">
                      <Badge variant="outline">{getTypeText(claim.type)}</Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{claim.itemName}</p>
                        <p className="text-sm text-gray-600">{claim.supplier}</p>
                      </div>
                    </td>
                    <td className="p-4">{claim.customerName}</td>
                    <td className="p-4 max-w-xs">
                      <p className="truncate">{claim.issueDescription}</p>
                    </td>
                    <td className="p-4 text-right font-bold">₿{claim.claimAmount.toLocaleString()}</td>
                    <td className="p-4 text-center">{claim.claimDate}</td>
                    <td className="p-4 text-center">
                      <Badge className={getStatusColor(claim.status)}>
                        {getStatusText(claim.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="outline">
                          ดูรายละเอียด
                        </Button>
                        {claim.status === 'pending' && (
                          <Button size="sm">
                            อนุมัติ
                          </Button>
                        )}
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

export default FrameLensClaims;
