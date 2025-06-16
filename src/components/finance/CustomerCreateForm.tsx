
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface CustomerData {
  customerType: 'individual' | 'company';
  name: string;
  taxId: string;
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
  segment: string;
  creditLimit: number;
  paymentTerms: number;
}

interface CustomerCreateFormProps {
  onClose: () => void;
  onSave: (data: CustomerData) => void;
}

const CustomerCreateForm: React.FC<CustomerCreateFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<CustomerData>({
    customerType: 'individual',
    name: '',
    taxId: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: '',
    segment: 'Regular',
    creditLimit: 0,
    paymentTerms: 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: keyof CustomerData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>เพิ่มลูกค้าใหม่</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Type */}
            <div>
              <Label>ประเภทลูกค้า</Label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="customerType"
                    value="individual"
                    checked={formData.customerType === 'individual'}
                    onChange={(e) => handleInputChange('customerType', e.target.value as 'individual' | 'company')}
                    className="mr-2"
                  />
                  บุคคลธรรมดา
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="customerType"
                    value="company"
                    checked={formData.customerType === 'company'}
                    onChange={(e) => handleInputChange('customerType', e.target.value as 'individual' | 'company')}
                    className="mr-2"
                  />
                  นิติบุคคล
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  {formData.customerType === 'company' ? 'ชื่อบริษัท' : 'ชื่อ-นามสกุล'}
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="taxId">
                  {formData.customerType === 'company' ? 'เลขประจำตัวผู้เสียภาษี' : 'เลขบัตรประชาชน'}
                </Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  maxLength={13}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <Label htmlFor="address">ที่อยู่</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="ที่อยู่เต็ม"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="0XX-XXX-XXXX"
                />
              </div>
              <div>
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Company specific */}
            {formData.customerType === 'company' && (
              <div>
                <Label htmlFor="contactPerson">ผู้ติดต่อ</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="ชื่อผู้ติดต่อในบริษัท"
                />
              </div>
            )}

            {/* Business Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="segment">กลุ่มลูกค้า</Label>
                <select
                  id="segment"
                  value={formData.segment}
                  onChange={(e) => handleInputChange('segment', e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="New">New</option>
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <div>
                <Label htmlFor="creditLimit">วงเงินเครดิต (บาท)</Label>
                <Input
                  id="creditLimit"
                  type="number"
                  value={formData.creditLimit}
                  onChange={(e) => handleInputChange('creditLimit', parseFloat(e.target.value) || 0)}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="paymentTerms">เครดิตเทอม (วัน)</Label>
                <Input
                  id="paymentTerms"
                  type="number"
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange('paymentTerms', parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                บันทึกลูกค้า
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerCreateForm;
