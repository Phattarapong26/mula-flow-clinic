
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  AlertTriangle, 
  TrendingDown,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const InventoryOptimization = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock inventory data based on database schema
  const inventorySummary = {
    totalItems: 1250,
    totalValue: 8500000,
    lowStockItems: 45,
    overstockItems: 23,
    avgTurnover: 4.2,
    costOptimization: 15.8
  };

  const lowStockItems = [
    { id: 1, name: 'Botox 100 units', currentStock: 5, minStock: 15, cost: 12000, branch: 'สยาม', urgency: 'critical' },
    { id: 2, name: 'Hyaluronic Acid Filler', currentStock: 8, minStock: 20, cost: 8500, branch: 'ทองหล่อ', urgency: 'high' },
    { id: 3, name: 'LED Light Therapy Mask', currentStock: 2, minStock: 10, cost: 5500, branch: 'อารีย์', urgency: 'critical' },
    { id: 4, name: 'Vitamin C Serum', currentStock: 12, minStock: 25, cost: 1200, branch: 'เซ็นทรัล', urgency: 'medium' },
    { id: 5, name: 'Microneedling Tips', currentStock: 15, minStock: 30, cost: 800, branch: 'สยาม', urgency: 'medium' }
  ];

  const overStockItems = [
    { id: 1, name: 'Face Cleansing Foam', currentStock: 180, maxStock: 50, cost: 450, branch: 'ทองหล่อ', excessValue: 58500 },
    { id: 2, name: 'Sunscreen SPF50', currentStock: 250, maxStock: 80, cost: 680, branch: 'สยาม', excessValue: 115600 },
    { id: 3, name: 'Moisturizing Cream', currentStock: 95, maxStock: 40, cost: 890, branch: 'อารีย์', excessValue: 48950 },
    { id: 4, name: 'Anti-aging Toner', currentStock: 120, maxStock: 60, cost: 750, branch: 'เซ็นทรัล', excessValue: 45000 }
  ];

  const inventoryTurnover = [
    { month: 'ม.ค.', turnover: 3.8, target: 4.0, cost: 680000 },
    { month: 'ก.พ.', turnover: 4.1, target: 4.0, cost: 720000 },
    { month: 'มี.ค.', turnover: 3.9, target: 4.0, cost: 695000 },
    { month: 'เม.ย.', turnover: 4.3, target: 4.0, cost: 650000 },
    { month: 'พ.ค.', turnover: 4.5, target: 4.0, cost: 630000 },
    { month: 'มิ.ย.', turnover: 4.2, target: 4.0, cost: 675000 }
  ];

  const categoryAnalysis = [
    { category: 'Injectable Products', value: 3200000, turnover: 5.2, margin: 65, color: '#10b981' },
    { category: 'Skincare Products', value: 2100000, turnover: 3.8, margin: 45, color: '#3b82f6' },
    { category: 'Equipment Supplies', value: 1800000, turnover: 2.1, margin: 25, color: '#8b5cf6' },
    { category: 'Consumables', value: 950000, turnover: 8.5, margin: 35, color: '#f59e0b' },
    { category: 'Supplements', value: 450000, turnover: 6.2, margin: 55, color: '#ef4444' }
  ];

  const costSavingOpportunities = [
    { opportunity: 'Bulk Purchase Discount', potentialSaving: 285000, difficulty: 'Easy', timeframe: '1 month' },
    { opportunity: 'Supplier Negotiation', potentialSaving: 420000, difficulty: 'Medium', timeframe: '3 months' },
    { opportunity: 'Inventory Optimization', potentialSaving: 180000, difficulty: 'Medium', timeframe: '2 months' },
    { opportunity: 'Cross-branch Stock Sharing', potentialSaving: 95000, difficulty: 'Hard', timeframe: '6 months' },
    { opportunity: 'Just-in-time Ordering', potentialSaving: 240000, difficulty: 'Hard', timeframe: '4 months' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Optimization</h1>
          <p className="text-gray-600">ระบบจัดการและเพิ่มประสิทธิภาพสินค้าคงคลัง</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">ทุกสาขา</option>
            <option value="siam">สาขาสยาม</option>
            <option value="thonglor">สาขาทองหล่อ</option>
            <option value="ari">สาขาอารีย์</option>
            <option value="central">สาขาเซ็นทรัล</option>
          </select>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Package className="w-4 h-4 mr-2" />
            Generate Reorder Report
          </Button>
        </div>
      </div>

      {/* Inventory Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">รายการสินค้าทั้งหมด</p>
                <p className="text-2xl font-bold">{inventorySummary.totalItems.toLocaleString()}</p>
                <p className="text-blue-100 text-xs">มูลค่า {formatCurrency(inventorySummary.totalValue)}</p>
              </div>
              <Package className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">สินค้าใกล้หมด</p>
                <p className="text-2xl font-bold">{inventorySummary.lowStockItems}</p>
                <p className="text-red-100 text-xs">ต้องสั่งเพิ่ม</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">สินค้าคงคลังเกิน</p>
                <p className="text-2xl font-bold">{inventorySummary.overstockItems}</p>
                <p className="text-orange-100 text-xs">ลดราคาขาย</p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Inventory Turnover</p>
                <p className="text-2xl font-bold">{inventorySummary.avgTurnover}</p>
                <p className="text-green-100 text-xs">ครั้งต่อปี</p>
              </div>
              <Activity className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              สินค้าใกล้หมด (Low Stock Alert)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      คงเหลือ: {item.currentStock} | ขั้นต่ำ: {item.minStock} | {item.branch}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getUrgencyColor(item.urgency)}>
                      {item.urgency}
                    </Badge>
                    <div className="text-sm font-medium mt-1">{formatCurrency(item.cost)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overstock Alert */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <TrendingDown className="h-5 w-5" />
              สินค้าคงคลังเกิน (Overstock Alert)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-orange-50">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      คงเหลือ: {item.currentStock} | สูงสุด: {item.maxStock} | {item.branch}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-600 font-medium">
                      เกิน {formatCurrency(item.excessValue)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{formatCurrency(item.cost)}/ชิ้น</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Turnover Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Inventory Turnover & Cost Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inventoryTurnover}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'cost' ? formatCurrency(Number(value)) : `${value} ครั้ง`,
                    name === 'cost' ? 'ต้นทุนสินค้า' :
                    name === 'turnover' ? 'Turnover จริง' : 'Turnover เป้าหมาย'
                  ]}
                />
                <Line dataKey="turnover" stroke="#3b82f6" strokeWidth={3} name="turnover" />
                <Line dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="target" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Category Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'value' ? formatCurrency(Number(value)) :
                    name === 'turnover' ? `${value} ครั้ง` :
                    `${value}%`,
                    name === 'value' ? 'มูลค่าสินค้า' :
                    name === 'turnover' ? 'Turnover Rate' : 'Profit Margin'
                  ]}
                />
                <Bar dataKey="turnover" fill="#3b82f6" name="turnover" />
                <Bar dataKey="margin" fill="#10b981" name="margin" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-purple-600" />
            Inventory Value by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryAnalysis}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  nameKey="category"
                >
                  {categoryAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Category Details</h3>
              {categoryAnalysis.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div>
                      <div className="font-medium">{category.category}</div>
                      <div className="text-sm text-gray-600">
                        Turnover: {category.turnover}x | Margin: {category.margin}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(category.value)}</div>
                    <div className="text-sm text-gray-600">
                      {((category.value / categoryAnalysis.reduce((sum, c) => sum + c.value, 0)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Saving Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Cost Saving Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costSavingOpportunities.map((opportunity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(opportunity.potentialSaving)}
                    </div>
                    <div className="text-xs text-gray-600">ประหยัดได้</div>
                  </div>
                  <div>
                    <h3 className="font-medium">{opportunity.opportunity}</h3>
                    <div className="text-sm text-gray-600">
                      ระยะเวลา: {opportunity.timeframe}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getDifficultyColor(opportunity.difficulty)}>
                    {opportunity.difficulty}
                  </Badge>
                  <div className="text-sm text-gray-600 mt-1">
                    ROI: {((opportunity.potentialSaving / 1000000) * 100).toFixed(1)}%
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

export default InventoryOptimization;
