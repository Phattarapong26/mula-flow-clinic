import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  Star,
  Clock,
  TrendingUp,
  Award,
  Target,
  UserCheck,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { financialAnalyticsService } from '@/services/financialAnalytics';
import { useToast } from '@/hooks/use-toast';

const StaffPerformanceAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [staffData, setStaffData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await financialAnalyticsService.getDoctorKPIs({
          branchId: selectedBranch !== 'all' ? selectedBranch : undefined,
          startDate: getStartDate(selectedPeriod),
          endDate: new Date().toISOString().split('T')[0]
        });
        setStaffData(data);
      } catch (err) {
        setError('Failed to load staff performance data');
        toast({
          title: 'Error',
          description: 'Failed to load staff performance data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod, selectedBranch, toast]);

  const getStartDate = (period: string): string => {
    const date = new Date();
    switch (period) {
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'month':
        date.setDate(date.getDate() - 30);
        break;
      case 'quarter':
        date.setDate(date.getDate() - 90);
        break;
      case 'year':
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

  if (!staffData) {
    return <div>No data available</div>;
  }

  const staffOverview = {
    totalStaff: staffData.length,
    activeStaff: staffData.filter((staff: any) => staff.status === 'active').length,
    totalRevenue: staffData.reduce((sum: number, staff: any) => sum + staff.revenue_per_hour * staff.slot_utilization, 0),
    revenuePerStaff: staffData.reduce((sum: number, staff: any) => sum + staff.revenue_per_hour, 0) / staffData.length,
    avgUtilization: staffData.reduce((sum: number, staff: any) => sum + staff.slot_utilization, 0) / staffData.length,
    customerSatisfaction: staffData.reduce((sum: number, staff: any) => sum + staff.efficiency_score, 0) / staffData.length
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Staff Performance</h2>
        <div className="flex gap-4">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="all">All Branches</option>
            {/* Add branch options dynamically */}
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Staff Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffOverview.totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              {staffOverview.activeStaff} active staff
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue per Staff</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{staffOverview.revenuePerStaff.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              per hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Utilization</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffOverview.avgUtilization.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              slot utilization
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffOverview.customerSatisfaction.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              out of 5
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue per Hour by Staff</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={staffData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doctor_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue_per_hour" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Slot Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={staffData}
                  dataKey="slot_utilization"
                  nameKey="doctor_name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {staffData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <CardTitle>Efficiency Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doctor_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="efficiency_score" fill="#8884d8" />
                <Bar dataKey="kpi_score" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Ticket Size</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={staffData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doctor_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average_ticket" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Average KPI Score</p>
                <p className="text-2xl font-bold">
                  {staffData.reduce((sum: number, staff: any) => sum + staff.kpi_score, 0) / staffData.length}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Average Efficiency</p>
                <p className="text-2xl font-bold">
                  {staffData.reduce((sum: number, staff: any) => sum + staff.efficiency_score, 0) / staffData.length}%
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Total Bonus Paid</p>
                <p className="text-2xl font-bold">
                  ฿{staffData.reduce((sum: number, staff: any) => sum + staff.bonus, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffPerformanceAnalytics;
