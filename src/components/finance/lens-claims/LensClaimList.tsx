
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, XCircle, FileText } from 'lucide-react';

interface LensClaimListProps {
  claims: any[];
  onUpdate: (claimId: string) => void;
}

const LensClaimList: React.FC<LensClaimListProps> = ({ claims, onUpdate }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'อนุมัติแล้ว': return 'bg-green-100 text-green-800';
      case 'รอการอนุมัติ': return 'bg-yellow-100 text-yellow-800';
      case 'ปฏิเสธ': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'อนุมัติแล้ว': return <CheckCircle2 className="h-4 w-4" />;
      case 'รอการอนุมัติ': return <Clock className="h-4 w-4" />;
      case 'ปฏิเสธ': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>รายการเคลมเลนส์</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(claim.status)}
                  <div>
                    <h3 className="font-medium text-lg">{claim.id}</h3>
                    <p className="text-gray-600">{claim.patientName}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(claim.status)}>
                  {claim.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">ประเภทเลนส์:</span>
                  <p className="font-medium">{claim.lensType}</p>
                </div>
                <div>
                  <span className="text-gray-500">จำนวนเงิน:</span>
                  <p className="font-medium">₿{claim.claimAmount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">วันที่ส่งเคลม:</span>
                  <p className="font-medium">{new Date(claim.submitDate).toLocaleDateString('th-TH')}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">ดูรายละเอียด</Button>
                  <Button size="sm" onClick={() => onUpdate(claim.id)}>อัปเดต</Button>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-gray-600">{claim.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LensClaimList;
