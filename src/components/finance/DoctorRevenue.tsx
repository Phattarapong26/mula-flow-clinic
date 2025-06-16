
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Crown, TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

const DoctorRevenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const doctorData = [
    {
      id: 1,
      name: 'นายแพทย์ สมชาย เก่งมาก',
      specialty: 'จักษุแพทย์ทั่วไป',
      revenue: 450000,
      patients: 85,
      avgPerPatient: 5294,
      growth: 15.2,
      rank: 1,
      commission: 67500
    },
    {
      id: 2,
      name: 'นายแพทย์ วิภา สวยงาม',
      specialty: 'จักษุแพทย์เด็ก',
      revenue: 380000,
      patients: 72,
      avgPerPatient: 5278,
      growth: 8.7,
      rank: 2,
      commission: 57000
    },
    {
      id: 3,
      name: 'นายแพทย์ ประเสริฐ มั่งมี',
      specialty: 'โรคตาแก้ว',
      revenue: 320000,
      patients: 45,
      avgPerPatient: 7111,
      growth: -2.1,
      rank: 3,
      commission: 48000
    },
    {
      id: 4,
      name: 'นายแพทย์ มาลี ใจดี',
      specialty: 'ศัลยกรรมตา',
      revenue: 280000,
      patients: 38,
      avgPerPatient: 7368,
      growth: 22.3,
      rank: 4,
      commission: 42000
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    return <span className="text-gray-500 font-bold">#{rank}</span>;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const totalRevenue = doctorData.reduce((sum, doctor) => sum + doctor.revenue, 0);
  const totalPatients = doctorData.reduce((sum, doctor) => sum + doctor.patients, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายได้ต่อหมอ</h1>
          <p className="text-gray-600">Ranking ใครดึงเงินเข้าคลินิกได้มากสุด</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === 'week' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('week')}
          >
            รายสัปดาห์
          </Button>
          <Button 
            variant={selectedPeriod === 'month' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('month')}
          >
            รายเดือน
          </Button>
          <Button 
            variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
            onClick={() => setSelectedPeriod('quarter')}
          >
            รายไตรมาส
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">รายได้รวม</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ผู้ป่วยรวม</p>
                <p className="text-2xl font-bold">{totalPatients}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เฉลี่ยต่อผู้ป่วย</p>
                <p className="text-2xl font-bold">{formatCurrency(totalRevenue / totalPatients)}</p>
              </div>
              <UserCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">หมอทำงาน</p>
                <p className="text-2xl font-bold">{doctorData.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Doctor Ranking */}
      <Card>
        <CardHeader>
          <CardTitle>อันดับรายได้หมอ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctorData.map((doctor) => (
              <div key={doctor.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {getRankIcon(doctor.rank)}
                    <div>
                      <h3 className="font-bold text-lg">{doctor.name}</h3>
                      <p className="text-gray-600">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(doctor.revenue)}
                    </div>
                    <div className={`text-sm font-medium ${getGrowthColor(doctor.growth)}`}>
                      {doctor.growth > 0 ? '+' : ''}{doctor.growth}%
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">ผู้ป่วย:</span>
                    <p className="font-bold text-blue-600">{doctor.patients} คน</p>
                  </div>
                  <div>
                    <span className="text-gray-500">เฉลี่ย/คน:</span>
                    <p className="font-bold">{formatCurrency(doctor.avgPerPatient)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">คอมมิชชั่น:</span>
                    <p className="font-bold text-purple-600">{formatCurrency(doctor.commission)}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">การเติบโต:</span>
                    <div className="flex items-center gap-1">
                      {doctor.growth > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : doctor.growth < 0 ? (
                        <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                      ) : null}
                      <span className={`font-bold ${getGrowthColor(doctor.growth)}`}>
                        {doctor.growth > 0 ? '+' : ''}{doctor.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเชิงลึก</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-bold text-lg">หมอรายได้สูงสุด</h3>
              <p className="text-gray-600">{doctorData[0].name}</p>
              <p className="font-bold text-2xl text-green-600 mt-1">
                {formatCurrency(doctorData[0].revenue)}
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <UserCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-bold text-lg">ค่าเฉลี่ยสูงสุด</h3>
              <p className="text-gray-600">
                {doctorData.reduce((max, doctor) => 
                  doctor.avgPerPatient > max.avgPerPatient ? doctor : max
                ).name}
              </p>
              <p className="font-bold text-2xl text-blue-600 mt-1">
                {formatCurrency(Math.max(...doctorData.map(d => d.avgPerPatient)))}
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-bold text-lg">เติบโตเร็วสุด</h3>
              <p className="text-gray-600">
                {doctorData.reduce((max, doctor) => 
                  doctor.growth > max.growth ? doctor : max
                ).name}
              </p>
              <p className="font-bold text-2xl text-green-600 mt-1">
                +{Math.max(...doctorData.map(d => d.growth))}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorRevenue;
