import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  PieChart,
  Calculator,
  Clock,
  AlertTriangle,
  Target,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, AreaChart } from 'recharts';
import { financialAnalyticsService } from '@/services/financialAnalytics';
import { useToast } from '@/hooks/use-toast';

const FinancialKPIDashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [financialData, setFinancialData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await financialAnalyticsService.getFinancialData({
          branchId: selectedBranch !== 'all' ? selectedBranch : undefined,
          startDate: getStartDate(timeRange),
          endDate: new Date().toISOString().split('T')[0]
        });
        setFinancialData(data);
      } catch (err) {
        setError('Failed to load financial data');
        toast({
          title: 'Error',
          description: 'Failed to load financial data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedBranch, timeRange, toast]);

  const getStartDate = (range: string): string => {
    const date = new Date();
    switch (range) {
      case '7d':
        date.setDate(date.getDate() - 7);
        break;
      case '30d':
        date.setDate(date.getDate() - 30);
        break;
      case '90d':
        date.setDate(date.getDate() - 90);
        break;
      case '1y':
        date.setFullYear(date.getFullYear() - 1);
        break;
      default:
        date.setDate(date.getDate() - 30);
    }
    return date.toISOString().split('T')[0];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!financialData) {
    return <div>No data available</div>;
  }

  const plStatement = financialData.plStatement;
  const totalRevenue = plStatement.reduce((sum: number, item: any) => sum + item.revenue, 0);
  const totalExpensesFromPL = plStatement.reduce((sum: number, item: any) => sum + item.expenses, 0);
  const totalCostOfSales = plStatement.reduce((sum: number, item: any) => sum + item.cost_of_sales, 0);
  const totalNetProfit = plStatement.reduce((sum: number, item: any) => sum + item.net_profit, 0);

  const financialSummary = {
    totalRevenue,
    netProfit: totalNetProfit,
    cashPosition: 12500000, // This should come from the API
    get burnRate() {
      return (totalExpensesFromPL + totalCostOfSales) / (plStatement.length || 1);
    },
    get netMargin() {
      return totalRevenue ? (totalNetProfit / totalRevenue) * 100 : 0;
    },
    get runway() {
      const rate = this.burnRate;
      return rate > 0 ? this.cashPosition / rate : Infinity;
    },
  };

  const REVENUE_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];
  const totalSalesAllServices = financialData.grossMarginPerService.reduce((sum: number, s: any) => sum + s.total_sales, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Financial KPIs</h2>
        <div className="flex gap-4">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="all">All Branches</option>
            {financialData.branchEfficiency.map((branch: any) => (
              <option key={branch.branch_id} value={branch.branch_id}>
                {branch.branch_name}
              </option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{financialSummary.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((financialSummary.totalRevenue / financialSummary.totalRevenue) * 100).toFixed(1)}% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{financialSummary.netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {financialSummary.netMargin.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{financialSummary.burnRate.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              per month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Runway</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(financialSummary.runway)} months</div>
            <p className="text-xs text-muted-foreground">
              at current burn rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={plStatement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <Line type="monotone" dataKey="net_profit" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Service Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={financialData.grossMarginPerService}
                  dataKey="total_sales"
                  nameKey="service_name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {financialData.grossMarginPerService.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={REVENUE_COLORS[index % REVENUE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Branch Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData.branchEfficiency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue_per_staff" fill="#8884d8" />
                <Bar dataKey="cost_per_staff" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doctor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financialData.doctorKPIs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doctor_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue_per_hour" fill="#8884d8" />
                <Bar dataKey="slot_utilization" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Repeat Rate</p>
                <p className="text-2xl font-bold">{financialData.customerMetrics.repeat_rate}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Average Order Value</p>
                <p className="text-2xl font-bold">฿{financialData.customerMetrics.aov.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Customer Acquisition Cost</p>
                <p className="text-2xl font-bold">฿{financialData.customerMetrics.cac.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialKPIDashboard;
