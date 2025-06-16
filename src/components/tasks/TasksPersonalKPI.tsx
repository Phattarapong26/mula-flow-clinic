
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Users, MessageCircle, TrendingUp } from 'lucide-react';

const TasksPersonalKPI = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">งาน KPI รายคน</h1>
      <p className="text-gray-600">% สำเร็จ, จำนวนลูกค้า follow, feedback ที่ตามแล้วดีขึ้น</p>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              KPI พนักงาน - เดือนนี้
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Staff 1 */}
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">นพ.สมชาย รักษาดี</h3>
                  <Badge className="bg-green-100 text-green-800">เป้าหมายผ่าน</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">% งานสำเร็จ</span>
                    </div>
                    <Progress value={92} className="mb-1" />
                    <div className="text-sm text-gray-600">92% (เป้า 85%)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">ลูกค้า Follow</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">45</div>
                    <div className="text-sm text-gray-600">คน (เป้า 40)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Feedback ดีขึ้น</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">38</div>
                    <div className="text-sm text-gray-600">จาก 45 คน (84%)</div>
                  </div>
                </div>
              </div>

              {/* Staff 2 */}
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">นพ.หญิง วิภาวดี ใสสะอาด</h3>
                  <Badge className="bg-yellow-100 text-yellow-800">ใกล้เป้าหมาย</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">% งานสำเร็จ</span>
                    </div>
                    <Progress value={78} className="mb-1" />
                    <div className="text-sm text-gray-600">78% (เป้า 85%)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">ลูกค้า Follow</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">35</div>
                    <div className="text-sm text-gray-600">คน (เป้า 40)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Feedback ดีขึ้น</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">28</div>
                    <div className="text-sm text-gray-600">จาก 35 คน (80%)</div>
                  </div>
                </div>
              </div>

              {/* Staff 3 */}
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">นาง สมหญิง ดูแลดี</h3>
                  <Badge className="bg-green-100 text-green-800">เป้าหมายผ่าน</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">% งานสำเร็จ</span>
                    </div>
                    <Progress value={95} className="mb-1" />
                    <div className="text-sm text-gray-600">95% (เป้า 85%)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">ลูกค้า Follow</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">52</div>
                    <div className="text-sm text-gray-600">คน (เป้า 40)</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Feedback ดีขึ้น</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">48</div>
                    <div className="text-sm text-gray-600">จาก 52 คน (92%)</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TasksPersonalKPI;
