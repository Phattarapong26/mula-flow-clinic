import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { dashboardService, DoctorPerformanceData } from '@/services/dashboard';
import { useToast } from '@/components/ui/use-toast';

export function DoctorPerformanceTable() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<DoctorPerformanceData>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getDoctorPerformance();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctor performance data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch doctor performance data. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!doctors.length) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctor Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead className="text-right">Patients</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Appointments</TableHead>
              <TableHead className="text-right">Satisfaction</TableHead>
              <TableHead className="text-right">Utilization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell className="text-right">{doctor.patients}</TableCell>
                <TableCell className="text-right">฿{doctor.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">{doctor.appointments}</TableCell>
                <TableCell className="text-right">{doctor.satisfaction}%</TableCell>
                <TableCell className="text-right">{doctor.utilization}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
