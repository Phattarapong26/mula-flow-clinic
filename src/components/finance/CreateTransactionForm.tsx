
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus, Trash2 } from 'lucide-react';

interface TransactionItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  sellPrice: number;
  costPrice: number;
  total: number;
  profit: number;
}

interface TransactionFormData {
  orderNumber: string;
  customerName: string;
  customerId: string;
  branchId: string;
  saleDate: string;
  items: TransactionItem[];
  subtotal: number;
  vat: number;
  total: number;
  totalProfit: number;
}

interface CreateTransactionFormProps {
  onClose: () => void;
  onSave: (data: TransactionFormData) => void;
}

const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    orderNumber: `SO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
    customerName: '',
    customerId: '',
    branchId: '',
    saleDate: new Date().toISOString().split('T')[0],
    items: [],
    subtotal: 0,
    vat: 0,
    total: 0,
    totalProfit: 0
  });

  const [newItem, setNewItem] = useState<Omit<TransactionItem, 'id' | 'total' | 'profit'>>({
    productId: '',
    productName: '',
    quantity: 1,
    sellPrice: 0,
    costPrice: 0
  });

  // Mock product data
  const products = [
    { id: 'P001', name: 'สินค้า A', costPrice: 500, sellPrice: 1000 },
    { id: 'P002', name: 'สินค้า B', costPrice: 750, sellPrice: 1500 },
    { id: 'P003', name: 'สินค้า C', costPrice: 1200, sellPrice: 2400 },
  ];

  const branches = [
    { id: 'B001', name: 'สาขาสีลม' },
    { id: 'B002', name: 'สาขาอโซค' },
    { id: 'B003', name: 'สาขาลาดพร้าว' }
  ];

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setNewItem({
        ...newItem,
        productId: product.id,
        productName: product.name,
        sellPrice: product.sellPrice,
        costPrice: product.costPrice
      });
    }
  };

  const addItem = () => {
    if (newItem.productId && newItem.quantity > 0 && newItem.sellPrice > 0) {
      const total = newItem.quantity * newItem.sellPrice;
      const profit = total - (newItem.quantity * newItem.costPrice);
      
      const item: TransactionItem = {
        id: `item_${Date.now()}`,
        ...newItem,
        total,
        profit
      };

      const updatedItems = [...formData.items, item];
      updateCalculations(updatedItems);

      setNewItem({
        productId: '',
        productName: '',
        quantity: 1,
        sellPrice: 0,
        costPrice: 0
      });
    }
  };

  const removeItem = (itemId: string) => {
    const updatedItems = formData.items.filter(item => item.id !== itemId);
    updateCalculations(updatedItems);
  };

  const updateCalculations = (items: TransactionItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const vat = subtotal * 0.07;
    const total = subtotal + vat;
    const totalProfit = items.reduce((sum, item) => sum + item.profit, 0);

    setFormData(prev => ({
      ...prev,
      items,
      subtotal,
      vat,
      total,
      totalProfit
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>สร้างออเดอร์ขาย (Sale Order)</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="orderNumber">หมายเลขออเดอร์</Label>
                <Input
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="saleDate">วันที่ขาย</Label>
                <Input
                  id="saleDate"
                  type="date"
                  value={formData.saleDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, saleDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="customerName">ชื่อลูกค้า</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  placeholder="ระบุชื่อลูกค้า"
                  required
                />
              </div>
              <div>
                <Label htmlFor="branchId">สาขา</Label>
                <select
                  id="branchId"
                  value={formData.branchId}
                  onChange={(e) => setFormData(prev => ({ ...prev, branchId: e.target.value }))}
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

            {/* Add Item Section */}
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="text-lg font-semibold">เพิ่มสินค้า</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                <div>
                  <Label htmlFor="productSelect">สินค้า</Label>
                  <select
                    id="productSelect"
                    value={newItem.productId}
                    onChange={(e) => handleProductSelect(e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">เลือกสินค้า</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="quantity">จำนวน</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="sellPrice">ราคาขาย</Label>
                  <Input
                    id="sellPrice"
                    type="number"
                    value={newItem.sellPrice}
                    onChange={(e) => setNewItem(prev => ({ ...prev, sellPrice: parseFloat(e.target.value) || 0 }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="costPrice">ราคาทุน</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    value={newItem.costPrice}
                    onChange={(e) => setNewItem(prev => ({ ...prev, costPrice: parseFloat(e.target.value) || 0 }))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label>ยอดรวม</Label>
                  <div className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                    {formatCurrency(newItem.quantity * newItem.sellPrice)}
                  </div>
                </div>
                <Button type="button" onClick={addItem} className="h-10">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Items List */}
            {formData.items.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">รายการสินค้า</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">สินค้า</th>
                        <th className="text-center py-2">จำนวน</th>
                        <th className="text-right py-2">ราคาขาย</th>
                        <th className="text-right py-2">ราคาทุน</th>
                        <th className="text-right py-2">ยอดรวม</th>
                        <th className="text-right py-2">กำไร</th>
                        <th className="text-center py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map(item => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2">{item.productName}</td>
                          <td className="py-2 text-center">{item.quantity}</td>
                          <td className="py-2 text-right">{formatCurrency(item.sellPrice)}</td>
                          <td className="py-2 text-right">{formatCurrency(item.costPrice)}</td>
                          <td className="py-2 text-right">{formatCurrency(item.total)}</td>
                          <td className="py-2 text-right text-green-600">{formatCurrency(item.profit)}</td>
                          <td className="py-2 text-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>ยอดรวมสินค้า:</span>
                    <span>{formatCurrency(formData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ภาษีมูลค่าเพิ่ม (7%):</span>
                    <span>{formatCurrency(formData.vat)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>ยอดรวมทั้งสิ้น:</span>
                    <span>{formatCurrency(formData.total)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>กำไรรวม:</span>
                    <span>{formatCurrency(formData.totalProfit)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                ยกเลิก
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                บันทึกออเดอร์
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTransactionForm;
