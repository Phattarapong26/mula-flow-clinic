
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { appointmentData } from '@/data/mockData';

const chartConfig = {
  booked: { label: 'จองแล้ว', color: '#3b82f6' },
  completed: { label: 'เสร็จสิ้น', color: '#22c55e' },
  cancelled: { label: 'ยกเลิก', color: '#ef4444' },
  noShow: { label: 'ไม่มาตามนัด', color: '#f59e0b' },
};

const AppointmentTrendChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📅 แนวโน้มการนัดหมาย
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={appointmentData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="booked" stroke="var(--color-booked)" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="var(--color-completed)" strokeWidth={2} />
              <Line type="monotone" dataKey="cancelled" stroke="var(--color-cancelled)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentTrendChart;
