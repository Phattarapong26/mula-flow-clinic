
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Zap, TrendingDown, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const botFailData = [
  { time: '08:00', totalRequests: 45, failures: 3, failRate: 6.7, avgResponseTime: 2.1 },
  { time: '10:00', totalRequests: 67, failures: 8, failRate: 11.9, avgResponseTime: 3.2 },
  { time: '12:00', totalRequests: 89, failures: 12, failRate: 13.5, avgResponseTime: 4.1 },
  { time: '14:00', totalRequests: 78, failures: 6, failRate: 7.7, avgResponseTime: 2.8 },
  { time: '16:00', totalRequests: 56, failures: 4, failRate: 7.1, avgResponseTime: 2.5 },
  { time: '18:00', totalRequests: 34, failures: 2, failRate: 5.9, avgResponseTime: 1.9 }
];

const failureReasons = [
  { reason: 'ไม่เข้าใจคำถาม', count: 15, percentage: 42.9, color: '#ef4444' },
  { reason: 'ข้อมูลไม่ครบถ้วน', count: 8, percentage: 22.9, color: '#f59e0b' },
  { reason: 'คำถามซับซ้อน', count: 6, percentage: 17.1, color: '#8b5cf6' },
  { reason: 'ข้อผิดพลาดระบบ', count: 4, percentage: 11.4, color: '#6b7280' },
  { reason: 'คำถามใหม่', count: 2, percentage: 5.7, color: '#3b82f6' }
];

const weeklyTrend = [
  { week: 'สัปดาห์ 1', failRate: 12.5, totalRequests: 1250 },
  { week: 'สัปดาห์ 2', failRate: 10.8, totalRequests: 1340 },
  { week: 'สัปดาห์ 3', failRate: 9.2, totalRequests: 1420 },
  { week: 'สัปดาห์ 4', failRate: 8.6, totalRequests: 1580 }
];

const improvementActions = [
  { action: 'อัพเดตฐานความรู้', priority: 'สูง', impact: 'ลด 35% ของความล้มเหลว', status: 'กำลังดำเนินการ' },
  { action: 'ปรับปรุงอัลกอริทึมเข้าใจภาษา', priority: 'สูง', impact: 'ลด 25% ของความล้มเหลว', status: 'วางแผน' },
  { action: 'เพิ่มคำถาม FAQ', priority: 'กลาง', impact: 'ลด 15% ของความล้มเหลว', status: 'เสร็จแล้ว' },
  { action: 'ปรับปรุงการจัดการข้อผิดพลาด', priority: 'กลาง', impact: 'ลด 10% ของความล้มเหลว', status: 'กำลังดำเนินการ' }
];

const BotFailRate = () => {
  const totalRequests = botFailData.reduce((sum, item) => sum + item.totalRequests, 0);
  const totalFailures = botFailData.reduce((sum, item) => sum + item.failures, 0);
  const avgFailRate = (totalFailures / totalRequests * 100);
  const avgResponseTime = botFailData.reduce((sum, item) => sum + item.avgResponseTime, 0) / botFailData.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bot Fail Rate</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์อัตราความล้มเหลวของระบบ AI Chatbot</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">อัตราล้มเหลว</p>
                <p className="text-2xl font-bold">{avgFailRate.toFixed(1)}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">คำขอทั้งหมด</p>
                <p className="text-2xl font-bold">{totalRequests}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">ความล้มเหลว</p>
                <p className="text-2xl font-bold">{totalFailures}</p>
              </div>
              <Zap className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">เวลาตอบเฉลี่ย</p>
                <p className="text-2xl font-bold">{avgResponseTime.toFixed(1)}s</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>อัตราความล้มเหลวตามช่วงเวลา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={botFailData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="failRate" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="อัตราล้มเหลว %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มรายสัปดาห์</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="failRate" stroke="#10b981" strokeWidth={3} name="อัตราล้มเหลว %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>สาเหตุความล้มเหลว</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {failureReasons.map((reason, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: reason.color }}
                    ></div>
                    <div>
                      <p className="font-medium">{reason.reason}</p>
                      <p className="text-sm text-gray-600">{reason.count} ครั้ง</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{reason.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>แผนการปรับปรุง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {improvementActions.map((action, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{action.action}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      action.priority === 'สูง' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {action.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{action.impact}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs ${
                      action.status === 'เสร็จแล้ว' ? 'bg-green-100 text-green-800' : 
                      action.status === 'กำลังดำเนินการ' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {action.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>รายละเอียดข้อมูลตามช่วงเวลา</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ช่วงเวลา</th>
                  <th className="px-6 py-3">คำขอทั้งหมด</th>
                  <th className="px-6 py-3">ความล้มเหลว</th>
                  <th className="px-6 py-3">อัตราล้มเหลว</th>
                  <th className="px-6 py-3">เวลาตอบเฉลี่ย</th>
                  <th className="px-6 py-3">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {botFailData.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{item.time}</td>
                    <td className="px-6 py-4">{item.totalRequests}</td>
                    <td className="px-6 py-4">{item.failures}</td>
                    <td className="px-6 py-4">{item.failRate.toFixed(1)}%</td>
                    <td className="px-6 py-4">{item.avgResponseTime.toFixed(1)}s</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.failRate < 8 ? 'bg-green-100 text-green-800' : 
                        item.failRate < 12 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.failRate < 8 ? 'ดี' : item.failRate < 12 ? 'ปานกลาง' : 'ต้องปรับปรุง'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotFailRate;
