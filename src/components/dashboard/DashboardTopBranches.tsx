
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Users, DollarSign } from 'lucide-react';

export const DashboardTopBranches = () => {
  // Mock data for top branches
  const topBranches = [
    {
      id: '1',
      name: 'สาขาสยาม',
      revenue: 450000,
      growth: 15.2,
      patients: 234,
      efficiency: 92
    },
    {
      id: '2', 
      name: 'สาขาอโศก',
      revenue: 380000,
      growth: 12.8,
      patients: 198,
      efficiency: 88
    },
    {
      id: '3',
      name: 'สาขาชิดลม',
      revenue: 320000,
      growth: 8.5,
      patients: 156,
      efficiency: 85
    },
    {
      id: '4',
      name: 'สาขาเอกมัย',
      revenue: 290000,
      growth: 6.2,
      patients: 142,
      efficiency: 82
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          สาขาที่มีประสิทธิภาพสูงสุด
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topBranches.map((branch, index) => (
            <div key={branch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{branch.name}</h4>
                  <p className="text-sm text-gray-600">
                    ประสิทธิภาพ {branch.efficiency}%
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-semibold">
                        ฿{branch.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Users className="h-3 w-3" />
                      <span>{branch.patients} คน</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-sm font-semibold">
                      +{branch.growth}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              ดูรายละเอียดทุกสาขา →
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
