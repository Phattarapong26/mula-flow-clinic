
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const StaffClaimHistory = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ประวัติเคลม</h1>

      <Card>
        <CardHeader>
          <CardTitle>ค้นหาประวัติเคลม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาเคลม..."
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
                  <th className="text-left p-4">เลขที่เคลม</th>
                  <th className="text-left p-4">ผู้ป่วย</th>
                  <th className="text-left p-4">การรักษา</th>
                  <th className="text-left p-4">ค่าใช้จ่าย</th>
                  <th className="text-left p-4">สถานะ</th>
                  <th className="text-left p-4">วันที่</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">CLM001</td>
                  <td className="p-4">นายสมชาย ใจดี</td>
                  <td className="p-4">อุดฟัน</td>
                  <td className="p-4">₿2,500</td>
                  <td className="p-4">
                    <Badge>อนุมัติแล้ว</Badge>
                  </td>
                  <td className="p-4">15/06/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffClaimHistory;
