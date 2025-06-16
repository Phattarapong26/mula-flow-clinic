
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { servicePerformance } from '@/data/mockData';

const chartConfig = {
  revenue: { label: 'รายได้', color: '#8b5cf6' },
  bookings: { label: 'การจอง', color: '#06b6d4' },
};

const ServicePerformanceChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🩺 ประสิทธิภาพบริการ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={servicePerformance} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ServicePerformanceChart;
