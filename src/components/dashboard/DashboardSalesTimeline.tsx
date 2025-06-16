import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Users, Calendar, BarChart3, Download, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { dashboardService, salesTimelineSchema } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, formatNumber } from '@/utils/format';
import { z } from 'zod';
import DOMPurify from 'dompurify';

type SalesTimelineData = z.infer<typeof salesTimelineSchema>;

const DashboardSalesTimeline = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('hourly');
  const [selectedMetric, setSelectedMetric] = useState('sales');
  const [salesData, setSalesData] = useState<SalesTimelineData | null>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getSalesTimeline();
        setSalesData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load sales timeline data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!salesData || salesData.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ยอดขายตามช่วงเวลา</h1>
            <p className="text-gray-600 mt-1">วิเคราะห์แพทเทิร์นการขายและจองตลอดทั้งวัน</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีข้อมูลยอดขาย</h3>
              <p className="text-gray-500">ข้อมูลจะแสดงเมื่อมีการบันทึกยอดขายในระบบ</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalSales = salesData.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalBookings = salesData.length;
  const avgTicketSize = totalSales / totalBookings;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ยอดขายตามช่วงเวลา</h1>
          <p className="text-gray-600 mt-1">วิเคราะห์แพทเทิร์นการขายและจองตลอดทั้งวัน</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="hourly">รายชั่วโมง</option>
            <option value="weekly">รายสัปดาห์</option>
            <option value="seasonal">รายเดือน</option>
          </select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">ยอดขายวันนี้</p>
                <p className="text-2xl font-bold">{formatCurrency(totalSales)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">การจองวันนี้</p>
                <p className="text-2xl font-bold">{formatNumber(totalBookings)}</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">ช่วงเวลาที่ดีที่สุด</p>
                <p className="text-2xl font-bold">
                  {DOMPurify.sanitize(salesData[0]?.time || 'N/A')}
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">ค่าเฉลี่ย/ครั้ง</p>
                <p className="text-2xl font-bold">{formatCurrency(avgTicketSize)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts based on selected view */}
      {selectedView === 'hourly' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ยอดขายรายชั่วโมง</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'ยอดขาย']} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>การเปรียบเทียบรายชั่วโมง</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'ยอดขาย']} />
                  <Bar dataKey="amount" fill="#10b981" name="ยอดขาย" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>สรุปการวิเคราะห์</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800">ช่วงเวลาที่ดีที่สุด</h4>
                <p className="text-sm text-blue-600">
                  {DOMPurify.sanitize(salesData[0]?.time || 'N/A')} เป็นช่วงที่มียอดขายสูงสุด
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800">แนวโน้มการจอง</h4>
                <p className="text-sm text-green-600">
                  มีการจองทั้งหมด {formatNumber(totalBookings)} ครั้ง
                </p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800">ค่าเฉลี่ยต่อครั้ง</h4>
                <p className="text-sm text-orange-600">
                  {formatCurrency(avgTicketSize)} ต่อครั้ง
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ข้อเสนอแนะ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800">เพิ่มพนักงาน</h4>
                <p className="text-sm text-yellow-600">
                  ควรเพิ่มพนักงานในช่วงเวลาที่มียอดขายสูง
                </p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800">โปรโมชั่น</h4>
                <p className="text-sm text-purple-600">
                  ควรมีโปรโมชั่นในช่วงเวลาที่มียอดขายต่ำ
                </p>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h4 className="font-semibold text-indigo-800">การตลาด</h4>
                <p className="text-sm text-indigo-600">
                  ควรโฟกัสการตลาดในช่วงเวลาที่มียอดขายสูง
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSalesTimeline;
