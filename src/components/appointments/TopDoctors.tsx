
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, DollarSign, Users, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const topDoctorsData = [
  { 
    rank: 1,
    name: 'นพ.สมชาย รักษาดี', 
    revenue: 450000, 
    patients: 85, 
    rating: 4.9,
    specialization: 'จักษุแพทย์อาวุโส',
    avgPerPatient: 5294,
    growthRate: 15.2
  },
  { 
    rank: 2,
    name: 'นพ.วิภาวดี ใสสะอาด', 
    revenue: 380000, 
    patients: 72, 
    rating: 4.7,
    specialization: 'จักษุแพทย์',
    avgPerPatient: 5278,
    growthRate: 12.8
  },
  { 
    rank: 3,
    name: 'นพ.ประยุทธ์ ตาใส', 
    revenue: 320000, 
    patients: 65, 
    rating: 4.6,
    specialization: 'จักษุแพทย์',
    avgPerPatient: 4923,
    growthRate: 8.5
  },
  { 
    rank: 4,
    name: 'นพ.สุขใส ดูดี', 
    revenue: 285000, 
    patients: 58, 
    rating: 4.5,
    specialization: 'จักษุแพทย์',
    avgPerPatient: 4914,
    growthRate: 6.2
  },
  { 
    rank: 5,
    name: 'นพ.ใสใส มองเห็น', 
    revenue: 250000, 
    patients: 52, 
    rating: 4.4,
    specialization: 'จักษุแพทย์',
    avgPerPatient: 4808,
    growthRate: 4.1
  }
];

const serviceTypeRevenue = [
  { service: 'ตรวจสายตา', revenue: 320000, color: '#3b82f6' },
  { service: 'ผ่าตัดต้อกระจก', revenue: 280000, color: '#10b981' },
  { service: 'รักษาจอประสาทตา', revenue: 240000, color: '#f59e0b' },
  { service: 'ตรวจกลุ่มโรคต้อหิน', revenue: 180000, color: '#ef4444' },
  { service: 'อื่นๆ', revenue: 165000, color: '#8b5cf6' }
];

const TopDoctors = () => {
  const totalRevenue = topDoctorsData.reduce((sum, doctor) => sum + doctor.revenue, 0);
  const totalPatients = topDoctorsData.reduce((sum, doctor) => sum + doctor.patients, 0);
  const avgRating = topDoctorsData.reduce((sum, doctor) => sum + doctor.rating, 0) / topDoctorsData.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">หมอสร้างรายได้สูงสุด</h1>
        <p className="text-gray-600 mt-1">รายงานแพทย์ที่สร้างรายได้และมีผลงานดีเด่น</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">รายได้รวม</p>
                <p className="text-2xl font-bold">฿{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">ผู้ป่วยรวม</p>
                <p className="text-2xl font-bold">{totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Top Doctors</p>
                <p className="text-2xl font-bold">{topDoctorsData.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>รายได้ Top 5 Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topDoctorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'รายได้']} />
                <Bar dataKey="revenue" fill="#10b981" name="รายได้" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การกระจายรายได้ตามการรักษา</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceTypeRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ service, revenue }) => `${service}: ฿${(revenue/1000).toFixed(0)}K`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {serviceTypeRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, 'รายได้']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🏆 อันดับแพทย์สร้างรายได้สูงสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDoctorsData.map((doctor, index) => (
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
                      {doctor.rank}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-6">
                      <div>
                        <p className="text-sm text-gray-600">รายได้รวม</p>
                        <p className="text-xl font-bold text-green-600">฿{doctor.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ผู้ป่วย</p>
                        <p className="text-lg font-semibold">{doctor.patients} คน</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">คะแนน</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <p className="text-lg font-semibold">{doctor.rating}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">การเติบโต</p>
                        <p className="text-lg font-semibold text-blue-600">+{doctor.growthRate}%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    รายได้เฉลี่ยต่อผู้ป่วย: <span className="font-semibold">฿{doctor.avgPerPatient.toLocaleString()}</span>
                  </span>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      doctor.growthRate > 10 ? 'bg-green-100 text-green-800' : 
                      doctor.growthRate > 5 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {doctor.growthRate > 10 ? 'เติบโตสูง' : doctor.growthRate > 5 ? 'เติบโตดี' : 'เติบโตช้า'}
                    </span>
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

export default TopDoctors;
