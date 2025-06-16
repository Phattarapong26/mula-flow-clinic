import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Phone, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Target,
  Award,
  AlertCircle,
  Settings,
  Edit,
  Loader2
} from 'lucide-react';
import { branchService } from "@/services/branchService";
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

const BranchDetail: React.FC = () => {
  const { branchId } = useParams<{ branchId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [branch, setBranch] = useState<any>(null);
  const [finances, setFinances] = useState<any[]>([]);
  const [hrs, setHrs] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBranchData = async () => {
      if (!branchId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch branch details
        const branchData = await branchService.getBranchById(branchId);
        setBranch(branchData);

        // Fetch branch finances
        const { data: financeData } = await branchService.getBranchFinances(branchId);
        setFinances(financeData);

        // Fetch branch staff
        const { data: staffData } = await branchService.getBranchStaff(branchId);
        setHrs(staffData);

        // Fetch branch expenses
        const { data: expenseData } = await branchService.getBranchExpenses(branchId);
        setExpenses(expenseData);

      } catch (err) {
        setError('Failed to load branch data');
        toast({
          title: 'Error',
          description: 'Failed to load branch data. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [branchId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Loading Branch Data</h2>
            <p className="text-gray-600">Please wait while we fetch the branch information...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Error Loading Branch</h2>
            <p className="text-gray-600 mb-6">{error || 'Branch not found'}</p>
            <Button onClick={() => navigate("/branch")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Branches
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        return 'Active';
      case 'maintenance':
        return 'Under Maintenance';
      case 'inactive':
        return 'Inactive';
      default:
        return status;
    }
  };

  const achievementPercentage = branch.monthly_target > 0 
    ? ((branch.monthly_revenue / branch.monthly_target) * 100)
    : 0;

  // Sanitize any user-provided content
  const sanitizeContent = (content: string) => {
    return DOMPurify.sanitize(content);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{sanitizeContent(branch.name)}</h1>
          <p className="text-gray-600">Branch Details and Performance</p>
        </div>
        <Badge className={getStatusColor(branch.status)}>
          {getStatusText(branch.status)}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">฿{branch.monthly_revenue.toLocaleString()}</div>
                <Progress value={achievementPercentage} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {achievementPercentage.toFixed(1)}% of target
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Staff Count</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{branch.staff_count}</div>
                <p className="text-xs text-muted-foreground">
                  Active staff members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Location</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">{sanitizeContent(branch.address)}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {sanitizeContent(branch.area)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">{sanitizeContent(branch.phone)}</div>
                <p className="text-xs text-muted-foreground mt-2">
                  {sanitizeContent(branch.email)}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Branch Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Manager</h3>
                  <p>{sanitizeContent(branch.manager)}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Opening Hours</h3>
                  <p>{sanitizeContent(branch.opening_hours)}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Established</h3>
                  <p>{new Date(branch.established).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary (Last 3 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Month/Year</th>
                      <th className="text-right py-3 px-4 font-medium">Revenue</th>
                      <th className="text-right py-3 px-4 font-medium">Expenses</th>
                      <th className="text-right py-3 px-4 font-medium">Profit</th>
                      <th className="text-right py-3 px-4 font-medium">Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finances.map(f => (
                      <tr key={f.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{f.month} {f.year}</td>
                        <td className="py-3 px-4 text-right text-green-600 font-medium">฿{f.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-red-600 font-medium">฿{f.expense.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-bold">฿{f.profit.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <Badge className={((f.revenue / f.target) * 100) >= 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {((f.revenue / f.target) * 100).toFixed(1)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hr">
          <Card>
            <CardHeader>
              <CardTitle>Staff List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hrs.map(h => (
                  <div key={h.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {sanitizeContent(h.name).charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{sanitizeContent(h.name)}</h4>
                        <p className="text-sm text-gray-600">{sanitizeContent(h.position)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">฿{h.salary.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{h.performance}% Performance</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{sanitizeContent(expense.description)}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <Badge variant="outline">{sanitizeContent(expense.category)}</Badge>
                        <span>{new Date(expense.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">-฿{expense.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total Expenses</span>
                    <span className="font-bold text-red-600 text-lg">
                      -฿{expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BranchDetail;
