
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { feedbacks } from '@/data/feedbackMockData';

const FeedbackAll = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">รอดำเนินการ</Badge>;
      case 'reviewed':
        return <Badge variant="default" className="bg-green-600">ตอบกลับแล้ว</Badge>;
      case 'resolved':
        return <Badge variant="secondary">แก้ไขแล้ว</Badge>;
      default:
        return <Badge variant="secondary">ไม่ระบุ</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">ความคิดเห็นทั้งหมด</h1>
        <div className="flex gap-2">
          <Button variant="outline">กรองตามสาขา</Button>
          <Button variant="outline">กรองตามคะแนน</Button>
        </div>
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">{feedback.customerName}</CardTitle>
                    <p className="text-sm text-gray-600">{feedback.branchName} • {feedback.serviceType}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
                {getStatusBadge(feedback.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">ความคิดเห็น</span>
                </div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{feedback.comment}</p>
              </div>
              
              {feedback.response && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">การตอบกลับ</span>
                  </div>
                  <p className="text-gray-700 bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                    {feedback.response}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    ตอบกลับโดย {feedback.respondedBy} • {new Date(feedback.respondedAt!).toLocaleDateString('th-TH')}
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {new Date(feedback.createdAt).toLocaleDateString('th-TH')}
                </div>
                {feedback.status === 'pending' && (
                  <Button size="sm">ตอบกลับ</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedbackAll;
