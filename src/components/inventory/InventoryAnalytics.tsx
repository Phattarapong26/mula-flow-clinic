
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InventoryAnalytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">วิเคราะห์คลังสินค้า</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>การใช้งานสินค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">แผนภูมิการใช้งานสินค้าแต่ละประเภท</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ประสิทธิภาพการจัดการ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">วิเคราะห์ประสิทธิภาพการจัดการสต็อก</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryAnalytics;
