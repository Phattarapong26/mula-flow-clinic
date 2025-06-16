
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown, DollarSign, CreditCard, Users, Building, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinanceAlertSystem = () => {
  // Mock financial alerts for optometry clinic
  const alerts = [
    {
      id: 'FA001',
      type: 'critical',
      category: 'cash_flow',
      title: 'กระแสเงินสดติดลบ',
      description: 'กระแสเงินสดคาดการณ์จะติดลบใน 2 สัปดาหน้า เนื่องจากค่าเช่าและเงินเดือนที่ต้องจ่าย',
      amount: -450000,
      dueDate: '2024-06-30',
      priority: 'high',
      action: 'ติดตามลูกหนี้และเร่งเก็บเงิน'
    },
    {
      id: 'FA002',
      type: 'warning',
      category: 'accounts_receivable',
      title: 'ลูกหนี้ค้างชำระนาน',
      description: 'มีลูกหนี้จำนวน 85,000 บาท ค้างชำระเกิน 30 วัน',
      amount: 85000,
      priority: 'medium',
      action: 'ติดตามการชำระเงินจากลูกค้า'
    },
    {
      id: 'FA003',
      type: 'info',
      category: 'insurance_claims',
      title: 'เคลมประกันที่รอการอนุมัติ',
      description: 'มีเคลมประกันจำนวน 8 รายการ รวม 125,000 บาท ที่รอการอนุมัติ',
      amount: 125000,
      priority: 'medium',
      action: 'ติดตามสถานะเคลมกับบริษัทประกัน'
    },
    {
      id: 'FA004',
      type: 'success',
      category: 'revenue',
      title: 'เป้าหมายรายได้เดือนนี้',
      description: 'บรรลุเป้าหมายรายได้ 108% แล้ว ยอดเยี่ยม!',
      amount: 1250000,
      priority: 'low',
      action: 'รักษาระดับการบริการต่อไป'
    },
    {
      id: 'FA005',
      type: 'warning',
      category: 'expenses',
      title: 'ค่าใช้จ่ายเกินงบ',
      description: 'ค่าใช้จ่ายในหมวดวัสดุการแพทย์เกินงบประมาณ 15%',
      amount: 45000,
      priority: 'medium',
      action: 'ทบทวนการสั่งซื้อวัสดุ'
    }
  ];

  const getAlertIcon = (type: string) => {
    const icons = {
      critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
      warning: <TrendingDown className="h-5 w-5 text-yellow-500" />,
      info: <Clock className="h-5 w-5 text-blue-500" />,
      success: <CheckCircle className="h-5 w-5 text-green-500" />
    };
    return icons[type as keyof typeof icons];
  };

  const getAlertBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    const labels = {
      high: 'ด่วนมาก',
      medium: 'ปานกลาง',
      low: 'ไม่ด่วน'
    };
    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      cash_flow: 'กระแสเงินสด',
      accounts_receivable: 'ลูกหนี้',
      insurance_claims: 'เคลมประกัน',
      revenue: 'รายได้',
      expenses: 'รายจ่าย'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical');
  const warningAlerts = alerts.filter(alert => alert.type === 'warning');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ระบบเตือนการเงิน</h1>
        <p className="text-gray-600 mt-1">ติดตามและแจ้งเตือนสถานะการเงินแบบเรียลไทม์</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">การเตือนเร่งด่วน</p>
                <p className="text-2xl font-bold">{criticalAlerts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">คำเตือน</p>
                <p className="text-2xl font-bold">{warningAlerts.length}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">ลูกหนี้ค้างชำระ</p>
                <p className="text-2xl font-bold">฿85K</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">รายได้เดือนนี้</p>
                <p className="text-2xl font-bold">108%</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              การเตือนเร่งด่วน
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <Alert key={alert.id} className="border-red-200 bg-red-50">
                  <AlertDescription className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getAlertIcon(alert.type)}
                        <h4 className="font-semibold text-red-800">{alert.title}</h4>
                        {getAlertBadge(alert.priority)}
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(alert.category)}
                        </Badge>
                      </div>
                      <p className="text-red-700 mb-2">{alert.description}</p>
                      <p className="text-sm text-red-600 font-medium">ต้องดำเนินการ: {alert.action}</p>
                      {alert.amount && (
                        <p className="text-sm font-bold text-red-800 mt-1">
                          จำนวนเงิน: ฿{Math.abs(alert.amount).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            การแจ้งเตือนทั้งหมด
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getAlertIcon(alert.type)}
                      <h4 className="font-semibold">{alert.title}</h4>
                      {getAlertBadge(alert.priority)}
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(alert.category)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{alert.description}</p>
                    <p className="text-sm text-blue-600 font-medium">การดำเนินการ: {alert.action}</p>
                    {alert.amount && (
                      <p className="text-sm font-bold mt-1">
                        จำนวนเงิน: ฿{Math.abs(alert.amount).toLocaleString()}
                      </p>
                    )}
                    {alert.dueDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        กำหนดวันที่: {new Date(alert.dueDate).toLocaleDateString('th-TH')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/finance/outstanding-debt">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-semibold mb-1">จัดการลูกหนี้</h3>
              <p className="text-sm text-gray-600">ติดตามการชำระเงิน</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/finance/total-revenue">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold mb-1">รายงานรายได้</h3>
              <p className="text-sm text-gray-600">วิเคราะห์รายได้</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/finance/lens-claims">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Building className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold mb-1">เคลมประกัน</h3>
              <p className="text-sm text-gray-600">จัดการเคลม</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default FinanceAlertSystem;
