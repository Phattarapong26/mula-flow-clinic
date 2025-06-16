
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LensClaimFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const LensClaimForm: React.FC<LensClaimFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    lensType: '',
    amount: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">สร้างเคลมเลนส์ใหม่</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">ชื่อผู้ป่วย</label>
            <Input 
              placeholder="ใส่ชื่อผู้ป่วย" 
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ประเภทเลนส์</label>
            <select 
              className="w-full p-2 border rounded-lg"
              value={formData.lensType}
              onChange={(e) => setFormData({...formData, lensType: e.target.value})}
              required
            >
              <option value="">เลือกประเภทเลนส์</option>
              <option value="Progressive">Progressive</option>
              <option value="Single Vision">Single Vision</option>
              <option value="Bifocal">Bifocal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">จำนวนเงิน</label>
            <Input 
              type="number" 
              placeholder="0" 
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">รายละเอียด</label>
            <textarea 
              className="w-full p-2 border rounded-lg"
              rows={3}
              placeholder="อธิบายเหตุผลในการเคลม"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              ยกเลิก
            </Button>
            <Button 
              type="submit"
              className="flex-1"
            >
              สร้างเคลม
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LensClaimForm;
