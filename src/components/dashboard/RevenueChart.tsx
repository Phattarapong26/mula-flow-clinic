
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { revenueData } from '@/data/mockData';

const chartConfig = {
  revenue: { label: 'รายได้', color: '#22c55e' },
  expenses: { label: 'ค่าใช้จ่าย', color: '#ef4444' },
  profit: { label: 'กำไร', color: '#3b82f6' },
};

const RevenueChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💰 รายได้และกำไรรายเดือน
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
              <Bar dataKey="expenses" fill="var(--color-expenses)" />
              <Bar dataKey="profit" fill="var(--color-profit)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
