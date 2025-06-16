
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, Clock, CheckCircle2, AlertTriangle, Users, BarChart3 } from 'lucide-react';

const TasksAnalytics = () => {
  const analytics = [
    { 
      label: 'งานเสร็จตามกำหนด', 
      value: '92%', 
      change: '+5%', 
      trend: 'up', 
      icon: CheckCircle2, 
      color: 'text-green-600' 
    },
    { 
      label: 'เวลาเฉลี่ยต่องาน', 
      value: '3.2 วัน', 
      change: '-0.8 วัน', 
      trend: 'up', 
      icon: Clock, 
      color: 'text-blue-600' 
    },
    { 
      label: 'งานเกินกำหนด', 
      value: '8%', 
      change: '-2%', 
      trend: 'up', 
      icon: AlertTriangle, 
      color: 'text-red-600' 
    },
    { 
      label: 'ประสิทธิภาพทีม', 
      value: '85%', 
      change: '+12%', 
      trend: 'up', 
      icon: Users, 
      color: 'text-purple-600' 
    }
  ];

  const teamPerformance = [
    { team: 'ทีมการเงิน', completed: 45, inProgress: 12, overdue: 3, efficiency: 88 },
    { team: 'ทีม HR', completed: 38, inProgress: 8, overdue: 1, efficiency: 94 },
    { team: 'ทีม IT', completed: 32, inProgress: 15, overdue: 5, efficiency: 76 },
    { team: 'ทีมปฏิบัติการ', completed: 28, inProgress: 10, overdue: 2, efficiency: 82 },
    { team: 'ทีมบริหาร', completed: 22, inProgress: 6, overdue: 1, efficiency: 90 }
  ];

  const tasksByPriority = [
    { priority: 'สูง', count: 45, percentage: 35, color: 'bg-red-500' },
    { priority: 'ปานกลาง', count: 68, percentage: 52, color: 'bg-yellow-500' },
    { priority: 'ต่ำ', count: 17, percentage: 13, color: 'bg-green-500' }
  ];

  const monthlyProgress = [
    { month: 'ม.ค.', completed: 85, target: 90 },
    { month: 'ก.พ.', completed: 92, target: 95 },
    { month: 'มี.ค.', completed: 88, target: 90 },
    { month: 'เม.ย.', completed: 94, target: 95 },
    { month: 'พ.ค.', completed: 96, target: 100 },
    { month: 'มิ.ย.', completed: 89, target: 95 }
  ];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-blue-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 90) return 'bg-green-100 text-green-800';
    if (efficiency >= 80) return 'bg-blue-100 text-blue-800';
    if (efficiency >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">วิเคราะห์ประสิทธิภาพงาน</h1>
        <p className="text-gray-600">ติดตามและวิเคราะห์ประสิทธิภาพการทำงานของทีม</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analytics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>ประสิทธิภาพทีมงาน</CardTitle>
            <CardDescription>การติดตามผลงานแต่ละทีม</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((team, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{team.team}</h3>
                    <Badge className={getEfficiencyBadge(team.efficiency)}>
                      {team.efficiency}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{team.completed}</div>
                      <div className="text-gray-600">เสร็จสิ้น</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{team.inProgress}</div>
                      <div className="text-gray-600">กำลังทำ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">{team.overdue}</div>
                      <div className="text-gray-600">เกินกำหนด</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tasks by Priority */}
        <Card>
          <CardHeader>
            <CardTitle>การกระจายตามความสำคัญ</CardTitle>
            <CardDescription>สัดส่วนงานตามระดับความสำคัญ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasksByPriority.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.priority}</span>
                    <span className="text-sm text-gray-600">{item.count} งาน ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">130</div>
                  <div className="text-sm text-gray-600">งานทั้งหมด</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>ความคืบหน้ารายเดือน</CardTitle>
          <CardDescription>เปรียบเทียบผลงานกับเป้าหมาย</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {monthlyProgress.map((month, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <div className="text-lg font-bold">{month.month}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">เป้าหมาย: {month.target}%</div>
                  <div className={`text-lg font-bold ${
                    month.completed >= month.target ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {month.completed}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        month.completed >= month.target ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${(month.completed / month.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            ข้อมูลเชิงลึกและคำแนะนำ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">จุดแข็ง</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• ทีม HR มีประสิทธิภาพสูงสุด (94%)</li>
                <li>• อัตราการทำงานเสร็จตามกำหนดเพิ่มขึ้น 5%</li>
                <li>• เวลาเฉลี่ยในการทำงานลดลง 0.8 วัน</li>
                <li>• งานเกินกำหนดลดลง 2%</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-600 mb-2">จุดที่ควรปรับปรุง</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• ทีม IT ควรได้รับการสนับสนุนเพิ่มเติม</li>
                <li>• งานระดับสูงมีสัดส่วนมาก (35%)</li>
                <li>• ควรเพิ่มการติดตามงานระยะยาว</li>
                <li>• พัฒนาระบบแจ้งเตือนล่วงหน้า</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksAnalytics;
