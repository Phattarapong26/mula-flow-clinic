import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, MapPin, Users, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { branchService } from '@/services/branchService';
import DOMPurify from 'dompurify';

interface BranchAnalysis {
  id: string;
  branch: string;
  status: 'excellent' | 'good' | 'average' | 'concern';
  revenue: number;
  profitMargin: number;
  customerGrowth: number;
  recommendation: 'expand' | 'maintain' | 'improve' | 'evaluate';
  reasons: string[];
  action: string;
  priority: 'high' | 'medium' | 'low';
}

interface MarketAnalysis {
  area: string;
  marketSize: string;
  competition: string;
  potential: string;
  demographics: string;
  recommendation: string;
  status: 'recommended' | 'pending' | 'not-recommended';
}

const BranchRecommendations = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [branchAnalysis, setBranchAnalysis] = useState<BranchAnalysis[]>([]);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis[]>([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const [branchResponse, marketResponse] = await Promise.all([
        branchService.getBranchAnalysis(),
        branchService.getMarketAnalysis()
      ]);
      setBranchAnalysis(branchResponse.data);
      setMarketAnalysis(marketResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch recommendations data');
      toast({
        variant: "destructive",
        description: "Failed to fetch recommendations data. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'concern': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'expand': return 'bg-green-500';
      case 'maintain': return 'bg-blue-500';
      case 'improve': return 'bg-yellow-500';
      case 'evaluate': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarketStatusColor = (status: string) => {
    switch (status) {
      case 'recommended': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'not-recommended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMarketIcon = (status: string) => {
    switch (status) {
      case 'recommended': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'not-recommended': return <TrendingDown className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Recommendations</h3>
        <p className="text-gray-600">{error}</p>
        <Button onClick={fetchRecommendations} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (branchAnalysis.length === 0 && marketAnalysis.length === 0) {
    return (
      <div className="text-center py-8">
        <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recommendations Available</h3>
        <p className="text-gray-600">There are no branch or market recommendations available at this time.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Branch Recommendations</h1>
        <p className="text-gray-600 mt-1">Strategic analysis and recommendations for branches</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Recommended for Expansion</p>
                <p className="text-2xl font-bold">{branchAnalysis.filter(b => b.recommendation === 'expand').length}</p>
                <p className="text-green-100 text-xs">Branches</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Maintain Current Level</p>
                <p className="text-2xl font-bold">{branchAnalysis.filter(b => b.recommendation === 'maintain').length}</p>
                <p className="text-blue-100 text-xs">Branches</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Needs Improvement</p>
                <p className="text-2xl font-bold">{branchAnalysis.filter(b => b.recommendation === 'improve').length}</p>
                <p className="text-yellow-100 text-xs">Branches</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Consider Closure</p>
                <p className="text-2xl font-bold">{branchAnalysis.filter(b => b.recommendation === 'evaluate').length}</p>
                <p className="text-red-100 text-xs">Branches</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {branchAnalysis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Current Branch Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branchAnalysis.map((branch) => (
                <div key={branch.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{DOMPurify.sanitize(branch.branch)}</h3>
                      <Badge className={getStatusColor(branch.status)}>
                        {branch.status === 'excellent' ? 'Excellent' :
                         branch.status === 'good' ? 'Good' :
                         branch.status === 'average' ? 'Average' : 'Needs Attention'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Priority</div>
                      <Badge variant={branch.priority === 'high' ? 'destructive' : 'secondary'}>
                        {branch.priority === 'high' ? 'High' : 'Medium'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Revenue</div>
                      <div className="text-lg font-bold">฿{branch.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Profit Margin</div>
                      <div className="text-lg font-bold">{branch.profitMargin}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Customer Growth</div>
                      <div className="text-lg font-bold">+{branch.customerGrowth}%</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Reasons:</div>
                    <div className="flex flex-wrap gap-2">
                      {branch.reasons.map((reason, idx) => (
                        <Badge key={idx} variant="outline">{DOMPurify.sanitize(reason)}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-700">Recommendation:</div>
                      <div className="text-base font-medium">{DOMPurify.sanitize(branch.action)}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${getRecommendationColor(branch.recommendation)}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {marketAnalysis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Market Analysis for New Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketAnalysis.map((market, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">{DOMPurify.sanitize(market.area)}</h3>
                    <Badge className={getMarketStatusColor(market.status)}>
                      <div className="flex items-center gap-1">
                        {getMarketIcon(market.status)}
                        {market.status === 'recommended' ? 'Recommended' :
                         market.status === 'pending' ? 'Under Review' : 'Not Recommended'}
                      </div>
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Size:</span>
                      <span className="font-medium">{DOMPurify.sanitize(market.marketSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Competition:</span>
                      <span className="font-medium">{DOMPurify.sanitize(market.competition)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Potential:</span>
                      <span className="font-medium">{DOMPurify.sanitize(market.potential)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Demographics:</span>
                      <span className="font-medium">{DOMPurify.sanitize(market.demographics)}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="text-sm font-medium text-gray-700">Recommendation:</div>
                    <div className="text-sm">{DOMPurify.sanitize(market.recommendation)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BranchRecommendations;
