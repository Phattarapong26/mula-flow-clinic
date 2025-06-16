
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Calendar, Package } from 'lucide-react';

interface WithdrawalEntry {
  id: string;
  itemName: string;
  category: string;
  quantity: number;
  withdrawnBy: string;
  department: string;
  purpose: string;
  date: string;
  approvedBy: string;
  status: 'approved' | 'pending' | 'rejected';
}

const WithdrawalLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const withdrawalEntries: WithdrawalEntry[] = [
    {
      id: 'WD001',
      itemName: 'เลนส์ Progressive Premium',
      category: 'เลนส์',
      quantity: 2,
      withdrawnBy: 'นายสมชาย ใจดี',
      department: 'แผนกตรวจสายตา',
      purpose: 'ใช้กับลูกค้า นางสาวมานี สวยงาม',
      date: '2025-06-16 10:30',
      approvedBy: 'นางมาลี ผู้จัดการ',
      status: 'approved'
    },
    {
      id: 'WD002',
      itemName: 'กรอบแว่น Ray-Ban',
      category: 'กรอบ',
      quantity: 1,
      withdrawnBy: 'นางสาวสุดา ใสใส',
      department: 'แผนกขาย',
      purpose: 'ทดลองใส่ลูกค้า',
      date: '2025-06-16 14:15',
      approvedBy: 'นายประเสริฐ หัวหน้า',
      status: 'approved'
    },
    {
      id: 'WD003',
      itemName: 'เลนส์ Contact Lens',
      category: 'คอนแทคเลนส์',
      quantity: 5,
      withdrawnBy: 'นางมานี รักสวย',
      department: 'แผนกตรวจสายตา',
      purpose: 'สต็อกห้องตรวจ',
      date: '2025-06-16 16:45',
      approvedBy: 'รอการอนุมัติ',
      status: 'pending'
    }
  ];

  const filteredEntries = withdrawalEntries.filter(entry => {
    const matchesSearch = entry.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.withdrawnBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || entry.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
      case 'pending': return 'รอการอนุมัติ';
      case 'rejected': return 'ปฏิเสธ';
      default: return status;
    }
  };

  const totalWithdrawals = withdrawalEntries.length;
  const pendingApprovals = withdrawalEntries.filter(entry => entry.status === 'pending').length;
  const totalItems = withdrawalEntries.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Log การเบิก</h1>
          <p className="text-gray-600">บันทึกการเบิกสินค้าและวัสดุสิ้นเปลือง</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          ส่งออกรายงาน
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">การเบิกทั้งหมด</p>
                <p className="text-2xl font-bold">{totalWithdrawals}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รอการอนุมัติ</p>
                <p className="text-2xl font-bold">{pendingApprovals}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">จำนวนชิ้นรวม</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">วันนี้</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
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
                placeholder="ค้นหารายการเบิก..."
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
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
              >
                อนุมัติแล้ว
              </Button>
              <Button 
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                รอการอนุมัติ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการการเบิก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รหัส</th>
                  <th className="text-left p-4">สินค้า</th>
                  <th className="text-right p-4">จำนวน</th>
                  <th className="text-left p-4">ผู้เบิก</th>
                  <th className="text-left p-4">แผนก</th>
                  <th className="text-left p-4">วัตถุประสงค์</th>
                  <th className="text-center p-4">วันที่</th>
                  <th className="text-center p-4">ผู้อนุมัติ</th>
                  <th className="text-center p-4">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{entry.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{entry.itemName}</p>
                        <p className="text-sm text-gray-600">{entry.category}</p>
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold">{entry.quantity}</td>
                    <td className="p-4">{entry.withdrawnBy}</td>
                    <td className="p-4">{entry.department}</td>
                    <td className="p-4 max-w-xs truncate">{entry.purpose}</td>
                    <td className="p-4 text-center">{entry.date}</td>
                    <td className="p-4 text-center">{entry.approvedBy}</td>
                    <td className="p-4 text-center">
                      <Badge className={getStatusColor(entry.status)}>
                        {getStatusText(entry.status)}
                      </Badge>
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

export default WithdrawalLog;
