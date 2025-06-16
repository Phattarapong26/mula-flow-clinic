
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Stethoscope, Glasses, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

const ServiceRevenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const serviceData = [
    {
      id: 1,
      serviceName: 'ตรวจสายตา',
      category: 'การตรวจ',
      revenue: 125000,
      sessions: 250,
      avgPrice: 500,
      growth: 15.2,
      icon: Eye
    },
    {
      id: 2,
      serviceName: 'จำหน่ายแว่นสายตา',
      category: 'สินค้า',
      revenue: 450000,
      sessions: 180,
      avgPrice: 2500,
      growth: 22.8,
      icon: Glasses
    },
    {
      id: 3,
      serviceName: 'แว่นตากันแดด',
      category: 'สินค้า',
      revenue: 280000,
      sessions: 140,
      avgPrice: 2000,
      growth: 8.5,
      icon: Glasses
    },
    {
      id: 4,
      serviceName: 'เลนส์คอนแท็ค',
      category: 'สินค้า',
      revenue: 320000,
      sessions: 320,
      avgPrice: 1000,
      growth: 18.7,
      icon: Eye
    },
    {
      id: 5,
      serviceName: 'การรักษาโรคตา',
      category: 'การรักษา',
      revenue: 380000,
      sessions: 95,
      avgPrice: 4000,
      growth: 12.3,
      icon: Stethoscope
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'การตรวจ': return 'bg-blue-100 text-blue-800';
      case 'สินค้า': return 'bg-green-100 text-green-800';
      case 'การรักษา': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth >= 20) return 'text-green-600';
    if (growth >= 10) return 'text-blue-600';
    if (growth >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalRevenue = serviceData.reduce((sum, service) => sum + service.revenue, 0);
  const totalSessions = serviceData.reduce((sum, service) => sum + service.sessions, 0);
  const avgGrowth = serviceData.reduce((sum, service) => sum + service.growth, 0) / serviceData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายได้ต่อบริการ</h1>
          <p className="text-gray-600">วิเคราะห์รายได้แยกตามประเภทบริการ</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === 'daily' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('daily')}
          >
            รายวัน
          </Button>
          <Button 
            variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('monthly')}
          >
            รายเดือน
          </Button>
          <Button 
            variant={selectedPeriod === 'yearly' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('yearly')}
          >
            รายปี
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">รายได้รวม</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">การให้บริการ</p>
                <p className="text-2xl font-bold">{totalSessions}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">การเติบโตเฉลี่ย</p>
                <p className="text-2xl font-bold">+{avgGrowth.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">บริการทั้งหมด</p>
                <p className="text-2xl font-bold">{serviceData.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Revenue Table */}
      <Card>
        <CardHeader>
          <CardTitle>รายได้แยกตามบริการ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">บริการ</th>
                  <th className="text-center p-4">หมวดหมู่</th>
                  <th className="text-right p-4">รายได้</th>
                  <th className="text-right p-4">จำนวนครั้ง</th>
                  <th className="text-right p-4">ราคาเฉลี่ย</th>
                  <th className="text-right p-4">การเติบโต</th>
                  <th className="text-center p-4">สัดส่วน</th>
                </tr>
              </thead>
              <tbody>
                {serviceData.map((service) => {
                  const ServiceIcon = service.icon;
                  const percentage = (service.revenue / totalRevenue * 100).toFixed(1);
                  
                  return (
                    <tr key={service.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ServiceIcon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{service.serviceName}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Badge className={getCategoryColor(service.category)}>
                          {service.category}
                        </Badge>
                      </td>
                      <td className="p-4 text-right font-bold">
                        {formatCurrency(service.revenue)}
                      </td>
                      <td className="p-4 text-right">
                        {service.sessions.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        {formatCurrency(service.avgPrice)}
                      </td>
                      <td className={`p-4 text-right font-medium ${getGrowthColor(service.growth)}`}>
                        +{service.growth}%
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Service Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 3 บริการที่ทำรายได้สูงสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceData
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 3)
                .map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100 text-yellow-600' :
                          index === 1 ? 'bg-gray-100 text-gray-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                        <ServiceIcon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">{service.serviceName}</span>
                      </div>
                      <span className="font-bold">{formatCurrency(service.revenue)}</span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>บริการที่เติบโตเร็วที่สุด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceData
                .sort((a, b) => b.growth - a.growth)
                .slice(0, 3)
                .map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <ServiceIcon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">{service.serviceName}</span>
                      </div>
                      <span className={`font-bold ${getGrowthColor(service.growth)}`}>
                        +{service.growth}%
                      </span>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceRevenue;
