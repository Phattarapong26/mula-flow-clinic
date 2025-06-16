
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Upload, Calculator } from 'lucide-react';

const TaxInvoiceSection = () => {
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);

  // Mock tax data
  const taxSummary = {
    outputVAT: 85000,
    inputVAT: 45000,
    netVAT: 40000,
    withholdingTax: 12500,
    taxPeriod: 'มิ.ย. 2025'
  };

  const vatData = [
    { type: 'Output VAT', description: 'ขายสินค้าและบริการ', amount: 85000, rate: 7 },
    { type: 'Input VAT', description: 'ซื้อสินค้าและบริการ', amount: -45000, rate: 7 }
  ];

  const recentInvoices = [
    { no: 'INV-2025-001247', date: '14/06/2025', customer: 'บริษัท ABC จำกัด', amount: 85000, vat: 5950, status: 'ออกแล้ว' },
    { no: 'INV-2025-001246', date: '13/06/2025', customer: 'คุณสมชาย ใจดี', amount: 12500, vat: 875, status: 'ออกแล้ว' },
    { no: 'INV-2025-001245', date: '13/06/2025', customer: 'บริษัท XYZ จำกัด', amount: 156000, vat: 10920, status: 'ร่าง' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ออกแล้ว': return 'bg-green-100 text-green-800';
      case 'ร่าง': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">ข้อมูลภาษี / ใบกำกับภาษี</h2>
          <p className="text-gray-600">จัดการใบกำกับภาษี VAT และภาษีหัก ณ ที่จ่าย</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setShowInvoiceGenerator(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            สร้างใบกำกับภาษี
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            อัปโหลดใบเสร็จซื้อ
          </Button>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Output VAT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(taxSummary.outputVAT)}</div>
            <p className="text-sm text-green-500">จากการขาย</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Input VAT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(taxSummary.inputVAT)}</div>
            <p className="text-sm text-blue-500">จากการซื้อ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net VAT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{formatCurrency(taxSummary.netVAT)}</div>
            <p className="text-sm text-orange-500">ต้องชำระ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">ภาษีหัก ณ ที่จ่าย</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(taxSummary.withholdingTax)}</div>
            <p className="text-sm text-purple-500">ถูกหักไว้</p>
          </CardContent>
        </Card>
      </div>

      {/* VAT Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            สรุป VAT ประจำเดือน {taxSummary.taxPeriod}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3">รายได้ (Output VAT)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ขายสินค้า (ไม่รวม VAT)</span>
                    <span>{formatCurrency(1214286)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT 7%</span>
                    <span>{formatCurrency(85000)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>รวมรายได้</span>
                    <span>{formatCurrency(1299286)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">ค่าใช้จ่าย (Input VAT)</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>ซื้อสินค้า (ไม่รวม VAT)</span>
                    <span>{formatCurrency(642857)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT 7%</span>
                    <span>{formatCurrency(45000)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>รวมค่าใช้จ่าย</span>
                    <span>{formatCurrency(687857)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">VAT ที่ต้องชำระ:</span>
                <span className="text-2xl font-bold text-orange-600">{formatCurrency(taxSummary.netVAT)}</span>
              </div>
              <p className="text-sm text-orange-600 mt-1">
                กำหนดชำระภายใน 15 ก.ค. 2025
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            ใบกำกับภาษีล่าสุด
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">เลขที่</th>
                  <th className="text-left py-2">วันที่</th>
                  <th className="text-left py-2">ลูกค้า</th>
                  <th className="text-right py-2">จำนวนเงิน</th>
                  <th className="text-right py-2">VAT</th>
                  <th className="text-center py-2">สถานะ</th>
                  <th className="text-center py-2">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 font-medium">{invoice.no}</td>
                    <td className="py-2">{invoice.date}</td>
                    <td className="py-2">{invoice.customer}</td>
                    <td className="py-2 text-right">{formatCurrency(invoice.amount)}</td>
                    <td className="py-2 text-right">{formatCurrency(invoice.vat)}</td>
                    <td className="py-2 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="outline">ดู</Button>
                        <Button size="sm" variant="outline">พิมพ์</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Withholding Tax Summary */}
      <Card>
        <CardHeader>
          <CardTitle>สรุปภาษีหัก ณ ที่จ่าย</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700">ภาษีหัก 3%</h4>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(8500)}</div>
              <p className="text-sm text-gray-600">จากค่าบริการ</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700">ภาษีหัก 5%</h4>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(4000)}</div>
              <p className="text-sm text-gray-600">จากค่าเช่า</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700">รวมทั้งหมด</h4>
              <div className="text-2xl font-bold text-purple-900">{formatCurrency(12500)}</div>
              <p className="text-sm text-purple-600">ภาษีที่ถูกหัก</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Generator Modal */}
      {showInvoiceGenerator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>สร้างใบกำกับภาษี</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">ระบบสร้างใบกำกับภาษีอัตโนมัติ</p>
                {/* Invoice form would go here */}
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setShowInvoiceGenerator(false)}>
                    ยกเลิก
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    สร้างใบกำกับภาษี
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TaxInvoiceSection;
