
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';

const LeaveAttendance = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ลา / ขาด / OT</h1>
      <p className="text-gray-600">ตารางรวม พร้อมเหตุผล</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ลาวันนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-gray-600 text-xs">คน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ขาดงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-gray-600 text-xs">คน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OT เดือนนี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45</div>
            <p className="text-gray-600 text-xs">ชั่วโมง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">รอพิจารณา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">5</div>
            <p className="text-gray-600 text-xs">ใบลา</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายการลา/ขาด/OT ล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-medium">นพ.สมชาย รักษาดี</div>
                  <div className="text-sm text-gray-600">ลาป่วย: 16-17 มิ.ย. 2025</div>
                  <div className="text-sm text-gray-500">เหตุผล: ป่วยไข้หวัดใหญ่</div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">อนุมัติ</Badge>
                <div className="text-sm text-gray-600 mt-1">2 วัน</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-red-600" />
                <div>
                  <div className="font-medium">นาง สุกัญญา ขายดี</div>
                  <div className="text-sm text-gray-600">ขาดงาน: 15 มิ.ย. 2025</div>
                  <div className="text-sm text-gray-500">ไม่แจ้งล่วงหน้า</div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-red-100 text-red-800">ขาดงาน</Badge>
                <div className="text-sm text-gray-600 mt-1">1 วัน</div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-green-600" />
                <div>
                  <div className="font-medium">นพ.วิภาวดี ใสสะอาด</div>
                  <div className="text-sm text-gray-600">OT: 14 มิ.ย. 2025 (18:00-22:00)</div>
                  <div className="text-sm text-gray-500">เพิ่มเวรคิวฉุกเฉิน</div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-blue-100 text-blue-800">OT</Badge>
                <div className="text-sm text-gray-600 mt-1">4 ชม.</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveAttendance;
