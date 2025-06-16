import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Eye,
  Glasses,
  Activity,
  AlertCircle,
  Clock,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { dashboardService, OverviewData, RevenueData, ServicePerformanceData, SalesTimelineData } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/utils/format';
import { z } from 'zod';

export function DashboardOverview() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [servicePerformance, setServicePerformance] = useState<ServicePerformanceData | null>(null);
  const [salesTimeline, setSalesTimeline] = useState<SalesTimelineData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewData, revenueData, serviceData, salesData] = await Promise.all([
          dashboardService.getOverview(),
          dashboardService.getRevenue(),
          dashboardService.getServicePerformance(),
          dashboardService.getSalesTimeline()
        ]);
        setOverview(overviewData);
        setRevenue(revenueData);
        setServicePerformance(serviceData);
        setSalesTimeline(salesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch dashboard data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!overview || !revenue || !servicePerformance || !salesTimeline) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ภาพรวมคลินิกสายตา</h1>
          <p className="text-gray-600">สรุปข้อมูลและกิจกรรมวันนี้</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Activity className="h-4 w-4 mr-2" />
          รายงานประจำวัน
        </Button>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.todayAppointments}</div>
            <p className="text-xs text-muted-foreground">
              {overview.todayPatients} patients today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{overview.todayRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overview.todayEyeExams} eye exams, {overview.todayGlassesOrders} glasses orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.todayPendingClaims}</div>
            <p className="text-xs text-muted-foreground">
              {overview.monthlyPendingClaims} pending this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                <Line type="monotone" dataKey="target" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Service Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={servicePerformance}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {servicePerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesTimeline.map((sale, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{sale.patient}</p>
                  <p className="text-sm text-muted-foreground">{sale.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">฿{sale.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {sale.time} - Dr. {sale.doctor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>การดำเนินการด่วน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>จัดการผู้ป่วย</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Calendar className="h-6 w-6" />
              <span>จองนัดหมาย</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Glasses className="h-6 w-6" />
              <span>สั่งทำแว่น</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Eye className="h-6 w-6" />
              <span>เคลมประกัน</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardOverview;
