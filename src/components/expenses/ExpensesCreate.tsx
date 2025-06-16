
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SecureInput from '@/components/security/SecureInput';
import { useForm } from '@/hooks/useForm';
import { expenseSchemas } from '@/utils/validation';
import { httpClient } from '@/utils/httpClient';
import { Package2, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const expenseCreateSchema = z.object({
  category: z.string().min(1, 'กรุณาเลือกหมวดหมู่'),
  expenseType: z.string().min(1, 'กรุณาระบุประเภทค่าใช้จ่าย'),
  amount: z.number().min(0.01, 'จำนวนเงินต้องมากกว่า 0'),
  description: z.string().min(1, 'กรุณาระบุรายละเอียด'),
  branchId: z.string().min(1, 'กรุณาเลือกสาขา')
});

type ExpenseFormData = z.infer<typeof expenseCreateSchema>;

const ExpensesCreate = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);
  const [categories] = useState([
    'ค่าใช้จ่ายคงที่',
    'ค่าใช้จ่ายแปรผัน',
    'ค่าเวชภัณฑ์',
    'ค่าเช่า',
    'ค่าไฟฟ้า',
    'ค่าน้ำ',
    'เงินเดือน',
    'อื่นๆ'
  ]);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    getFieldError
  } = useForm<ExpenseFormData>({
    initialValues: {
      category: '',
      expenseType: '',
      amount: 0,
      description: '',
      branchId: ''
    },
    validationSchema: expenseCreateSchema,
    onSubmit: async (data) => {
      try {
        await httpClient.post('/api/expenses', data);
        toast({
          title: 'สำเร็จ',
          description: 'บันทึกค่าใช้จ่ายเรียบร้อยแล้ว'
        });
        // Reset form or redirect
      } catch (error) {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถบันทึกค่าใช้จ่ายได้',
          variant: 'destructive'
        });
      }
    }
  });

  React.useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const response = await httpClient.get<{ data: { id: string; name: string }[] }>('/api/branches');
      setBranches(response.data.data || []);
    } catch (error) {
      console.error('Failed to load branches:', error);
    }
  };

  if (branches.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Package2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              กำลังโหลดข้อมูลสาขา
            </h3>
            <p className="text-gray-500">
              กรุณารอสักครู่...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">บันทึกค่าใช้จ่าย</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลรายจ่าย</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">สาขา</label>
              <select 
                value={values.branchId}
                onChange={(e) => handleChange('branchId', e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">เลือกสาขา</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
              {getFieldError('branchId') && (
                <p className="text-sm text-red-600 mt-1">{getFieldError('branchId')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">หมวดหมู่</label>
              <select 
                value={values.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {getFieldError('category') && (
                <p className="text-sm text-red-600 mt-1">{getFieldError('category')}</p>
              )}
            </div>

            <div>
              <SecureInput
                label="ประเภทค่าใช้จ่าย"
                type="text"
                value={values.expenseType}
                onChange={(e) => handleChange('expenseType', e.target.value)}
                validation={{
                  required: true,
                  maxLength: 100
                }}
                error={getFieldError('expenseType')}
                placeholder="ระบุประเภทค่าใช้จ่าย"
              />
            </div>

            <div>
              <SecureInput
                label="จำนวนเงิน (บาท)"
                type="number"
                value={values.amount || ''}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                validation={{
                  required: true
                }}
                error={getFieldError('amount')}
                placeholder="0.00"
              />
            </div>

            <div>
              <SecureInput
                label="รายละเอียด"
                type="text"
                value={values.description}
                onChange={(e) => handleChange('description', e.target.value)}
                validation={{
                  required: true,
                  maxLength: 500
                }}
                error={getFieldError('description')}
                placeholder="ระบุรายละเอียดค่าใช้จ่าย"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกรายจ่าย'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpensesCreate;
