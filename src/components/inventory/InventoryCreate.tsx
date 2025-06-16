
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InventoryCreate = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">เพิ่มสินค้าใหม่</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลสินค้า</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ชื่อสินค้า</label>
              <input type="text" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">หมวดหมู่</label>
              <select className="w-full p-2 border rounded-lg">
                <option>เลือกหมวดหมู่</option>
                <option>เครื่องมือ</option>
                <option>วัสดุ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">จำนวนเริ่มต้น</label>
              <input type="number" className="w-full p-2 border rounded-lg" />
            </div>
            <Button>บันทึกสินค้า</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryCreate;
