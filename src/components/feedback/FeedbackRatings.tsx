
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, TrendingDown, MessageSquare, ThumbsUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useApi from '@/hooks/useApi';

interface RatingStats {
  averageRating: number;
  totalRatings: number;
  ratingsBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  trend: number;
}

const FeedbackRatings = () => {
  const [stats, setStats] = useState<RatingStats>({
    averageRating: 0,
    totalRatings: 0,
    ratingsBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    trend: 0
  });
  const { toast } = useToast();

  const {
    data: ratingsData,
    loading,
    error,
    get: getRatings
  } = useApi<RatingStats>();

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await getRatings('/api/feedback/ratings');
      if (response && response.data) {
        setStats(response.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch rating statistics. Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading ratings...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Ratings</h3>
        <p className="text-gray-600 mb-4">Failed to load rating statistics</p>
        <Button onClick={fetchRatings}>Try Again</Button>
      </div>
    );
  }

  const getRatingPercentage = (rating: number) => {
    return stats.totalRatings > 0 ? (stats.ratingsBreakdown[rating as keyof typeof stats.ratingsBreakdown] / stats.totalRatings) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customer Ratings</h1>
          <p className="text-gray-600">Monitor customer satisfaction and feedback ratings</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.averageRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Ratings</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalRatings}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Positive Ratings</p>
                <p className="text-2xl font-bold text-green-600">
                  {((stats.ratingsBreakdown[4] + stats.ratingsBreakdown[5]) / stats.totalRatings * 100).toFixed(1)}%
                </p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trend</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-purple-600">{Math.abs(stats.trend).toFixed(1)}%</p>
                  {stats.trend >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-20">
                  <span className="text-sm font-medium">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-16 text-right">
                  {stats.ratingsBreakdown[rating as keyof typeof stats.ratingsBreakdown]} ({getRatingPercentage(rating).toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackRatings;
