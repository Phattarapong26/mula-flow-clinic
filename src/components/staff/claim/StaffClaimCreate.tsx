
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SecureInput from '@/components/security/SecureInput';
import { useForm } from '@/hooks/useForm';
import { httpClient } from '@/utils/httpClient';
import { FileText, AlertCircle } from 'lucide-react';
import { z } from 'zod';

const claimCreateSchema = z.object({
  customerId: z.string().min(1, 'กรุณาเลือกผู้ป่วย'),
  serviceId: z.string().min(1, 'กรุณาเลือกการรักษา'),
  amount: z.number().min(0.01, 'จำนวนเงินต้องมากกว่า 0'),
  description: z.string().min(1, 'กรุณาระบุรายละเอียด'),
  claimDate: z.string().min(1, 'กรุณาระบุวันที่เคลม')
});

type ClaimFormData = z.infer<typeof claimCreateSchema>;

const StaffClaimCreate = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);
  const [services, setServices] = useState<{ id: string; name: string; price: number }[]>([]);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    getFieldError
  } = useForm<ClaimFormData>({
    initialValues: {
      customerId: '',
      serviceId: '',
      amount: 0,
      description: '',
      claimDate: new Date().toISOString().split('T')[0]
    },
    validationSchema: claimCreateSchema,
    onSubmit: async (data) => {
      try {
        await httpClient.post('/api/claims', data);
        toast({
          title: 'สำเร็จ',
          description: 'สร้างเคลมประกันเรียบร้อยแล้ว'
        });
        // Reset form or redirect
      } catch (error) {
        toast({
          title: 'เกิดข้อผิดพลาด',
          description: 'ไม่สามารถสร้างเคลมประกันได้',
          variant: 'destructive'
        });
      }
    }
  });

  React.useEffect(() => {
    loadCustomers();
    loadServices();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await httpClient.get<{ id: string; name: string }[]>('/api/customers');
      // Fix: Handle direct array response properly
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to load customers:', error);
    }
  };

  const loadServices = async () => {
    try {
      const response = await httpClient.get<{ id: string; name: string; price: number }[]>('/api/services');
      // Fix: Handle direct array response properly
      setServices(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to load services:', error);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    handleChange('serviceId', serviceId);
    const selectedService = services.find(s => s.id === serviceId);
    if (selectedService) {
      handleChange('amount', selectedService.price);
    }
  };

  if (customers.length === 0 || services.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              กำลังโหลดข้อมูล
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
      <h1 className="text-3xl font-bold">สร้างเคลมประกันใหม่</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเคลม</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">ผู้ป่วย</label>
              <select 
                value={values.customerId}
                onChange={(e) => handleChange('customerId', e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">เลือกผู้ป่วย</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
              {getFieldError('customerId') && (
                <p className="text-sm text-red-600 mt-1">{getFieldError('customerId')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">การรักษา</label>
              <select 
                value={values.serviceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">เลือกการรักษา</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price.toLocaleString()} บาท
                  </option>
                ))}
              </select>
              {getFieldError('serviceId') && (
                <p className="text-sm text-red-600 mt-1">{getFieldError('serviceId')}</p>
              )}
            </div>

            <div>
              <SecureInput
                label="ค่าใช้จ่าย (บาท)"
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
                label="วันที่เคลม"
                type="date"
                value={values.claimDate}
                onChange={(e) => handleChange('claimDate', e.target.value)}
                validation={{
                  required: true
                }}
                error={getFieldError('claimDate')}
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
                placeholder="ระบุรายละเอียดการเคลม"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'กำลังสร้างเคลม...' : 'สร้างเคลม'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffClaimCreate;
