
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Truck, Phone, DollarSign, Clock, User, Building, Search } from 'lucide-react';

const VendorTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    {
      id: 1,
      name: 'Vision Tech Co.',
      contactPerson: 'คุณมาลี สุขใส',
      phone: '02-123-4567',
      email: 'mali@visiontech.com',
      pendingOrders: 5,
      outstandingAmount: 125000,
      deliverySchedule: 'ทุกวันจันทร์',
      lastDelivery: '2025-06-10',
      claimsPending: 2,
      rating: 4.5,
      paymentTerms: 'Net 30'
    },
    {
      id: 2,
      name: 'Lens Master Ltd.',
      contactPerson: 'คุณสมศักดิ์ เก่งงาม',
      phone: '02-234-5678',
      email: 'somsak@lensmaster.com',
      pendingOrders: 8,
      outstandingAmount: 85000,
      deliverySchedule: 'ทุกวันพุธ',
      lastDelivery: '2025-06-12',
      claimsPending: 0,
      rating: 4.8,
      paymentTerms: 'Net 45'
    },
    {
      id: 3,
      name: 'Premium Frames',
      contactPerson: 'คุณณัฐ รวยมาก',
      phone: '02-345-6789',
      email: 'nat@premiumframes.com',
      pendingOrders: 3,
      outstandingAmount: 45000,
      deliverySchedule: 'ทุกวันศุกร์',
      lastDelivery: '2025-06-08',
      claimsPending: 1,
      rating: 4.2,
      paymentTerms: 'COD'
    }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor ติดตาม</h1>
          <p className="text-gray-600">จัดการและติดตาม Vendor ทั้งหมด</p>
        </div>
        <Button>
          <Building className="h-4 w-4 mr-2" />
          เพิ่ม Vendor ใหม่
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vendor ทั้งหมด</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">คำสั่งซื้อรอ</p>
                <p className="text-2xl font-bold">16</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">หนี้ค้างรวม</p>
                <p className="text-2xl font-bold">₿255K</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เคลมรอ</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหา Vendor หรือผู้ติดต่อ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendors List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{vendor.name}</CardTitle>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <User className="h-4 w-4" />
                    {vendor.contactPerson}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getRatingColor(vendor.rating)}`}>
                    ⭐ {vendor.rating}
                  </div>
                  <Badge variant="outline" className="mt-1">{vendor.paymentTerms}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">คำสั่งซื้อรอ:</span>
                  <p className="font-bold text-orange-600">{vendor.pendingOrders} รายการ</p>
                </div>
                <div>
                  <span className="text-gray-500">หนี้ค้าง:</span>
                  <p className="font-bold text-red-600">₿{vendor.outstandingAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">เคลมรอ:</span>
                  <p className="font-bold text-purple-600">{vendor.claimsPending} รายการ</p>
                </div>
                <div>
                  <span className="text-gray-500">ส่งของล่าสุด:</span>
                  <p className="font-medium">{new Date(vendor.lastDelivery).toLocaleDateString('th-TH')}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-500">รอบส่งของ:</span>
                    <p className="font-medium">{vendor.deliverySchedule}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      โทร
                    </Button>
                    <Button size="sm">ดูรายละเอียด</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorTracking;
