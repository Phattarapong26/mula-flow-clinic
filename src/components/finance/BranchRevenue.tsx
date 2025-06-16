import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, MapPin, Users, Download, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { branchService } from '@/services/branchService';
import DOMPurify from 'dompurify';

interface BranchData {
  branchId: string;
  branchName: string;
  revenue: number;
  growth: number;
  customers: number;
  staff: number;
  revenuePerStaff: number;
  target: number;
  achievement: number;
}

const BranchRevenue = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [branchData, setBranchData] = useState<BranchData[]>([]);

  useEffect(() => {
    fetchBranchRevenue();
  }, []);

  const fetchBranchRevenue = async () => {
    try {
      setLoading(true);
      const response = await branchService.getBranchRevenue();
      setBranchData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch branch revenue data');
      toast({
        title: "Error",
        description: "Failed to fetch branch revenue data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = branchData.reduce((sum, branch) => sum + branch.revenue, 0);
  const totalTarget = branchData.reduce((sum, branch) => sum + branch.target, 0);
  const overallAchievement = (totalRevenue / totalTarget) * 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Revenue Data</h3>
        <p className="text-gray-600">{error}</p>
        <Button onClick={fetchBranchRevenue} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (branchData.length === 0) {
    return (
      <div className="text-center py-8">
        <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Revenue Data Available</h3>
        <p className="text-gray-600">There is no revenue data available for any branches.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branch Revenue</h1>
          <p className="text-gray-600">Compare revenue performance across branches</p>
        </div>
        <Button onClick={() => branchService.exportRevenueReport()}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Revenue</p>
                <p className="text-2xl font-bold">฿{(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Target</p>
                <p className="text-2xl font-bold">฿{(totalTarget / 1000000).toFixed(1)}M</p>
              </div>
              <MapPin className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Overall Achievement</p>
                <p className="text-2xl font-bold">{overallAchievement.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Branches</p>
                <p className="text-2xl font-bold">{branchData.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branchData.map((branch) => (
          <Card key={branch.branchId} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{DOMPurify.sanitize(branch.branchName)}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    className={branch.growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {branch.growth >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(branch.growth)}%
                  </Badge>
                  <Badge 
                    className={branch.achievement >= 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {branch.achievement.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-xl font-bold text-gray-900">
                      ฿{(branch.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Target</p>
                    <p className="text-xl font-bold text-gray-900">
                      ฿{(branch.target / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-sm text-gray-600">Customers</p>
                    <p className="text-lg font-semibold">{branch.customers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Staff</p>
                    <p className="text-lg font-semibold">{branch.staff}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue/Staff</p>
                    <p className="text-lg font-semibold">฿{(branch.revenuePerStaff / 1000).toFixed(0)}K</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Target Progress</span>
                    <span>{branch.achievement.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        branch.achievement >= 100 ? 'bg-green-600' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(branch.achievement, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Revenue Share</span>
                    <span>{((branch.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(branch.revenue / totalRevenue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Highest Growth</h3>
              <p className="text-xl font-bold text-green-600">
                {DOMPurify.sanitize(branchData.sort((a, b) => b.growth - a.growth)[0]?.branchName || 'N/A')}
              </p>
              <p className="text-sm text-green-600">
                +{branchData.sort((a, b) => b.growth - a.growth)[0]?.growth.toFixed(1) || '0'}%
              </p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Highest Revenue</h3>
              <p className="text-xl font-bold text-blue-600">
                {DOMPurify.sanitize(branchData.sort((a, b) => b.revenue - a.revenue)[0]?.branchName || 'N/A')}
              </p>
              <p className="text-sm text-blue-600">
                ฿{(branchData.sort((a, b) => b.revenue - a.revenue)[0]?.revenue / 1000000).toFixed(1) || '0'}M
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">Best Efficiency</h3>
              <p className="text-xl font-bold text-purple-600">
                {DOMPurify.sanitize(branchData.sort((a, b) => b.revenuePerStaff - a.revenuePerStaff)[0]?.branchName || 'N/A')}
              </p>
              <p className="text-sm text-purple-600">
                ฿{(branchData.sort((a, b) => b.revenuePerStaff - a.revenuePerStaff)[0]?.revenuePerStaff / 1000).toFixed(0) || '0'}K/staff
              </p>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800">Best Target Achievement</h3>
              <p className="text-xl font-bold text-yellow-600">
                {DOMPurify.sanitize(branchData.sort((a, b) => b.achievement - a.achievement)[0]?.branchName || 'N/A')}
              </p>
              <p className="text-sm text-yellow-600">
                {branchData.sort((a, b) => b.achievement - a.achievement)[0]?.achievement.toFixed(1) || '0'}%
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Areas Needing Attention</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {branchData
                .filter(branch => branch.growth < 0 || branch.achievement < 90)
                .map(branch => (
                  <li key={branch.branchId}>
                    • {DOMPurify.sanitize(branch.branchName)}: 
                    {branch.growth < 0 && ` Revenue decreased by ${Math.abs(branch.growth)}%`}
                    {branch.achievement < 90 && ` Target achievement at ${branch.achievement.toFixed(1)}%`}
                  </li>
                ))}
              {branchData.every(branch => branch.growth >= 0 && branch.achievement >= 90) && (
                <li>• All branches are performing well. No immediate concerns.</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchRevenue;
