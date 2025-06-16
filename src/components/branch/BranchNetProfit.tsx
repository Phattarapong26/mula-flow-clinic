import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3, PieChart, Download, Loader2, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { branchService } from '@/services/branchService';
import DOMPurify from 'dompurify';

interface ProfitData {
  id: string;
  branchId: string;
  branchName: string;
  month: string;
  year: number;
  revenue: number;
  expenses: number;
  netProfit: number;
  profitMargin: number;
  created_at: string;
}

interface ExpenseBreakdown {
  category: string;
  value: number;
  color: string;
}

const BranchNetProfit = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [profitData, setProfitData] = useState<ProfitData[]>([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseBreakdown[]>([]);
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetchBranches();
    fetchProfitData();
  }, [selectedBranch, selectedPeriod]);

  const fetchBranches = async () => {
    try {
      const response = await branchService.getBranches();
      setBranches(response.data.map(branch => ({
        id: branch.id,
        name: branch.name
      })));
    } catch (err) {
      setError('Failed to fetch branches');
      toast({
        title: "Error",
        description: "Failed to fetch branches. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const fetchProfitData = async () => {
    try {
      setLoading(true);
      const response = await branchService.getBranchProfit(
        selectedBranch === 'all' ? undefined : selectedBranch,
        selectedPeriod
      );
      setProfitData(response.data.profitData);
      setExpenseBreakdown(response.data.expenseBreakdown);
      setError(null);
    } catch (err) {
      setError('Failed to fetch profit data');
      toast({
        title: "Error",
        description: "Failed to fetch profit data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredData = profitData.filter(data => 
    selectedBranch === 'all' || data.branchId === selectedBranch
  );

  // Calculate summary statistics
  const totalRevenue = filteredData.reduce((sum, data) => sum + data.revenue, 0);
  const totalExpenses = filteredData.reduce((sum, data) => sum + data.expenses, 0);
  const totalNetProfit = totalRevenue - totalExpenses;
  const averageProfitMargin = filteredData.length > 0 
    ? filteredData.reduce((sum, data) => sum + data.profitMargin, 0) / filteredData.length 
    : 0;

  // Chart data
  const chartData = filteredData.map(data => ({
    name: `${DOMPurify.sanitize(data.branchName)} ${DOMPurify.sanitize(data.month)}`,
    netProfit: data.netProfit,
    revenue: data.revenue,
    expenses: data.expenses,
    profitMargin: data.profitMargin
  }));

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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Profit Data</h3>
        <p className="text-gray-600">{error}</p>
        <Button onClick={fetchProfitData} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (profitData.length === 0) {
    return (
      <div className="text-center py-8">
        <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Profit Data Available</h3>
        <p className="text-gray-600">There is no profit data available for the selected period.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Branch Net Profit</h1>
          <p className="text-gray-600">Analyze profit performance across branches</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => branchService.exportProfitReport(selectedBranch, selectedPeriod)}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {DOMPurify.sanitize(branch.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-blue-600">฿{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">฿{totalExpenses.toLocaleString()}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Profit</p>
                <p className="text-2xl font-bold text-green-600">฿{totalNetProfit.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Profit Margin</p>
                <p className="text-2xl font-bold text-purple-600">{averageProfitMargin.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Net Profit Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [`฿${value.toLocaleString()}`, '']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netProfit" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [`฿${value.toLocaleString()}`, '']}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                  <Bar dataKey="expenses" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Breakdown and Profit Margin Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    dataKey="value"
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Branch Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Branch Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from(new Set(filteredData.map(d => d.branchId))).map(branchId => {
                const latestData = filteredData
                  .filter(d => d.branchId === branchId)
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
                
                if (!latestData) return null;

                return (
                  <div key={branchId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-lg">{DOMPurify.sanitize(latestData.branchName)}</h4>
                      <Badge className={latestData.profitMargin >= 35 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {latestData.profitMargin >= 35 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {latestData.profitMargin.toFixed(1)}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-semibold">฿{latestData.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expenses</p>
                        <p className="font-semibold">฿{latestData.expenses.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Net Profit</p>
                        <p className="font-semibold text-green-600">฿{latestData.netProfit.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Profit Margin</span>
                        <span>{latestData.profitMargin.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            latestData.profitMargin >= 35 ? 'bg-green-600' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(latestData.profitMargin * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Profit Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800">Highest Profit Branch</h3>
              <p className="text-xl font-bold text-green-600">
                {DOMPurify.sanitize(filteredData.sort((a, b) => b.netProfit - a.netProfit)[0]?.branchName || 'N/A')}
              </p>
              <p className="text-sm text-green-600">
                ฿{filteredData.sort((a, b) => b.netProfit - a.netProfit)[0]?.netProfit.toLocaleString() || '0'}
              </p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800">Highest Profit Margin</h3>
              <p className="text-xl font-bold text-blue-600">
                {DOMPurify.sanitize(filteredData.sort((a, b) => b.profitMargin - a.profitMargin)[0]?.branchName || 'N/A')}
              </p>
              <p className="text-sm text-blue-600">
                {filteredData.sort((a, b) => b.profitMargin - a.profitMargin)[0]?.profitMargin.toFixed(1) || '0'}%
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800">Overall Performance</h3>
              <p className="text-xl font-bold text-purple-600">
                {averageProfitMargin >= 35 ? 'Excellent' : averageProfitMargin >= 25 ? 'Good' : 'Needs Improvement'}
              </p>
              <p className="text-sm text-purple-600">Average Profit Margin {averageProfitMargin.toFixed(1)}%</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Strategic Recommendations</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• All branches show good profit margins ({'>'}35%) indicating efficient cost management</li>
              <li>• The highest performing branch can serve as a model for others</li>
              <li>• Focus on expanding high-margin services like specialized eye exams and premium eyewear</li>
              <li>• Optimizing staff costs and rent (70% of expenses) could further improve profitability</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchNetProfit;
