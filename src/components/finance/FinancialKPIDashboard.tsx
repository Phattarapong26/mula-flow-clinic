
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users,
  Building,
  Calculator,
  AlertTriangle,
  Target,
  PieChart,
  BarChart3,
  Activity,
  Clock,
  Award,
  Filter,
  Download
} from 'lucide-react';
import { FinancialAnalyticsService, mockFinancialData } from '@/services/financialAnalytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

const FinancialKPIDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [activeTab, setActiveTab] = useState('profit');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const netProfitData = FinancialAnalyticsService.calculateNetProfitByBranch([], [], []);
  const grossMarginData = FinancialAnalyticsService.calculateGrossMarginPerService([], []);
  const plData = FinancialAnalyticsService.generatePLStatement();
  const expenseData = FinancialAnalyticsService.getExpenseBreakdown([]);
  const doctorKPIs = FinancialAnalyticsService.calculateDoctorKPIs();
  const branchEfficiency = FinancialAnalyticsService.calculateBranchEfficiency();
  const customerMetrics = FinancialAnalyticsService.getCustomerMetrics();
  const taxLiability = mockFinancialData.taxLiability;

  const renderProfitAnalysis = () => (
    <div className="space-y-6">
      {/* Branch Net Profit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-green-600" />
            กำไรสุทธิต่อสาขา (Net Profit per Branch)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {netProfitData.map((branch, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg">{branch.branch}</h3>
                  <div className="text-sm text-gray-600">
                    รายได้: {formatCurrency(branch.revenue)} | 
                    ต้นทุน: {formatCurrency(branch.costs)} | 
                    ค่าใช้จ่าย: {formatCurrency(branch.expenses)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    {formatCurrency(branch.net_profit)}
                  </div>
                  <Badge className="bg-green-100 text-green-800">{branch.net_margin}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Profitability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-blue-600" />
            กำไรต่อบริการ (Profit Per Service)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {grossMarginData.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{service.service_name}</h4>
                  <div className="text-sm text-gray-600">
                    ยอดขาย: {formatCurrency(service.total_sales)} | 
                    ต้นทุน: {formatCurrency(service.total_cost)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    {formatCurrency(service.gross_margin)}
                  </div>
                  <div className="text-sm text-gray-600">{service.margin_percentage}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* P&L Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            งบกำไรขาดทุนรายเดือน (P&L Statement)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="revenue" fill="#22c55e" name="รายได้" />
              <Bar dataKey="cost_of_sales" fill="#ef4444" name="ต้นทุนขาย" />
              <Bar dataKey="expenses" fill="#f59e0b" name="ค่าใช้จ่าย" />
              <Bar dataKey="net_profit" fill="#3b82f6" name="กำไรสุทธิ" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderExpenseAnalysis = () => (
    <div className="space-y-6">
      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-orange-600" />
            แยกค่าใช้จ่ายตามหมวดหมู่
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3">
              {expenseData.map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-medium">{expense.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(expense.total)}</div>
                    <div className="text-sm text-gray-600">{formatPercentage(expense.percentage)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Liability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            ภาษีที่ต้องชำระ (Tax Liability)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600">VAT ขาออก</div>
              <div className="text-xl font-bold text-blue-800">
                {formatCurrency(taxLiability.output_vat)}
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600">VAT ขาเข้า</div>
              <div className="text-xl font-bold text-green-800">
                {formatCurrency(taxLiability.input_vat)}
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-red-600">ภาษีค้างชำระ</div>
              <div className="text-xl font-bold text-red-800">
                {formatCurrency(taxLiability.tax_payable)}
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            ข้อมูล ณ {taxLiability.period}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStaffKPIs = () => (
    <div className="space-y-6">
      {/* Doctor Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600" />
            ประสิทธิภาพหมอ (Doctor KPIs)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctorKPIs.map((doctor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{doctor.doctor_name}</h3>
                  <Badge 
                    className={`${doctor.kpi_score >= 85 ? 'bg-green-100 text-green-800' : 
                      doctor.kpi_score >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    KPI Score: {doctor.kpi_score}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">รายได้/ชั่วโมง:</span>
                    <div className="font-bold text-green-600">
                      {formatCurrency(doctor.revenue_per_hour)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">การใช้เวลา:</span>
                    <div className="font-bold text-blue-600">
                      {doctor.slot_utilization}%
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">ค่าเฉลี่ย/ครั้ง:</span>
                    <div className="font-bold text-purple-600">
                      {formatCurrency(doctor.average_ticket)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">โบนัส:</span>
                    <div className="font-bold text-orange-600">
                      {formatCurrency(doctor.bonus)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span>Efficiency Score:</span>
                    <span className="font-bold">{doctor.efficiency_score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Branch Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            ประสิทธิภาพสาขา (Branch Efficiency)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branchEfficiency.map((branch, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{branch.branch_name}</h3>
                  <Badge className="bg-blue-100 text-blue-800">
                    Score: {branch.efficiency_score}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">รายได้/คน:</span>
                    <div className="font-bold text-green-600">
                      {formatCurrency(branch.revenue_per_staff)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">ต้นทุน/คน:</span>
                    <div className="font-bold text-red-600">
                      {formatCurrency(branch.cost_per_staff)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">อัตรากำไร:</span>
                    <div className="font-bold text-blue-600">
                      {formatPercentage(branch.profit_margin)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomerAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            วิเคราะห์ลูกค้า (Customer Analytics)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600">อัตราซื้อซ้ำ</div>
              <div className="text-2xl font-bold text-green-800">
                {formatPercentage(customerMetrics.repeat_rate)}
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-red-600">ลูกค้าเสี่ยงออก</div>
              <div className="text-2xl font-bold text-red-800">
                {customerMetrics.churn_risk_count} คน
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600">AOV</div>
              <div className="text-2xl font-bold text-blue-800">
                {formatCurrency(customerMetrics.aov)}
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600">CAC</div>
              <div className="text-2xl font-bold text-purple-800">
                {formatCurrency(customerMetrics.cac)}
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Customer Retention Rate</h4>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${customerMetrics.retention_rate}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formatPercentage(customerMetrics.retention_rate)} ของลูกค้ากลับมาใช้บริการ
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial KPI Dashboard</h1>
          <p className="text-gray-600">วิเคราะห์ครบทุกมิติทางการเงินและประสิทธิภาพ</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="monthly">รายเดือน</option>
            <option value="quarterly">รายไตรมาส</option>
            <option value="yearly">รายปี</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            ตัวกรอง
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profit">กำไร & ต้นทุน</TabsTrigger>
          <TabsTrigger value="expenses">ค่าใช้จ่าย & ภาษี</TabsTrigger>
          <TabsTrigger value="staff">KPI พนักงาน</TabsTrigger>
          <TabsTrigger value="customers">วิเคราะห์ลูกค้า</TabsTrigger>
        </TabsList>

        <TabsContent value="profit" className="mt-6">
          {renderProfitAnalysis()}
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          {renderExpenseAnalysis()}
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          {renderStaffKPIs()}
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          {renderCustomerAnalytics()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialKPIDashboard;
