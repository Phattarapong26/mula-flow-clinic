
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, AlertTriangle, Users } from 'lucide-react';

const StaffShifts = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">เวรพนักงาน</h1>
      <p className="text-gray-600">ตารางเวร, ช่องว่าง, การชน, คนขาด</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              เวรวันนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-gray-600 text-xs">คนปฏิบัติงาน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              ช่องว่าง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-gray-600 text-xs">ตำแหน่งว่าง</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              การชนเวร
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-gray-600 text-xs">เวรที่ทับซ้อน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2" />
              คนขาด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-gray-600 text-xs">ไม่มาทำงาน</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            ตารางเวรสัปดาห์นี้
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3">วัน/เวลา</th>
                  <th className="text-left p-3">08:00-12:00</th>
                  <th className="text-left p-3">12:00-16:00</th>
                  <th className="text-left p-3">16:00-20:00</th>
                  <th className="text-left p-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium">จันทร์</td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div>นพ.สมชาย</div>
                      <div>พย.สมหญิง</div>
                      <div className="text-gray-600">+2 คน</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div>นพ.วิภาวดี</div>
                      <div>พย.ชำนาญ</div>
                      <div className="text-red-600">ขาด 1 คน</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div>นพ.สมชาย</div>
                      <div>พย.วิภา</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge className="bg-yellow-100 text-yellow-800">ขาดคน</Badge>
                  </td>
                </tr>
                
                <tr className="border-b">
                  <td className="p-3 font-medium">อังคาร</td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div>นพ.วิภาวดี</div>
                      <div>พย.สมหญิง</div>
                      <div className="text-gray-600">+3 คน</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div>นพ.สมชาย</div>
                      <div>พย.วิภา</div>
                      <div className="text-gray-600">+2 คน</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-red-600">
                      ไม่มีหมอ
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge className="bg-red-100 text-red-800">วิกฤต</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          จัดตารางเวร
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          หาคนแทน
        </Button>
      </div>
    </div>
  );
};

export default StaffShifts;
