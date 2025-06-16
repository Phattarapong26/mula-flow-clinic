
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Star, MessageSquare, Users, AlertTriangle, ThumbsUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const satisfactionTrend = [
  { month: 'ม.ค.', score: 4.2, responses: 245 },
  { month: 'ก.พ.', score: 4.3, responses: 268 },
  { month: 'มี.ค.', score: 4.5, responses: 289 },
  { month: 'เม.ย.', score: 4.4, responses: 234 },
  { month: 'พ.ค.', score: 4.6, responses: 312 },
  { month: 'มิ.ย.', score: 4.7, responses: 298 }
];

const branchSatisfaction = [
  { branch: 'สาขาสยาม', score: 4.8, reviews: 156, improvements: 2 },
  { branch: 'สาขาทองหล่อ', score: 4.6, reviews: 142, improvements: 4 },
  { branch: 'สาขาอารีย์', score: 4.5, reviews: 98, improvements: 3 },
  { branch: 'สาขาเซ็นทรัล', score: 4.3, reviews: 67, improvements: 5 }
];

const serviceRatings = [
  { service: 'Laser Hair Removal', rating: 4.8, reviews: 245, satisfaction: 96 },
  { service: 'Facial Treatment', rating: 4.6, reviews: 189, satisfaction: 92 },
  { service: 'Botox Injection', rating: 4.7, reviews: 167, satisfaction: 94 },
  { service: 'Chemical Peeling', rating: 4.4, reviews: 134, satisfaction: 88 },
  { service: 'Acne Treatment', rating: 4.5, reviews: 156, satisfaction: 90 }
];

const feedbackCategories = [
  { category: 'คุณภาพบริการ', positive: 285, negative: 23, color: '#10b981' },
  { category: 'ความเป็นมืออาชีพ', positive: 267, negative: 12, color: '#3b82f6' },
  { category: 'สิ่งแวดล้อม', positive: 234, negative: 34, color: '#8b5cf6' },
  { category: 'ราคา', positive: 198, negative: 67, color: '#f59e0b' },
  { category: 'เวลารอ', positive: 145, negative: 89, color: '#ef4444' }
];

const commonIssues = [
  { issue: 'เวลารอนาน', frequency: 89, severity: 'medium', trend: 'decreasing' },
  { issue: 'ราคาสูง', frequency: 67, severity: 'low', trend: 'stable' },
  { issue: 'การจองยาก', frequency: 45, severity: 'medium', trend: 'increasing' },
  { issue: 'พื้นที่จอดรถ', frequency: 34, severity: 'low', trend: 'stable' },
  { issue: 'ข้อมูลไม่ชัดเจน', frequency: 23, severity: 'high', trend: 'decreasing' }
];

const FeedbackInsights = () => {
  const avgSatisfaction = satisfactionTrend.reduce((sum, item) => sum + item.score, 0) / satisfactionTrend.length;
  const totalReviews = branchSatisfaction.reduce((sum, branch) => sum + branch.reviews, 0);
  const responseRate = (totalReviews / 1246) * 100; // Assuming 1246 total customers

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customer Insights</h1>
        <p className="text-gray-600 mt-1">วิเคราะห์เชิงลึกจากความคิดเห็นลูกค้า</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold">{avgSatisfaction.toFixed(1)}</p>
                <p className="text-green-100 text-xs">จาก 5 คะแนน</p>
              </div>
              <Star className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">รีวิวทั้งหมด</p>
                <p className="text-2xl font-bold">{totalReviews}</p>
                <p className="text-blue-100 text-xs">รีวิว</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Response Rate</p>
                <p className="text-2xl font-bold">{responseRate.toFixed(1)}%</p>
                <p className="text-purple-100 text-xs">ของลูกค้าทั้งหมด</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">เพิ่มขึ้น MoM</p>
                <p className="text-2xl font-bold">+8.7%</p>
                <p className="text-orange-100 text-xs">satisfaction</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มความพึงพอใจ</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[3.5, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} name="คะแนนความพึงพอใจ" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ความพึงพอใจตามสาขา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchSatisfaction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis domain={[3.5, 5]} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" name="คะแนน" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>คะแนนบริการ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceRatings.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{service.service}</h3>
                    <p className="text-sm text-gray-600">{service.reviews} รีวิว</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold">{service.rating}</span>
                    </div>
                    <div className="text-sm text-green-600">{service.satisfaction}% พึงพอใจ</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ประเด็นที่พบบ่อย</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commonIssues.map((issue, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{issue.issue}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                        issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.severity === 'high' ? 'สูง' : issue.severity === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                      </span>
                      <span className={`text-xs ${
                        issue.trend === 'increasing' ? 'text-red-600' :
                        issue.trend === 'decreasing' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {issue.trend === 'increasing' ? '↗ เพิ่มขึ้น' :
                         issue.trend === 'decreasing' ? '↘ ลดลง' : '→ คงที่'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{issue.frequency}</div>
                    <div className="text-sm text-gray-600">ครั้ง</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>สรุปข้อเสนอแนะ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-800">จุดแข็ง</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• คุณภาพบริการดีเยี่ยม</li>
                <li>• พนักงานมืออาชีพ</li>
                <li>• ผลลัพธ์การรักษาดี</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg bg-yellow-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <h3 className="font-medium text-yellow-800">ต้องปรับปรุง</h3>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• ลดเวลารอคิว</li>
                <li>• ปรับปรุงระบบจอง</li>
                <li>• เพิ่มที่จอดรถ</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-800">แนวโน้ม</h3>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ความพึงพอใจเพิ่มขึ้น</li>
                <li>• ลูกค้าให้รีวิวมากขึ้น</li>
                <li>• คำร้องเรียนลดลง</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackInsights;
