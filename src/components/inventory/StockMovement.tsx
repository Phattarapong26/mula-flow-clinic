
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Search, Calendar, Filter } from 'lucide-react';

interface StockMovement {
  id: string;
  itemName: string;
  movementType: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  reason: string;
  location: string;
  user: string;
  date: string;
  referenceNumber?: string;
}

const StockMovement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const movements: StockMovement[] = [
    {
      id: 'SM001',
      itemName: 'กรอบแว่น Ray-Ban',
      movementType: 'in',
      quantity: 20,
      reason: 'รับสินค้าจากผู้จำหน่าย',
      location: 'สาขาสยาม',
      user: 'นายสมชาย ใจดี',
      date: '2025-06-16 09:30',
      referenceNumber: 'PO-2025-001'
    },
    {
      id: 'SM002',
      itemName: 'เลนส์ Progressive',
      movementType: 'out',
      quantity: 2,
      reason: 'ขายให้ลูกค้า',
      location: 'สาขาเอกมัย',
      user: 'นางมานี รักสวย',
      date: '2025-06-16 14:15',
      referenceNumber: 'INV-2025-045'
    },
    {
      id: 'SM003',
      itemName: 'เลนส์ Single Vision',
      movementType: 'transfer',
      quantity: 5,
      reason: 'โอนสต็อกระหว่างสาขา',
      location: 'สยาม → เอกมัย',
      user: 'นายประเสริฐ มั่งมี',
      date: '2025-06-16 11:45',
      referenceNumber: 'TF-2025-012'
    },
    {
      id: 'SM004',
      itemName: 'กรอบแว่น Oakley',
      movementType: 'adjustment',
      quantity: -1,
      reason: 'สินค้าชำรุด',
      location: 'สาขาอโศก',
      user: 'นางสาวสุดา ใสใส',
      date: '2025-06-16 16:20',
      referenceNumber: 'ADJ-2025-008'
    }
  ];

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || movement.movementType === filterType;
    return matchesSearch && matchesFilter;
  });

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'out': return <ArrowDown className="h-4 w-4 text-red-600" />;
      case 'transfer': return <ArrowUp className="h-4 w-4 text-blue-600" />;
      case 'adjustment': return <ArrowDown className="h-4 w-4 text-orange-600" />;
      default: return <ArrowUp className="h-4 w-4" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'in': return 'bg-green-100 text-green-800';
      case 'out': return 'bg-red-100 text-red-800';
      case 'transfer': return 'bg-blue-100 text-blue-800';
      case 'adjustment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMovementText = (type: string) => {
    switch (type) {
      case 'in': return 'รับเข้า';
      case 'out': return 'จ่ายออก';
      case 'transfer': return 'โอน';
      case 'adjustment': return 'ปรับปรุง';
      default: return type;
    }
  };

  const totalIn = movements.filter(m => m.movementType === 'in').reduce((sum, m) => sum + m.quantity, 0);
  const totalOut = movements.filter(m => m.movementType === 'out').reduce((sum, m) => sum + Math.abs(m.quantity), 0);
  const totalTransfer = movements.filter(m => m.movementType === 'transfer').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">การเคลื่อนไหวสต็อก</h1>
          <p className="text-gray-600">ติดตามการเข้า-ออกของสินค้าในระบบ</p>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          ส่งออกรายงาน
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">รับเข้าวันนี้</p>
                <p className="text-2xl font-bold">{totalIn}</p>
              </div>
              <ArrowUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">จ่ายออกวันนี้</p>
                <p className="text-2xl font-bold">{totalOut}</p>
              </div>
              <ArrowDown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">โอนสต็อก</p>
                <p className="text-2xl font-bold">{totalTransfer}</p>
              </div>
              <ArrowUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ธุรกรรมทั้งหมด</p>
                <p className="text-2xl font-bold">{movements.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-600" />
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
                placeholder="ค้นหาการเคลื่อนไหว..."
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
                variant={filterType === 'in' ? 'default' : 'outline'}
                onClick={() => setFilterType('in')}
              >
                รับเข้า
              </Button>
              <Button 
                variant={filterType === 'out' ? 'default' : 'outline'}
                onClick={() => setFilterType('out')}
              >
                จ่ายออก
              </Button>
              <Button 
                variant={filterType === 'transfer' ? 'default' : 'outline'}
                onClick={() => setFilterType('transfer')}
              >
                โอน
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Movement List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการเคลื่อนไหวสต็อก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">สินค้า</th>
                  <th className="text-center p-4">ประเภท</th>
                  <th className="text-right p-4">จำนวน</th>
                  <th className="text-left p-4">เหตุผล</th>
                  <th className="text-center p-4">สถานที่</th>
                  <th className="text-center p-4">ผู้ทำรายการ</th>
                  <th className="text-center p-4">วันที่</th>
                  <th className="text-center p-4">อ้างอิง</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.map((movement) => (
                  <tr key={movement.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{movement.itemName}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getMovementIcon(movement.movementType)}
                        <Badge className={getMovementColor(movement.movementType)}>
                          {getMovementText(movement.movementType)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold">
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </td>
                    <td className="p-4">{movement.reason}</td>
                    <td className="p-4 text-center">{movement.location}</td>
                    <td className="p-4 text-center">{movement.user}</td>
                    <td className="p-4 text-center">{movement.date}</td>
                    <td className="p-4 text-center">
                      {movement.referenceNumber && (
                        <Badge variant="outline">{movement.referenceNumber}</Badge>
                      )}
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

export default StockMovement;
