
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExpensesCreate = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">บันทึกค่าใช้จ่าย</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลรายจ่าย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">รายการ</label>
              <input type="text" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">หมวดหมู่</label>
              <select className="w-full p-2 border rounded-lg">
                <option>เลือกหมวดหมู่</option>
                <option>ค่าใช้จ่ายคงที่</option>
                <option>ค่าใช้จ่ายแปรผัน</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">จำนวนเงิน</label>
              <input type="number" className="w-full p-2 border rounded-lg" />
            </div>
            <Button>บันทึกรายจ่าย</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesCreate;
