import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { dashboardService, RevenueData } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, formatNumber } from '@/lib/utils';
import DOMPurify from 'dompurify';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const monthlyRevenueData = [
  { month: 'ม.ค.', revenue: 2400000, target: 2200000, growth: 8.5 },
  { month: 'ก.พ.', revenue: 2200000, target: 2300000, growth: -4.2 },
  { month: 'มี.ค.', revenue: 2800000, target: 2400000, growth: 15.8 },
  { month: 'เม.ย.', revenue: 3200000, target: 2600000, growth: 18.2 },
  { month: 'พ.ค.', revenue: 2900000, target: 2700000, growth: 12.5 },
  { month: 'มิ.ย.', revenue: 3400000, target: 2800000, growth: 19.8 },
  { month: 'ก.ค.', revenue: 3600000, target: 3000000, growth: 22.1 },
  { month: 'ส.ค.', revenue: 3300000, target: 3100000, growth: 15.2 },
  { month: 'ก.ย.', revenue: 3800000, target: 3200000, growth: 28.5 },
  { month: 'ต.ค.', revenue: 4100000, target: 3400000, growth: 35.2 },
  { month: 'พ.ย.', revenue: 3900000, target: 3500000, growth: 25.8 },
  { month: 'ธ.ค.', revenue: 4300000, target: 3600000, growth: 42.1 }
];

const branchRevenueData = [
  { branch: 'สาขาสยาม', q1: 9800000, q2: 10200000, q3: 10800000, q4: 11500000 },
  { branch: 'สาขาทองหล่อ', q1: 8500000, q2: 8800000, q3: 9200000, q4: 9800000 },
  { branch: 'สาขาอารีย์', q1: 6200000, q2: 6800000, q3: 7200000, q4: 7800000 },
  { branch: 'สาขาเซ็นทรัล', q1: 4800000, q2: 5200000, q3: 5600000, q4: 6000000 }
];

const serviceRevenueData = [
  { service: 'Laser Hair Removal', revenue: 8500000, percentage: 25.2 },
  { service: 'Facial Treatment', revenue: 7200000, percentage: 21.4 },
  { service: 'Botox Injection', revenue: 6800000, percentage: 20.1 },
  { service: 'Chemical Peeling', revenue: 5200000, percentage: 15.4 },
  { service: 'Dermal Fillers', revenue: 3800000, percentage: 11.3 },
  { service: 'Acne Treatment', revenue: 2200000, percentage: 6.6 }
];

export function DashboardRevenue() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [revenue, setRevenue] = useState<RevenueData | null>(null);
  const [view, setView] = useState<'monthly' | 'branch' | 'service'>('monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getRevenue();
        setRevenue(data);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch revenue data. Please try again later.',
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

  if (!revenue) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const totalRevenue = revenue.monthlyData.reduce((sum, item) => sum + item.revenue, 0);
  const avgGrowth = revenue.monthlyData.reduce((sum, item, index, array) => {
    if (index === 0) return 0;
    const previousRevenue = array[index - 1].revenue;
    const currentRevenue = item.revenue;
    const growth = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
    return sum + growth;
  }, 0) / (revenue.monthlyData.length - 1);
  const totalTarget = revenue.monthlyData.reduce((sum, item) => sum + (item.target || 0), 0);
  const achievementRate = totalTarget > 0 ? (totalRevenue / totalTarget) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Revenue Overview</h2>
        <Button variant="outline">Download Report</Button>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly" onClick={() => setView('monthly')}>Monthly</TabsTrigger>
          <TabsTrigger value="branch" onClick={() => setView('branch')}>By Branch</TabsTrigger>
          <TabsTrigger value="service" onClick={() => setView('service')}>By Service</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
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
        </TabsContent>

        <TabsContent value="branch" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Branch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenue.branchData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenue.serviceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
