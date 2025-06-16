
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, Users } from 'lucide-react';

const TasksDaily = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">งานประจำวัน</h1>
      <p className="text-gray-600">Dashboard เวร, OT, เวรซ้อน, ติดเวร</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              เวรวันนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-gray-600 text-xs">คนปฏิบัติงาน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              OT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-gray-600 text-xs">ชั่วโมงล่วงเวลา</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              เวรซ้อน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-gray-600 text-xs">เวรที่ทับซ้อน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              สถานะ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-100 text-green-800">ปกติ</Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ตารางเวรวันนี้</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-medium">เวรเช้า (08:00-16:00)</div>
                <div className="text-sm text-gray-600">นพ.สมชาย, พย.วิภา, เจ้าหน้าที่ 3 คน</div>
              </div>
              <Badge>5 คน</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium">เวรบ่าย (16:00-20:00)</div>
                <div className="text-sm text-gray-600">นพ.วิภาวดี, พย.สมหญิง, เจ้าหน้าที่ 2 คน</div>
              </div>
              <Badge>4 คน</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksDaily;
