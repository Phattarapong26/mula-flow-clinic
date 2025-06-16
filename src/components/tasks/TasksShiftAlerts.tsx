
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Calendar, Users } from 'lucide-react';

const TasksShiftAlerts = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">แจ้งเตือนเวรหลุด</h1>
      <p className="text-gray-600">AI เตือน: ไม่มีหมอใน slot ที่จองไว้</p>
      
      <div className="grid gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              เตือนเร่งด่วน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">ไม่มีหมอเวรบ่าย วันศุกร์</div>
                  <div className="text-sm text-red-600">18 มิ.ย. 2025 (16:00-20:00) - มีนัด 8 ราย</div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-red-100 text-red-800">วิกฤต</Badge>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">หาคนแทน</Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">ขาดพยาบาลเวรเช้า</div>
                  <div className="text-sm text-red-600">20 มิ.ย. 2025 (08:00-16:00) - มีนัด 12 ราย</div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-orange-100 text-orange-800">สำคัญ</Badge>
                  <Button size="sm" variant="outline">จัดเวร</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Bell className="h-5 w-5" />
              แจ้งเตือนล่วงหน้า
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white border border-yellow-200 rounded-lg">
                <div>
                  <div className="font-medium text-yellow-800">เตือนเวรสัปดาหน้า</div>
                  <div className="text-sm text-yellow-700">25 มิ.ย. 2025 - ยังไม่มีการจัดเวรเช้า</div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">เตือน</Badge>
                  <Button size="sm" variant="outline">วางแผน</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              สถิติเวรหลุดเดือนนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-blue-700">ครั้งที่หลุด</div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-green-700">หาคนแทนได้</div>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">1</div>
                <div className="text-sm text-red-700">ยกเลิกนัด</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksShiftAlerts;
