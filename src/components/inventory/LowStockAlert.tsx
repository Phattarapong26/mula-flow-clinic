
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Search, Package, TrendingDown, ShoppingCart } from 'lucide-react';

interface LowStockItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  location: string;
  supplier: string;
  lastRestock: string;
  status: 'critical' | 'low' | 'warning';
}

const LowStockAlert = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const lowStockItems: LowStockItem[] = [
    {
      id: 'LS001',
      name: 'เลนส์ Progressive Premium',
      category: 'เลนส์',
      currentStock: 2,
      minThreshold: 10,
      location: 'สาขาสยาม',
      supplier: 'Essilor Thailand',
      lastRestock: '2025-05-15',
      status: 'critical'
    },
    {
      id: 'LS002',
      name: 'กรอบแว่น Titanium',
      category: 'กรอบ',
      currentStock: 5,
      minThreshold: 15,
      location: 'สาขาเอกมัย',
      supplier: 'Oakley Thailand',
      lastRestock: '2025-06-01',
      status: 'low'
    },
    {
      id: 'LS003',
      name: 'เลนส์ Single Vision',
      category: 'เลนส์',
      currentStock: 8,
      minThreshold: 20,
      location: 'สาขาอโศก',
      supplier: 'Zeiss Thailand',
      lastRestock: '2025-06-10',
      status: 'warning'
    }
  ];

  const filteredItems = lowStockItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-orange-100 text-orange-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'วิกฤต';
      case 'low': return 'ต่ำ';
      case 'warning': return 'เตือน';
      default: return status;
    }
  };

  const criticalCount = lowStockItems.filter(item => item.status === 'critical').length;
  const lowCount = lowStockItems.filter(item => item.status === 'low').length;
  const warningCount = lowStockItems.filter(item => item.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">สินค้าใกล้หมด</h1>
          <p className="text-gray-600">ติดตามและจัดการสินค้าที่ใกล้หมดสต็อก</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          สั่งซื้อทั้งหมด
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">วิกฤต</p>
                <p className="text-2xl font-bold">{criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">ต่ำ</p>
                <p className="text-2xl font-bold">{lowCount}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">เตือน</p>
                <p className="text-2xl font-bold">{warningCount}</p>
              </div>
              <Package className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รวมทั้งหมด</p>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Low Stock Items List */}
      <Card>
        <CardHeader>
          <CardTitle>รายการสินค้าใกล้หมด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">สินค้า</th>
                  <th className="text-center p-4">หมวดหมู่</th>
                  <th className="text-right p-4">สต็อกปัจจุบัน</th>
                  <th className="text-right p-4">ขั้นต่ำ</th>
                  <th className="text-center p-4">สาขา</th>
                  <th className="text-center p-4">ผู้จำหน่าย</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">รหัส: {item.id}</p>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="p-4 text-right font-bold text-red-600">
                      {item.currentStock}
                    </td>
                    <td className="p-4 text-right text-gray-600">
                      {item.minThreshold}
                    </td>
                    <td className="p-4 text-center text-gray-600">
                      {item.location}
                    </td>
                    <td className="p-4 text-center text-gray-600">
                      {item.supplier}
                    </td>
                    <td className="p-4 text-center">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="outline">
                          ดูรายละเอียด
                        </Button>
                        <Button size="sm">
                          สั่งซื้อ
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

export default LowStockAlert;
