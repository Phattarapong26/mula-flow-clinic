import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, TrendingDown, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { branchService } from '@/services/branchService';
import { useToast } from '@/hooks/use-toast';

interface QueueData {
  branch: string;
  avgWaitTime: number;
  dailyQueues: number;
  peakHour: string;
  satisfaction: number;
}

const BranchQueueAvg = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queueData, setQueueData] = useState<QueueData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: branches } = await branchService.getBranches();
        const queueStats = await Promise.all(
          branches.map(async (branch) => {
            const stats = await branchService.getQueueStats(branch.id);
            return {
              branch: branch.name,
              avgWaitTime: stats.average_wait_time,
              dailyQueues: stats.daily_queue_count,
              peakHour: stats.peak_hour,
              satisfaction: stats.customer_satisfaction
            };
          })
        );
        setQueueData(queueStats);
      } catch (err) {
        setError('Failed to load queue data');
        toast({
          title: 'Error',
          description: 'Failed to load queue data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!queueData.length) {
    return <div>No data available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(queueData.reduce((sum, data) => sum + data.avgWaitTime, 0) / queueData.length)} min
            </div>
            <p className="text-xs text-muted-foreground">
              across all branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Daily Queues</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queueData.reduce((sum, data) => sum + data.dailyQueues, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              across all branches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queueData[0]?.peakHour || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              most common peak time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(queueData.reduce((sum, data) => sum + data.satisfaction, 0) / queueData.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              average rating
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wait Time by Branch</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={queueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgWaitTime" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Queue Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={queueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branch" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dailyQueues" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BranchQueueAvg;
