import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, MapPin, Loader2, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockAppointments, MockAppointment } from '@/data/staffMockData';
import DOMPurify from 'dompurify';
import { z } from 'zod';

// Use MockAppointment as the main interface
interface Appointment extends MockAppointment {}

const appointmentSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().min(10, 'Valid phone number is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  service: z.string().min(1, 'Service is required'),
  branch: z.string().min(1, 'Branch is required'),
  notes: z.string().optional()
});

const StaffAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Simulate API call - in real app this would be: await appointmentService.getStaffAppointments(selectedDate);
      const filteredAppointments = mockAppointments.filter(apt => 
        apt.date === selectedDate || apt.appointment_date === selectedDate
      );
      setAppointments(filteredAppointments);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      toast({
        variant: "destructive",
        description: "Failed to fetch appointments. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: Appointment['status']) => {
    try {
      // Simulate API call - in real app: await appointmentService.updateAppointmentStatus(appointmentId, newStatus);
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ));
      toast({
        description: "Appointment status updated successfully"
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to update appointment status"
      });
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Appointments</h3>
        <p className="text-gray-600">{error}</p>
        <Button onClick={fetchAppointments} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8">
        <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Appointments Found</h3>
        <p className="text-gray-600">There are no appointments scheduled for this date.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Appointments</h1>
          <p className="text-gray-600">Manage and track patient appointments</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
          <Button onClick={() => window.location.href = '/staff/appointments/create'}>
            New Appointment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <User className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">
                    {DOMPurify.sanitize(appointment.customerName)}
                  </CardTitle>
                </div>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-base font-medium">
                      {DOMPurify.sanitize(appointment.customerPhone)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="text-base font-medium">
                      {DOMPurify.sanitize(appointment.service)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="text-base font-medium">
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="text-base font-medium">{appointment.time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Branch</p>
                  <p className="text-base font-medium">
                    {DOMPurify.sanitize(appointment.branch)}
                  </p>
                </div>

                {appointment.notes && (
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-base font-medium">
                      {DOMPurify.sanitize(appointment.notes)}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  {appointment.status === 'scheduled' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                      >
                        Mark Complete
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(appointment.id, 'no_show')}
                      >
                        No Show
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StaffAppointments;
