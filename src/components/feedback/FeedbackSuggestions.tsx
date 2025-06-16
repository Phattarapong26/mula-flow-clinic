
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { httpClient } from '@/utils/httpClient';
import { MessageSquare, TrendingUp, AlertCircle, Filter, CheckCircle, Clock, X } from 'lucide-react';
import DOMPurify from 'dompurify';

interface FeedbackSuggestion {
  id: string;
  customerName: string;
  suggestion: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'reviewed' | 'implemented' | 'rejected';
  createdAt: string;
  branchName: string;
  assignedTo?: string;
}

const FeedbackSuggestions = () => {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<FeedbackSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    loadBranches();
    loadSuggestions();
  }, [filter]);

  const loadBranches = async () => {
    try {
      const response = await httpClient.get<{ data: { id: string; name: string }[] }>('/api/branches');
      setBranches(response.data.data || []);
    } catch (error) {
      console.error('Failed to load branches:', error);
    }
  };

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(
        Object.entries(filter).filter(([_, value]) => value !== 'all')
      );
      const response = await httpClient.get<{ data: FeedbackSuggestion[] }>('/api/feedback/suggestions', { params });
      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถโหลดข้อมูลข้อเสนอแนะได้',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSuggestionStatus = async (id: string, status: FeedbackSuggestion['status']) => {
    try {
      await httpClient.patch(`/api/feedback/suggestions/${id}/status`, { status });
      toast({
        title: 'สำเร็จ',
        description: 'อัปเดตสถานะข้อเสนอแนะเรียบร้อยแล้ว'
      });
      loadSuggestions();
    } catch (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถอัปเดตสถานะได้',
        variant: 'destructive'
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'reviewed': return <Filter className="w-4 h-4" />;
      case 'implemented': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-pulse" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              กำลังโหลดข้อเสนอแนะ
            </h3>
            <p className="text-gray-500">
              กรุณารอสักครู่...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">ข้อเสนอแนะ</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">ทั้งหมด</option>
                <option value="pending">รอดำเนินการ</option>
                <option value="reviewed">ตรวจสอบแล้ว</option>
                <option value="implemented">ดำเนินการแล้ว</option>
                <option value="rejected">ปฏิเสธ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ความสำคัญ</label>
              <select
                value={filter.priority}
                onChange={(e) => setFilter(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">ทั้งหมด</option>
                <option value="high">สูง</option>
                <option value="medium">ปานกลาง</option>
                <option value="low">ต่ำ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
              <select
                value={filter.category}
                onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">ทั้งหมด</option>
                <option value="service">บริการ</option>
                <option value="facility">สิ่งอำนวยความสะดวก</option>
                <option value="staff">พนักงาน</option>
                <option value="pricing">ราคา</option>
                <option value="other">อื่นๆ</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  ไม่พบข้อเสนอแนะ
                </h3>
                <p className="text-gray-500">
                  ไม่มีข้อเสนอแนะที่ตรงกับเงื่อนไขที่เลือก
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          suggestions.map((suggestion) => (
            <Card key={suggestion.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-medium text-gray-900">{suggestion.customerName}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority === 'high' ? 'สูง' : 
                         suggestion.priority === 'medium' ? 'ปานกลาง' : 'ต่ำ'}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{suggestion.category}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{suggestion.branchName}</span>
                    </div>
                    
                    <div 
                      className="text-gray-700 mb-4"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize(suggestion.suggestion) 
                      }}
                    />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(suggestion.status)}
                        <span className="text-sm text-gray-600">
                          {suggestion.status === 'pending' ? 'รอดำเนินการ' :
                           suggestion.status === 'reviewed' ? 'ตรวจสอบแล้ว' :
                           suggestion.status === 'implemented' ? 'ดำเนินการแล้ว' : 'ปฏิเสธ'}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">
                          {new Date(suggestion.createdAt).toLocaleDateString('th-TH')}
                        </span>
                      </div>

                      {suggestion.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateSuggestionStatus(suggestion.id, 'reviewed')}
                          >
                            ตรวจสอบ
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => updateSuggestionStatus(suggestion.id, 'implemented')}
                          >
                            ดำเนินการ
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateSuggestionStatus(suggestion.id, 'rejected')}
                          >
                            ปฏิเสธ
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackSuggestions;
