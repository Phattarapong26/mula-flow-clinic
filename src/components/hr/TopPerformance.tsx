
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Trophy, TrendingUp, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const topPerformers = [
  { 
    rank: 1,
    name: 'นพ.สมชาย รักษาดี', 
    department: 'จักษุแพทย์',
    score: 98,
    revenue: 450000,
    patientRating: 4.9,
    efficiency: 95,
    teamwork: 92,
    innovation: 88
  },
  { 
    rank: 2,
    name: 'นาง สมหญิง ดูแลดี', 
    department: 'พยาบาล',
    score: 96,
    revenue: 180000,
    patientRating: 4.8,
    efficiency: 98,
    teamwork: 95,
    innovation: 85
  },
  { 
    rank: 3,
    name: 'นพ.วิภาวดี ใสสะอาด', 
    department: 'จักษุแพทย์',
    score: 94,
    revenue: 380000,
    patientRating: 4.7,
    efficiency: 92,
    teamwork: 88,
    innovation: 90
  },
  { 
    rank: 4,
    name: 'นาย บัญชีเก่ง', 
    department: 'การเงิน',
    score: 91,
    revenue: 45000,
    patientRating: 4.5,
    efficiency: 94,
    teamwork: 90,
    innovation: 82
  },
  { 
    rank: 5,
    name: 'นาง ธุรการดี', 
    department: 'ธุรการ',
    score: 89,
    revenue: 35000,
    patientRating: 4.6,
    efficiency: 91,
    teamwork: 93,
    innovation: 79
  }
];

const performanceMetrics = [
  { metric: 'Revenue Generation', นพสมชาย: 95, นางสมหญิง: 75, นพวิภาวดี: 85 },
  { metric: 'Patient Satisfaction', นพสมชาย: 98, นางสมหญิง: 96, นพวิภาวดี: 94 },
  { metric: 'Efficiency', นพสมชาย: 95, นางสมหญิง: 98, นพวิภาวดี: 92 },
  { metric: 'Teamwork', นพสมชาย: 92, นางสมหญิง: 95, นพวิภาวดี: 88 },
  { metric: 'Innovation', นพสมชาย: 88, นางสมหญิง: 85, นพวิภาวดี: 90 }
];

const monthlyPerformance = [
  { month: 'ม.ค.', avgScore: 87.2 },
  { month: 'ก.พ.', avgScore: 89.1 },
  { month: 'มี.ค.', avgScore: 91.5 },
  { month: 'เม.ย.', avgScore: 90.8 },
  { month: 'พ.ค.', avgScore: 92.7 },
  { month: 'มิ.ย.', avgScore: 94.3 }
];

const TopPerformance = () => {
  const averageScore = topPerformers.reduce((sum, p) => sum + p.score, 0) / topPerformers.length;
  const totalRevenue = topPerformers.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance สูงสุด</h1>
        <p className="text-gray-600 mt-1">รายงานพนักงานที่มีผลงานดีเด่นและมีประสิทธิภาพสูงสุด</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold">{averageScore.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Top Performers</p>
                <p className="text-2xl font-bold">{topPerformers.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">รายได้รวม</p>
                <p className="text-2xl font-bold">฿{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">การพัฒนา</p>
                <p className="text-2xl font-bold">+7.1%</p>
              </div>
              <Award className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มคะแนนเฉลี่ย</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#fbbf24" name="คะแนนเฉลี่ย" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>เปรียบเทียบ Top 3 Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="นพ.สมชาย" dataKey="นพสมชาย" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Radar name="นาง สมหญิง" dataKey="นางสมหญิง" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Radar name="นพ.วิภาวดี" dataKey="นพวิภาวดี" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🏆 อันดับพนักงานดีเด่น</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                index === 0 ? 'border-yellow-400 bg-yellow-50' :
                index === 1 ? 'border-gray-400 bg-gray-50' :
                index === 2 ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-500' :
                      index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {performer.rank}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{performer.name}</h3>
                      <p className="text-gray-600">{performer.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-gray-600">คะแนนรวม</p>
                        <p className="text-2xl font-bold text-blue-600">{performer.score}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">รายได้</p>
                        <p className="text-lg font-semibold">฿{performer.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <p className="text-lg font-semibold">{performer.patientRating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ประสิทธิภาพ: </span>
                    <span className="font-semibold">{performer.efficiency}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">ทีมเวิร์ก: </span>
                    <span className="font-semibold">{performer.teamwork}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">นวัตกรรม: </span>
                    <span className="font-semibold">{performer.innovation}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformance;
