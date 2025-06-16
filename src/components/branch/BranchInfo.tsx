
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, DollarSign, MapPin, Phone, Calendar } from 'lucide-react';
import { branches } from '@/data/branchMockData';

const BranchInfo = () => {
  const currentBranch = branches[0]; // สมมติว่าเป็นสาขาปัจจุบัน

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">ข้อมูลสาขา</h1>
        <Badge variant={currentBranch.status === 'active' ? 'default' : 'secondary'}>
          {currentBranch.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              ข้อมูลทั่วไป
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">ชื่อสาขา</label>
              <p className="text-lg font-semibold">{currentBranch.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">ผู้จัดการสาขา</label>
              <p className="text-base">{currentBranch.manager}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">พื้นที่</label>
              <p className="text-base">{currentBranch.area}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">วันที่ก่อตั้ง</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-base">{new Date(currentBranch.establishedDate).toLocaleDateString('th-TH')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              ข้อมูลติดต่อ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">ที่อยู่</label>
              <p className="text-base">{currentBranch.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">เบอร์โทรศัพท์</label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <p className="text-base">{currentBranch.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">จำนวนพนักงาน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{currentBranch.totalStaff}</p>
                <p className="text-xs text-gray-500">คน</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">รายได้รายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{currentBranch.monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">บาท</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">เป้าหมายรายเดือน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Building className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{currentBranch.monthlyTarget.toLocaleString()}</p>
                <p className="text-xs text-gray-500">บาท</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BranchInfo;
