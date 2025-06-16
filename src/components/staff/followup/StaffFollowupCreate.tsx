
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, User, Calendar, Phone, MessageCircle, Target } from 'lucide-react';
import { mockPatients } from '@/data/staffMockData';

const StaffFollowupCreate = () => {
  const [formData, setFormData] = React.useState({
    customer_id: '',
    followup_type: 'call',
    priority: 'medium',
    scheduled_date: '',
    notes: '',
    expected_outcome: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating followup:', formData);
    // Handle form submission
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return { variant: 'destructive' as const, label: 'สูง' };
      case 'medium':
        return { variant: 'secondary' as const, label: 'ปานกลาง' };
      case 'low':
        return { variant: 'outline' as const, label: 'ต่ำ' };
      default:
        return { variant: 'secondary' as const, label: priority };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">สร้างการติดตามใหม่</h1>
          <p className="text-gray-600">กำหนดการติดตามลูกค้า</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                ฟอร์มการติดตาม
              </CardTitle>
              <CardDescription>กรอกรายละเอียดการติดตามลูกค้า</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    เลือกลูกค้า
                  </label>
                  <select
                    value={formData.customer_id}
                    onChange={(e) => setFormData({...formData, customer_id: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">-- เลือกลูกค้า --</option>
                    {mockPatients.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} - {patient.phone}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <MessageCircle className="h-4 w-4 inline mr-1" />
                      ประเภทการติดตาม
                    </label>
                    <select
                      value={formData.followup_type}
                      onChange={(e) => setFormData({...formData, followup_type: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="call">โทรศัพท์</option>
                      <option value="sms">SMS</option>
                      <option value="line">LINE</option>
                      <option value="email">อีเมล</option>
                      <option value="visit">เยี่ยมลูกค้า</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Target className="h-4 w-4 inline mr-1" />
                      ระดับความสำคัญ
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">สูง</option>
                      <option value="medium">ปานกลาง</option>
                      <option value="low">ต่ำ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    วันที่กำหนดติดตาม
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={(e) => setFormData({...formData, scheduled_date: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">หมายเหตุ / รายละเอียด</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="รายละเอียดการติดตาม..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">เป้าหมายที่คาดหวัง</label>
                  <textarea
                    value={formData.expected_outcome}
                    onChange={(e) => setFormData({...formData, expected_outcome: e.target.value})}
                    rows={2}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="ผลลัพธ์ที่คาดหวัง..."
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    สร้างการติดตาม
                  </Button>
                  <Button type="button" variant="outline">
                    ยกเลิก
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Preview/Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>ตัวอย่าง</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">ลูกค้า:</span>
                  <p className="text-sm text-gray-600">
                    {formData.customer_id ? 
                      mockPatients.find(p => p.id === formData.customer_id)?.name || 'ไม่พบข้อมูล' 
                      : 'ยังไม่ได้เลือก'
                    }
                  </p>
                </div>
                
                <div>
                  <span className="text-sm font-medium">ประเภท:</span>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.followup_type === 'call' ? 'โทรศัพท์' :
                     formData.followup_type === 'sms' ? 'SMS' :
                     formData.followup_type === 'line' ? 'LINE' :
                     formData.followup_type === 'email' ? 'อีเมล' : 'เยี่ยมลูกค้า'}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm font-medium">ความสำคัญ:</span>
                  <div className="mt-1">
                    <Badge variant={getPriorityBadge(formData.priority).variant}>
                      {getPriorityBadge(formData.priority).label}
                    </Badge>
                  </div>
                </div>
                
                {formData.scheduled_date && (
                  <div>
                    <span className="text-sm font-medium">กำหนดการ:</span>
                    <p className="text-sm text-gray-600">
                      {new Date(formData.scheduled_date).toLocaleDateString('th-TH')} 
                      {' '}
                      {new Date(formData.scheduled_date).toLocaleTimeString('th-TH', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffFollowupCreate;
