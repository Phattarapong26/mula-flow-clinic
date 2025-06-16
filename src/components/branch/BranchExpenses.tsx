import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Plus, Edit, Eye, Receipt, AlertTriangle, TrendingDown, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { branchService, ExpenseCreate, ExpenseCategory, PaymentMethod, ExpenseStatus } from '@/services/branchService';
import DOMPurify from 'dompurify';
import { z } from 'zod';

// Validation schema for expense form
const expenseSchema = z.object({
  branchId: z.string().min(1, 'Branch is required'),
  category: z.enum(['rent', 'utilities', 'supplies', 'salary', 'other'] as const),
  amount: z.number().min(0, 'Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
  payment_method: z.enum(['cash', 'credit_card', 'bank_transfer', 'other'] as const)
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

type LocalExpense = {
  id: string;
  branchId: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  vendor?: string;
  receipt_number?: string;
  payment_method: PaymentMethod;
  status: ExpenseStatus;
  created_at: string;
  updated_at: string;
};

const BranchExpenses = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<LocalExpense | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState<ExpenseStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<LocalExpense[]>([]);
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);
  const { toast } = useToast();

  const [newExpense, setNewExpense] = useState<ExpenseFormData>({
    branchId: '',
    category: 'other',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    description: '',
    payment_method: 'cash'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch branches
        const { data: branchesData } = await branchService.getBranches();
        setBranches(branchesData.map(b => ({ id: b.id, name: b.name })));

        // Fetch expenses for all branches
        const allExpenses: LocalExpense[] = [];
        for (const branch of branchesData) {
          const { data: branchExpenses } = await branchService.getBranchExpenses(branch.id);
          allExpenses.push(...branchExpenses.map(e => ({
            ...e,
            branchId: branch.id
          })));
        }
        setExpenses(allExpenses);

      } catch (err) {
        setError('Failed to load data');
        toast({
          title: 'Error',
          description: 'Failed to load expenses data. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleCreateExpense = async () => {
    try {
      // Validate input
      const validatedData = expenseSchema.parse(newExpense);

      // Create expense with all required fields
      const expenseData: ExpenseCreate = {
        branchId: validatedData.branchId,
        category: validatedData.category as ExpenseCategory,
        amount: validatedData.amount,
        date: validatedData.date,
        description: validatedData.description,
        payment_method: validatedData.payment_method as PaymentMethod
      };

      // Create expense
      const createdExpense = await branchService.createExpense(expenseData);
      
      // Update state
      setExpenses(prev => [...prev, createdExpense as LocalExpense]);
      
      // Reset form and close dialog
      setNewExpense({
        branchId: '',
        category: 'other',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        description: '',
        payment_method: 'cash'
      });
      setIsCreateDialogOpen(false);
      
      toast({
        title: "Success",
        description: "Expense created successfully",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: err.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to create expense",
          variant: "destructive"
        });
      }
    }
  };

  const getCategoryText = (category: LocalExpense['category']) => {
    const labels = {
      rent: 'ค่าเช่า',
      salary: 'เงินเดือน',
      utilities: 'สาธารณูปโภค',
      equipment: 'อุปกรณ์',
      supplies: 'วัสดุสิ้นเปลือง',
      marketing: 'การตลาด',
      maintenance: 'บำรุงรักษา',
      other: 'อื่นๆ'
    };
    return labels[category];
  };

  const getStatusText = (status: ExpenseStatus) => {
    const labels: Record<ExpenseStatus, string> = {
      paid: 'จ่ายแล้ว',
      pending: 'รอจ่าย',
      cancelled: 'ยกเลิก'
    };
    return labels[status];
  };

  const getPaymentMethodText = (method: LocalExpense['payment_method']) => {
    const labels = {
      cash: 'เงินสด',
      transfer: 'โอนเงิน',
      card: 'บัตรเครดิต',
      check: 'เช็ค'
    };
    return labels[method];
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || expense.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = filteredExpenses.filter(e => e.status === 'paid').reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = filteredExpenses.filter(e => e.status === 'pending').reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Loading Expenses</h2>
            <p className="text-gray-600">Please wait while we fetch the expense data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Error Loading Expenses</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Expenses Available</h3>
        <p className="text-gray-600">There are no expenses recorded yet.</p>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add First Expense
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Branch Expenses</h1>
          <p className="text-gray-600">Manage and track expenses for each branch</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Select
                  value={newExpense.branchId}
                  onValueChange={(value) => setNewExpense(prev => ({ ...prev, branchId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value: ExpenseCategory) => setNewExpense(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="supplies">Supplies</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select
                  value={newExpense.payment_method}
                  onValueChange={(value: PaymentMethod) => setNewExpense(prev => ({ ...prev, payment_method: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateExpense} className="w-full">
                Create Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">฿{totalExpenses.toLocaleString()}</p>
              </div>
              <Minus className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">฿{paidExpenses.toLocaleString()}</p>
              </div>
              <Receipt className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">฿{pendingExpenses.toLocaleString()}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="rent">ค่าเช่า</SelectItem>
                <SelectItem value="salary">เงินเดือน</SelectItem>
                <SelectItem value="utilities">สาธารณูปโภค</SelectItem>
                <SelectItem value="equipment">อุปกรณ์</SelectItem>
                <SelectItem value="supplies">วัสดุสิ้นเปลือง</SelectItem>
                <SelectItem value="marketing">การตลาด</SelectItem>
                <SelectItem value="maintenance">บำรุงรักษา</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={(value: ExpenseStatus | 'all') => setFilterStatus(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">จ่ายแล้ว</SelectItem>
                <SelectItem value="pending">รอจ่าย</SelectItem>
                <SelectItem value="cancelled">ยกเลิก</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle>Expense List ({filteredExpenses.length} items)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{DOMPurify.sanitize(expense.description)}</h3>
                      <Badge variant="outline">{getCategoryText(expense.category)}</Badge>
                      <Badge className={
                        expense.status === 'paid' ? 'bg-green-100 text-green-800' :
                        expense.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {getStatusText(expense.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Amount:</span> ฿{expense.amount.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {new Date(expense.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Payment:</span> {getPaymentMethodText(expense.payment_method)}
                      </div>
                      <div>
                        <span className="font-medium">Branch:</span> {DOMPurify.sanitize(branches.find(b => b.id === expense.branchId)?.name || '')}
                      </div>
                    </div>

                    {expense.vendor && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Vendor:</span> {DOMPurify.sanitize(expense.vendor)}
                        {expense.receipt_number && (
                          <span className="ml-4"><span className="font-medium">Receipt:</span> {DOMPurify.sanitize(expense.receipt_number)}</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog open={isViewDialogOpen && selectedExpense?.id === expense.id} onOpenChange={(open) => {
                      setIsViewDialogOpen(open);
                      if (!open) setSelectedExpense(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedExpense(expense)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Expense Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label>Branch:</Label>
                              <p>{DOMPurify.sanitize(branches.find(b => b.id === expense.branchId)?.name || '')}</p>
                            </div>
                            <div>
                              <Label>Category:</Label>
                              <p>{getCategoryText(expense.category)}</p>
                            </div>
                            <div>
                              <Label>Amount:</Label>
                              <p>฿{expense.amount.toLocaleString()}</p>
                            </div>
                            <div>
                              <Label>Date:</Label>
                              <p>{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <Label>Payment Method:</Label>
                              <p>{getPaymentMethodText(expense.payment_method)}</p>
                            </div>
                            <div>
                              <Label>Status:</Label>
                              <p>{getStatusText(expense.status)}</p>
                            </div>
                            {expense.vendor && (
                              <div>
                                <Label>Vendor:</Label>
                                <p>{DOMPurify.sanitize(expense.vendor)}</p>
                              </div>
                            )}
                            {expense.receipt_number && (
                              <div>
                                <Label>Receipt Number:</Label>
                                <p>{DOMPurify.sanitize(expense.receipt_number)}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid gap-2">
                            <Label>Description:</Label>
                            <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded">{DOMPurify.sanitize(expense.description)}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExpenses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No Expenses Found</h3>
              <p className="text-sm">Start by adding a new expense</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchExpenses;
