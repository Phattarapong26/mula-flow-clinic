import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, TrendingUp, DollarSign, Calendar, Target, Download, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { dashboardService, runwaySchema } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, formatNumber } from '@/utils/format';
import { z } from 'zod';
import DOMPurify from 'dompurify';

type RunwayData = z.infer<typeof runwaySchema>;

const DashboardRunway = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedScenario, setSelectedScenario] = useState('current');
  const [runwayData, setRunwayData] = useState<RunwayData | null>(null);

  useEffect(() => {
    const fetchRunwayData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getRunway();
        setRunwayData(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load runway data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRunwayData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!runwayData) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Runway Analysis</h1>
            <p className="text-gray-600 mt-1">วิเคราะห์ระยะเวลาที่เงินสดคงเหลือพอใช้</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีข้อมูล Runway</h3>
              <p className="text-gray-500">ข้อมูลจะแสดงเมื่อมีการบันทึกข้อมูลทางการเงินในระบบ</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentRunway = runwayData.currentRunway;
  const previousRunway = runwayData.previousRunway;
  const runwayChange = currentRunway - previousRunway;
  const currentCash = runwayData.cashOnHand;
  const currentBurnRate = runwayData.burnRate;

  const getRunwayStatus = (runway: number) => {
    if (runway > 60) return { color: 'green', status: 'ปลอดภัย' };
    if (runway > 45) return { color: 'yellow', status: 'ระวัง' };
    return { color: 'red', status: 'อันตราย' };
  };

  const runwayStatus = getRunwayStatus(currentRunway);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Runway Analysis</h1>
          <p className="text-gray-600 mt-1">วิเคราะห์ระยะเวลาที่เงินสดคงเหลือพอใช้</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="current">สถานการณ์ปัจจุบัน</option>
            <option value="optimistic">สถานการณ์ดี</option>
            <option value="pessimistic">สถานการณ์เลวร้าย</option>
          </select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Alert Section */}
      {currentRunway < 60 && (
        <Card className={`border-${runwayStatus.color === 'red' ? 'red' : 'yellow'}-200 bg-${runwayStatus.color === 'red' ? 'red' : 'yellow'}-50`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className={`h-6 w-6 text-${runwayStatus.color === 'red' ? 'red' : 'yellow'}-600`} />
              <div>
                <h3 className={`font-semibold text-${runwayStatus.color === 'red' ? 'red' : 'yellow'}-800`}>
                  แจ้งเตือน: Runway {runwayStatus.status}
                </h3>
                <p className={`text-sm text-${runwayStatus.color === 'red' ? 'red' : 'yellow'}-600`}>
                  เงินสดคงเหลือพอใช้ได้เพียง {currentRunway} วัน ควรดำเนินการแก้ไขทันที
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`bg-gradient-to-r from-${runwayStatus.color}-500 to-${runwayStatus.color}-600 text-white`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${runwayStatus.color}-100`}>Runway ปัจจุบัน</p>
                <p className="text-2xl font-bold">{currentRunway} วัน</p>
              </div>
              <Clock className={`h-8 w-8 text-${runwayStatus.color}-200`} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">เงินสดคงเหลือ</p>
                <p className="text-2xl font-bold">{formatCurrency(currentCash)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">การเปลี่ยนแปลง</p>
                <p className="text-2xl font-bold">
                  {runwayChange > 0 ? '+' : ''}{runwayChange} วัน
                </p>
              </div>
              {runwayChange > 0 ? 
                <TrendingUp className="h-8 w-8 text-orange-200" /> : 
                <AlertTriangle className="h-8 w-8 text-orange-200" />
              }
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Burn Rate</p>
                <p className="text-2xl font-bold">{formatCurrency(currentBurnRate)}</p>
              </div>
              <Target className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Tabs */}
      <div className="flex space-x-4 border-b">
        <button 
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 border-b-2 ${selectedView === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
        >
          ภาพรวม
        </button>
        <button 
          onClick={() => setSelectedView('scenarios')}
          className={`px-4 py-2 border-b-2 ${selectedView === 'scenarios' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
        >
          สถานการณ์จำลอง
        </button>
        <button 
          onClick={() => setSelectedView('actions')}
          className={`px-4 py-2 border-b-2 ${selectedView === 'actions' ? 'border-blue-500 text-blue-600' : 'border-transparent'}`}
        >
          แผนแก้ไข
        </button>
      </div>

      {/* Charts based on selected view */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>แนวโน้ม Runway</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={runwayData.history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} วัน`, 'Runway']} />
                  <Line type="monotone" dataKey="runway" stroke="#ef4444" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>คาดการณ์เงินสด</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={runwayData.projection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'เงินสด']} />
                  <Area 
                    type="monotone" 
                    dataKey="cash" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === 'scenarios' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>การวิเคราะห์สถานการณ์</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {runwayData.scenarios.map((scenario, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{DOMPurify.sanitize(scenario.name)}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        scenario.status === 'excellent' ? 'bg-green-100 text-green-800' :
                        scenario.status === 'good' ? 'bg-blue-100 text-blue-800' :
                        scenario.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {scenario.runway} วัน
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Burn Rate: {formatCurrency(scenario.burnRate)}/เดือน
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          scenario.status === 'excellent' ? 'bg-green-600' :
                          scenario.status === 'good' ? 'bg-blue-600' :
                          scenario.status === 'warning' ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{ width: `${Math.min(scenario.runway, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>เปรียบเทียบสถานการณ์</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={runwayData.scenarios}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} วัน`, 'Runway']} />
                  <Bar dataKey="runway" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedView === 'actions' && (
        <Card>
          <CardHeader>
            <CardTitle>แผนการแก้ไขและผลกระทบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {runwayData.mitigationActions.map((action, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{DOMPurify.sanitize(action.name)}</h3>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        action.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        action.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {action.difficulty === 'easy' ? 'ง่าย' :
                         action.difficulty === 'medium' ? 'ปานกลาง' : 'ยาก'}
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {action.newRunway} วัน
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">ผลกระทบ: </span>
                      <span className={`font-medium ${action.impact > 0 ? 'text-green-600' : 'text-blue-600'}`}>
                        {action.impact > 0 ? 'ประหยัด' : 'เพิ่มรายได้'} {formatCurrency(Math.abs(action.impact))}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Runway ใหม่: </span>
                      <span className="font-medium text-blue-600">
                        +{action.newRunway - currentRunway} วัน
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(action.newRunway / 70) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Critical Actions */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            การดำเนินการเร่งด่วน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">ระยะสั้น (1-2 สัปดาห์)</h4>
              <ul className="text-sm text-red-600 space-y-1">
                {runwayData.criticalActions.shortTerm.map((action, index) => (
                  <li key={index}>• {DOMPurify.sanitize(action)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">ระยะกลาง (1 เดือน)</h4>
              <ul className="text-sm text-yellow-600 space-y-1">
                {runwayData.criticalActions.mediumTerm.map((action, index) => (
                  <li key={index}>• {DOMPurify.sanitize(action)}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">ระยะยาว (3 เดือน)</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                {runwayData.criticalActions.longTerm.map((action, index) => (
                  <li key={index}>• {DOMPurify.sanitize(action)}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardRunway;
