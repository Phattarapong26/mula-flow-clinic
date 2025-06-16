import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin, Users, TrendingUp, Search, Filter, Plus, Eye, Settings, BarChart3 } from 'lucide-react';
import { branchService, Branch as ServiceBranch } from '@/services/branchService';
import { useToast } from '@/hooks/use-toast';

interface Branch extends ServiceBranch {
  area: string;
  staff_count: number;
  monthly_revenue: number;
  monthly_target: number;
}

const BranchList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await branchService.getBranches();
        // Transform the data to include the additional fields
        const transformedData: Branch[] = data.map(branch => ({
          ...branch,
          area: branch.address.split(' ')[0], // Extract area from address
          staff_count: 0, // This should come from a separate API call
          monthly_revenue: 0, // This should come from a separate API call
          monthly_target: 0 // This should come from a separate API call
        }));
        setBranches(transformedData);
      } catch (err) {
        setError('Failed to load branches');
        toast({
          title: 'Error',
          description: 'Failed to load branches',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [toast]);

  const filteredBranches = branches
    .filter(branch => {
      const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           branch.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           branch.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || branch.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.monthly_revenue - a.monthly_revenue;
        case 'target':
          return (b.monthly_revenue / b.monthly_target) - (a.monthly_revenue / a.monthly_target);
        case 'staff':
          return b.staff_count - a.staff_count;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'เปิดใช้งาน';
      case 'maintenance':
        return 'ปรับปรุง';
      case 'inactive':
        return 'ปิดใช้งาน';
      default:
        return status;
    }
  };

  const getAchievementPercentage = (revenue: number, target: number) => {
    return ((revenue / target) * 100).toFixed(1);
  };

  // Calculate totals properly
  const totalBranches = branches.length;
  const activeBranches = branches.filter(b => b.status === 'active').length;
  const totalStaff = branches.reduce((total, branch) => total + branch.staff_count, 0);
  const totalRevenue = branches.reduce((total, branch) => total + branch.monthly_revenue, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">จัดการสาขา</h1>
          <p className="text-gray-600 mt-2">ภาพรวมและจัดการสาขาทั้งหมดของคลินิกตา</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/branch/revenue')} variant="outline" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            รายงานรายได้
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            เพิ่มสาขาใหม่
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">จำนวนสาขา</p>
                <p className="text-2xl font-bold text-blue-900">{totalBranches}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">สาขาที่เปิดใช้งาน</p>
                <p className="text-2xl font-bold text-green-900">{activeBranches}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">พนักงานรวม</p>
                <p className="text-2xl font-bold text-purple-900">{totalStaff}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">รายได้รวม/เดือน</p>
                <p className="text-2xl font-bold text-orange-900">
                  ฿{totalRevenue.toLocaleString()}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="ค้นหาสาขา, พื้นที่, หรือผู้จัดการ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="สถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="active">เปิดใช้งาน</SelectItem>
                <SelectItem value="maintenance">ปรับปรุง</SelectItem>
                <SelectItem value="inactive">ปิดใช้งาน</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เรียงตาม" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">ชื่อสาขา</SelectItem>
                <SelectItem value="revenue">รายได้สูงสุด</SelectItem>
                <SelectItem value="target">ทำเป้าดีที่สุด</SelectItem>
                <SelectItem value="staff">จำนวนพนักงาน</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBranches.map((branch) => (
          <Card key={branch.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900 mb-2">{branch.name}</CardTitle>
                  <Badge className={`${getStatusColor(branch.status)} font-medium`}>
                    {getStatusText(branch.status)}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/branch/${branch.id}`)}
                    className="p-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="p-2"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">{branch.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <p className="text-sm text-gray-600">ผู้จัดการ: {branch.manager}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">รายได้เดือนนี้</span>
                  <span className="font-bold text-green-600">฿{branch.monthly_revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">เป้าหมาย</span>
                  <span className="font-medium text-gray-900">฿{branch.monthly_target.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">ทำเป้าได้</span>
                  <Badge className={
                    parseFloat(getAchievementPercentage(branch.monthly_revenue, branch.monthly_target)) >= 100
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }>
                    {getAchievementPercentage(branch.monthly_revenue, branch.monthly_target)}%
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      parseFloat(getAchievementPercentage(branch.monthly_revenue, branch.monthly_target)) >= 100
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ 
                      width: `${Math.min(parseFloat(getAchievementPercentage(branch.monthly_revenue, branch.monthly_target)), 100)}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => navigate(`/branch/${branch.id}`)}
                  className="flex-1"
                  size="sm"
                >
                  ดูรายละเอียด
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/branch/revenue')}
                  className="flex-1"
                  size="sm"
                >
                  รายงาน
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบสาขาที่ตรงกับเงื่อนไข</h3>
            <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BranchList;
