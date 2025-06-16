
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Clock, CheckCircle2, FileText } from 'lucide-react';

const LensClaimStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">เคลมทั้งหมด</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <Eye className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">รอการอนุมัติ</p>
              <p className="text-2xl font-bold">23</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">อนุมัติแล้ว</p>
              <p className="text-2xl font-bold">118</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">มูลค่ารวม</p>
              <p className="text-2xl font-bold">₿1.8M</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LensClaimStats;
