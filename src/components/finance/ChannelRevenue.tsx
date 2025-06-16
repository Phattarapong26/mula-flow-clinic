
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Globe, Phone, Users, Download } from 'lucide-react';

interface ChannelData {
  channel: string;
  revenue: number;
  growth: number;
  customers: number;
  avgTicket: number;
  icon: React.ReactNode;
}

const ChannelRevenue = () => {
  const channelData: ChannelData[] = [
    {
      channel: 'Walk-in',
      revenue: 1250000,
      growth: 15.2,
      customers: 342,
      avgTicket: 3655,
      icon: <Users className="h-6 w-6" />
    },
    {
      channel: 'Online Booking',
      revenue: 890000,
      growth: 28.5,
      customers: 198,
      avgTicket: 4495,
      icon: <Globe className="h-6 w-6" />
    },
    {
      channel: 'Phone Call',
      revenue: 650000,
      growth: -5.8,
      customers: 156,
      avgTicket: 4167,
      icon: <Phone className="h-6 w-6" />
    },
    {
      channel: 'Referral',
      revenue: 450000,
      growth: 12.3,
      customers: 89,
      avgTicket: 5056,
      icon: <Users className="h-6 w-6" />
    }
  ];

  const totalRevenue = channelData.reduce((sum, channel) => sum + channel.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายได้ต่อช่อง</h1>
          <p className="text-gray-600">วิเคราะห์รายได้จากช่องทางการติดต่อต่างๆ</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          ส่งออกรายงาน
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">รายได้รวมทุกช่องทาง</p>
              <p className="text-3xl font-bold">₿{(totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <TrendingUp className="h-12 w-12 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      {/* Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {channelData.map((channel, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {channel.icon}
                  </div>
                  <CardTitle className="text-lg">{channel.channel}</CardTitle>
                </div>
                <Badge 
                  className={channel.growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                >
                  {channel.growth >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(channel.growth)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">รายได้</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₿{(channel.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ลูกค้า</p>
                    <p className="text-lg font-semibold">{channel.customers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">ค่าเฉลี่ย/คน</p>
                    <p className="text-lg font-semibold">₿{channel.avgTicket.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>สัดส่วนรายได้</span>
                    <span>{((channel.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(channel.revenue / totalRevenue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>การวิเคราะห์เชิงลึก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">ช่องทางที่เติบโตสูงสุด</h3>
              <p className="text-2xl font-bold text-green-600">Online Booking</p>
              <p className="text-sm text-green-600">+28.5% เทียบเดือนก่อน</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">ช่องทางรายได้สูงสุด</h3>
              <p className="text-2xl font-bold text-blue-600">Walk-in</p>
              <p className="text-sm text-blue-600">₿1.25M (39.1%)</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">ค่าเฉลี่ยสูงสุด</h3>
              <p className="text-2xl font-bold text-purple-600">Referral</p>
              <p className="text-sm text-purple-600">₿5,056 ต่อคน</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">ข้อเสนอแนะ</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• เพิ่มการลงทุนใน Online Booking เนื่องจากมีการเติบโตสูง</li>
              <li>• ปรับปรุงกระบวนการ Phone Call เนื่องจากมีแนวโน้มลดลง</li>
              <li>• ส่งเสริมโปรแกรม Referral เนื่องจากมีค่าเฉลี่ยต่อคนสูง</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelRevenue;
