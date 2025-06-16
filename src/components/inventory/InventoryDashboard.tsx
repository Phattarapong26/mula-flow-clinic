
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Glasses,
  Eye,
  ShoppingCart,
  Clock,
  CheckCircle2
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: 'frame' | 'lens' | 'contact' | 'accessories';
  stock: number;
  reorderLevel: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const InventoryDashboard = () => {
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'กรอบแว่น Ray-Ban Classic',
      category: 'frame',
      stock: 25,
      reorderLevel: 10,
      status: 'in_stock'
    },
    {
      id: '2',
      name: 'เลนส์ Progressive Varilux',
      category: 'lens',
      stock: 8,
      reorderLevel: 15,
      status: 'low_stock'
    },
    {
      id: '3',
      name: 'คอนแทคเลนส์ Acuvue',
      category: 'contact',
      stock: 0,
      reorderLevel: 20,
      status: 'out_of_stock'
    }
  ];

  const lensOrders = [
    {
      id: 'LO001',
      customer: 'นายสมชาย ใจดี',
      lensType: 'Progressive',
      status: 'ordered',
      expectedDate: '2025-06-25'
    },
    {
      id: 'LO002',
      customer: 'นางสาวมานี สวยงาม',
      lensType: 'Single Vision',
      status: 'arrived',
      expectedDate: '2025-06-20'
    }
  ];

  const glassesUnits = [
    {
      id: 'GU001',
      customer: 'นายประเสริฐ ดูดี',
      status: 'ready',
      notificationSent: true
    },
    {
      id: 'GU002',
      customer: 'นางใสใส งดงาม',
      status: 'assembling',
      notificationSent: false
    }
  ];

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLensStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'assembled': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGlassesStatusColor = (status: string) => {
    switch (status) {
      case 'assembling': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalItems = inventoryItems.length;
  const lowStockItems = inventoryItems.filter(item => item.status === 'low_stock').length;
  const outOfStockItems = inventoryItems.filter(item => item.status === 'out_of_stock').length;
  const readyGlasses = glassesUnits.filter(unit => unit.status === 'ready').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ดสินค้าคงคลัง</h1>
          <p className="text-gray-600">ภาพรวมสินค้าคงคลัง เลนส์ที่สั่งทำ และแว่นที่พร้อมส่งมอบ</p>
        </div>
        <Button>
          <Package className="h-4 w-4 mr-2" />
          จัดการสินค้า
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">สินค้าทั้งหมด</p>
                <p className="text-3xl font-bold">{totalItems}</p>
              </div>
              <Package className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">สินค้าใกล้หมด</p>
                <p className="text-3xl font-bold">{lowStockItems}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">สินค้าหมด</p>
                <p className="text-3xl font-bold">{outOfStockItems}</p>
              </div>
              <ShoppingCart className="h-10 w-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">แว่นพร้อมส่งมอบ</p>
                <p className="text-3xl font-bold">{readyGlasses}</p>
              </div>
              <Glasses className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lens Orders Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            การติดตามเลนส์ที่สั่งทำ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รหัสออเดอร์</th>
                  <th className="text-left p-4">ลูกค้า</th>
                  <th className="text-left p-4">ประเภทเลนส์</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">วันที่คาดว่าจะได้รับ</th>
                </tr>
              </thead>
              <tbody>
                {lensOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.lensType}</td>
                    <td className="p-4 text-center">
                      <Badge className={getLensStatusColor(order.status)}>
                        {order.status === 'ordered' ? 'สั่งแล้ว' :
                         order.status === 'shipped' ? 'จัดส่งแล้ว' :
                         order.status === 'arrived' ? 'มาถึงแล้ว' : 'ประกอบแล้ว'}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">{order.expectedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Glasses Units Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Glasses className="h-5 w-5" />
            สถานะแว่นที่ประกอบ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รหัสแว่น</th>
                  <th className="text-left p-4">ลูกค้า</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">แจ้งเตือนลูกค้า</th>
                  <th className="text-center p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {glassesUnits.map((unit) => (
                  <tr key={unit.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{unit.id}</td>
                    <td className="p-4">{unit.customer}</td>
                    <td className="p-4 text-center">
                      <Badge className={getGlassesStatusColor(unit.status)}>
                        {unit.status === 'assembling' ? 'กำลังประกอบ' :
                         unit.status === 'ready' ? 'พร้อมส่งมอบ' : 'ส่งมอบแล้ว'}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      {unit.notificationSent ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <Clock className="h-5 w-5 text-gray-400 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        {unit.status === 'ready' && !unit.notificationSent && (
                          <Button size="sm">แจ้งลูกค้า</Button>
                        )}
                        <Button size="sm" variant="outline">ดูรายละเอียด</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stock Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            การแจ้งเตือนสินค้า
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {inventoryItems
              .filter(item => item.status !== 'in_stock')
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        คงเหลือ: {item.stock} ชิ้น | ระดับสั่งซื้อใหม่: {item.reorderLevel} ชิ้น
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStockStatusColor(item.status)}>
                      {item.status === 'low_stock' ? 'ใกล้หมด' : 'หมดแล้ว'}
                    </Badge>
                    <Button size="sm">สั่งซื้อ</Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDashboard;
