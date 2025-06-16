
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Package } from 'lucide-react';

const TasksUpcoming = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">งานล่วงหน้า 7 วัน</h1>
      <p className="text-gray-600">Staff เห็นภาพรวมว่าจะเจอเคสอะไร, ต้องเตรียมอะไร</p>
      
      <div className="grid gap-4">
        {Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const dayName = date.toLocaleDateString('th-TH', { weekday: 'long' });
          const dateStr = date.toLocaleDateString('th-TH');
          
          return (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {dayName} - {dateStr}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <div>
                        <div className="font-medium">ตรวจตา 8 ราย</div>
                        <div className="text-sm text-gray-600">ต้องเตรียม: เครื่องตรวจ, Eye chart</div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">ปกติ</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-green-600" />
                      <div>
                        <div className="font-medium">ใส่เลนส์ 3 ราย</div>
                        <div className="text-sm text-gray-600">ต้องเตรียม: เลนส์ Progressive, Single vision</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">พร้อม</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TasksUpcoming;
