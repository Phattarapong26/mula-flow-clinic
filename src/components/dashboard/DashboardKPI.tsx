import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Download, AlertCircle, Users, Eye, FileText, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { dashboardService, kpiSchema } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/format';
import { z } from 'zod';
import DOMPurify from 'dompurify';

type KPIData = z.infer<typeof kpiSchema>;

const DashboardKPI = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [kpiData, setKpiData] = useState<KPIData | null>(null);

  useEffect(() => {
    const fetchKPIData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getKPI();
        setKpiData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load KPI data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchKPIData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!kpiData) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">KPI Analysis</h1>
            <p className="text-gray-600 mt-1">วิเคราะห์ตัวชี้วัดประสิทธิภาพหลัก</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีข้อมูล KPI</h3>
              <p className="text-gray-500">ข้อมูลจะแสดงเมื่อมีการบันทึกข้อมูลในระบบ</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getKPIStatus = (change: number) => {
    if (change > 0) return { color: 'green', status: 'เพิ่มขึ้น' };
    if (change < 0) return { color: 'red', status: 'ลดลง' };
    return { color: 'gray', status: 'คงที่' };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">KPI Analysis</h1>
          <p className="text-gray-600 mt-1">วิเคราะห์ตัวชี้วัดประสิทธิภาพหลัก</p>
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
        <Card className={`bg-gradient-to-r from-${getKPIStatus(kpiData.revenue.change).color}-500 to-${getKPIStatus(kpiData.revenue.change).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getKPIStatus(kpiData.revenue.change).color}-100`}>รายได้ต่อคนไข้</p>
                <p className="text-2xl font-bold">{formatCurrency(kpiData.revenue.current)}</p>
              </div>
              {kpiData.revenue.change > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getKPIStatus(kpiData.revenue.change).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getKPIStatus(kpiData.revenue.change).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-r from-${getKPIStatus(kpiData.patients.change).color}-500 to-${getKPIStatus(kpiData.patients.change).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getKPIStatus(kpiData.patients.change).color}-100`}>จำนวนคนไข้ต่อวัน</p>
                <p className="text-2xl font-bold">{formatNumber(kpiData.patients.current)}</p>
              </div>
              {kpiData.patients.change > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getKPIStatus(kpiData.patients.change).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getKPIStatus(kpiData.patients.change).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-r from-${getKPIStatus(kpiData.exams.change).color}-500 to-${getKPIStatus(kpiData.exams.change).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getKPIStatus(kpiData.exams.change).color}-100`}>การตรวจตา</p>
                <p className="text-2xl font-bold">{formatNumber(kpiData.exams.current)}</p>
              </div>
              {kpiData.exams.change > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getKPIStatus(kpiData.exams.change).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getKPIStatus(kpiData.exams.change).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-r from-${getKPIStatus(kpiData.claims.change).color}-500 to-${getKPIStatus(kpiData.claims.change).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getKPIStatus(kpiData.claims.change).color}-100`}>การเคลมประกัน</p>
                <p className="text-2xl font-bold">{formatNumber(kpiData.claims.current)}</p>
              </div>
              {kpiData.claims.change > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getKPIStatus(kpiData.claims.change).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getKPIStatus(kpiData.claims.change).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มรายได้ต่อคนไข้</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={kpiData.revenue.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'รายได้']} />
                <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การเปรียบเทียบ KPI</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={kpiData.comparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatNumber(Number(value)), 'จำนวน']} />
                <Bar dataKey="patients" fill="#3b82f6" name="คนไข้" />
                <Bar dataKey="exams" fill="#ef4444" name="การตรวจตา" />
                <Bar dataKey="claims" fill="#10b981" name="การเคลม" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>การวิเคราะห์ KPI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kpiData.analysis.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{DOMPurify.sanitize(item.title)}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.status === 'good' ? 'bg-green-100 text-green-800' :
                    item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status === 'good' ? 'ดี' :
                     item.status === 'warning' ? 'ระวัง' : 'ต้องปรับปรุง'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{DOMPurify.sanitize(item.description)}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.status === 'good' ? 'bg-green-600' :
                      item.status === 'warning' ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${item.progress}%` }}
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
          <CardTitle>คำแนะนำในการปรับปรุง KPI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">เพิ่มรายได้</h4>
              <ul className="text-sm text-green-600 space-y-1">
                {kpiData.recommendations.revenue.map((item, index) => (
                  <li key={index}>• {DOMPurify.sanitize(item)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">เพิ่มจำนวนคนไข้</h4>
              <ul className="text-sm text-yellow-600 space-y-1">
                {kpiData.recommendations.patients.map((item, index) => (
                  <li key={index}>• {DOMPurify.sanitize(item)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">ปรับปรุงประสิทธิภาพ</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {kpiData.recommendations.efficiency.map((item, index) => (
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

export default DashboardKPI;
