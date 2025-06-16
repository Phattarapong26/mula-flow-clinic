
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, TrendingUp, Gift, Download } from 'lucide-react';

interface PromotionData {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  usageCount: number;
  revenue: number;
  customerCount: number;
  averageTicket: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'upcoming';
}

const PopularPromotions = () => {
  const promotionData: PromotionData[] = [
    {
      id: 'PROMO001',
      name: 'สายตาสดใส 2024',
      description: 'ซื้อกรอบแว่น แถมเลนส์ฟรี',
      discountType: 'percentage',
      discountValue: 50,
      usageCount: 234,
      revenue: 1680000,
      customerCount: 198,
      averageTicket: 8485,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active'
    },
    {
      id: 'PROMO002', 
      name: 'ตรวจตาฟรี',
      description: 'ตรวจสายตาฟรี เมื่อซื้อแว่นตั้งแต่ 3,000 บาท',
      discountType: 'fixed',
      discountValue: 500,
      usageCount: 187,
      revenue: 934000,
      customerCount: 156,
      averageTicket: 5987,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      status: 'active'
    },
    {
      id: 'PROMO003',
      name: 'Progressive ราคาพิเศษ',
      description: 'เลนส์ Progressive ลด 30%',
      discountType: 'percentage',
      discountValue: 30,
      usageCount: 145,
      revenue: 1450000,
      customerCount: 89,
      averageTicket: 16292,
      startDate: '2024-05-01',
      endDate: '2024-07-31',
      status: 'active'
    },
    {
      id: 'PROMO004',
      name: 'คอนแทคเลนส์ 1 แถม 1',
      description: 'ซื้อคอนแทคเลนส์ 1 กล่อง แถม 1 กล่อง',
      discountType: 'percentage',
      discountValue: 50,
      usageCount: 98,
      revenue: 490000,
      customerCount: 78,
      averageTicket: 6282,
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      status: 'expired'
    },
    {
      id: 'PROMO005',
      name: 'Back to School',
      description: 'แว่นเด็กลดราคา 40%',
      discountType: 'percentage',
      discountValue: 40,
      usageCount: 67,
      revenue: 268000,
      customerCount: 45,
      averageTicket: 5956,
      startDate: '2024-07-15',
      endDate: '2024-08-31',
      status: 'upcoming'
    }
  ];

  const totalUsage = promotionData.reduce((sum, promo) => sum + promo.usageCount, 0);
  const totalRevenue = promotionData.reduce((sum, promo) => sum + promo.revenue, 0);
  const activePromotions = promotionData.filter(promo => promo.status === 'active').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ใช้งานได้';
      case 'expired': return 'หมดอายุ';
      case 'upcoming': return 'กำลังจะมา';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">โปรที่ลูกค้าใช้เยอะสุด</h1>
          <p className="text-gray-600">วิเคราะห์ประสิทธิภาพของโปรโมชั่นต่างๆ</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          ส่งออกรายงาน
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">การใช้งานรวม</p>
                <p className="text-2xl font-bold">{totalUsage}</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">รายได้จากโปร</p>
                <p className="text-2xl font-bold">₿{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">โปรที่ใช้งานได้</p>
                <p className="text-2xl font-bold">{activePromotions}</p>
              </div>
              <Gift className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">โปรโมชั่นทั้งหมด</p>
                <p className="text-2xl font-bold">{promotionData.length}</p>
              </div>
              <Star className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Promotions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {promotionData
          .sort((a, b) => b.usageCount - a.usageCount)
          .map((promotion, index) => (
          <Card key={promotion.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{promotion.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(promotion.status)}>
                  {getStatusText(promotion.status)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">{promotion.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">การใช้งาน</p>
                    <p className="text-xl font-bold text-gray-900">{promotion.usageCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">รายได้</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₿{(promotion.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ลูกค้า</p>
                    <p className="text-xl font-bold text-gray-900">{promotion.customerCount}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ส่วนลด</p>
                    <p className="text-lg font-semibold">
                      {promotion.discountType === 'percentage' 
                        ? `${promotion.discountValue}%` 
                        : `₿${promotion.discountValue}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ค่าเฉลี่ย/คน</p>
                    <p className="text-lg font-semibold">₿{promotion.averageTicket.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>สัดส่วนการใช้งาน</span>
                    <span>{((promotion.usageCount / totalUsage) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(promotion.usageCount / totalUsage) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600 pt-2">
                  <span>ระยะเวลา: {promotion.startDate} - {promotion.endDate}</span>
                  {index === 0 && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      <Star className="h-3 w-3 mr-1" />
                      ยอดนิยม
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเชิงลึก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800">โปรยอดนิยม</h3>
              <p className="text-xl font-bold text-yellow-600">สายตาสดใส 2024</p>
              <p className="text-sm text-yellow-600">234 ครั้ง</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">รายได้สูงสุด</h3>
              <p className="text-xl font-bold text-green-600">สายตาสดใส 2024</p>
              <p className="text-sm text-green-600">₿1.68M</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">ค่าเฉลี่ยสูงสุด</h3>
              <p className="text-xl font-bold text-purple-600">Progressive ราคาพิเศษ</p>
              <p className="text-sm text-purple-600">₿16,292</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">ข้อเสนอแนะ</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• โปร "สายตาสดใส 2024" มีความนิยมสูง ควรต่ออายุหรือสร้างโปรที่คล้ายคลึง</li>
              <li>• โปร Progressive มีค่าเฉลี่ยสูง แต่การใช้งานน้อย ควรปรับกลยุทธ์การตลาด</li>
              <li>• เตรียมโปร "Back to School" ให้พร้อมเนื่องจากใกล้เวลาเปิดเทอม</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PopularPromotions;
