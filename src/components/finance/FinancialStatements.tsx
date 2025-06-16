
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, FileText, PieChart } from 'lucide-react';

const chartConfig = {
  revenue: { label: 'รายได้', color: '#22c55e' },
  expenses: { label: 'ค่าใช้จ่าย', color: '#ef4444' },
  profit: { label: 'กำไร', color: '#3b82f6' },
  assets: { label: 'สินทรัพย์', color: '#8b5cf6' },
  liabilities: { label: 'หนี้สิน', color: '#f59e0b' },
};

const FinancialStatements = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock financial data
  const plData = {
    revenue: 2850000,
    costOfSales: 1430000,
    grossProfit: 1420000,
    operatingExpenses: 530000,
    operatingProfit: 890000,
    otherIncome: 15000,
    financeCosts: 25000,
    netProfit: 880000
  };

  const balanceSheetData = {
    currentAssets: {
      cash: 850000,
      accountsReceivable: 320000,
      inventory: 240000,
      total: 1410000
    },
    fixedAssets: {
      equipment: 480000,
      furniture: 120000,
      total: 600000
    },
    totalAssets: 2010000,
    currentLiabilities: {
      accountsPayable: 185000,
      accruedExpenses: 95000,
      total: 280000
    },
    longTermLiabilities: {
      bankLoan: 650000,
      total: 650000
    },
    totalLiabilities: 930000,
    equity: {
      capital: 500000,
      retainedEarnings: 580000,
      total: 1080000
    }
  };

  const cashFlowData = [
    { month: 'ม.ค.', operating: 420000, investing: -150000, financing: -80000, net: 190000 },
    { month: 'ก.พ.', operating: 380000, investing: -200000, financing: 100000, net: 280000 },
    { month: 'มี.ค.', operating: 450000, investing: -80000, financing: -50000, net: 320000 },
    { month: 'เม.ย.', operating: 520000, investing: -120000, financing: -75000, net: 325000 },
    { month: 'พ.ค.', operating: 480000, investing: -90000, financing: -60000, net: 330000 },
    { month: 'มิ.ย.', operating: 560000, investing: -110000, financing: -85000, net: 365000 }
  ];

  const monthlyComparison = [
    { month: 'ม.ค.', revenue: 2200000, expenses: 1680000, profit: 520000 },
    { month: 'ก.พ.', revenue: 2400000, expenses: 1750000, profit: 650000 },
    { month: 'มี.ค.', revenue: 2650000, expenses: 1820000, profit: 830000 },
    { month: 'เม.ย.', revenue: 2500000, expenses: 1790000, profit: 710000 },
    { month: 'พ.ค.', revenue: 2750000, expenses: 1890000, profit: 860000 },
    { month: 'มิ.ย.', revenue: 2850000, expenses: 1960000, profit: 890000 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const calculatePercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">งบการเงิน</h2>
          <p className="text-gray-600">งบกำไรขาดทุน งบดุล และงบกระแสเงินสด</p>
        </div>
        <select 
          value={selectedPeriod} 
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="current">เดือนปัจจุบัน</option>
          <option value="quarter">ไตรมาสนี้</option>
          <option value="year">ปีนี้</option>
        </select>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">รายได้รวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(plData.revenue)}</div>
            <p className="text-green-100 text-xs">+12.5% จากเดือนที่แล้ว</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">กำไรสุทธิ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(plData.netProfit)}</div>
            <p className="text-blue-100 text-xs">อัตรากำไร {calculatePercentage(plData.netProfit, plData.revenue)}%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">สินทรัพย์รวม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balanceSheetData.totalAssets)}</div>
            <p className="text-purple-100 text-xs">ROA {calculatePercentage(plData.netProfit, balanceSheetData.totalAssets)}%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">กระแสเงินสด</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(365000)}</div>
            <p className="text-orange-100 text-xs">สุทธิเดือนนี้</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Statements Tabs */}
      <Tabs defaultValue="pnl" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pnl">งบกำไรขาดทุน</TabsTrigger>
          <TabsTrigger value="balance">งบดุล</TabsTrigger>
          <TabsTrigger value="cashflow">งบกระแสเงินสด</TabsTrigger>
          <TabsTrigger value="analysis">การวิเคราะห์</TabsTrigger>
        </TabsList>

        <TabsContent value="pnl" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* P&L Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  งบกำไรขาดทุน (P&L)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">รายได้จากการขาย</span>
                    <span className="font-bold text-green-600">{formatCurrency(plData.revenue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pl-4">
                    <span>หัก: ต้นทุนขาย</span>
                    <span className="text-red-600">({formatCurrency(plData.costOfSales)})</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">กำไรขั้นต้น</span>
                    <span className="font-bold">{formatCurrency(plData.grossProfit)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pl-4">
                    <span>หัก: ค่าใช้จ่ายในการดำเนินงาน</span>
                    <span className="text-red-600">({formatCurrency(plData.operatingExpenses)})</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">กำไรจากการดำเนินงาน</span>
                    <span className="font-bold">{formatCurrency(plData.operatingProfit)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pl-4">
                    <span>บวก: รายได้อื่น</span>
                    <span className="text-green-600">{formatCurrency(plData.otherIncome)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 pl-4">
                    <span>หัก: ต้นทุนทางการเงิน</span>
                    <span className="text-red-600">({formatCurrency(plData.financeCosts)})</span>
                  </div>
                  <hr className="border-double border-2" />
                  <div className="flex justify-between items-center py-2">
                    <span className="font-bold text-lg">กำไรสุทธิ</span>
                    <span className="font-bold text-lg text-blue-600">{formatCurrency(plData.netProfit)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  แนวโน้มรายได้และกำไร
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyComparison}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line dataKey="revenue" stroke="var(--color-revenue)" name="รายได้" strokeWidth={2} />
                      <Line dataKey="profit" stroke="var(--color-profit)" name="กำไร" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>งบดุล (Balance Sheet)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Assets */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-green-600">สินทรัพย์ (Assets)</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">สินทรัพย์หมุนเวียน</h4>
                      <div className="pl-4 space-y-1">
                        <div className="flex justify-between">
                          <span>เงินสดและรายการเทียบเท่า</span>
                          <span>{formatCurrency(balanceSheetData.currentAssets.cash)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ลูกหนี้การค้า</span>
                          <span>{formatCurrency(balanceSheetData.currentAssets.accountsReceivable)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>สินค้าคงคลัง</span>
                          <span>{formatCurrency(balanceSheetData.currentAssets.inventory)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>รวมสินทรัพย์หมุนเวียน</span>
                          <span>{formatCurrency(balanceSheetData.currentAssets.total)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">สินทรัพย์ไม่หมุนเวียน</h4>
                      <div className="pl-4 space-y-1">
                        <div className="flex justify-between">
                          <span>อุปกรณ์และเครื่องมือ</span>
                          <span>{formatCurrency(balanceSheetData.fixedAssets.equipment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>เฟอร์นิเจอร์และติดตั้ง</span>
                          <span>{formatCurrency(balanceSheetData.fixedAssets.furniture)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>รวมสินทรัพย์ไม่หมุนเวียน</span>
                          <span>{formatCurrency(balanceSheetData.fixedAssets.total)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <hr className="border-double border-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>รวมสินทรัพย์</span>
                      <span className="text-green-600">{formatCurrency(balanceSheetData.totalAssets)}</span>
                    </div>
                  </div>
                </div>

                {/* Liabilities & Equity */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-red-600">หนี้สินและส่วนของเจ้าของ</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">หนี้สินหมุนเวียน</h4>
                      <div className="pl-4 space-y-1">
                        <div className="flex justify-between">
                          <span>เจ้าหนี้การค้า</span>
                          <span>{formatCurrency(balanceSheetData.currentLiabilities.accountsPayable)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ค่าใช้จ่ายค้างจ่าย</span>
                          <span>{formatCurrency(balanceSheetData.currentLiabilities.accruedExpenses)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>รวมหนี้สินหมุนเวียน</span>
                          <span>{formatCurrency(balanceSheetData.currentLiabilities.total)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">หนี้สินไม่หมุนเวียน</h4>
                      <div className="pl-4 space-y-1">
                        <div className="flex justify-between">
                          <span>เงินกู้ยืมระยะยาว</span>
                          <span>{formatCurrency(balanceSheetData.longTermLiabilities.bankLoan)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>รวมหนี้สินไม่หมุนเวียน</span>
                          <span>{formatCurrency(balanceSheetData.longTermLiabilities.total)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>รวมหนี้สิน</span>
                      <span className="text-red-600">{formatCurrency(balanceSheetData.totalLiabilities)}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-blue-600">ส่วนของเจ้าของ</h4>
                      <div className="pl-4 space-y-1">
                        <div className="flex justify-between">
                          <span>ทุนจดทะเบียน</span>
                          <span>{formatCurrency(balanceSheetData.equity.capital)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>กำไรสะสม</span>
                          <span>{formatCurrency(balanceSheetData.equity.retainedEarnings)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>รวมส่วนของเจ้าของ</span>
                          <span className="text-blue-600">{formatCurrency(balanceSheetData.equity.total)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <hr className="border-double border-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>รวมหนี้สินและส่วนของเจ้าของ</span>
                      <span>{formatCurrency(balanceSheetData.totalLiabilities + balanceSheetData.equity.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>งบกระแสเงินสด (Cash Flow Statement)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cashFlowData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="operating" fill="#22c55e" name="จากการดำเนินงาน" />
                    <Bar dataKey="investing" fill="#ef4444" name="จากการลงทุน" />
                    <Bar dataKey="financing" fill="#3b82f6" name="จากการจัดหาเงิน" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>อัตราส่วนสภาพคล่อง</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Current Ratio</span>
                    <span className="font-bold">
                      {(balanceSheetData.currentAssets.total / balanceSheetData.currentLiabilities.total).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quick Ratio</span>
                    <span className="font-bold">
                      {((balanceSheetData.currentAssets.total - balanceSheetData.currentAssets.inventory) / balanceSheetData.currentLiabilities.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>อัตราส่วนความสามารถในการทำกำไร</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Gross Profit Margin</span>
                    <span className="font-bold">{calculatePercentage(plData.grossProfit, plData.revenue)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Net Profit Margin</span>
                    <span className="font-bold">{calculatePercentage(plData.netProfit, plData.revenue)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROA</span>
                    <span className="font-bold">{calculatePercentage(plData.netProfit, balanceSheetData.totalAssets)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialStatements;
