
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const InventoryCategories = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">หมวดหมู่สินค้า</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มหมวดหมู่
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>เครื่องมือทันตกรรม</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">152 รายการ</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>วัสดุอุดฟัน</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">89 รายการ</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>วัสดุสิ้นเปลือง</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">234 รายการ</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryCategories;
