
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const ExpensesCategories = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">หมวดหมู่ค่าใช้จ่าย</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มหมวดหมู่
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ค่าใช้จ่ายคงที่</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">₿125,000 / เดือน</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ค่าใช้จ่ายแปรผัน</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">₿85,000 / เดือน</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ค่าใช้จ่ายเฉพาะกิจ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">₿25,000 / เดือน</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpensesCategories;
