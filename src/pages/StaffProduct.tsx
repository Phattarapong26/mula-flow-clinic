
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffProductInventory from '@/components/staff/product/StaffProductInventory';
import StaffProductOrders from '@/components/staff/product/StaffProductOrders';
import StaffProductCatalog from '@/components/staff/product/StaffProductCatalog';

const StaffProduct = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการผลิตภัณฑ์</h1>
          <p className="text-gray-600">บริหารจัดการสินค้าและสต็อก</p>
        </div>
        
        <Routes>
          <Route index element={<StaffProductInventory />} />
          <Route path="inventory" element={<StaffProductInventory />} />
          <Route path="orders" element={<StaffProductOrders />} />
          <Route path="catalog" element={<StaffProductCatalog />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffProduct;
