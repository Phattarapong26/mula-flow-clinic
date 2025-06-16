
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StaffClaimCreate = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">สร้างเคลมประกันใหม่</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเคลม</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อผู้ป่วย</label>
              <input type="text" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">การรักษา</label>
              <select className="w-full p-2 border rounded-lg">
                <option>เลือกการรักษา</option>
                <option>อุดฟัน</option>
                <option>ขูดหินปูน</option>
                <option>ถอนฟัน</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ค่าใช้จ่าย</label>
              <input type="number" className="w-full p-2 border rounded-lg" />
            </div>
            <Button>สร้างเคลม</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffClaimCreate;
