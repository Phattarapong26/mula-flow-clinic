
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, AlertTriangle, TrendingDown, Plus, Edit } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartConfig = {
  value: { label: 'มูลค่า', color: '#3b82f6' },
  quantity: { label: 'จำนวน', color: '#22c55e' },
};

const InventoryCostSection = () => {
  const [showPOForm, setShowPOForm] = useState(false);
  const [showStockAdjustment, setShowStockAdjustment] = useState(false);

  // Mock inventory data
  const inventoryData = [
    { 
      id: 'P001', 
      name: 'สินค้า A', 
      currentStock: 25, 
      minStock: 10, 
      maxStock: 100, 
      avgCost: 500, 
      totalValue: 12500,
      status: 'normal'
    },
    { 
      id: 'P002', 
      name: 'สินค้า B', 
      currentStock: 8, 
      minStock: 15, 
      maxStock: 80, 
      avgCost: 750, 
      totalValue: 6000,
      status: 'low'
    },
    { 
      id: 'P003', 
      name: 'สินค้า C', 
      currentStock: 5, 
      minStock: 20, 
      maxStock: 60, 
      avgCost: 1200, 
      totalValue: 6000,
      status: 'critical'
    },
    { 
      id: 'P004', 
      name: 'สินค้า D', 
      currentStock: 0, 
      minStock: 5, 
      maxStock: 30, 
      avgCost: 300, 
      totalValue: 0,
      status: 'out'
    },
  ];

  const deadStockData = [
    { name: 'สินค้า E', lastSale: '2024-01-15', stock: 45, value: 67500 },
    { name: 'สินค้า F', lastSale: '2024-02-08', stock: 12, value: 24000 },
  ];

  const stockValueData = [
    { category: 'สินค้า A', value: 12500 },
    { category: 'สินค้า B', value: 6000 },
    { category: 'สินค้า C', value: 6000 },
    { category: 'สินค้า D', value: 0 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      case 'out': return 'text-gray-600 bg-gray-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return 'วิกฤต';
      case 'low': return 'ต่ำ';
      case 'out': return 'หมด';
      default: return 'ปกติ';
    }
  };

  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventoryData.filter(item => item.status === 'low' || item.status === 'critical').length;
  const outOfStockItems = inventoryData.filter(item => item.status === 'out').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ข้อมูลต้นทุนสินค้า / สต็อก</h2>
          <p className="text-gray-600">จัดการสินค้าคงคลัง ต้นทุนสินค้า และการสั่งซื้อ</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowPOForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            สั่งซื้อสินค้า (PO)
          </Button>
          <Button onClick={() => setShowStockAdjustment(true)} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            ปรับปรุงสต็อก
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">มูลค่าสต็อกรวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalInventoryValue)}</div>
            <p className="text-sm text-blue-500">จาก {inventoryData.length} รายการ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">สินค้าใกล้หมด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems}</div>
            <p className="text-sm text-orange-500">รายการ ต้องสั่งซื้อ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">สินค้าหมดสต็อก</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
            <p className="text-sm text-red-500">รายการ ต้องด่วน!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Dead Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{deadStockData.length}</div>
            <p className="text-sm text-gray-500">รายการ ไม่มีการขาย</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Value Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              มูลค่าสต็อกตามหมวด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockValueData} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-value)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Dead Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              รายการ Dead Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deadStockData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">ขายครั้งสุดท้าย: {item.lastSale}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.stock} ชิ้น</div>
                    <div className="text-sm text-red-600">{formatCurrency(item.value)}</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                ดูทั้งหมด
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            รายการสินค้าคงคลัง
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">รหัสสินค้า</th>
                  <th className="text-left py-2">ชื่อสินค้า</th>
                  <th className="text-center py-2">จำนวนคงเหลือ</th>
                  <th className="text-center py-2">Min/Max</th>
                  <th className="text-right py-2">ต้นทุนเฉลี่ย</th>
                  <th className="text-right py-2">มูลค่ารวม</th>
                  <th className="text-center py-2">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.id}</td>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2 text-center">{item.currentStock}</td>
                    <td className="py-2 text-center">{item.minStock}/{item.maxStock}</td>
                    <td className="py-2 text-right">{formatCurrency(item.avgCost)}</td>
                    <td className="py-2 text-right">{formatCurrency(item.totalValue)}</td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Purchase Order Form Modal */}
      {showPOForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>สร้างใบสั่งซื้อ (Purchase Order)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="supplier">ผู้จำหน่าย</Label>
                    <Input id="supplier" placeholder="ระบุชื่อผู้จำหน่าย" />
                  </div>
                  <div>
                    <Label htmlFor="poDate">วันที่สั่งซื้อ</Label>
                    <Input id="poDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                
                <div>
                  <Label>รายการสินค้าที่ต้องสั่งซื้อ</Label>
                  <div className="mt-2 space-y-2">
                    {inventoryData.filter(item => item.status === 'low' || item.status === 'critical' || item.status === 'out').map(item => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">คงเหลือ: {item.currentStock} | ควรสั่ง: {item.maxStock - item.currentStock}</div>
                        </div>
                        <Input 
                          type="number" 
                          className="w-24" 
                          placeholder="จำนวน"
                          defaultValue={item.maxStock - item.currentStock}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setShowPOForm(false)}>
                    ยกเลิก
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowPOForm(false)}>
                    สร้าง PO
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      {showStockAdjustment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>ปรับปรุงสต็อกสินค้า</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adjustProduct">เลือกสินค้า</Label>
                  <select id="adjustProduct" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md">
                    <option value="">เลือกสินค้า</option>
                    {inventoryData.map(item => (
                      <option key={item.id} value={item.id}>{item.name} (คงเหลือ: {item.currentStock})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="adjustType">ประเภทการปรับปรุง</Label>
                  <select id="adjustType" className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md">
                    <option value="increase">เพิ่มสต็อก</option>
                    <option value="decrease">ลดสต็อก</option>
                    <option value="set">กำหนดจำนวนใหม่</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="adjustQty">จำนวน</Label>
                  <Input id="adjustQty" type="number" placeholder="ระบุจำนวน" />
                </div>
                <div>
                  <Label htmlFor="adjustReason">เหตุผล</Label>
                  <Input id="adjustReason" placeholder="ระบุเหตุผลในการปรับปรุง" />
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setShowStockAdjustment(false)}>
                    ยกเลิก
                  </Button>
                  <Button onClick={() => setShowStockAdjustment(false)}>
                    บันทึก
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InventoryCostSection;
