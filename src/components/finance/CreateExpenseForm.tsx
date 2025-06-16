
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface ExpenseData {
  category: string;
  description: string;
  amount: number;
  expenseDate: string;
  branchId: string;
  expenseType: 'fixed' | 'variable';
  receipt: File | null;
  isRecurring: boolean;
  recurringPeriod?: 'monthly' | 'quarterly' | 'yearly';
}

interface CreateExpenseFormProps {
  onClose: () => void;
  onSave: (data: ExpenseData) => void;
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<ExpenseData>({
    category: '',
    description: '',
    amount: 0,
    expenseDate: new Date().toISOString().split('T')[0],
    branchId: '',
    expenseType: 'variable',
    receipt: null,
    isRecurring: false
  });

  const expenseCategories = [
    'เงินเดือน',
    'ค่าเช่า',
    'ค่าไฟฟ้า',
    'ค่าน้ำ',
    'ค่าโฆษณา',
    'ค่าขนส่ง',
    'ค่าบำรุงรักษา',
    'ค่าอุปกรณ์สำนักงาน',
    'ค่าโทรศัพท์',
    'ค่าประกัน',
    'อื่นๆ'
  ];

  const branches = [
    { id: 'HQ', name: 'สำนักงานใหญ่' },
    { id: 'B001', name: 'สาขาสีลม' },
    { id: 'B002', name: 'สาขาอโซค' },
    { id: 'B003', name: 'สาขาลาดพร้าว' },
    { id: 'ALL', name: 'ทุกสาขา' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof ExpenseData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, receipt: file }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>บันทึกค่าใช้จ่าย</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">หมวดหมู่ค่าใช้จ่าย</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {expenseCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="expenseDate">วันที่</Label>
                <Input
                  id="expenseDate"
                  type="date"
                  value={formData.expenseDate}
                  onChange={(e) => handleInputChange('expenseDate', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">รายละเอียด</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="ระบุรายละเอียดค่าใช้จ่าย"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">จำนวนเงิน (บาท)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <Label htmlFor="branchId">สาขา</Label>
                <select
                  id="branchId"
                  value={formData.branchId}
                  onChange={(e) => handleInputChange('branchId', e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">เลือกสาขา</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expense Type */}
            <div>
              <Label>ประเภทค่าใช้จ่าย</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="expenseType"
                    value="fixed"
                    checked={formData.expenseType === 'fixed'}
                    onChange={(e) => handleInputChange('expenseType', e.target.value as 'fixed' | 'variable')}
                    className="mr-2"
                  />
                  ต้นทุนคงที่
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="expenseType"
                    value="variable"
                    checked={formData.expenseType === 'variable'}
                    onChange={(e) => handleInputChange('expenseType', e.target.value as 'fixed' | 'variable')}
                    className="mr-2"
                  />
                  ต้นทุนแปรผัน
                </label>
              </div>
            </div>

            {/* Recurring Expense */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
                  className="mr-2"
                />
                ค่าใช้จ่ายประจำ (Recurring)
              </label>
              
              {formData.isRecurring && (
                <div className="mt-2">
                  <Label htmlFor="recurringPeriod">ความถี่</Label>
                  <select
                    id="recurringPeriod"
                    value={formData.recurringPeriod || ''}
                    onChange={(e) => handleInputChange('recurringPeriod', e.target.value as 'monthly' | 'quarterly' | 'yearly')}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="monthly">รายเดือน</option>
                    <option value="quarterly">รายไตรมาส</option>
                    <option value="yearly">รายปี</option>
                  </select>
                </div>
              )}
            </div>

            {/* Receipt Upload */}
            <div>
              <Label htmlFor="receipt">แนบใบเสร็จ/เอกสาร</Label>
              <Input
                id="receipt"
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-1">รองรับไฟล์ภาพ และ PDF เท่านั้น</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                บันทึกค่าใช้จ่าย
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateExpenseForm;
