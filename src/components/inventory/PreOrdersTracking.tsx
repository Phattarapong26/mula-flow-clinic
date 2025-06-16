
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Clock, Search, User, Truck, AlertTriangle, Calendar } from 'lucide-react';

const PreOrdersTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const preOrders = [
    {
      id: 'PO001',
      customerName: 'นายสมชาย ใจดี',
      itemName: 'กรอบแว่น Progressive + เลนส์',
      vendor: 'Vision Tech Co.',
      orderDate: '2025-06-01',
      expectedDate: '2025-06-15',
      status: 'รอ vendor ส่ง',
      daysWaiting: 14,
      contactPerson: 'คุณมาลี',
      phone: '02-123-4567'
    },
    {
      id: 'PO002',
      customerName: 'นางสาววิภา สวยงาม',
      itemName: 'เลนส์ Bifocal พิเศษ',
      vendor: 'Lens Master Ltd.',
      orderDate: '2025-06-05',
      expectedDate: '2025-06-20',
      status: 'กำลังผลิต',
      daysWaiting: 10,
      contactPerson: 'คุณสมศักดิ์',
      phone: '02-234-5678'
    },
    {
      id: 'PO003',
      customerName: 'นายประเสริฐ มั่งมี',
      itemName: 'กรอบแว่น Titanium',
      vendor: 'Premium Frames',
      orderDate: '2025-05-25',
      expectedDate: '2025-06-10',
      status: 'เลยกำหนด',
      daysWaiting: 21,
      contactPerson: 'คุณณัฐ',
      phone: '02-345-6789'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'กำลังผลิต': return 'bg-blue-100 text-blue-800';
      case 'รอ vendor ส่ง': return 'bg-yellow-100 text-yellow-800';
      case 'เลยกำหนด': return 'bg-red-100 text-red-800';
      case 'ได้รับแล้ว': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysColor = (days: number) => {
    if (days > 20) return 'text-red-600';
    if (days > 14) return 'text-orange-600';
    return 'text-blue-600';
  };

  const filteredOrders = preOrders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pre-order ที่รอประกอบ</h1>
          <p className="text-gray-600">ติดตามคำสั่งซื้อที่รอจาก Vendor</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รอทั้งหมด</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">กำลังผลิต</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Truck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เลยกำหนด</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เฉลี่ยรอ (วัน)</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาคำสั่งซื้อ, ลูกค้า, หรือ vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-orders List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการ Pre-order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-bold text-lg">{order.id}</h3>
                      <p className="text-gray-600">{order.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <p className={`text-sm font-medium mt-1 ${getDaysColor(order.daysWaiting)}`}>
                      รอมา {order.daysWaiting} วัน
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">สินค้า:</span>
                    <p className="font-medium">{order.itemName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Vendor:</span>
                    <p className="font-medium">{order.vendor}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">วันสั่ง:</span>
                    <p className="font-medium">{new Date(order.orderDate).toLocaleDateString('th-TH')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">กำหนดส่ง:</span>
                    <p className="font-medium">{new Date(order.expectedDate).toLocaleDateString('th-TH')}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{order.contactPerson}</span>
                    </div>
                    <div className="text-sm text-gray-600">{order.phone}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">โทรติดตาม</Button>
                    <Button size="sm">ดูรายละเอียด</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreOrdersTracking;
