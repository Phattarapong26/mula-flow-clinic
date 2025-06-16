
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Plus, Calendar } from 'lucide-react';

const BranchTargets = () => {
  const [targets] = React.useState([
    {
      id: '1',
      branch_name: 'สาขาสีลม',
      target_type: 'revenue',
      target_name: 'รายได้รายเดือน',
      target_value: 500000,
      current_value: 425000,
      period: '2024-01',
      status: 'in_progress',
      progress: 85,
      due_date: '2024-01-31'
    },
    {
      id: '2',
      branch_name: 'สาขาอโศก',
      target_type: 'patients',
      target_name: 'จำนวนผู้ป่วยใหม่',
      target_value: 100,
      current_value: 87,
      period: '2024-01',
      status: 'on_track',
      progress: 87,
      due_date: '2024-01-31'
    },
    {
      id: '3',
      branch_name: 'สาขาพระราม 4',
      target_type: 'revenue',
      target_name: 'รายได้รายเดือน',
      target_value: 400000,
      current_value: 380000,
      period: '2024-01',
      status: 'at_risk',
      progress: 95,
      due_date: '2024-01-31'
    },
    {
      id: '4',
      branch_name: 'สาขาสีลม',
      target_type: 'customer_satisfaction',
      target_name: 'คะแนนความพึงพอใจ',
      target_value: 4.5,
      current_value: 4.7,
      period: '2024-01',
      status: 'achieved',
      progress: 104,
      due_date: '2024-01-31'
    }
  ]);

  const getStatusBadge = (status: string, progress: number) => {
    switch (status) {
      case 'achieved':
        return { variant: 'default' as const, label: 'บรรลุเป้าหมาย', icon: CheckCircle, color: 'text-green-600' };
      case 'on_track':
        return { variant: 'secondary' as const, label: 'เป็นไปตามแผน', icon: TrendingUp, color: 'text-blue-600' };
      case 'at_risk':
        return { variant: 'destructive' as const, label: 'เสี่ยงไม่บรรลุ', icon: AlertCircle, color: 'text-red-600' };
      case 'in_progress':
        return { variant: 'outline' as const, label: 'กำลังดำเนินการ', icon: Target, color: 'text-orange-600' };
      default:
        return { variant: 'secondary' as const, label: status, icon: Target, color: 'text-gray-600' };
    }
  };

  const getTargetTypeLabel = (type: string) => {
    switch (type) {
      case 'revenue':
        return 'รายได้';
      case 'patients':
        return 'จำนวนผู้ป่วย';
      case 'customer_satisfaction':
        return 'ความพึงพอใจ';
      case 'efficiency':
        return 'ประสิทธิภาพ';
      default:
        return type;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 80) return 'bg-blue-500';
    if (progress >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const achievedTargets = targets.filter(t => t.status === 'achieved');
  const onTrackTargets = targets.filter(t => t.status === 'on_track');
  const atRiskTargets = targets.filter(t => t.status === 'at_risk');
  const inProgressTargets = targets.filter(t => t.status === 'in_progress');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">เป้าหมายสาขา</h1>
          <p className="text-gray-600">ติดตามและจัดการเป้าหมายของแต่ละสาขา</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            ตั้งเป้าหมายใหม่
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            ดูรายงาน
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">บรรลุเป้าหมาย</p>
                <p className="text-2xl font-bold text-green-600">{achievedTargets.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เป็นไปตามแผน</p>
                <p className="text-2xl font-bold text-blue-600">{onTrackTargets.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">เสี่ยงไม่บรรลุ</p>
                <p className="text-2xl font-bold text-red-600">{atRiskTargets.length}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">กำลังดำเนินการ</p>
                <p className="text-2xl font-bold text-orange-600">{inProgressTargets.length}</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Targets by Status */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">ทั้งหมด ({targets.length})</TabsTrigger>
          <TabsTrigger value="achieved">บรรลุแล้ว ({achievedTargets.length})</TabsTrigger>
          <TabsTrigger value="on_track">เป็นไปตามแผน ({onTrackTargets.length})</TabsTrigger>
          <TabsTrigger value="at_risk">เสี่ยง ({atRiskTargets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {targets.map((target) => {
              const statusInfo = getStatusBadge(target.status, target.progress);
              const IconComponent = statusInfo.icon;
              
              return (
                <Card key={target.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{target.target_name}</CardTitle>
                        <CardDescription>{target.branch_name} • {getTargetTypeLabel(target.target_type)}</CardDescription>
                      </div>
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>ความคืบหน้า</span>
                          <span>{target.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(target.progress)}`}
                            style={{ width: `${Math.min(target.progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Values */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">ปัจจุบัน</div>
                          <div className="font-bold text-lg">
                            {target.target_type === 'revenue' ? 
                              `฿${target.current_value.toLocaleString()}` :
                              target.target_type === 'customer_satisfaction' ?
                              `${target.current_value}/5.0` :
                              target.current_value.toLocaleString()
                            }
                          </div>
                        </div>
                        <div className="p-3 bg-blue-50 rounded">
                          <div className="text-sm text-gray-600">เป้าหมาย</div>
                          <div className="font-bold text-lg text-blue-600">
                            {target.target_type === 'revenue' ? 
                              `฿${target.target_value.toLocaleString()}` :
                              target.target_type === 'customer_satisfaction' ?
                              `${target.target_value}/5.0` :
                              target.target_value.toLocaleString()
                            }
                          </div>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>ระยะเวลา: {target.period}</span>
                        <span>ถึงกำหนด: {new Date(target.due_date).toLocaleDateString('th-TH')}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          ดูรายละเอียด
                        </Button>
                        <Button size="sm" className="flex-1">
                          อัปเดต
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="achieved">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                เป้าหมายที่บรรลุแล้ว
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                เป้าหมายที่บรรลุแล้ว - แสดงรายละเอียดเหมือนแท็บทั้งหมด
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="on_track">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                เป้าหมายที่เป็นไปตามแผน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                เป้าหมายที่เป็นไปตามแผน - แสดงรายละเอียดเหมือนแท็บทั้งหมด
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="at_risk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                เป้าหมายที่เสี่ยงไม่บรรลุ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                เป้าหมายที่เสี่ยงไม่บรรลุ - แสดงรายละเอียดเหมือนแท็บทั้งหมด
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Target Setting Form - Quick Add */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            ตั้งเป้าหมายด่วน
          </CardTitle>
          <CardDescription>สร้างเป้าหมายใหม่อย่างรวดเร็ว</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">สาขา</label>
              <select className="w-full p-2 border rounded">
                <option>สาขาสีลม</option>
                <option>สาขาอโศก</option>
                <option>สาขาพระราม 4</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">ประเภท</label>
              <select className="w-full p-2 border rounded">
                <option value="revenue">รายได้</option>
                <option value="patients">จำนวนผู้ป่วย</option>
                <option value="customer_satisfaction">ความพึงพอใจ</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">เป้าหมาย</label>
              <input type="number" className="w-full p-2 border rounded" placeholder="ระบุตัวเลข" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">ระยะเวลา</label>
              <select className="w-full p-2 border rounded">
                <option>รายเดือน</option>
                <option>รายไตรมาส</option>
                <option>รายปี</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                เพิ่ม
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchTargets;
