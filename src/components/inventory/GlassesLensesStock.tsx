
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, Search, MapPin, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const GlassesLensesStock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const stockData = [
    {
      id: 1,
      itemName: 'กรอบแว่น Progressive',
      type: 'กรอบ',
      branch: 'สาขาสยาม',
      inStock: 25,
      reserved: 5,
      available: 20,
      minLevel: 10,
      status: 'normal'
    },
    {
      id: 2,
      itemName: 'เลนส์ Single Vision',
      type: 'เลนส์',
      branch: 'สาขาเอกมัย',
      inStock: 8,
      reserved: 3,
      available: 5,
      minLevel: 15,
      status: 'low'
    },
    {
      id: 3,
      itemName: 'กรอบแว่น Titanium',
      type: 'กรอบ',
      branch: 'สาขาสยาม',
      inStock: 0,
      reserved: 0,
      available: 0,
      minLevel: 5,
      status: 'out'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'out': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'ปกติ';
      case 'low': return 'ใกล้หมด';
      case 'out': return 'หมดสต็อก';
      default: return 'ไม่ทราบ';
    }
  };

  const branches = ['all', 'สาขาสยาม', 'สาขาเอกมัย', 'สาขาอโศก'];

  const filteredData = stockData.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || item.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">คงคลังแว่น / เลนส์</h1>
          <p className="text-gray-600">ติดตามสต็อกแว่นและเลนส์แยกตามสาขา</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รายการทั้งหมด</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">สต็อกปกติ</p>
                <p className="text-2xl font-bold">128</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ใกล้หมด</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">หมดสต็อก</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาสินค้า..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="p-2 border rounded-lg"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>
                    {branch === 'all' ? 'ทุกสาขา' : branch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายการสต็อก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">รายการ</th>
                  <th className="text-left p-4">ประเภท</th>
                  <th className="text-left p-4">สาขา</th>
                  <th className="text-right p-4">ในสต็อก</th>
                  <th className="text-right p-4">จอง</th>
                  <th className="text-right p-4">พร้อมใช้</th>
                  <th className="text-right p-4">ขั้นต่ำ</th>
                  <th className="text-center p-4">สถานะ</th>
                  <th className="text-center p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{item.itemName}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{item.type}</Badge>
                    </td>
                    <td className="p-4 text-gray-600">{item.branch}</td>
                    <td className="p-4 text-right font-medium">{item.inStock}</td>
                    <td className="p-4 text-right text-orange-600">{item.reserved}</td>
                    <td className="p-4 text-right font-bold">{item.available}</td>
                    <td className="p-4 text-right text-gray-500">{item.minLevel}</td>
                    <td className="p-4 text-center">
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="outline">ดู</Button>
                        {item.status !== 'normal' && (
                          <Button size="sm">สั่งซื้อ</Button>
                        )}
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

export default GlassesLensesStock;
