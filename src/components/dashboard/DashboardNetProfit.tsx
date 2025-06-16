import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Download, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { dashboardService, netProfitSchema } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, formatPercentage } from '@/utils/format';
import { z } from 'zod';
import DOMPurify from 'dompurify';

type NetProfitData = z.infer<typeof netProfitSchema>;

const DashboardNetProfit = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [netProfitData, setNetProfitData] = useState<NetProfitData | null>(null);

  useEffect(() => {
    const fetchNetProfitData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getNetProfit();
        setNetProfitData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load net profit data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNetProfitData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!netProfitData) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Net Profit Analysis</h1>
            <p className="text-gray-600 mt-1">วิเคราะห์กำไรสุทธิและแนวโน้ม</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีข้อมูลกำไรสุทธิ</h3>
              <p className="text-gray-500">ข้อมูลจะแสดงเมื่อมีการบันทึกข้อมูลทางการเงินในระบบ</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentProfit = netProfitData.currentProfit;
  const previousProfit = netProfitData.previousProfit;
  const profitChange = currentProfit - previousProfit;
  const profitChangePercentage = (profitChange / Math.abs(previousProfit)) * 100;

  const getProfitStatus = (change: number) => {
    if (change > 0) return { color: 'green', status: 'เพิ่มขึ้น' };
    if (change < 0) return { color: 'red', status: 'ลดลง' };
    return { color: 'gray', status: 'คงที่' };
  };

  const profitStatus = getProfitStatus(profitChange);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Net Profit Analysis</h1>
          <p className="text-gray-600 mt-1">วิเคราะห์กำไรสุทธิและแนวโน้ม</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="week">สัปดาห์</option>
            <option value="month">เดือน</option>
            <option value="quarter">ไตรมาส</option>
            <option value="year">ปี</option>
          </select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`bg-gradient-to-r from-${profitStatus.color}-500 to-${profitStatus.color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${profitStatus.color}-100`}>กำไรสุทธิปัจจุบัน</p>
                <p className="text-2xl font-bold">{formatCurrency(currentProfit)}</p>
              </div>
              {profitChange > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${profitStatus.color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${profitStatus.color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">การเปลี่ยนแปลง</p>
                <p className="text-2xl font-bold">
                  {profitChange > 0 ? '+' : ''}{formatCurrency(profitChange)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">เปอร์เซ็นต์การเปลี่ยนแปลง</p>
                <p className="text-2xl font-bold">
                  {profitChangePercentage > 0 ? '+' : ''}{formatPercentage(profitChangePercentage)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">อัตรากำไรสุทธิ</p>
                <p className="text-2xl font-bold">{formatPercentage(netProfitData.profitMargin)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มกำไรสุทธิ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={netProfitData.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'กำไรสุทธิ']} />
                <Line type="monotone" dataKey="profit" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การเปรียบเทียบรายได้และค่าใช้จ่าย</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={netProfitData.comparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'จำนวนเงิน']} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  fill="#93c5fd" 
                  fillOpacity={0.6}
                  name="รายได้"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  fill="#fca5a5" 
                  fillOpacity={0.6}
                  name="ค่าใช้จ่าย"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>การวิเคราะห์กำไรสุทธิ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {netProfitData.analysis.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{DOMPurify.sanitize(item.title)}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.impact > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.impact > 0 ? '+' : ''}{formatCurrency(item.impact)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{DOMPurify.sanitize(item.description)}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.impact > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                    style={{ width: `${Math.min(Math.abs(item.impact) / 1000000, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>คำแนะนำในการปรับปรุงกำไรสุทธิ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">เพิ่มรายได้</h4>
              <ul className="text-sm text-green-600 space-y-1">
                {netProfitData.recommendations.revenue.map((item, index) => (
                  <li key={index}>• {DOMPurify.sanitize(item)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">ลดค่าใช้จ่าย</h4>
              <ul className="text-sm text-yellow-600 space-y-1">
                {netProfitData.recommendations.expenses.map((item, index) => (
                  <li key={index}>• {DOMPurify.sanitize(item)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">ปรับปรุงประสิทธิภาพ</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {netProfitData.recommendations.efficiency.map((item, index) => (
                  <li key={index}>• {DOMPurify.sanitize(item)}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardNetProfit;
