
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  Package,
  Target,
  BarChart3,
  Activity,
  Star
} from 'lucide-react';
import CustomerAnalyticsDashboard from '@/components/analytics/CustomerAnalyticsDashboard';
import FinancialKPIDashboard from '@/components/analytics/FinancialKPIDashboard';
import StaffPerformanceAnalytics from '@/components/analytics/StaffPerformanceAnalytics';
import InventoryOptimization from '@/components/analytics/InventoryOptimization';
import LeadConversionDashboard from '@/components/analytics/LeadConversionDashboard';
import { useLocation, Link } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  // Analytics module overview data
  const analyticsModules = [
    {
      title: 'Customer Analytics',
      description: 'วิเคราะห์ลูกค้าเชิงลึก, CLV, Segmentation',
      icon: Users,
      path: '/analytics/customers',
      value: '969 ลูกค้า',
      change: '+18.5%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Financial KPIs',
      description: 'ตัวชี้วัดทางการเงิน, Profitability, Cash Flow',
      icon: DollarSign,
      path: '/analytics/financial',
      value: '฿12.85M',
      change: '+24.2%',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Staff Performance',
      description: 'ประสิทธิภาพพนักงาน, Revenue Attribution',
      icon: TrendingUp,
      path: '/analytics/staff',
      value: '45 คน',
      change: '+12.1%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Inventory Optimization',
      description: 'จัดการสินค้าคงคลัง, Cost Optimization',
      icon: Package,
      path: '/analytics/inventory',
      value: '1,250 รายการ',
      change: '-8.3%',
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Lead Conversion',
      description: 'ติดตาม Lead, Conversion Optimization',
      icon: Target,
      path: '/analytics/leads',
      value: '34.0%',
      change: '+5.7%',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const businessInsights = [
    {
      insight: 'VIP Customers มีอัตราการกลับมาใช้บริการ 85% และสร้างรายได้ 66% ของรายได้รวม',
      action: 'เพิ่ม VIP Program และ Personalized Service',
      impact: 'High',
      module: 'Customer Analytics'
    },
    {
      insight: 'สาขาทองหล่อมี Profit Margin สูงสุด 38.5% เนื่องจากค่าเช่าต่ำ',
      action: 'ขยายโมเดลสาขาในพื้นที่ คล้ายกัน',
      impact: 'High',
      module: 'Financial KPIs'
    },
    {
      insight: 'พนักงานที่มี Utilization > 85% สร้างรายได้เฉลี่ย 425,000 บาท/เดือน',
      action: 'เพิ่ม Utilization ของพนักงานที่มีประสิทธิภาพต่ำ',
      impact: 'Medium',
      module: 'Staff Performance'
    },
    {
      insight: 'สินค้าหมวด Injectable มี Turnover 5.2x แต่มีต้นทุน holding สูง',
      action: 'ปรับ Just-in-time ordering สำหรับสินค้าราคาแพง',
      impact: 'Medium',
      module: 'Inventory'
    },
    {
      insight: 'Google Ads มี Conversion Rate 40% แต่ Cost per Lead สูง',
      action: 'เพิ่ม Budget ใน Google Ads และปรับ Facebook Ads',
      impact: 'High',
      module: 'Lead Conversion'
    }
  ];

  const renderDashboardOverview = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics Dashboard</h1>
          <p className="text-gray-600">ระบบวิเคราะห์ธุรกิจด้วย AI เพื่อเพิ่มประสิทธิภาพและกำไร</p>
        </div>
      </div>

      {/* Analytics Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsModules.map((module, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <Link to={module.path}>
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-900">{module.value}</div>
                  <div className={`text-sm font-medium ${
                    module.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {module.change}
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Business Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-600" />
            AI-Powered Business Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businessInsights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{insight.insight}</h4>
                    <p className="text-green-700 text-sm mb-2">💡 แนวทาง: {insight.action}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                      insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {insight.impact} Impact
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{insight.module}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-6 h-6" />
              <span>Generate Report</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
              <Target className="w-6 h-6" />
              <span>Set KPI Targets</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
              <Users className="w-6 h-6" />
              <span>Segment Customers</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700">
              <Package className="w-6 h-6" />
              <span>Optimize Inventory</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render specific dashboard based on route
  const renderContent = () => {
    switch (location.pathname) {
      case '/analytics/customers':
        return <CustomerAnalyticsDashboard />;
      case '/analytics/financial':
        return <FinancialKPIDashboard />;
      case '/analytics/staff':
        return <StaffPerformanceAnalytics />;
      case '/analytics/inventory':
        return <InventoryOptimization />;
      case '/analytics/leads':
        return <LeadConversionDashboard />;
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div>
      <Routes>
        <Route index element={renderContent()} />
        <Route path="customers" element={<CustomerAnalyticsDashboard />} />
        <Route path="financial" element={<FinancialKPIDashboard />} />
        <Route path="staff" element={<StaffPerformanceAnalytics />} />
        <Route path="inventory" element={<InventoryOptimization />} />
        <Route path="leads" element={<LeadConversionDashboard />} />
      </Routes>
    </div>
  );
};

export default Analytics;
