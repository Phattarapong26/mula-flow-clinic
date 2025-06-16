
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, FileText, Phone } from 'lucide-react';

const TasksAssigned = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">งานที่ได้รับมอบหมาย</h1>
      <p className="text-gray-600">CRM Follow-up, เคลมลูกค้า, แจ้ง vendor</p>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              CRM Follow-up Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">ติดตามคุณสมชาย - คอร์สรักษา</div>
                  <div className="text-sm text-gray-600">ครบกำหนด: วันนี้ 14:00</div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">สำคัญ</Badge>
                  <Button size="sm">ดำเนินการ</Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">โทรติดตามนัดครั้งต่อไป - คุณวิภา</div>
                  <div className="text-sm text-gray-600">ครบกำหนด: พรุ่งนี้ 10:00</div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-yellow-100 text-yellow-800">รอ</Badge>
                  <Button size="sm" variant="outline">วางแผน</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              เคลมลูกค้า
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">เคลม #CLM001 - แว่นเปลี่ยนเลนส์</div>
                  <div className="text-sm text-gray-600">รอการอนุมัติจาก vendor</div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">รอดำเนินการ</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-600" />
              แจ้ง Vendor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">แจ้งบริษัทเลนส์ - สต็อกเลนส์หมด</div>
                  <div className="text-sm text-gray-600">ต้องการเลนส์ Progressive 20 คู่</div>
                </div>
                <Button size="sm">โทรแจ้ง</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksAssigned;
