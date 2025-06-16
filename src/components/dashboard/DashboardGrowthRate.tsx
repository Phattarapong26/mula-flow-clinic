import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Download, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { dashboardService, growthRateSchema } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/format';
import { z } from 'zod';
import DOMPurify from 'dompurify';

type GrowthRateData = z.infer<typeof growthRateSchema>;

const DashboardGrowthRate = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [growthData, setGrowthData] = useState<GrowthRateData | null>(null);

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getGrowthRate();
        setGrowthData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load growth rate data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGrowthData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!growthData) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Growth Rate Analysis</h1>
            <p className="text-gray-600 mt-1">วิเคราะห์อัตราการเติบโต</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีข้อมูลการเติบโต</h3>
              <p className="text-gray-500">ข้อมูลจะแสดงเมื่อมีการบันทึกข้อมูลในระบบ</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getGrowthStatus = (rate: number) => {
    if (rate > 0) return { color: 'green', status: 'เพิ่มขึ้น' };
    if (rate < 0) return { color: 'red', status: 'ลดลง' };
    return { color: 'gray', status: 'คงที่' };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Growth Rate Analysis</h1>
          <p className="text-gray-600 mt-1">วิเคราะห์อัตราการเติบโต</p>
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
        <Card className={`bg-gradient-to-r from-${getGrowthStatus(growthData.revenue.growth).color}-500 to-${getGrowthStatus(growthData.revenue.growth).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getGrowthStatus(growthData.revenue.growth).color}-100`}>อัตราการเติบโตของรายได้</p>
                <p className="text-2xl font-bold">{formatPercentage(growthData.revenue.growth)}</p>
              </div>
              {growthData.revenue.growth > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getGrowthStatus(growthData.revenue.growth).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getGrowthStatus(growthData.revenue.growth).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-r from-${getGrowthStatus(growthData.patients.growth).color}-500 to-${getGrowthStatus(growthData.patients.growth).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getGrowthStatus(growthData.patients.growth).color}-100`}>อัตราการเติบโตของคนไข้</p>
                <p className="text-2xl font-bold">{formatPercentage(growthData.patients.growth)}</p>
              </div>
              {growthData.patients.growth > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getGrowthStatus(growthData.patients.growth).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getGrowthStatus(growthData.patients.growth).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-r from-${getGrowthStatus(growthData.exams.growth).color}-500 to-${getGrowthStatus(growthData.exams.growth).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getGrowthStatus(growthData.exams.growth).color}-100`}>อัตราการเติบโตของการตรวจตา</p>
                <p className="text-2xl font-bold">{formatPercentage(growthData.exams.growth)}</p>
              </div>
              {growthData.exams.growth > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getGrowthStatus(growthData.exams.growth).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getGrowthStatus(growthData.exams.growth).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-r from-${getGrowthStatus(growthData.claims.growth).color}-500 to-${getGrowthStatus(growthData.claims.growth).color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${getGrowthStatus(growthData.claims.growth).color}-100`}>อัตราการเติบโตของการเคลม</p>
                <p className="text-2xl font-bold">{formatPercentage(growthData.claims.growth)}</p>
              </div>
              {growthData.claims.growth > 0 ? 
                <TrendingUp className={`h-8 w-8 text-${getGrowthStatus(growthData.claims.growth).color}-200`} /> : 
                <TrendingDown className={`h-8 w-8 text-${getGrowthStatus(growthData.claims.growth).color}-200`} />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มการเติบโตของรายได้</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData.revenue.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatPercentage(Number(value)), 'อัตราการเติบโต']} />
                <Line type="monotone" dataKey="growth" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การเปรียบเทียบอัตราการเติบโต</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={growthData.comparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatPercentage(Number(value)), 'อัตราการเติบโต']} />
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
          <CardTitle>การวิเคราะห์การเติบโต</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {growthData.analysis.map((item, index) => (
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
          <CardTitle>คำแนะนำในการเพิ่มอัตราการเติบโต</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">เพิ่มรายได้</h4>
              <ul className="text-sm text-green-600 space-y-1">
                {growthData.recommendations.revenue.map((item, index) => (
                  <li key={index}>• {DOMPurify.sanitize(item)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">เพิ่มจำนวนคนไข้</h4>
              <ul className="text-sm text-yellow-600 space-y-1">
                {growthData.recommendations.patients.map((item, index) => (
                  <li key={index}>• {DOMPurify.sanitize(item)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">ปรับปรุงประสิทธิภาพ</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {growthData.recommendations.efficiency.map((item, index) => (
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

export default DashboardGrowthRate;
