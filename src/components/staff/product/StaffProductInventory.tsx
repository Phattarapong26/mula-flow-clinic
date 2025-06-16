
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Package, Plus, Search, Eye, Edit, AlertTriangle, TrendingUp, TrendingDown, BarChart3, Glasses, Filter, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: 'frames' | 'lenses' | 'contact_lenses' | 'accessories' | 'cleaning_supplies';
  brand: string;
  model: string;
  sku: string;
  current_stock: number;
  min_stock_level: number;
  max_stock_level: number;
  unit_cost: number;
  selling_price: number;
  supplier: string;
  last_restocked: string;
  expiry_date?: string;
  prescription_required: boolean;
  status: 'active' | 'discontinued' | 'out_of_stock';
  description: string;
  created_at: string;
  updated_at: string;
}

const StaffProductInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Mock data - optometry clinic specific products
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD001",
      name: "Ray-Ban Aviator Classic",
      category: "frames",
      brand: "Ray-Ban",
      model: "RB3025",
      sku: "RB3025-001/58",
      current_stock: 15,
      min_stock_level: 5,
      max_stock_level: 30,
      unit_cost: 2500,
      selling_price: 4500,
      supplier: "Luxottica Thailand",
      last_restocked: "2025-06-10",
      prescription_required: true,
      status: "active",
      description: "Classic aviator sunglasses with polarized lenses",
      created_at: "2025-01-15T09:00:00Z",
      updated_at: "2025-06-10T14:30:00Z"
    },
    {
      id: "PROD002",
      name: "Acuvue Oasys Daily",
      category: "contact_lenses",
      brand: "Johnson & Johnson",
      model: "Oasys 1-Day",
      sku: "AO1D-90",
      current_stock: 2,
      min_stock_level: 10,
      max_stock_level: 100,
      unit_cost: 1200,
      selling_price: 1800,
      supplier: "J&J Vision Care",
      last_restocked: "2025-05-20",
      expiry_date: "2026-05-20",
      prescription_required: true,
      status: "active",
      description: "Daily disposable contact lenses with UV protection",
      created_at: "2025-01-10T08:00:00Z",
      updated_at: "2025-05-20T10:15:00Z"
    },
    {
      id: "PROD003",
      name: "Essilor Varilux Progressive",
      category: "lenses",
      brand: "Essilor",
      model: "Varilux X",
      sku: "VX-15-AS",
      current_stock: 8,
      min_stock_level: 5,
      max_stock_level: 20,
      unit_cost: 3500,
      selling_price: 6500,
      supplier: "Essilor Thailand",
      last_restocked: "2025-06-01",
      prescription_required: true,
      status: "active",
      description: "Progressive lenses with anti-scratch coating",
      created_at: "2025-02-01T09:00:00Z",
      updated_at: "2025-06-01T11:20:00Z"
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'frames' as Product['category'],
    brand: '',
    model: '',
    sku: '',
    current_stock: 0,
    min_stock_level: 1,
    max_stock_level: 10,
    unit_cost: 0,
    selling_price: 0,
    supplier: '',
    expiry_date: '',
    prescription_required: false,
    description: ''
  });

  const [orderQuantity, setOrderQuantity] = useState(0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.brand || !newProduct.sku || !newProduct.supplier) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: `PROD${String(Date.now()).slice(-3)}`,
      ...newProduct,
      last_restocked: new Date().toISOString().split('T')[0],
      status: 'active' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: 'frames',
      brand: '',
      model: '',
      sku: '',
      current_stock: 0,
      min_stock_level: 1,
      max_stock_level: 10,
      unit_cost: 0,
      selling_price: 0,
      supplier: '',
      expiry_date: '',
      prescription_required: false,
      description: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "เพิ่มสินค้าสำเร็จ",
      description: "สินค้าใหม่ถูกเพิ่มในระบบแล้ว"
    });
  };

  const handleOrderStock = () => {
    if (!selectedProduct || orderQuantity <= 0) {
      toast({
        title: "ข้อมูลไม่ถูกต้อง",
        description: "กรุณาระบุจำนวนที่ต้องการสั่งซื้อ",
        variant: "destructive"
      });
      return;
    }

    setProducts(products.map(product => 
      product.id === selectedProduct.id ? {
        ...product,
        current_stock: product.current_stock + orderQuantity,
        last_restocked: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      } : product
    ));

    setIsOrderDialogOpen(false);
    setOrderQuantity(0);
    
    toast({
      title: "สั่งซื้อสินค้าสำเร็จ",
      description: `สั่งซื้อ ${selectedProduct.name} จำนวน ${orderQuantity} หน่วย`
    });
  };

  const getStockStatus = (product: Product) => {
    if (product.current_stock === 0) {
      return { status: 'สินค้าหมด', color: 'bg-red-100 text-red-800', icon: <AlertTriangle className="h-3 w-3" /> };
    } else if (product.current_stock <= product.min_stock_level) {
      return { status: 'สต็อกต่ำ', color: 'bg-yellow-100 text-yellow-800', icon: <TrendingDown className="h-3 w-3" /> };
    } else if (product.current_stock >= product.max_stock_level) {
      return { status: 'สต็อกเต็ม', color: 'bg-blue-100 text-blue-800', icon: <TrendingUp className="h-3 w-3" /> };
    }
    return { status: 'ปกติ', color: 'bg-green-100 text-green-800', icon: <BarChart3 className="h-3 w-3" /> };
  };

  const getCategoryText = (category: Product['category']) => {
    const labels = {
      frames: 'กรอบแว่น',
      lenses: 'เลนส์แว่น',
      contact_lenses: 'คอนแทคเลนส์',
      accessories: 'อุปกรณ์เสริม',
      cleaning_supplies: 'อุปกรณ์ทำความสะอาด'
    };
    return labels[category];
  };

  const getCategoryIcon = (category: Product['category']) => {
    switch (category) {
      case 'frames': return <Glasses className="h-4 w-4" />;
      case 'lenses': return <Eye className="h-4 w-4" />;
      case 'contact_lenses': return <Eye className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  // Summary statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.current_stock <= p.min_stock_level).length;
  const outOfStockProducts = products.filter(p => p.current_stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + (p.current_stock * p.unit_cost), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">คลังสินค้า</h1>
          <p className="text-gray-600">จัดการสินค้าและติดตามสต็อก ({filteredProducts.length} รายการ)</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                เพิ่มสินค้า
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>เพิ่มสินค้าใหม่</DialogTitle>
                <DialogDescription>
                  กรอกข้อมูลสินค้าที่ต้องการเพิ่มในคลัง
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">ชื่อสินค้า *</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="เช่น Ray-Ban Aviator"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>หมวดหมู่ *</Label>
                    <Select value={newProduct.category} onValueChange={(value: Product['category']) => setNewProduct({...newProduct, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frames">กรอบแว่น</SelectItem>
                        <SelectItem value="lenses">เลนส์แว่น</SelectItem>
                        <SelectItem value="contact_lenses">คอนแทคเลนส์</SelectItem>
                        <SelectItem value="accessories">อุปกรณ์เสริม</SelectItem>
                        <SelectItem value="cleaning_supplies">อุปกรณ์ทำความสะอาด</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="brand">ยี่ห้อ *</Label>
                    <Input
                      id="brand"
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                      placeholder="เช่น Ray-Ban"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">รุ่น</Label>
                    <Input
                      id="model"
                      value={newProduct.model}
                      onChange={(e) => setNewProduct({...newProduct, model: e.target.value})}
                      placeholder="เช่น RB3025"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sku">รหัสสินค้า (SKU) *</Label>
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      placeholder="เช่น RB3025-001"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">ผู้จำหน่าย *</Label>
                    <Input
                      id="supplier"
                      value={newProduct.supplier}
                      onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                      placeholder="เช่น Luxottica Thailand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current_stock">สต็อกปัจจุบัน</Label>
                    <Input
                      id="current_stock"
                      type="number"
                      value={newProduct.current_stock}
                      onChange={(e) => setNewProduct({...newProduct, current_stock: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="min_stock">สต็อกขั้นต่ำ</Label>
                    <Input
                      id="min_stock"
                      type="number"
                      value={newProduct.min_stock_level}
                      onChange={(e) => setNewProduct({...newProduct, min_stock_level: parseInt(e.target.value) || 1})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="max_stock">สต็อกสูงสุด</Label>
                    <Input
                      id="max_stock"
                      type="number"
                      value={newProduct.max_stock_level}
                      onChange={(e) => setNewProduct({...newProduct, max_stock_level: parseInt(e.target.value) || 10})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="unit_cost">ต้นทุน (บาท)</Label>
                    <Input
                      id="unit_cost"
                      type="number"
                      value={newProduct.unit_cost}
                      onChange={(e) => setNewProduct({...newProduct, unit_cost: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="selling_price">ราคาขาย (บาท)</Label>
                    <Input
                      id="selling_price"
                      type="number"
                      value={newProduct.selling_price}
                      onChange={(e) => setNewProduct({...newProduct, selling_price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="expiry_date">วันหมดอายุ (ถ้ามี)</Label>
                  <Input
                    id="expiry_date"
                    type="date"
                    value={newProduct.expiry_date}
                    onChange={(e) => setNewProduct({...newProduct, expiry_date: e.target.value})}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="prescription_required"
                    checked={newProduct.prescription_required}
                    onChange={(e) => setNewProduct({...newProduct, prescription_required: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="prescription_required">ต้องใช้ใบสั่งแพทย์</Label>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">รายละเอียด</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="รายละเอียดเพิ่มเติมของสินค้า..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleCreateProduct}>
                  เพิ่มสินค้า
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
              <div className="text-2xl font-bold text-blue-600">{totalProducts}</div>
              <div className="text-sm text-gray-600">สินค้าทั้งหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{lowStockProducts}</div>
              <div className="text-sm text-gray-600">สต็อกต่ำ</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{outOfStockProducts}</div>
              <div className="text-sm text-gray-600">สินค้าหมด</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">฿{totalValue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">มูลค่าสต็อก</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            รายการสินค้าในคลัง
          </CardTitle>
          <CardDescription>จัดการและติดตามสต็อกสินค้า</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="ค้นหาสินค้า, ยี่ห้อ, หรือรหัสสินค้า..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">หมวดหมู่ทั้งหมด</SelectItem>
                <SelectItem value="frames">กรอบแว่น</SelectItem>
                <SelectItem value="lenses">เลนส์แว่น</SelectItem>
                <SelectItem value="contact_lenses">คอนแทคเลนส์</SelectItem>
                <SelectItem value="accessories">อุปกรณ์เสริม</SelectItem>
                <SelectItem value="cleaning_supplies">อุปกรณ์ทำความสะอาด</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">สถานะทั้งหมด</SelectItem>
                <SelectItem value="active">ใช้งาน</SelectItem>
                <SelectItem value="discontinued">หยุดจำหน่าย</SelectItem>
                <SelectItem value="out_of_stock">สินค้าหมด</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product);
              const margin = ((product.selling_price - product.unit_cost) / product.selling_price * 100);
              
              return (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryIcon(product.category)}
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <Badge className={stockStatus.color}>
                          {stockStatus.icon}
                          {stockStatus.status}
                        </Badge>
                        {product.prescription_required && (
                          <Badge variant="outline">ต้องใช้ใบสั่งแพทย์</Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium">ยี่ห้อ:</span> {product.brand}
                          {product.model && <span> ({product.model})</span>}
                        </div>
                        <div>
                          <span className="font-medium">รหัส:</span> {product.sku}
                        </div>
                        <div>
                          <span className="font-medium">สต็อก:</span> {product.current_stock} หน่วย
                        </div>
                        <div>
                          <span className="font-medium">ราคา:</span> ฿{product.selling_price.toLocaleString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium">หมวดหมู่:</span> {getCategoryText(product.category)}
                        </div>
                        <div>
                          <span className="font-medium">ผู้จำหน่าย:</span> {product.supplier}
                        </div>
                        <div>
                          <span className="font-medium">กำไรขั้นต้น:</span> {margin.toFixed(1)}%
                        </div>
                        <div>
                          <span className="font-medium">เติมครั้งล่าสุด:</span> {new Date(product.last_restocked).toLocaleDateString('th-TH')}
                        </div>
                      </div>
                      
                      {product.description && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-600 text-sm">{product.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Dialog open={isViewDialogOpen && selectedProduct?.id === product.id} onOpenChange={(open) => {
                        setIsViewDialogOpen(open);
                        if (!open) setSelectedProduct(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            ดู
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {getCategoryIcon(product.category)}
                              {product.name}
                            </DialogTitle>
                            <DialogDescription>
                              รายละเอียดสินค้า
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex gap-2">
                              <Badge className={stockStatus.color}>
                                {stockStatus.status}
                              </Badge>
                              {product.prescription_required && (
                                <Badge variant="outline">ต้องใช้ใบสั่งแพทย์</Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label>ยี่ห้อ:</Label>
                                <p>{product.brand}</p>
                              </div>
                              <div>
                                <Label>รุ่น:</Label>
                                <p>{product.model || '-'}</p>
                              </div>
                              <div>
                                <Label>รหัสสินค้า:</Label>
                                <p>{product.sku}</p>
                              </div>
                              <div>
                                <Label>หมวดหมู่:</Label>
                                <p>{getCategoryText(product.category)}</p>
                              </div>
                              <div>
                                <Label>สต็อกปัจจุบัน:</Label>
                                <p>{product.current_stock} หน่วย</p>
                              </div>
                              <div>
                                <Label>สต็อกขั้นต่ำ:</Label>
                                <p>{product.min_stock_level} หน่วย</p>
                              </div>
                              <div>
                                <Label>ต้นทุน:</Label>
                                <p>฿{product.unit_cost.toLocaleString()}</p>
                              </div>
                              <div>
                                <Label>ราคาขาย:</Label>
                                <p>฿{product.selling_price.toLocaleString()}</p>
                              </div>
                              <div>
                                <Label>ผู้จำหน่าย:</Label>
                                <p>{product.supplier}</p>
                              </div>
                              <div>
                                <Label>เติมครั้งล่าสุด:</Label>
                                <p>{new Date(product.last_restocked).toLocaleDateString('th-TH')}</p>
                              </div>
                              {product.expiry_date && (
                                <>
                                  <div>
                                    <Label>วันหมดอายุ:</Label>
                                    <p>{new Date(product.expiry_date).toLocaleDateString('th-TH')}</p>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            {product.description && (
                              <div className="grid gap-2">
                                <Label>รายละเอียด:</Label>
                                <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded">{product.description}</p>
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                              ปิด
                            </Button>
                            <Button onClick={() => {
                              setIsViewDialogOpen(false);
                              setIsOrderDialogOpen(true);
                            }}>
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              สั่งซื้อเพิ่ม
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={isOrderDialogOpen && selectedProduct?.id === product.id} onOpenChange={(open) => {
                        setIsOrderDialogOpen(open);
                        if (!open) {
                          setSelectedProduct(null);
                          setOrderQuantity(0);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedProduct(product)}
                            disabled={product.current_stock > product.min_stock_level}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            สั่งซื้อ
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>สั่งซื้อสินค้าเพิ่ม</DialogTitle>
                            <DialogDescription>
                              สั่งซื้อ {product.name} จาก {product.supplier}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <div className="text-sm text-gray-600">สต็อกปัจจุบัน: {product.current_stock} หน่วย</div>
                              <div className="text-sm text-gray-600">สต็อกขั้นต่ำ: {product.min_stock_level} หน่วย</div>
                              <div className="text-sm text-gray-600">แนะนำสั่งซื้อ: {Math.max(product.max_stock_level - product.current_stock, 0)} หน่วย</div>
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="order_quantity">จำนวนที่ต้องการสั่งซื้อ</Label>
                              <Input
                                id="order_quantity"
                                type="number"
                                min="1"
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 0)}
                                placeholder="จำนวน"
                              />
                            </div>
                            
                            {orderQuantity > 0 && (
                              <div className="p-4 bg-blue-50 rounded-lg">
                                <div className="text-sm">ค่าใช้จ่ายโดยประมาณ: ฿{(orderQuantity * product.unit_cost).toLocaleString()}</div>
                                <div className="text-sm">สต็อกหลังเติม: {product.current_stock + orderQuantity} หน่วย</div>
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
                              ยกเลิก
                            </Button>
                            <Button onClick={handleOrderStock} disabled={orderQuantity <= 0}>
                              ยืนยันสั่งซื้อ
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">
                {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' ? 'ไม่พบสินค้าที่ค้นหา' : 'ยังไม่มีสินค้าในคลัง'}
              </h3>
              <p className="text-sm">
                {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' ? 
                  'ลองเปลี่ยนเงื่อนไขการค้นหา' : 
                  'เริ่มต้นโดยการเพิ่มสินค้าใหม่'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffProductInventory;
