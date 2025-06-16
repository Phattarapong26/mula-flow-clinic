
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter } from 'lucide-react';

import LensClaimStats from './lens-claims/LensClaimStats';
import LensClaimForm from './lens-claims/LensClaimForm';
import LensClaimList from './lens-claims/LensClaimList';

const LensClaims = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const claims = [
    {
      id: 'LC001',
      patientName: 'นายสมชาย ใจดี',
      lensType: 'Progressive',
      claimAmount: 15000,
      status: 'รอการอนุมัติ',
      submitDate: '2025-06-14',
      description: 'เลนส์โปรเกรสซีฟ มีปัญหาการมองเห็น'
    },
    {
      id: 'LC002',
      patientName: 'นางสาวมานี รักสวย',
      lensType: 'Single Vision',
      claimAmount: 8000,
      status: 'อนุมัติแล้ว',
      submitDate: '2025-06-13',
      description: 'เลนส์เดี่ยว เปลี่ยนเนื่องจากกรอบหัก'
    },
    {
      id: 'LC003',
      patientName: 'นายประเสริฐ มั่งมี',
      lensType: 'Bifocal',
      claimAmount: 12000,
      status: 'ปฏิเสธ',
      submitDate: '2025-06-12',
      description: 'เลนส์ไบโฟกัล ไม่อยู่ในเงื่อนไขการประกัน'
    }
  ];

  const filteredClaims = claims.filter(claim =>
    claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClaim = (formData: any) => {
    console.log('Creating new lens claim:', formData);
    // Add logic to handle form submission
  };

  const handleUpdateClaim = (claimId: string) => {
    console.log('Updating claim:', claimId);
    // Add logic to handle claim updates
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">เคลมเลนส์</h1>
          <p className="text-gray-600">จัดการการเคลมเลนส์และการประกันภัย</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          สร้างเคลมใหม่
        </Button>
      </div>

      <LensClaimStats />

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาเคลม..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              กรอง
            </Button>
          </div>
        </CardContent>
      </Card>

      <LensClaimList claims={filteredClaims} onUpdate={handleUpdateClaim} />

      {showCreateForm && (
        <LensClaimForm 
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateClaim}
        />
      )}
    </div>
  );
};

export default LensClaims;
