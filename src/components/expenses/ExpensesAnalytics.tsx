
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ExpensesAnalytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">วิเคราะห์ค่าใช้จ่าย</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มค่าใช้จ่าย</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">แผนภูมิแนวโน้มค่าใช้จ่ายรายเดือน</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>การแจกแจงตามหมวดหมู่</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">สัดส่วนค่าใช้จ่ายแต่ละหมวดหมู่</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpensesAnalytics;
