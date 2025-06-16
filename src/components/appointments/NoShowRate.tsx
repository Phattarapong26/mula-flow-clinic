
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Calendar, TrendingDown, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const noShowData = [
  { month: 'ม.ค.', noShow: 12, total: 150 },
  { month: 'ก.พ.', noShow: 15, total: 148 },
  { month: 'มี.ค.', noShow: 8, total: 165 },
  { month: 'เม.ย.', noShow: 10, total: 172 },
  { month: 'พ.ค.', noShow: 6, total: 158 },
  { month: 'มิ.ย.', noShow: 9, total: 180 }
];

const reasonData = [
  { name: 'ลืมนัด', value: 35, color: '#ef4444' },
  { name: 'ติดธุระ', value: 25, color: '#f97316' },
  { name: 'ป่วยเพิ่ม', value: 20, color: '#eab308' },
  { name: 'อื่นๆ', value: 20, color: '#6b7280' }
];

const NoShowRate = () => {
  const currentNoShow = noShowData[noShowData.length - 1];
  const noShowRate = ((currentNoShow.noShow / currentNoShow.total) * 100).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">อัตราไม่มาตามนัด</h1>
        <p className="text-gray-600 mt-1">ติดตามและวิเคราะห์อัตราผู้ป่วยที่ไม่มาตามนัด</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">อัตรา No-Show</p>
                <p className="text-2xl font-bold">{noShowRate}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">เดือนนี้</p>
                <p className="text-2xl font-bold">{currentNoShow.noShow}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">นัดทั้งหมด</p>
                <p className="text-2xl font-bold">{currentNoShow.total}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">แนวโน้ม</p>
                <p className="text-2xl font-bold">ลดลง</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>แนวโน้มอัตรา No-Show</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={noShowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'noShow' ? `${value} คน` : `${value} นัด`,
                    name === 'noShow' ? 'ไม่มาตามนัด' : 'นัดทั้งหมด'
                  ]}
                />
                <Line type="monotone" dataKey="noShow" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>สาเหตุการไม่มาตามนัด</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reasonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NoShowRate;
