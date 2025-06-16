
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Receipt, Plus, Search, Eye, CreditCard, FileText, DollarSign, Calendar, User, Phone, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  payment_status: 'pending' | 'partial' | 'paid' | 'overdue';
  payment_method?: 'cash' | 'credit_card' | 'bank_transfer' | 'insurance';
  notes: string;
  items: InvoiceItem[];
  created_at: string;
  updated_at: string;
}

interface InvoiceItem {
  id: string;
  service_type: 'eye_exam' | 'frames' | 'lenses' | 'contact_lenses' | 'treatment';
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

const StaffInvoicesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  // Mock data - optometry clinic invoices
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV001",
      invoice_number: "INV-2025-001",
      customer_id: "CUST001",
      customer_name: "นาย สมชาย ใจดี",
      customer_phone: "081-234-5678",
      issue_date: "2025-06-15",
      due_date: "2025-06-22",
      subtotal: 4500,
      tax_amount: 315,
      discount_amount: 0,
      total_amount: 4815,
      paid_amount: 4815,
      payment_status: "paid",
      payment_method: "credit_card",
      notes: "ตรวจตาและสั่งแว่น",
      items: [
        {
          id: "ITEM001",
          service_type: "eye_exam",
          description: "ตรวจสายตาและวัดค่าสายตา",
          quantity: 1,
          unit_price: 500,
          total_price: 500
        },
        {
          id: "ITEM002",
          service_type: "frames",
          description: "กรอบแว่น Ray-Ban RB3025",
          quantity: 1,
          unit_price: 4000,
          total_price: 4000
        }
      ],
      created_at: "2025-06-15T10:30:00Z",
      updated_at: "2025-06-15T15:45:00Z"
    },
    {
      id: "INV002",
      invoice_number: "INV-2025-002",
      customer_id: "CUST002",
      customer_name: "นางสาว วิภา สุขใส",
      customer_phone: "089-876-5432",
      issue_date: "2025-06-16",
      due_date: "2025-06-23",
      subtotal: 2800,
      tax_amount: 196,
      discount_amount: 200,
      total_amount: 2796,
      paid_amount: 1000,
      payment_status: "partial",
      payment_method: "cash",
      notes: "ผ่อนชำระ มัดจำ 1,000 บาท",
      items: [
        {
          id: "ITEM003",
          service_type: "contact_lenses",
          description: "คอนแทคเลนส์ Acuvue Oasys (6 เดือน)",
          quantity: 1,
          unit_price: 2800,
          total_price: 2800
        }
      ],
      created_at: "2025-06-16T09:15:00Z",
      updated_at: "2025-06-16T09:15:00Z"
    }
  ]);

  const [newInvoice, setNewInvoice] = useState({
    customer_name: '',
    customer_phone: '',
    due_date: '',
    notes: '',
    items: [] as Omit<InvoiceItem, 'id'>[]
  });

  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<Invoice['payment_method']>('cash');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.customer_phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || invoice.payment_status === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || invoice.payment_method === paymentMethodFilter;
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  const handleCreateInvoice = () => {
    if (!newInvoice.customer_name || !newInvoice.customer_phone || newInvoice.items.length === 0) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลลูกค้าและรายการสินค้า/บริการ",
        variant: "destructive"
      });
      return;
    }

    const subtotal = newInvoice.items.reduce((sum, item) => sum + item.total_price, 0);
    const tax_amount = subtotal * 0.07; // VAT 7%
    const total_amount = subtotal + tax_amount;

    const invoice: Invoice = {
      id: `INV${String(Date.now()).slice(-3)}`,
      invoice_number: `INV-2025-${String(invoices.length + 1).padStart(3, '0')}`,
      customer_id: `CUST${String(Date.now()).slice(-3)}`,
      customer_name: newInvoice.customer_name,
      customer_phone: newInvoice.customer_phone,
      issue_date: new Date().toISOString().split('T')[0],
      due_date: newInvoice.due_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal,
      tax_amount,
      discount_amount: 0,
      total_amount,
      paid_amount: 0,
      payment_status: 'pending',
      notes: newInvoice.notes,
      items: newInvoice.items.map((item, index) => ({
        ...item,
        id: `ITEM${Date.now()}_${index}`
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setInvoices([...invoices, invoice]);
    setNewInvoice({
      customer_name: '',
      customer_phone: '',
      due_date: '',
      notes: '',
      items: []
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "สร้างใบเสร็จสำเร็จ",
      description: `ใบเสร็จเลขที่ ${invoice.invoice_number} ถูกสร้างแล้ว`
    });
  };

  const handleProcessPayment = () => {
    if (!selectedInvoice || paymentAmount <= 0) {
      toast({
        title: "ข้อมูลไม่ถูกต้อง",
        description: "กรุณาระบุจำนวนเงินที่ถูกต้อง",
        variant: "destructive"
      });
      return;
    }

    const newPaidAmount = selectedInvoice.paid_amount + paymentAmount;
    const newStatus: Invoice['payment_status'] = 
      newPaidAmount >= selectedInvoice.total_amount ? 'paid' :
      newPaidAmount > 0 ? 'partial' : 'pending';

    setInvoices(invoices.map(invoice => 
      invoice.id === selectedInvoice.id ? {
        ...invoice,
        paid_amount: newPaidAmount,
        payment_status: newStatus,
        payment_method: paymentMethod,
        updated_at: new Date().toISOString()
      } : invoice
    ));

    setIsPaymentDialogOpen(false);
    setPaymentAmount(0);
    
    toast({
      title: "บันทึกการชำระเงินสำเร็จ",
      description: `รับชำระเงิน ฿${paymentAmount.toLocaleString()} แล้ว`
    });
  };

  const addNewItem = () => {
    const newItem: Omit<InvoiceItem, 'id'> = {
      service_type: 'eye_exam',
      description: '',
      quantity: 1,
      unit_price: 0,
      total_price: 0
    };
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, newItem]
    });
  };

  const updateItem = (index: number, field: keyof Omit<InvoiceItem, 'id'>, value: any) => {
    const updatedItems = [...newInvoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // Auto-calculate total price
    if (field === 'quantity' || field === 'unit_price') {
      updatedItems[index].total_price = updatedItems[index].quantity * updatedItems[index].unit_price;
    }
    
    setNewInvoice({
      ...newInvoice,
      items: updatedItems
    });
  };

  const removeItem = (index: number) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((_, i) => i !== index)
    });
  };

  const getStatusBadge = (status: Invoice['payment_status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      partial: 'bg-orange-100 text-orange-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    const labels = {
      pending: 'รอชำระ',
      partial: 'ชำระบางส่วน',
      paid: 'ชำระแล้ว',
      overdue: 'เกินกำหนด'
    };
    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getServiceTypeText = (type: InvoiceItem['service_type']) => {
    const labels = {
      eye_exam: 'ตรวจสายตา',
      frames: 'กรอบแว่น',
      lenses: 'เลนส์แว่น',
      contact_lenses: 'คอนแทคเลนส์',
      treatment: 'การรักษา'
    };
    return labels[type];
  };

  const getPaymentMethodText = (method?: Invoice['payment_method']) => {
    if (!method) return '-';
    const labels = {
      cash: 'เงินสด',
      credit_card: 'บัตรเครดิต',
      bank_transfer: 'โอนเงิน',
      insurance: 'ประกัน'
    };
    return labels[method];
  };

  // Summary statistics
  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paid_amount, 0);
  const pendingAmount = invoices.reduce((sum, inv) => sum + (inv.total_amount - inv.paid_amount), 0);
  const todayInvoices = invoices.filter(inv => 
    new Date(inv.issue_date).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ใบเสร็จ/ใบกำกับภาษี</h1>
          <p className="text-gray-600">จัดการใบเสร็จและการชำระเงิน ({filteredInvoices.length} รายการ)</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                สร้างใบเสร็จ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>สร้างใบเสร็จใหม่</DialogTitle>
                <DialogDescription>
                  กรอกข้อมูลลูกค้าและรายการสินค้า/บริการ
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer_name">ชื่อลูกค้า *</Label>
                    <Input
                      id="customer_name"
                      value={newInvoice.customer_name}
                      onChange={(e) => setNewInvoice({...newInvoice, customer_name: e.target.value})}
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customer_phone">เบอร์โทรศัพท์ *</Label>
                    <Input
                      id="customer_phone"
                      value={newInvoice.customer_phone}
                      onChange={(e) => setNewInvoice({...newInvoice, customer_phone: e.target.value})}
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="due_date">กำหนดชำระ</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={newInvoice.due_date}
                    onChange={(e) => setNewInvoice({...newInvoice, due_date: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>รายการสินค้า/บริการ *</Label>
                    <Button type="button" onClick={addNewItem} size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      เพิ่มรายการ
                    </Button>
                  </div>
                  
                  {newInvoice.items.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">รายการที่ {index + 1}</h4>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          ลบ
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                          <Label>ประเภทบริการ</Label>
                          <Select 
                            value={item.service_type} 
                            onValueChange={(value: InvoiceItem['service_type']) => updateItem(index, 'service_type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eye_exam">ตรวจสายตา</SelectItem>
                              <SelectItem value="frames">กรอบแว่น</SelectItem>
                              <SelectItem value="lenses">เลนส์แว่น</SelectItem>
                              <SelectItem value="contact_lenses">คอนแทคเลนส์</SelectItem>
                              <SelectItem value="treatment">การรักษา</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>จำนวน</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label>รายละเอียด</Label>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          placeholder="อธิบายสินค้า/บริการ"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                          <Label>ราคาต่อหน่วย (บาท)</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unit_price}
                            onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>รวม (บาท)</Label>
                          <Input
                            type="number"
                            value={item.total_price}
                            readOnly
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {newInvoice.items.length === 0 && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>ยังไม่มีรายการ กดเพิ่มรายการเพื่อเริ่มต้น</p>
                    </div>
                  )}
                  
                  {newInvoice.items.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>ยอดรวม:</span>
                        <span>฿{newInvoice.items.reduce((sum, item) => sum + item.total_price, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>ภาษี (7%):</span>
                        <span>฿{(newInvoice.items.reduce((sum, item) => sum + item.total_price, 0) * 0.07).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium border-t pt-2 mt-2">
                        <span>รวมทั้งสิ้น:</span>
                        <span>฿{(newInvoice.items.reduce((sum, item) => sum + item.total_price, 0) * 1.07).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">หมายเหตุ</Label>
                  <Textarea
                    id="notes"
                    value={newInvoice.notes}
                    onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                    placeholder="หมายเหตุเพิ่มเติม..."
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleCreateInvoice}>
                  สร้างใบเสร็จ
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalInvoices}</div>
              <div className="text-sm text-gray-600">ใบเสร็จทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">฿{totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">รายได้ที่รับแล้ว</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">฿{pendingAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">ยอดค้างรับ</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{todayInvoices}</div>
              <div className="text-sm text-gray-600">ใบเสร็จวันนี้</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            รายการใบเสร็จ
          </CardTitle>
          <CardDescription>จัดการใบเสร็จและติดตามการชำระเงิน</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหาเลขที่ใบเสร็จ, ชื่อลูกค้า, หรือเบอร์โทร..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="pending">รอชำระ</SelectItem>
                <SelectItem value="partial">ชำระบางส่วน</SelectItem>
                <SelectItem value="paid">ชำระแล้ว</SelectItem>
                <SelectItem value="overdue">เกินกำหนด</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="วิธีชำระ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">วิธีชำระทั้งหมด</SelectItem>
                <SelectItem value="cash">เงินสด</SelectItem>
                <SelectItem value="credit_card">บัตรเครดิต</SelectItem>
                <SelectItem value="bank_transfer">โอนเงิน</SelectItem>
                <SelectItem value="insurance">ประกัน</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{invoice.invoice_number}</h3>
                      {getStatusBadge(invoice.payment_status)}
                      {invoice.payment_method && (
                        <Badge variant="outline">{getPaymentMethodText(invoice.payment_method)}</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{invoice.customer_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{invoice.customer_phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>ออก: {new Date(invoice.issue_date).toLocaleDateString('th-TH')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span>รวม: ฿{invoice.total_amount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium">ชำระแล้ว:</span> ฿{invoice.paid_amount.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">ค้างชำระ:</span> ฿{(invoice.total_amount - invoice.paid_amount).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">กำหนดชำระ:</span> {new Date(invoice.due_date).toLocaleDateString('th-TH')}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium mb-2">รายการ:</div>
                      {invoice.items.map((item, index) => (
                        <div key={item.id} className="text-sm text-gray-600 flex justify-between">
                          <span>{index + 1}. {item.description} ({getServiceTypeText(item.service_type)})</span>
                          <span>฿{item.total_price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog open={isViewDialogOpen && selectedInvoice?.id === invoice.id} onOpenChange={(open) => {
                      setIsViewDialogOpen(open);
                      if (!open) setSelectedInvoice(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          ดู
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>ใบเสร็จเลขที่ {invoice.invoice_number}</DialogTitle>
                          <DialogDescription>
                            รายละเอียดใบเสร็จ
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label>ลูกค้า:</Label>
                              <p>{invoice.customer_name}</p>
                            </div>
                            <div>
                              <Label>เบอร์โทร:</Label>
                              <p>{invoice.customer_phone}</p>
                            </div>
                            <div>
                              <Label>วันที่ออก:</Label>
                              <p>{new Date(invoice.issue_date).toLocaleDateString('th-TH')}</p>
                            </div>
                            <div>
                              <Label>กำหนดชำระ:</Label>
                              <p>{new Date(invoice.due_date).toLocaleDateString('th-TH')}</p>
                            </div>
                          </div>
                          
                          <div>
                            <Label>รายการสินค้า/บริการ:</Label>
                            <div className="border rounded-lg p-3 mt-2">
                              {invoice.items.map((item, index) => (
                                <div key={item.id} className="flex justify-between py-2 border-b last:border-b-0">
                                  <div>
                                    <div className="font-medium">{item.description}</div>
                                    <div className="text-sm text-gray-600">
                                      {getServiceTypeText(item.service_type)} × {item.quantity}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div>฿{item.total_price.toLocaleString()}</div>
                                  </div>
                                </div>
                              ))}
                              
                              <div className="pt-3 space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>ยอดรวม:</span>
                                  <span>฿{invoice.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>ภาษี:</span>
                                  <span>฿{invoice.tax_amount.toLocaleString()}</span>
                                </div>
                                {invoice.discount_amount > 0 && (
                                  <div className="flex justify-between text-sm text-green-600">
                                    <span>ส่วนลด:</span>
                                    <span>-฿{invoice.discount_amount.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="flex justify-between font-medium text-lg border-t pt-2">
                                  <span>รวมทั้งสิ้น:</span>
                                  <span>฿{invoice.total_amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600">
                                  <span>ชำระแล้ว:</span>
                                  <span>฿{invoice.paid_amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-orange-600">
                                  <span>ค้างชำระ:</span>
                                  <span>฿{(invoice.total_amount - invoice.paid_amount).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {invoice.notes && (
                            <div>
                              <Label>หมายเหตุ:</Label>
                              <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded mt-2">{invoice.notes}</p>
                            </div>
                          )}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                            ปิด
                          </Button>
                          <Button variant="outline">
                            <Printer className="h-4 w-4 mr-1" />
                            พิมพ์
                          </Button>
                          {invoice.paid_amount < invoice.total_amount && (
                            <Button onClick={() => {
                              setIsViewDialogOpen(false);
                              setIsPaymentDialogOpen(true);
                            }}>
                              <CreditCard className="h-4 w-4 mr-1" />
                              รับชำระ
                            </Button>
                          )}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    {invoice.paid_amount < invoice.total_amount && (
                      <Dialog open={isPaymentDialogOpen && selectedInvoice?.id === invoice.id} onOpenChange={(open) => {
                        setIsPaymentDialogOpen(open);
                        if (!open) {
                          setSelectedInvoice(null);
                          setPaymentAmount(0);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <CreditCard className="h-4 w-4 mr-1" />
                            รับชำระ
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>รับชำระเงิน</DialogTitle>
                            <DialogDescription>
                              ใบเสร็จเลขที่ {invoice.invoice_number} - {invoice.customer_name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600">ยอดรวม: ฿{invoice.total_amount.toLocaleString()}</div>
                              <div className="text-sm text-gray-600">ชำระแล้ว: ฿{invoice.paid_amount.toLocaleString()}</div>
                              <div className="text-sm font-medium text-orange-600">ค้างชำระ: ฿{(invoice.total_amount - invoice.paid_amount).toLocaleString()}</div>
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="payment_amount">จำนวนเงินที่รับ (บาท)</Label>
                              <Input
                                id="payment_amount"
                                type="number"
                                min="0"
                                max={invoice.total_amount - invoice.paid_amount}
                                step="0.01"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                                placeholder="0.00"
                              />
                            </div>
                            
                            <div className="grid gap-2">
                              <Label>วิธีการชำระเงิน</Label>
                              <Select value={paymentMethod} onValueChange={(value: Invoice['payment_method']) => setPaymentMethod(value)}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cash">เงินสด</SelectItem>
                                  <SelectItem value="credit_card">บัตรเครดิต</SelectItem>
                                  <SelectItem value="bank_transfer">โอนเงิน</SelectItem>
                                  <SelectItem value="insurance">ประกัน</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {paymentAmount > 0 && (
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="text-sm">ยอดคงเหลือหลังชำระ: ฿{(invoice.total_amount - invoice.paid_amount - paymentAmount).toLocaleString()}</div>
                                {paymentAmount >= (invoice.total_amount - invoice.paid_amount) && (
                                  <div className="text-sm text-green-600 font-medium">✓ ชำระครบแล้ว</div>
                                )}
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                              ยกเลิก
                            </Button>
                            <Button onClick={handleProcessPayment} disabled={paymentAmount <= 0}>
                              บันทึกการชำระ
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">
                {searchTerm || statusFilter !== 'all' || paymentMethodFilter !== 'all' ? 'ไม่พบใบเสร็จที่ค้นหา' : 'ยังไม่มีใบเสร็จ'}
              </h3>
              <p className="text-sm">
                {searchTerm || statusFilter !== 'all' || paymentMethodFilter !== 'all' ? 
                  'ลองเปลี่ยนเงื่อนไขการค้นหา' : 
                  'เริ่มต้นโดยการสร้างใบเสร็จใหม่'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffInvoicesList;
