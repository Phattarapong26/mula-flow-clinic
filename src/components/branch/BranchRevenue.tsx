import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Plus, Calendar, Download, Target, BarChart3, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { revenueSchemas } from '@/utils/validation';
import useApi from '@/hooks/useApi';
import { useForm } from '@/hooks/useForm';
import { EmptyState } from '@/components/ui/empty-state';
import { sanitizeObject } from '@/utils/security';

// API interfaces
interface RevenueRecord {
  id: string;
  branchId: string;
  branchName: string;
  month: string;
  year: number;
  revenue: number;
  target: number;
  achievement: number;
  services: {
    eyeExam: number;
    glasses: number;
    contactLens: number;
    surgery: number;
  };
  created_at: string;
}

interface Branch {
  id: string;
  name: string;
}

const BranchRevenue = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const { toast } = useToast();

  // API hooks
  const {
    data: branches,
    loading: branchesLoading,
    error: branchesError,
    get: getBranches
  } = useApi<Branch[]>();

  const {
    data: revenueRecords,
    loading: revenueLoading,
    error: revenueError,
    get: getRevenue,
    post: createRevenue
  } = useApi<RevenueRecord[]>();

  // Form hook
  const {
    values: newRecord,
    errors: formErrors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldError,
    isFieldTouched,
    hasFieldError
  } = useForm({
    initialValues: {
      branchId: '',
      month: '',
      year: new Date().getFullYear(),
      revenue: 0,
      target: 0,
      services: {
        eyeExam: 0,
        glasses: 0,
        contactLens: 0,
        surgery: 0
      }
    },
    validationSchema: revenueSchemas.create,
    onSubmit: async (values) => {
      const sanitizedValues = sanitizeObject(values);
      await createRevenue('/api/revenue', sanitizedValues, {
        onSuccess: () => {
          resetForm();
          setIsCreateDialogOpen(false);
          fetchRevenueData();
        }
      });
    }
  });

  const handleServiceChange = (field: string, value: number) => {
    handleChange('services', {
      ...newRecord.services,
      [field]: value
    });
  };

  const handleServiceBlur = (field: string) => {
    handleBlur(`services.${field}`);
  };

  useEffect(() => {
    fetchBranches();
    fetchRevenueData();
  }, [selectedBranch, selectedPeriod]);

  const fetchBranches = async () => {
    try {
      await getBranches('/api/branches');
    } catch (error) {
      // Error is handled by useApi hook
    }
  };

  const fetchRevenueData = async () => {
    try {
      const params = {
        branchId: selectedBranch === 'all' ? undefined : selectedBranch,
        period: selectedPeriod
      };
      await getRevenue('/api/revenue', { sanitizeResponse: true }, params);
    } catch (error) {
      // Error is handled by useApi hook
    }
  };

  if (branchesLoading || revenueLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (branchesError || revenueError) {
    return (
      <EmptyState
        icon={DollarSign}
        title="ไม่สามารถโหลดข้อมูลได้"
        description="เกิดข้อผิดพลาดในการโหลดข้อมูลรายได้ กรุณาลองใหม่อีกครั้ง"
        actionLabel="ลองใหม่"
        onAction={() => { fetchBranches(); fetchRevenueData(); }}
      />
    );
  }

  if (!revenueRecords?.length) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">รายได้แยกสาขา</h1>
            <p className="text-gray-600 mt-2">จัดการและติดตามรายได้ของแต่ละสาขาคลินิกตา</p>
          </div>
        </div>
        
        <EmptyState
          icon={DollarSign}
          title="ยังไม่มีข้อมูลรายได้"
          description="เริ่มต้นโดยการบันทึกรายได้ของสาขาคลินิกตาเพื่อติดตามประสิทธิภาพ"
          actionLabel="บันทึกรายได้แรก"
          onAction={() => setIsCreateDialogOpen(true)}
        />

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>บันทึกรายได้ใหม่</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="branchId">สาขา</Label>
                <Select
                  value={newRecord.branchId}
                  onValueChange={(value) => handleChange('branchId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสาขา" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches?.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isFieldTouched('branchId') && hasFieldError('branchId') && (
                  <p className="text-sm text-red-500">{getFieldError('branchId')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">เดือน</Label>
                <Input
                  id="month"
                  type="month"
                  value={newRecord.month}
                  onChange={(e) => handleChange('month', e.target.value)}
                  onBlur={() => handleBlur('month')}
                />
                {isFieldTouched('month') && hasFieldError('month') && (
                  <p className="text-sm text-red-500">{getFieldError('month')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue">รายได้รวม (บาท)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={newRecord.revenue}
                  onChange={(e) => handleChange('revenue', parseFloat(e.target.value) || 0)}
                  onBlur={() => handleBlur('revenue')}
                />
                {isFieldTouched('revenue') && hasFieldError('revenue') && (
                  <p className="text-sm text-red-500">{getFieldError('revenue')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">เป้าหมาย (บาท)</Label>
                <Input
                  id="target"
                  type="number"
                  value={newRecord.target}
                  onChange={(e) => handleChange('target', parseFloat(e.target.value) || 0)}
                  onBlur={() => handleBlur('target')}
                />
                {isFieldTouched('target') && hasFieldError('target') && (
                  <p className="text-sm text-red-500">{getFieldError('target')}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>รายได้แยกตามบริการ</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eyeExam">ตรวจสายตา</Label>
                    <Input
                      id="eyeExam"
                      type="number"
                      value={newRecord.services.eyeExam}
                      onChange={(e) => handleServiceChange('eyeExam', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="glasses">แว่นตา</Label>
                    <Input
                      id="glasses"
                      type="number"
                      value={newRecord.services.glasses}
                      onChange={(e) => handleServiceChange('glasses', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactLens">คอนแทคเลนส์</Label>
                    <Input
                      id="contactLens"
                      type="number"
                      value={newRecord.services.contactLens}
                      onChange={(e) => handleServiceChange('contactLens', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="surgery">ผ่าตัด/รักษา</Label>
                    <Input
                      id="surgery"
                      type="number"
                      value={newRecord.services.surgery}
                      onChange={(e) => handleServiceChange('surgery', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  ยกเลิก
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    'บันทึก'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  const filteredRecords = revenueRecords.filter(record => {
    const matchesBranch = selectedBranch === 'all' || record.branchId === selectedBranch;
    return matchesBranch;
  });

  const totalRevenue = filteredRecords.reduce((sum, record) => sum + record.revenue, 0);
  const totalTarget = filteredRecords.reduce((sum, record) => sum + record.target, 0);
  const averageAchievement = filteredRecords.length > 0 
    ? filteredRecords.reduce((sum, record) => sum + record.achievement, 0) / filteredRecords.length 
    : 0;

  // Chart data
  const chartData = filteredRecords.map(record => ({
    name: `${record.branchName} ${record.month}`,
    รายได้: record.revenue,
    เป้าหมาย: record.target,
    'ทำเป้า%': record.achievement
  }));

  // Service breakdown for pie chart
  const serviceData = [
    { name: 'ตรวจสายตา', value: filteredRecords.reduce((sum, r) => sum + r.services.eyeExam, 0), color: '#8884d8' },
    { name: 'แว่นตา', value: filteredRecords.reduce((sum, r) => sum + r.services.glasses, 0), color: '#82ca9d' },
    { name: 'คอนแทคเลนส์', value: filteredRecords.reduce((sum, r) => sum + r.services.contactLens, 0), color: '#ffc658' },
    { name: 'ผ่าตัด/รักษา', value: filteredRecords.reduce((sum, r) => sum + r.services.surgery, 0), color: '#ff7300' }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">รายได้แยกสาขา</h1>
          <p className="text-gray-600 mt-2">จัดการและติดตามรายได้ของแต่ละสาขาคลินิกตา</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                บันทึกรายได้
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>บันทึกรายได้ใหม่</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="branchId">สาขา</Label>
                  <Select
                    value={newRecord.branchId}
                    onValueChange={(value) => handleChange('branchId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกสาขา" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches?.map(branch => (
                        <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {isFieldTouched('branchId') && hasFieldError('branchId') && (
                    <p className="text-sm text-red-500">{getFieldError('branchId')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="month">เดือน</Label>
                  <Input
                    id="month"
                    type="month"
                    value={newRecord.month}
                    onChange={(e) => handleChange('month', e.target.value)}
                    onBlur={() => handleBlur('month')}
                  />
                  {isFieldTouched('month') && hasFieldError('month') && (
                    <p className="text-sm text-red-500">{getFieldError('month')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenue">รายได้รวม (บาท)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={newRecord.revenue}
                    onChange={(e) => handleChange('revenue', parseFloat(e.target.value))}
                    onBlur={() => handleBlur('revenue')}
                  />
                  {isFieldTouched('revenue') && hasFieldError('revenue') && (
                    <p className="text-sm text-red-500">{getFieldError('revenue')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target">เป้าหมาย (บาท)</Label>
                  <Input
                    id="target"
                    type="number"
                    value={newRecord.target}
                    onChange={(e) => handleChange('target', parseFloat(e.target.value))}
                    onBlur={() => handleBlur('target')}
                  />
                  {isFieldTouched('target') && hasFieldError('target') && (
                    <p className="text-sm text-red-500">{getFieldError('target')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>รายได้แยกตามบริการ</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eyeExam">ตรวจสายตา</Label>
                      <Input
                        id="eyeExam"
                        type="number"
                        value={newRecord.services.eyeExam}
                        onChange={(e) => handleServiceChange('eyeExam', parseFloat(e.target.value))}
                        onBlur={() => handleServiceBlur('eyeExam')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="glasses">แว่นตา</Label>
                      <Input
                        id="glasses"
                        type="number"
                        value={newRecord.services.glasses}
                        onChange={(e) => handleServiceChange('glasses', parseFloat(e.target.value))}
                        onBlur={() => handleServiceBlur('glasses')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactLens">คอนแทคเลนส์</Label>
                      <Input
                        id="contactLens"
                        type="number"
                        value={newRecord.services.contactLens}
                        onChange={(e) => handleServiceChange('contactLens', parseFloat(e.target.value))}
                        onBlur={() => handleServiceBlur('contactLens')}
                      />
                    </div>
                    <div>
                      <Label htmlFor="surgery">ผ่าตัด/รักษา</Label>
                      <Input
                        id="surgery"
                        type="number"
                        value={newRecord.services.surgery}
                        onChange={(e) => handleServiceChange('surgery', parseFloat(e.target.value))}
                        onBlur={() => handleServiceBlur('surgery')}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">รายได้รวมทั้งหมด</p>
                <p className="text-2xl font-bold text-green-900">฿{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">เป้าหมายรวม</p>
                <p className="text-2xl font-bold text-blue-900">฿{totalTarget.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">ทำเป้าเฉลี่ย</p>
                <p className="text-2xl font-bold text-purple-900">{averageAchievement.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">จำนวนรายการ</p>
                <p className="text-2xl font-bold text-orange-900">{revenueRecords.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกสาขา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สาขาทั้งหมด</SelectItem>
                {branches?.map(branch => (
                  <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="ช่วงเวลา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">เดือนปัจจุบัน</SelectItem>
                <SelectItem value="3months">3 เดือนล่าสุด</SelectItem>
                <SelectItem value="6months">6 เดือนล่าสุด</SelectItem>
                <SelectItem value="year">1 ปี</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
          <TabsTrigger value="charts">กราฟและแผนภูมิ</TabsTrigger>
          <TabsTrigger value="records">รายการข้อมูล</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Branch Performance Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from(new Set(filteredRecords.map(r => r.branchId))).map(branchId => {
              const branchRecords = filteredRecords.filter(r => r.branchId === branchId);
              const latestRecord = branchRecords.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
              
              if (!latestRecord) return null;

              return (
                <Card key={branchId} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{latestRecord.branchName}</CardTitle>
                      <Badge className={latestRecord.achievement >= 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {latestRecord.achievement >= 100 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {latestRecord.achievement.toFixed(1)}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">รายได้</p>
                        <p className="font-bold text-green-600">฿{latestRecord.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">เป้าหมาย</p>
                        <p className="font-medium">฿{latestRecord.target.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>ความสำเร็จ</span>
                        <span>{latestRecord.achievement.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(latestRecord.achievement, 100)} className="h-2" />
                    </div>
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  แนวโน้มรายได้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => [`฿${value.toLocaleString()}`, '']} />
                      <Line type="monotone" dataKey="รายได้" stroke="#16a34a" strokeWidth={3} />
                      <Line type="monotone" dataKey="เป้าหมาย" stroke="#dc2626" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Service Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  สัดส่วนรายได้ตามบริการ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`฿${value.toLocaleString()}`, 'รายได้']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ประวัติรายได้ ({filteredRecords.length} รายการ)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {record.branchName} - {record.month} {record.year}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={record.achievement >= 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {record.achievement >= 100 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {record.achievement.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BranchRevenue;
