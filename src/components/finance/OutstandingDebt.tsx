
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Phone, 
  Mail,
  Search,
  Filter,
  Calendar,
  FileText
} from 'lucide-react';

const OutstandingDebt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const outstandingDebts = [
    {
      id: 'INV001',
      customerName: 'นายสมชาย ใจดี',
      phone: '089-123-4567',
      email: 'somchai@email.com',
      invoiceDate: '2025-05-15',
      dueDate: '2025-06-15',
      amount: 25000,
      paidAmount: 10000,
      remainingAmount: 15000,
      daysOverdue: 0,
      status: 'ครบกำหนด',
      lastContact: '2025-06-10',
      services: 'ตรวจตา, แว่นโปรเกรสซีฟ'
    },
    {
      id: 'INV002',
      customerName: 'นางสาวมานี รักสวย',
      phone: '081-234-5678',
      email: 'manee@email.com',
      invoiceDate: '2025-04-20',
      dueDate: '2025-05-20',
      amount: 18000,
      paidAmount: 0,
      remainingAmount: 18000,
      daysOverdue: 26,
      status: 'เกินกำหนด',
      lastContact: '2025-06-05',
      services: 'คอนแทคเลนส์'
    },
    {
      id: 'INV003',
      customerName: 'นายประเสริฐ มั่งมี',
      phone: '092-345-6789',
      email: 'prasert@email.com',
      invoiceDate: '2025-03-10',
      dueDate: '2025-04-10',
      amount: 35000,
      paidAmount: 20000,
      remainingAmount: 15000,
      daysOverdue: 66,
      status: 'เกินกำหนดมาก',
      lastContact: '2025-05-25',
      services: 'แว่นตา, ตรวจตา'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ครบกำหนด': return 'bg-green-100 text-green-800';
      case 'เกินกำหนด': return 'bg-yellow-100 text-yellow-800';
      case 'เกินกำหนดมาก': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLevel = (daysOverdue: number) => {
    if (daysOverdue <= 0) return { level: 'ปกติ', color: 'text-green-600' };
    if (daysOverdue <= 30) return { level: 'ต่ำ', color: 'text-yellow-600' };
    if (daysOverdue <= 60) return { level: 'ปานกลาง', color: 'text-orange-600' };
    return { level: 'สูง', color: 'text-red-600' };
  };

  const filteredDebts = outstandingDebts.filter(debt => {
    const matchesSearch = debt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         debt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || debt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalOutstanding = outstandingDebts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const overdueCount = outstandingDebts.filter(debt => debt.daysOverdue > 0).length;
  const highRiskCount = outstandingDebts.filter(debt => debt.daysOverdue > 60).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">หนี้ค้างชำระ</h1>
          <p className="text-gray-600">ติดตามและจัดการหนี้ค้างชำระของลูกค้า</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            ส่งออกรายงาน
          </Button>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            ส่งแจ้งเตือน
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">หนี้ค้างทั้งหมด</p>
                <p className="text-2xl font-bold">₿{totalOutstanding.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ลูกค้าค้างชำระ</p>
                <p className="text-2xl font-bold">{outstandingDebts.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เกินกำหนด</p>
                <p className="text-2xl font-bold">{overdueCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ความเสี่ยงสูง</p>
                <p className="text-2xl font-bold">{highRiskCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาลูกค้าหรือเลขที่ใบแจ้งหนี้..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="ครบกำหนด">ครบกำหนด</option>
              <option value="เกินกำหนด">เกินกำหนด</option>
              <option value="เกินกำหนดมาก">เกินกำหนดมาก</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              กรองเพิ่มเติม
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Debt List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการหนี้ค้างชำระ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDebts.map((debt) => {
              const risk = getRiskLevel(debt.daysOverdue);
              return (
                <div key={debt.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium text-lg">{debt.customerName}</h3>
                        <p className="text-sm text-gray-600">ใบแจ้งหนี้: {debt.id}</p>
                      </div>
                      <Badge className={getStatusColor(debt.status)}>
                        {debt.status}
                      </Badge>
                      <Badge variant="outline" className={risk.color}>
                        ความเสี่ยง: {risk.level}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">₿{debt.remainingAmount.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">จาก ₿{debt.amount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">วันที่ออกใบแจ้งหนี้:</span>
                      <p className="font-medium">{new Date(debt.invoiceDate).toLocaleDateString('th-TH')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">กำหนดชำระ:</span>
                      <p className="font-medium">{new Date(debt.dueDate).toLocaleDateString('th-TH')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">วันเกินกำหนด:</span>
                      <p className={`font-medium ${debt.daysOverdue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {debt.daysOverdue > 0 ? `${debt.daysOverdue} วัน` : 'ยังไม่เกิน'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">ติดต่อครั้งล่าสุด:</span>
                      <p className="font-medium">{new Date(debt.lastContact).toLocaleDateString('th-TH')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">บริการ:</span>
                      <p className="font-medium text-xs">{debt.services}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{debt.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{debt.email}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        โทร
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-4 w-4 mr-1" />
                        อีเมล
                      </Button>
                      <Button size="sm">บันทึกการชำระ</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutstandingDebt;
