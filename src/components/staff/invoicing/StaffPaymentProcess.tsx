
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Banknote, QrCode, Receipt, CheckCircle, AlertTriangle } from 'lucide-react';

const StaffPaymentProcess = () => {
  const [selectedPayment, setSelectedPayment] = React.useState('');
  const [paymentAmount, setPaymentAmount] = React.useState('');
  const [paymentReference, setPaymentReference] = React.useState('');

  const pendingPayments = [
    {
      id: '1',
      invoice_id: 'INV-2024-001',
      customer_name: 'คุณสมใจ ใจดี',
      amount: 1500,
      due_date: '2024-01-20',
      services: ['ขูดหินปูน', 'อุดฟัน'],
      status: 'pending'
    },
    {
      id: '2',
      invoice_id: 'INV-2024-002',
      customer_name: 'คุณมานะ ทำดี',
      amount: 2500,
      due_date: '2024-01-18',
      services: ['จัดฟันใส'],
      status: 'overdue'
    }
  ];

  const paymentMethods = [
    { id: 'cash', name: 'เงินสด', icon: Banknote, color: 'text-green-600' },
    { id: 'card', name: 'บัตรเครดิต/เดบิต', icon: CreditCard, color: 'text-blue-600' },
    { id: 'qr', name: 'QR Code', icon: QrCode, color: 'text-purple-600' },
    { id: 'transfer', name: 'โอนเงิน', icon: Receipt, color: 'text-orange-600' }
  ];

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Processing payment:', {
      paymentId: selectedPayment,
      amount: paymentAmount,
      reference: paymentReference
    });
    // Handle payment processing
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">รับชำระเงิน</h1>
          <p className="text-gray-600">จัดการการรับชำระเงินและออกใบเสร็จ</p>
        </div>
        <Button>
          <Receipt className="h-4 w-4 mr-2" />
          ประวัติการชำระ
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>เลือกรายการที่ต้องชำระ</CardTitle>
              <CardDescription>เลือกใบเสร็จที่ลูกค้าต้องการชำระเงิน</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <div 
                    key={payment.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPayment === payment.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedPayment(payment.id);
                      setPaymentAmount(payment.amount.toString());
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{payment.invoice_id}</h3>
                          <Badge variant={payment.status === 'overdue' ? 'destructive' : 'secondary'}>
                            {payment.status === 'overdue' ? 'เกินกำหนด' : 'รอชำระ'}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-1">{payment.customer_name}</p>
                        <p className="text-sm text-gray-500">
                          บริการ: {payment.services.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          กำหนดชำระ: {new Date(payment.due_date).toLocaleDateString('th-TH')}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          ฿{payment.amount.toLocaleString()}
                        </div>
                        {payment.status === 'overdue' && (
                          <div className="flex items-center gap-1 text-red-600 text-xs">
                            <AlertTriangle className="h-3 w-3" />
                            เกินกำหนด
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          {selectedPayment && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>เลือกวิธีการชำระเงิน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div
                        key={method.id}
                        className="border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <IconComponent className={`h-8 w-8 mx-auto mb-2 ${method.color}`} />
                        <div className="font-medium text-sm">{method.name}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Payment Form */}
        <div>
          {selectedPayment ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  รับชำระเงิน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">จำนวนเงิน</label>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full p-3 border rounded-lg text-lg font-bold text-center"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">หมายเลขอ้างอิง (ถ้ามี)</label>
                    <input
                      type="text"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="w-full p-3 border rounded-lg"
                      placeholder="เลขที่ใบเสร็จ, เลขโอนเงิน..."
                    />
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button type="submit" className="w-full" size="lg">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      รับชำระเงิน
                    </Button>
                    <Button type="button" variant="outline" className="w-full">
                      ชำระบางส่วน
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>เลือกรายการที่ต้องการรับชำระเงิน</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>การชำระเงินล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { id: 'PAY-001', customer: 'คุณใจดี รักสะอาด', amount: 2000, method: 'เงินสด', time: '10:30' },
              { id: 'PAY-002', customer: 'คุณสุภาพ มีมารยาท', amount: 1500, method: 'QR Code', time: '09:45' },
              { id: 'PAY-003', customer: 'คุณขยัน ทำงาน', amount: 3500, method: 'บัตรเครดิต', time: '09:15' }
            ].map((payment) => (
              <div key={payment.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">{payment.customer}</div>
                  <div className="text-sm text-gray-600">{payment.method} • {payment.time}</div>
                </div>
                <div className="text-green-600 font-bold">
                  ฿{payment.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPaymentProcess;
