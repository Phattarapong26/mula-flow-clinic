
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';

const TasksOverdue = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-600">Task ลืมทำ</h1>
      <p className="text-gray-600">อะไรที่ "เกิน Due" แต่ยังไม่ทำ = แดง</p>
      
      <div className="grid gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              งานเกินกำหนด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">ติดตามลูกค้า - คุณสมศรี</div>
                  <div className="text-sm text-red-600 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    เกินกำหนด: 3 วัน
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-red-100 text-red-800">เร่งด่วน</Badge>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">ดำเนินการ</Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-white border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">ส่งรายงานยอดขาย</div>
                  <div className="text-sm text-red-600 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    เกินกำหนด: 1 วัน
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-orange-100 text-orange-800">ดำเนินการ</Badge>
                  <Button size="sm" variant="outline">ดูรายละเอียด</Button>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-white border border-red-200 rounded-lg">
                <div>
                  <div className="font-medium text-red-800">เช็คสต็อกเลนส์</div>
                  <div className="text-sm text-red-600 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    เกินกำหนด: 5 วัน
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-red-100 text-red-800">วิกฤต</Badge>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">ดำเนินการทันที</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksOverdue;
