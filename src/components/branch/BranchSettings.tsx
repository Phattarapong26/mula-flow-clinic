
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SecureInput from '@/components/security/SecureInput';
import { useForm } from '@/hooks/useForm';
import { httpClient } from '@/utils/httpClient';
import { Building, AlertCircle, Settings } from 'lucide-react';
import { z } from 'zod';

const branchSettingsSchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อสาขา'),
  address: z.string().min(1, 'กรุณาระบุที่อยู่'),
  province: z.string().min(1, 'กรุณาระบุจังหวัด'),
  phone: z.string().optional(),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional(),
  status: z.enum(['active', 'inactive'])
});

type BranchSettingsData = z.infer<typeof branchSettingsSchema>;

const BranchSettings = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    getFieldError,
    resetForm
  } = useForm<BranchSettingsData>({
    initialValues: {
      name: '',
      address: '',
      province: '',
      phone: '',
      email: '',
      status: 'active' as const
    },
    validationSchema: branchSettingsSchema,
    onSubmit: async (data) => {
      try {
        if (selectedBranchId) {
          await httpClient.put(`/api/branches/${selectedBranchId}`, data);
          toast({
            title: 'สำเร็จ',
            description: 'อัปเดตข้อมูลสาขาเรียบร้อยแล้ว'
          });
          loadBranches();
        }
      } catch (error) {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถอัปเดตข้อมูลสาขาได้',
          variant: 'destructive'
        });
      }
    }
  });

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get<{ data: any[] }>('/api/branches');
      setBranches(response.data.data || []);
    } catch (error) {
      console.error('Failed to load branches:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถโหลดข้อมูลสาขาได้',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBranchSelect = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch) {
      setSelectedBranchId(branchId);
      // Populate form with branch data
      handleChange('name', branch.name || '');
      handleChange('address', branch.address || '');
      handleChange('province', branch.province || '');
      handleChange('phone', branch.phone || '');
      handleChange('email', branch.email || '');
      handleChange('status', branch.status || 'active');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-spin" />
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

  if (branches.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ไม่พบข้อมูลสาขา
            </h3>
            <p className="text-gray-500">
              กรุณาเพิ่มสาขาใหม่ก่อนการตั้งค่า
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ตั้งค่าสาขา</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Branch List */}
        <Card>
          <CardHeader>
            <CardTitle>เลือกสาขา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {branches.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => handleBranchSelect(branch.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedBranchId === branch.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{branch.name}</div>
                  <div className="text-sm text-gray-500">{branch.province}</div>
                  <div className={`text-xs ${
                    branch.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {branch.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branch Settings Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedBranchId ? 'แก้ไขข้อมูลสาขา' : 'เลือกสาขาเพื่อแก้ไข'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBranchId ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SecureInput
                    label="ชื่อสาขา"
                    type="text"
                    value={values.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    validation={{
                      required: true,
                      maxLength: 100
                    }}
                    error={getFieldError('name')}
                  />

                  <div>
                    <label className="block text-sm font-medium mb-2">สถานะ</label>
                    <select 
                      value={values.status}
                      onChange={(e) => handleChange('status', e.target.value as 'active' | 'inactive')}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="active">ใช้งาน</option>
                      <option value="inactive">ไม่ใช้งาน</option>
                    </select>
                  </div>
                </div>

                <SecureInput
                  label="ที่อยู่"
                  type="text"
                  value={values.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  validation={{
                    required: true,
                    maxLength: 200
                  }}
                  error={getFieldError('address')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SecureInput
                    label="จังหวัด"
                    type="text"
                    value={values.province}
                    onChange={(e) => handleChange('province', e.target.value)}
                    validation={{
                      required: true,
                      maxLength: 50
                    }}
                    error={getFieldError('province')}
                  />

                  <SecureInput
                    label="เบอร์โทรศัพท์"
                    type="tel"
                    value={values.phone || ''}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    validation={{
                      pattern: /^[0-9\-\+\(\)\s]+$/,
                      maxLength: 20
                    }}
                    error={getFieldError('phone')}
                  />
                </div>

                <SecureInput
                  label="อีเมล"
                  type="email"
                  value={values.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  validation={{
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    maxLength: 100
                  }}
                  error={getFieldError('email')}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'กำลังอัปเดต...' : 'อัปเดตข้อมูลสาขา'}
                </Button>
              </form>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">กรุณาเลือกสาขาจากรายการด้านซ้าย</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BranchSettings;
