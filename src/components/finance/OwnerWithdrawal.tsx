
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HandCoins, FileText, TrendingUp, AlertCircle } from 'lucide-react';

const OwnerWithdrawal = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Owner Withdrawal</h1>
      <p className="text-gray-600">เจ้าของถอนเท่าไหร่, เป็นค่าใช้จ่ายส่วนตัวไหม</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <HandCoins className="w-4 h-4 mr-2" />
              ถอนเดือนนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿180,000</div>
            <p className="text-purple-100 text-xs">เท่ากับเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              ถอนปีนี้รวม
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿1,080,000</div>
            <p className="text-green-100 text-xs">เฉลี่ย ฿180,000/เดือน</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              % ของกำไร
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20.2%</div>
            <p className="text-orange-100 text-xs">จากกำไรสุทธิ</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ประวัติการถอนเงิน 6 เดือนล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <div className="font-medium">มิถุนายน 2025</div>
                <div className="text-sm text-gray-600">เจ้าของบริษัท - เงินเดือน + โบนัส</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">฿180,000</div>
                <Badge className="bg-blue-100 text-blue-800">เงินเดือน</Badge>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <div className="font-medium">พฤษภาคม 2025</div>
                <div className="text-sm text-gray-600">เจ้าของบริษัท - เงินเดือน</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">฿180,000</div>
                <Badge className="bg-blue-100 text-blue-800">เงินเดือน</Badge>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <div className="font-medium">เมษายน 2025</div>
                <div className="text-sm text-gray-600">ค่าใช้จ่ายส่วนตัว - รถยนต์</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">฿45,000</div>
                <Badge className="bg-yellow-100 text-yellow-800">ส่วนตัว</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            การวิเคราะห์และข้อแนะนำ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-orange-800">
            <div className="flex justify-between items-center">
              <span>สัดส่วนการถอนต่อกำไร:</span>
              <span className="font-bold">20.2% (เหมาะสม)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>เปรียบเทียบกับปีที่แล้ว:</span>
              <span className="font-bold">ลดลง 5%</span>
            </div>
            <div className="pt-3 border-t border-orange-200">
              <h4 className="font-semibold mb-2">คำแนะนำ:</h4>
              <ul className="space-y-1 text-sm">
                <li>• การถอนอยู่ในเกณฑ์เหมาะสม ไม่กระทบกระแสเงินสด</li>
                <li>• ควรแยกค่าใช้จ่ายส่วนตัวออกจากเงินเดือนให้ชัดเจน</li>
                <li>• พิจารณาเพิ่มการลงทุนในธุรกิจแทนการถอนมากเกินไป</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerWithdrawal;
