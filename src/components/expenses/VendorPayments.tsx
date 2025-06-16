
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Building, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

interface VendorPayment {
  id: string;
  vendorName: string;
  vendorType: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  invoiceNumber: string;
  description: string;
  paymentMethod?: string;
  paidDate?: string;
}

const VendorPayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const vendorPayments: VendorPayment[] = [
    {
      id: 'VP001',
      vendorName: 'บริษัท เลนส์โปรเกรสซีฟ จำกัด',
      vendorType: 'เลนส์',
      amount: 85000,
      dueDate: '2025-06-20',
      status: 'pending',
      invoiceNumber: 'INV-2025-001',
      description: 'เลนส์โปรเกรสซีฟ Progressive Lens'
    },
    {
      id: 'VP002',
      vendorName: 'ร้านกรอบแว่นอิตาลี',
      vendorType: 'กรอบแว่น',
      amount: 45000,
      dueDate: '2025-06-18',
      status: 'paid',
      invoiceNumber: 'INV-2025-002',
      description: 'กรอบแว่นยี่ห้อ Ray-Ban',
      paymentMethod: 'โอนเงิน',
      paidDate: '2025-06-15'
    },
    {
      id: 'VP003',
      vendorName: 'บริษัท อุปกรณ์การแพทย์ไทย',
      vendorType: 'อุปกรณ์',
      amount: 25000,
      dueDate: '2025-06-12',
      status: 'overdue',
      invoiceNumber: 'INV-2025-003',
      description: 'เครื่องมือตรวจสายตา'
    },
    {
      id: 'VP004',
      vendorName: 'ห้างหุ้นส่วนจำกัด เอสสิลอร์',
      vendorType: 'เลนส์',
      amount: 120000,
      dueDate: '2025-06-25',
      status: 'pending',
      invoiceNumber: 'INV-2025-004',
      description: 'เลนส์ Varilux และ Crizal'
    },
    {
      id: 'VP005',
      vendorName: 'บริษัท อะไหล่แว่น จำกัด',
      vendorType: 'อะไหล่',
      amount: 8500,
      dueDate: '2025-06-30',
      status: 'pending',
      invoiceNumber: 'INV-2025-005',
      description: 'ขาแว่น, จิก, โฟม'
    }
  ];

  const filteredPayments = vendorPayments.filter(payment => {
    const matchesSearch = payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
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
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'จ่ายแล้ว';
      case 'pending': return 'รอจ่าย';
      case 'overdue': return 'เลยกำหนด';
      default: return status;
    }
  };

  const totalPending = vendorPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = vendorPayments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPaid = vendorPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">การจ่ายเงิน Vendor</h1>
          <p className="text-gray-600">จัดการการจ่ายเงินให้กับผู้จำหน่าย</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มการจ่ายเงิน
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รอจ่าย</p>
                <p className="text-2xl font-bold">{formatCurrency(totalPending)}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เลยกำหนด</p>
                <p className="text-2xl font-bold">{formatCurrency(totalOverdue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">จ่ายแล้ว</p>
                <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendor ทั้งหมด</p>
                <p className="text-2xl font-bold">
                  {[...new Set(vendorPayments.map(p => p.vendorName))].length}
                </p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
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
                placeholder="ค้นหา vendor หรือเลขที่ใบแจ้งหนี้..."
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
                รอจ่าย
              </Button>
              <Button 
                variant={filterStatus === 'overdue' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('overdue')}
              >
                เลยกำหนด
              </Button>
              <Button 
                variant={filterStatus === 'paid' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('paid')}
              >
                จ่ายแล้ว
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการจ่ายเงิน Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Vendor</th>
                  <th className="text-center p-4">ประเภท</th>
                  <th className="text-right p-4">จำนวนเงิน</th>
                  <th className="text-center p-4">เลขที่ใบแจ้งหนี้</th>
                  <th className="text-center p-4">กำหนดจ่าย</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{payment.vendorName}</p>
                        <p className="text-sm text-gray-600">{payment.description}</p>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline">{payment.vendorType}</Badge>
                    </td>
                    <td className="p-4 text-right font-bold">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="p-4 text-center font-mono">
                      {payment.invoiceNumber}
                    </td>
                    <td className="p-4 text-center">{payment.dueDate}</td>
                    <td className="p-4 text-center">
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusText(payment.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        {payment.status !== 'paid' && (
                          <Button size="sm" variant="default">
                            จ่ายเงิน
                          </Button>
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

export default VendorPayments;
