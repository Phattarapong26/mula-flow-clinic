
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Edit, Plus, Search, Star, Heart } from 'lucide-react';

const StaffProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [products] = useState([
    {
      id: 'P001',
      name: 'เลนส์แว่นสายตา Progressive Premium',
      category: 'เลนส์',
      brand: 'ESSILOR',
      price: 3500,
      originalPrice: 4000,
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80',
      description: 'เลนส์ Progressive คุณภาพสูง ลดการเมื่อยล้าของตา',
      features: ['UV Protection', 'Anti-Glare', 'Scratch Resistant'],
      rating: 4.8,
      inStock: true,
      isPopular: true,
      discount: 12
    },
    {
      id: 'P002',
      name: 'กรอบแว่น Titanium Luxury',
      category: 'กรอบ',
      brand: 'RAYBAN',
      price: 4200,
      originalPrice: 4200,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80',
      description: 'กรอบแว่นไทเทเนียมน้ำหนักเบา ทนทาน',
      features: ['Lightweight', 'Hypoallergenic', 'Flexible'],
      rating: 4.9,
      inStock: true,
      isPopular: false,
      discount: 0
    },
    {
      id: 'P003',
      name: 'แว่นกันแดด Polarized',
      category: 'แว่นกันแดด',
      brand: 'OAKLEY',
      price: 2800,
      originalPrice: 3200,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80',
      description: 'แว่นกันแดดโพลาไรซ์ ป้องกัน UV 100%',
      features: ['Polarized', '100% UV Protection', 'Impact Resistant'],
      rating: 4.7,
      inStock: false,
      isPopular: true,
      discount: 15
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">แค็ตตาล็อกสินค้า</h1>
          <p className="text-gray-600">จัดการและแสดงสินค้าทั้งหมด</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          เพิ่มสินค้าใหม่
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isPopular && (
                  <Badge className="bg-orange-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    ยอดนิยม
                  </Badge>
                )}
                {product.discount > 0 && (
                  <Badge variant="destructive">
                    ลด {product.discount}%
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="secondary">
                    หมดสต็อก
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 p-2"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <Badge variant="outline" className="ml-2">{product.brand}</Badge>
              </div>
              
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.features.slice(0, 2).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {product.features.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{product.features.length - 2}
                  </Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ฿{product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ฿{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  ดูรายละเอียด
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">ไม่พบสินค้า</h3>
              <p>ลองเปลี่ยนคำค้นหาหรือตัวกรองใหม่</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>สถิติสินค้า</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{products.length}</div>
              <div className="text-sm text-gray-600">สินค้าทั้งหมด</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {products.filter(p => p.inStock).length}
              </div>
              <div className="text-sm text-gray-600">พร้อมจำหน่าย</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {products.filter(p => p.isPopular).length}
              </div>
              <div className="text-sm text-gray-600">ยอดนิยม</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600">หมวดหมู่</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffProductCatalog;
