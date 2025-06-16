
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const StaffClaimTracking = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ติดตามสถานะเคลม</h1>

      <Card>
        <CardHeader>
          <CardTitle>ค้นหาเคลม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="ใส่เลขที่เคลม..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <Button>ค้นหา</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>สถานะเคลม CLM001</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>ส่งเคลม</span>
              <Badge>เสร็จสิ้น</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>ตรวจสอบเอกสาร</span>
              <Badge>เสร็จสิ้น</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>อนุมัติเคลม</span>
              <Badge variant="outline">กำลังดำเนินการ</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>จ่ายเงิน</span>
              <Badge variant="secondary">รอดำเนินการ</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffClaimTracking;
