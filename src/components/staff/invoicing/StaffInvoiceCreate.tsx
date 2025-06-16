
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, User, Calendar, Receipt, Trash2, Calculator } from 'lucide-react';
import { mockPatients } from '@/data/staffMockData';

interface InvoiceItem {
  id: string;
  service_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

const StaffInvoiceCreate = () => {
  const [invoiceData, setInvoiceData] = React.useState({
    customer_id: '',
    due_date: '',
    notes: '',
    discount: 0,
    tax_rate: 7 // VAT 7%
  });

  const [items, setItems] = React.useState<InvoiceItem[]>([]);
  const [newItem, setNewItem] = React.useState({
    service_name: '',
    quantity: 1,
    unit_price: 0
  });

  const availableServices = [
    { name: 'ขูดหินปูน', price: 800 },
    { name: 'อุดฟัน', price: 500 },
    { name: 'ถอนฟัน', price: 300 },
    { name: 'จัดฟันใส', price: 2500 },
    { name: 'ฟอกสีฟัน', price: 3000 },
    { name: 'รักษารากฟัน', price: 1500 }
  ];

  const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);
  const discountAmount = (subtotal * invoiceData.discount) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = (subtotalAfterDiscount * invoiceData.tax_rate) / 100;
  const total = subtotalAfterDiscount + taxAmount;

  const addItem = () => {
    if (!newItem.service_name || newItem.unit_price <= 0) return;

    const item: InvoiceItem = {
      id: Date.now().toString(),
      service_name: newItem.service_name,
      quantity: newItem.quantity,
      unit_price: newItem.unit_price,
      total_price: newItem.quantity * newItem.unit_price
    };

    setItems([...items, item]);
    setNewItem({ service_name: '', quantity: 1, unit_price: 0 });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating invoice:', {
      ...invoiceData,
      items,
      subtotal,
      discount_amount: discountAmount,
      tax_amount: taxAmount,
      total_amount: total
    });
    // Handle invoice creation
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">สร้างใบเสร็จใหม่</h1>
          <p className="text-gray-600">สร้างใบเสร็จและรายการบริการ</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  ข้อมูลลูกค้า
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">เลือกลูกค้า</label>
                    <select
                      value={invoiceData.customer_id}
                      onChange={(e) => setInvoiceData({...invoiceData, customer_id: e.target.value})}
                      className="w-full p-3 border rounded-lg"
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

                  <div>
                    <label className="block text-sm font-medium mb-2">กำหนดชำระ</label>
                    <input
                      type="date"
                      value={invoiceData.due_date}
                      onChange={(e) => setInvoiceData({...invoiceData, due_date: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">หมายเหตุ</label>
                  <textarea
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                    rows={2}
                    className="w-full p-3 border rounded-lg"
                    placeholder="หมายเหตุเพิ่มเติม..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Add Service Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  เพิ่มรายการบริการ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">บริการ</label>
                    <select
                      value={newItem.service_name}
                      onChange={(e) => {
                        const selectedService = availableServices.find(s => s.name === e.target.value);
                        setNewItem({
                          ...newItem,
                          service_name: e.target.value,
                          unit_price: selectedService?.price || 0
                        });
                      }}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="">-- เลือกบริการ --</option>
                      {availableServices.map(service => (
                        <option key={service.name} value={service.name}>
                          {service.name} (฿{service.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">จำนวน</label>
                    <input
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                      className="w-full p-2 border rounded-lg"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">ราคา/หน่วย</label>
                    <input
                      type="number"
                      value={newItem.unit_price}
                      onChange={(e) => setNewItem({...newItem, unit_price: parseFloat(e.target.value) || 0})}
                      className="w-full p-2 border rounded-lg"
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button type="button" onClick={addItem} className="w-full">
                      เพิ่ม
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Items List */}
            <Card>
              <CardHeader>
                <CardTitle>รายการบริการ</CardTitle>
              </CardHeader>
              <CardContent>
                {items.length > 0 ? (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.service_name}</h3>
                          <p className="text-sm text-gray-600">
                            {item.quantity} x ฿{item.unit_price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold">฿{item.total_price.toLocaleString()}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    ยังไม่มีรายการบริการ กรุณาเพิ่มรายการ
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary & Controls */}
          <div className="space-y-6">
            {/* Discounts & Tax */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  ส่วนลดและภาษี
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ส่วนลด (%)</label>
                  <input
                    type="number"
                    value={invoiceData.discount}
                    onChange={(e) => setInvoiceData({...invoiceData, discount: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">อัตราภาษี (%)</label>
                  <input
                    type="number"
                    value={invoiceData.tax_rate}
                    onChange={(e) => setInvoiceData({...invoiceData, tax_rate: parseFloat(e.target.value) || 0})}
                    className="w-full p-2 border rounded-lg"
                    step="0.1"
                    min="0"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>สรุปยอดรวม</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>ยอดรวม:</span>
                  <span>฿{subtotal.toLocaleString()}</span>
                </div>
                
                {invoiceData.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>ส่วนลด ({invoiceData.discount}%):</span>
                    <span>-฿{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>ยอดหลังหักส่วนลด:</span>
                  <span>฿{subtotalAfterDiscount.toLocaleString()}</span>
                </div>
                
                {invoiceData.tax_rate > 0 && (
                  <div className="flex justify-between">
                    <span>ภาษี ({invoiceData.tax_rate}%):</span>
                    <span>฿{taxAmount.toLocaleString()}</span>
                  </div>
                )}
                
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>ยอดสุทธิ:</span>
                  <span className="text-blue-600">฿{total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button type="submit" className="w-full" disabled={items.length === 0}>
                  <Receipt className="h-4 w-4 mr-2" />
                  สร้างใบเสร็จ
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  บันทึกร่าง
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  ยกเลิก
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StaffInvoiceCreate;
