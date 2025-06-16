
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Package, Truck, CheckCircle, Clock, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StaffProductOrders = () => {
  const { toast } = useToast();
  
  const [orders] = useState([
    {
      id: 'ORD001',
      orderNumber: 'PO-2024-001',
      supplier: 'ESSILOR Thailand',
      items: [
        { name: 'Progressive Lens', quantity: 50, unitPrice: 2100, total: 105000 },
        { name: 'Anti-Blue Light Coating', quantity: 30, unitPrice: 350, total: 10500 }
      ],
      totalAmount: 115500,
      orderDate: '2024-06-10',
      expectedDelivery: '2024-06-20',
      status: 'confirmed',
      trackingNumber: 'TH1234567890'
    },
    {
      id: 'ORD002',
      orderNumber: 'PO-2024-002',
      supplier: 'Ray-Ban Official',
      items: [
        { name: 'Titanium Frame Collection', quantity: 25, unitPrice: 2500, total: 62500 }
      ],
      totalAmount: 62500,
      orderDate: '2024-06-12',
      expectedDelivery: '2024-06-18',
      status: 'shipped',
      trackingNumber: 'RB9876543210'
    },
    {
      id: 'ORD003',
      orderNumber: 'PO-2024-003',
      supplier: 'Opti-Care Supplies',
      items: [
        { name: 'Lens Cleaning Solution', quantity: 100, unitPrice: 180, total: 18000 },
        { name: 'Microfiber Cloth', quantity: 200, unitPrice: 25, total: 5000 }
      ],
      totalAmount: 23000,
      orderDate: '2024-06-14',
      expectedDelivery: '2024-06-16',
      status: 'delivered',
      trackingNumber: 'OC5555666677'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary' as const, label: 'รอยืนยัน', icon: Clock },
      confirmed: { variant: 'default' as const, label: 'ยืนยันแล้ว', icon: Package },
      shipped: { variant: 'default' as const, label: 'จัดส่งแล้ว', icon: Truck },
      delivered: { variant: 'default' as const, label: 'ส่งมอบแล้ว', icon: CheckCircle },
      cancelled: { variant: 'destructive' as const, label: 'ยกเลิก', icon: Clock }
    };
    
    const config = variants[status as keyof typeof variants] || variants.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const confirmedOrders = orders.filter(order => order.status === 'confirmed');
  const shippedOrders = orders.filter(order => order.status === 'shipped');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');

  const totalOrderValue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const monthlyOrderCount = orders.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">การสั่งซื้อ</h1>
          <p className="text-gray-600">จัดการการสั่งซื้อและติดตามสถานะ</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          สั่งซื้อใหม่
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">คำสั่งซื้อทั้งหมด</p>
                <p className="text-2xl font-bold">{monthlyOrderCount}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">กำลังจัดส่ง</p>
                <p className="text-2xl font-bold text-orange-600">{shippedOrders.length}</p>
              </div>
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ส่งมอบแล้ว</p>
                <p className="text-2xl font-bold text-green-600">{deliveredOrders.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">มูลค่ารวม</p>
                <p className="text-2xl font-bold text-purple-600">
                  ฿{totalOrderValue.toLocaleString()}
                </p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">ทั้งหมด ({orders.length})</TabsTrigger>
          <TabsTrigger value="confirmed">ยืนยันแล้ว ({confirmedOrders.length})</TabsTrigger>
          <TabsTrigger value="shipped">จัดส่งแล้ว ({shippedOrders.length})</TabsTrigger>
          <TabsTrigger value="delivered">ส่งมอบแล้ว ({deliveredOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
                        {getStatusBadge(order.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">ผู้จำหน่าย:</span><br />
                          {order.supplier}
                        </div>
                        <div>
                          <span className="font-medium">วันที่สั่ง:</span><br />
                          {new Date(order.orderDate).toLocaleDateString('th-TH')}
                        </div>
                        <div>
                          <span className="font-medium">กำหนดส่ง:</span><br />
                          {new Date(order.expectedDelivery).toLocaleDateString('th-TH')}
                        </div>
                        <div>
                          <span className="font-medium">เลขติดตาม:</span><br />
                          <span className="font-mono text-blue-600">{order.trackingNumber}</span>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-3">รายการสินค้า</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span>{item.name}</span>
                              <div className="text-right">
                                <div>{item.quantity} ชิ้น × ฿{item.unitPrice.toLocaleString()}</div>
                                <div className="font-medium">฿{item.total.toLocaleString()}</div>
                              </div>
                            </div>
                          ))}
                          <div className="border-t pt-2 flex justify-between font-medium">
                            <span>รวมทั้งสิ้น</span>
                            <span className="text-lg">฿{order.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        ดูรายละเอียด
                      </Button>
                      {order.status === 'shipped' && (
                        <Button size="sm">
                          ยืนยันรับสินค้า
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="confirmed">
          <div className="text-center py-8 text-gray-500">
            คำสั่งซื้อที่ยืนยันแล้ว - แสดงเฉพาะคำสั่งซื้อที่ได้รับการยืนยันจากผู้จำหน่าย
          </div>
        </TabsContent>

        <TabsContent value="shipped">
          <div className="text-center py-8 text-gray-500">
            คำสั่งซื้อที่จัดส่งแล้ว - แสดงเฉพาะคำสั่งซื้อที่อยู่ระหว่างการขนส่ง
          </div>
        </TabsContent>

        <TabsContent value="delivered">
          <div className="text-center py-8 text-gray-500">
            คำสั่งซื้อที่ส่งมอบแล้ว - แสดงเฉพาะคำสั่งซื้อที่ได้รับสินค้าครบถ้วนแล้ว
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffProductOrders;
