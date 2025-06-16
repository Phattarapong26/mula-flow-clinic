import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { httpClient } from '@/utils/httpClient';
import { Star, TrendingUp, MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';

interface FeedbackRating {
  id: string;
  customerName: string;
  serviceName: string;
  rating: number;
  comment: string;
  createdAt: string;
  branchName: string;
}

interface RatingStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { rating: number; count: number }[];
}

const FeedbackRatings = () => {
  const { toast } = useToast();
  const [ratings, setRatings] = useState<FeedbackRating[]>([]);
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [branches, setBranches] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    loadBranches();
    loadRatings();
    loadStats();
  }, [selectedBranch]);

  const loadBranches = async () => {
    try {
      const response = await httpClient.get<{ id: string; name: string }[]>('/api/branches');
      // Fix: Handle direct array response properly
      setBranches(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to load branches:', error);
    }
  };

  const loadRatings = async () => {
    try {
      setLoading(true);
      const params = selectedBranch !== 'all' ? { branchId: selectedBranch } : {};
      const response = await httpClient.get<FeedbackRating[]>('/api/feedback/ratings', { params });
      // Fix: Handle direct array response properly
      setRatings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to load ratings:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถโหลดข้อมูลคะแนนรีวิวได้',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const params = selectedBranch !== 'all' ? { branchId: selectedBranch } : {};
      const response = await httpClient.get<RatingStats>('/api/feedback/stats', { params });
      // Fix: Handle direct object response properly
      setStats(response.data || response);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Star className="mx-auto h-12 w-12 text-gray-400 mb-4 animate-pulse" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              กำลังโหลดข้อมูลคะแนนรีวิว
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
        <h1 className="text-3xl font-bold text-gray-900">คะแนนรีวิว</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">ทุกสาขา</option>
            {branches.map(branch => (
              <option key={branch.id} value={branch.id}>{branch.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
                  <div className="flex items-center mt-1">
                    <span className="text-2xl font-bold text-yellow-600">
                      {stats.averageRating.toFixed(1)}
                    </span>
                    <div className="flex ml-2">
                      {renderStars(Math.round(stats.averageRating))}
                    </div>
                  </div>
                </div>
                <Star className="h-12 w-12 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">จำนวนรีวิว</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {stats.totalReviews.toLocaleString()}
                  </p>
                </div>
                <MessageSquare className="h-12 w-12 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">ความพึงพอใจ</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {((stats.averageRating / 5) * 100).toFixed(0)}%
                  </p>
                </div>
                <ThumbsUp className="h-12 w-12 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rating Distribution */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>การกระจายคะแนน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map(rating => {
                const data = stats.ratingDistribution.find(d => d.rating === rating);
                const count = data?.count || 0;
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>รีวิวล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          {ratings.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                ไม่พบข้อมูลรีวิว
              </h3>
              <p className="text-gray-500">
                ยังไม่มีลูกค้าให้คะแนนรีวิวสำหรับช่วงเวลานี้
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {ratings.slice(0, 10).map((rating) => (
                <div key={rating.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{rating.customerName}</h4>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{rating.serviceName}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{rating.branchName}</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {renderStars(rating.rating)}
                        </div>
                        <span className="text-sm text-gray-600">({rating.rating}/5)</span>
                      </div>
                      {rating.comment && (
                        <p className="text-gray-700 text-sm">{rating.comment}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(rating.createdAt).toLocaleDateString('th-TH')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackRatings;
