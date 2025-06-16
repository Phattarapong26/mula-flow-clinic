
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';

const InventoryList = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">รายการสินค้าคงคลัง</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มสินค้า
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ค้นหาและกรองสินค้า</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
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
                  <th className="text-left p-4">รหัสสินค้า</th>
                  <th className="text-left p-4">ชื่อสินค้า</th>
                  <th className="text-left p-4">หมวดหมู่</th>
                  <th className="text-left p-4">คงเหลือ</th>
                  <th className="text-left p-4">สถานะ</th>
                  <th className="text-left p-4">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">INV001</td>
                  <td className="p-4">เครื่องมือทำฟัน A1</td>
                  <td className="p-4">เครื่องมือ</td>
                  <td className="p-4">5</td>
                  <td className="p-4">
                    <Badge variant="destructive">ใกล้หมด</Badge>
                  </td>
                  <td className="p-4">
                    <Button size="sm" variant="outline">แก้ไข</Button>
                  </td>
                </tr>
                {/* More rows... */}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryList;
