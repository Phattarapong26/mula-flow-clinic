import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BranchPerformance, BranchTarget, branchPerformanceData, branchTargets } from '@/data/branchMockData';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, BarChart3 } from 'lucide-react';

const BranchPerformanceTable = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<BranchPerformance[]>([]);
  const [currentTarget] = useState<BranchTarget>(branchTargets[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        setBranches(branchPerformanceData);
      } catch (error) {
        console.error('Error fetching branch performance data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch branch performance data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!branches.length) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Branch Performance</h1>
        <Badge variant="outline">
          {currentTarget.month}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Target</span>
                <span className="text-sm font-medium">฿{currentTarget.revenueTarget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Actual</span>
                <span className="text-lg font-bold text-green-600">฿{currentTarget.actualRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold text-green-600">
                  {currentTarget.achievementRate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Target</span>
                <span className="text-sm font-medium">{currentTarget.customerTarget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Actual</span>
                <span className="text-lg font-bold text-blue-600">{currentTarget.actualCustomers.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">
                  {((currentTarget.actualCustomers / currentTarget.customerTarget) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Target</span>
                <span className="text-sm font-medium">{currentTarget.appointmentTarget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Actual</span>
                <span className="text-lg font-bold text-purple-600">{currentTarget.actualAppointments.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">
                  {((currentTarget.actualAppointments / currentTarget.appointmentTarget) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Growth</TableHead>
                <TableHead className="text-right">Patients</TableHead>
                <TableHead className="text-right">Appointments</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-right">No-Show Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell className="font-medium">{branch.name}</TableCell>
                  <TableCell className="text-right">฿{branch.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{branch.growth}%</TableCell>
                  <TableCell className="text-right">{branch.patients}</TableCell>
                  <TableCell className="text-right">{branch.appointments}</TableCell>
                  <TableCell className="text-right">{branch.utilization}%</TableCell>
                  <TableCell className="text-right">{branch.noShowRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchPerformanceTable;
