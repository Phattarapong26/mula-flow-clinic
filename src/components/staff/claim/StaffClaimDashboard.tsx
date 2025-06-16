import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Plus, Clock, CheckCircle, XCircle, AlertCircle, Eye, TrendingUp, Upload, Camera, Download } from 'lucide-react';
import { mockClaims, MockClaim } from '@/data/staffMockData';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StaffClaimDashboard = () => {
  const [claims, setClaims] = useState(mockClaims);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form states
  const [newClaim, setNewClaim] = useState({
    customer_id: '',
    customer_name: '',
    insurance_provider: '',
    service_type: '',
    claim_amount: '',
    treatment_date: '',
    diagnosis: '',
    notes: ''
  });

  const handleCreateClaim = () => {
    if (!newClaim.customer_name || !newClaim.insurance_provider || !newClaim.service_type || 
        !newClaim.claim_amount || !newClaim.treatment_date) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบทุกช่อง",
        variant: "destructive"
      });
      return;
    }

    const claim: MockClaim = {
      id: `CL${Date.now()}`,
      patientName: newClaim.customer_name,
      claimType: 'ประกันสุขภาพ',
      amount: parseFloat(newClaim.claim_amount),
      status: 'submitted',
      date: new Date().toISOString().split('T')[0],
      customer_id: newClaim.customer_name.replace(/\s+/g, '').toLowerCase(),
      customer_name: newClaim.customer_name,
      claim_amount: parseFloat(newClaim.claim_amount),
      submitted_date: new Date().toISOString(),
      external_ref: `INS${Date.now()}`,
      insurance_provider: newClaim.insurance_provider,
      service_type: newClaim.service_type,
      treatment_date: newClaim.treatment_date,
      diagnosis: newClaim.diagnosis,
      notes: newClaim.notes,
      created_at: new Date().toISOString()
    };

    setClaims([claim, ...claims]);
    setNewClaim({
      customer_id: '',
      customer_name: '',
      insurance_provider: '',
      service_type: '',
      claim_amount: '',
      treatment_date: '',
      diagnosis: '',
      notes: ''
    });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "สร้างเคลมสำเร็จ",
      description: `เคลม ${claim.id} ถูกส่งให้บริษัทประกันแล้ว`
    });
  };

  const handleUpdateStatus = (claimId, newStatus) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: newStatus } : claim
    ));
    
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `สถานะเคลมถูกเปลี่ยนเป็น ${getStatusText(newStatus)}`
    });
  };

  const recentClaims = claims.slice(0, 5);

  const getStatusBadge = (status) => {
    const variants = {
      submitted: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      processing: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      approved: 'bg-green-100 text-green-800 hover:bg-green-200',
      rejected: 'bg-red-100 text-red-800 hover:bg-red-200'
    };
    return variants[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const labels = {
      submitted: 'ส่งเคลมแล้ว',
      processing: 'กำลังดำเนินการ',
      approved: 'อนุมัติ',
      rejected: 'ปฏิเสธ'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted': return <Clock className="h-4 w-4" />;
      case 'processing': return <AlertCircle className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Summary statistics
  const totalClaims = claims.length;
  const approvedClaims = claims.filter(c => c.status === 'approved').length;
  const pendingClaims = claims.filter(c => c.status === 'processing' || c.status === 'submitted').length;
  const totalAmount = claims.reduce((sum, claim) => sum + claim.claim_amount, 0);
  const approvedAmount = claims.filter(c => c.status === 'approved').reduce((sum, claim) => sum + claim.claim_amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">ภาพรวมระบบเคลม</h1>
          <p className="text-gray-600">จัดการเคลมประกันและการเรียกร้องค่าสินไหมทดแทน</p>
        </div>
        <div className="flex gap-2">
          <Link to="/staff/claim/history">
            <Button variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              ประวัติ
            </Button>
          </Link>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                สร้างเคลมใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>สร้างเคลมประกันใหม่</DialogTitle>
                <DialogDescription>
                  กรอกข้อมูลการเคลมประกันสำหรับผู้ป่วย
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer_name">ชื่อผู้ป่วย *</Label>
                    <Input
                      id="customer_name"
                      value={newClaim.customer_name}
                      onChange={(e) => setNewClaim({...newClaim, customer_name: e.target.value})}
                      placeholder="ชื่อ-นามสกุลผู้ป่วย"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>บริษัทประกัน *</Label>
                    <Select value={newClaim.insurance_provider} onValueChange={(value) => setNewClaim({...newClaim, insurance_provider: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกบริษัทประกัน" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AIA">เอไอเอ ประกันชีวิต</SelectItem>
                        <SelectItem value="Bangkok Insurance">กรุงเทพประกันภัย</SelectItem>
                        <SelectItem value="Muang Thai">เมืองไทยประกันชีวิต</SelectItem>
                        <SelectItem value="SCB Life">เอสซีบี ประกันชีวิต</SelectItem>
                        <SelectItem value="Thai Life">ไทยประกันชีวิต</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>ประเภทบริการ *</Label>
                    <Select value={newClaim.service_type} onValueChange={(value) => setNewClaim({...newClaim, service_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกประเภทบริการ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ตรวจวัดสายตา">ตรวจวัดสายตา</SelectItem>
                        <SelectItem value="ตรวจโรคตา">ตรวจโรคตา</SelectItem>
                        <SelectItem value="แว่นสายตา">แว่นสายตา</SelectItem>
                        <SelectItem value="คอนแทคเลนส์">คอนแทคเลนส์</SelectItem>
                        <SelectItem value="ผ่าตัดตา">ผ่าตัดตา</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="claim_amount">จำนวนเงินเคลม *</Label>
                    <Input
                      id="claim_amount"
                      type="number"
                      value={newClaim.claim_amount}
                      onChange={(e) => setNewClaim({...newClaim, claim_amount: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="treatment_date">วันที่รักษา *</Label>
                    <Input
                      id="treatment_date"
                      type="date"
                      value={newClaim.treatment_date}
                      onChange={(e) => setNewClaim({...newClaim, treatment_date: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="diagnosis">การวินิจฉัย</Label>
                    <Input
                      id="diagnosis"
                      value={newClaim.diagnosis}
                      onChange={(e) => setNewClaim({...newClaim, diagnosis: e.target.value})}
                      placeholder="เช่น สายตาสั้น, ต้อกระจก"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">หมายเหตุ</Label>
                  <Textarea
                    id="notes"
                    value={newClaim.notes}
                    onChange={(e) => setNewClaim({...newClaim, notes: e.target.value})}
                    placeholder="รายละเอียดเพิ่มเติม..."
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>เอกสารประกอบ</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">อัปโหลดใบเสร็จ, ใบรับรอง หรือเอกสารประกอบ</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Camera className="h-4 w-4 mr-1" />
                      เลือกไฟล์
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  ยกเลิก
                </Button>
                <Button onClick={handleCreateClaim}>
                  ส่งเคลม
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalClaims}</div>
                <div className="text-sm text-gray-600">เคลมทั้งหมด</div>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{approvedClaims}</div>
                <div className="text-sm text-gray-600">อนุมัติแล้ว</div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{pendingClaims}</div>
                <div className="text-sm text-gray-600">รอดำเนินการ</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {totalAmount > 0 ? ((approvedAmount / totalAmount) * 100).toFixed(1) : 0}%
                </div>
                <div className="text-sm text-gray-600">อัตราอนุมัติ</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Amount Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                ฿{totalAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">มูลค่าเคลมรวม</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                ฿{approvedAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">มูลค่าที่ได้รับอนุมัติ</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Claims */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            เคลมล่าสุด
          </CardTitle>
          <CardDescription>รายการเคลมที่ส่งล่าสุด</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentClaims.map((claim) => (
              <div key={claim.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(claim.status)}
                      <h3 className="font-semibold">เคลม {claim.id}</h3>
                      <Badge className={getStatusBadge(claim.status)}>
                        {getStatusText(claim.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">ผู้ป่วย:</span> {claim.customer_name}
                      </div>
                      <div>
                        <span className="font-medium">บริษัทประกัน:</span> {claim.insurance_provider}
                      </div>
                      <div>
                        <span className="font-medium">ประเภทบริการ:</span> {claim.service_type}
                      </div>
                      <div>
                        <span className="font-medium">จำนวนเงิน:</span> 
                        <span className="text-green-600 font-semibold"> ฿{claim.claim_amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="font-medium">วันที่ส่ง:</span> {new Date(claim.submitted_date).toLocaleDateString('th-TH')}
                      </div>
                      <div>
                        <span className="font-medium">รหัสอ้างอิง:</span> {claim.id}
                      </div>
                    </div>
                    
                    {claim.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-sm">{claim.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Dialog open={isTrackingDialogOpen && selectedClaim?.id === claim.id} onOpenChange={(open) => {
                      setIsTrackingDialogOpen(open);
                      if (!open) setSelectedClaim(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedClaim(claim)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          ติดตาม
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>ติดตามสถานะเคลม</DialogTitle>
                          <DialogDescription>
                            เคลม {selectedClaim?.id} - {selectedClaim?.customer_name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusBadge(selectedClaim?.status)}>
                              {getStatusText(selectedClaim?.status)}
                            </Badge>
                          </div>
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label>ผู้ป่วย:</Label>
                                <p className="font-medium">{selectedClaim?.customer_name}</p>
                              </div>
                              <div>
                                <Label>บริษัทประกัน:</Label>
                                <p>{selectedClaim?.insurance_provider}</p>
                              </div>
                              <div>
                                <Label>ประเภทบริการ:</Label>
                                <p>{selectedClaim?.service_type}</p>
                              </div>
                              <div>
                                <Label>จำนวนเงิน:</Label>
                                <p className="text-green-600 font-medium">฿{selectedClaim?.claim_amount?.toLocaleString()}</p>
                              </div>
                              <div>
                                <Label>วันที่ส่ง:</Label>
                                <p>{selectedClaim && new Date(selectedClaim.submitted_date).toLocaleDateString('th-TH')}</p>
                              </div>
                              <div>
                                <Label>รหัสอ้างอิง:</Label>
                                <p>{selectedClaim?.external_ref}</p>
                              </div>
                            </div>
                            {selectedClaim?.notes && (
                              <div className="grid gap-2">
                                <Label>หมายเหตุ:</Label>
                                <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded">{selectedClaim.notes}</p>
                              </div>
                            )}
                            <div className="border rounded-lg p-4">
                              <h4 className="font-medium mb-2">ไทม์ไลน์การดำเนินการ</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span>ส่งเคลมแล้ว - {selectedClaim && new Date(selectedClaim.submitted_date).toLocaleDateString('th-TH')}</span>
                                </div>
                                {selectedClaim?.status !== 'submitted' && (
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span>บริษัทประกันรับเรื่องแล้ว</span>
                                  </div>
                                )}
                                {selectedClaim?.status === 'approved' && (
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>อนุมัติการเคลม</span>
                                  </div>
                                )}
                                {selectedClaim?.status === 'rejected' && (
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    <span>ปฏิเสธการเคลม</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsTrackingDialogOpen(false)}>
                            ปิด
                          </Button>
                          <Button>
                            <Download className="h-4 w-4 mr-1" />
                            ดาวน์โหลดเอกสาร
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recentClaims.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">ยังไม่มีเคลมในระบบ</h3>
              <p className="text-sm">เริ่มต้นโดยการสร้างเคลมใหม่</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/staff/claim/history">
              <Button variant="outline">
                ดูเคลมทั้งหมด
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>การดำเนินการด่วน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="w-full flex items-center gap-2 h-16 justify-start" 
              variant="outline"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">สร้างเคลมใหม่</div>
                <div className="text-sm text-gray-500">เริ่มต้นเคลมประกัน</div>
              </div>
            </Button>
            <Link to="/staff/claim/tracking">
              <Button className="w-full flex items-center gap-2 h-16 justify-start" variant="outline">
                <Eye className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-medium">ติดตามสถานะ</div>
                  <div className="text-sm text-gray-500">ตรวจสอบความคืบหน้า</div>
                </div>
              </Button>
            </Link>
            <Link to="/staff/claim/history">
              <Button className="w-full flex items-center gap-2 h-16 justify-start" variant="outline">
                <Clock className="h-6 w-6" />
                <div className="text-left">
                  <div className="font-medium">ประวัติเคลม</div>
                  <div className="text-sm text-gray-500">ดูเคลมทั้งหมด</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffClaimDashboard;
