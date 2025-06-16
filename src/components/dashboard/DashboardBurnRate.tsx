import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { dashboardService, burnRateSchema } from '@/services/dashboard';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, TrendingDown, TrendingUp, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DOMPurify from 'dompurify';

type BurnRateData = typeof burnRateSchema._type;

export function DashboardBurnRate() {
  const [loading, setLoading] = useState(true);
  const [burnRateData, setBurnRateData] = useState<BurnRateData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBurnRateData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getBurnRate();
        setBurnRateData(data);
      } catch (error) {
        console.error('Error fetching burn rate data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch burn rate data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBurnRateData();
  }, [toast]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Burn Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!burnRateData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Burn Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <p className="text-muted-foreground">No burn rate data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getBurnRateStatus = (burnRate: number) => {
    if (burnRate > 0) {
      return {
        title: 'High Burn Rate',
        description: 'Your burn rate is higher than expected. Consider implementing cost-saving measures.',
        variant: 'destructive' as const,
        icon: TrendingUp,
      };
    }
    return {
      title: 'Healthy Burn Rate',
      description: 'Your burn rate is within acceptable limits.',
      variant: 'default' as const,
      icon: TrendingDown,
    };
  };

  const status = getBurnRateStatus(burnRateData.currentBurnRate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Burn Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Burn Rate</p>
                <p className="text-2xl font-bold">{formatCurrency(burnRateData.currentBurnRate)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Average</p>
                <p className="text-2xl font-bold">{formatCurrency(burnRateData.monthlyAverage)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Projected</p>
                <p className="text-2xl font-bold">{formatCurrency(burnRateData.projectedBurnRate)}</p>
              </div>
            </div>
          </div>

          {/* Status Alert */}
          <Alert variant={status.variant}>
            <status.icon className="h-4 w-4" />
            <AlertTitle>{status.title}</AlertTitle>
            <AlertDescription>{status.description}</AlertDescription>
          </Alert>

          {/* Burn Rate Chart */}
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={burnRateData.history}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="burnRate"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Analysis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {burnRateData.analysis.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground" 
                     dangerouslySetInnerHTML={{ 
                       __html: DOMPurify.sanitize(item.description) 
                     }} 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {burnRateData.recommendations.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground" 
                     dangerouslySetInnerHTML={{ 
                       __html: DOMPurify.sanitize(item.description) 
                     }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
