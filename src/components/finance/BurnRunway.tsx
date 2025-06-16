
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, AlertTriangle, TrendingDown, Calendar } from 'lucide-react';

const BurnRunway = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Burn Rate / Runway</h1>
      <p className="text-gray-600">เงินไหม้/เดือน → วิ่งต่อได้อีกกี่เดือน</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingDown className="w-4 h-4 mr-2" />
              Burn Rate เดือนนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿420,000</div>
            <p className="text-red-100 text-xs">เพิ่มขึ้น 8% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              เงินสดคงเหลือ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿5,200,000</div>
            <p className="text-blue-100 text-xs">ลดลง 3.2% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Runway คงเหลือ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4</div>
            <p className="text-orange-100 text-xs">เดือน (ลดลงจาก 13.5 เดือน)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            วิเคราะห์ Burn Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">เงินเดือนพนักงาน</span>
                <span className="text-lg font-bold">฿280,000 (67%)</span>
              </div>
              <Progress value={67} className="mb-2" />
              <div className="text-sm text-gray-600">ค่าใช้จ่ายหลักที่สำคัญที่สุด</div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">ค่าเช่าและสาธารณูปโภค</span>
                <span className="text-lg font-bold">฿85,000 (20%)</span>
              </div>
              <Progress value={20} className="mb-2" />
              <div className="text-sm text-gray-600">รวมค่าเช่า ไฟ น้ำ อินเทอร์เน็ต</div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">ค่าใช้จ่ายอื่นๆ</span>
                <span className="text-lg font-bold">฿55,000 (13%)</span>
              </div>
              <Progress value={13} className="mb-2" />
              <div className="text-sm text-gray-600">อุปกรณ์การแพทย์, การตลาด, อื่นๆ</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">💡 คำแนะนำ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-yellow-800">
            <p>• Runway 12.4 เดือน อยู่ในเกณฑ์ปลอดภัย แต่ควรเฝ้าระวัง</p>
            <p>• ควรลด Burn Rate โดยการปรับปรุงประสิทธิภาพการทำงาน</p>
            <p>• พิจารณาเพิ่มรายได้จากบริการใหม่หรือขยายลูกค้าเก่า</p>
            <p>• ตั้งเป้าลด Burn Rate ลง 10% ภายใน 3 เดือน</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BurnRunway;
