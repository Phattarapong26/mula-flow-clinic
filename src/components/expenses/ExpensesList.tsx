
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';

const ExpensesList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">รายการค่าใช้จ่าย</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มรายจ่าย
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรองรายจ่าย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหารายจ่าย..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              กรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4">วันที่</th>
                  <th className="text-left p-4">รายการ</th>
                  <th className="text-left p-4">หมวดหมู่</th>
                  <th className="text-left p-4">จำนวนเงิน</th>
                  <th className="text-left p-4">สถานะ</th>
                  <th className="text-left p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">15/06/2025</td>
                  <td className="p-4">ค่าเช่าอาคาร</td>
                  <td className="p-4">ค่าใช้จ่ายคงที่</td>
                  <td className="p-4">₿45,000</td>
                  <td className="p-4">
                    <Badge>อนุมัติแล้ว</Badge>
                  </td>
                  <td className="p-4">
                    <Button size="sm" variant="outline">ดูรายละเอียด</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesList;
