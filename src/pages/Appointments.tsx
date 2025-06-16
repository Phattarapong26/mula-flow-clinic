
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Users,
  Plus
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PatientList from '@/components/appointments/PatientList';
import AppointmentList from '@/components/appointments/AppointmentList';
import CreateAppointmentForm from '@/components/appointments/CreateAppointmentForm';
import DoctorUsage from '@/components/appointments/DoctorUsage';
import NoShowRate from '@/components/appointments/NoShowRate';
import AppointmentRevenue from '@/components/appointments/AppointmentRevenue';
import TopDoctors from '@/components/appointments/TopDoctors';
import QueueAnalysis from '@/components/appointments/QueueAnalysis';

const Appointments = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Routes>
        <Route path="/doctor-usage" element={<DoctorUsage />} />
        <Route path="/no-show" element={<NoShowRate />} />
        <Route path="/revenue" element={<AppointmentRevenue />} />
        <Route path="/top-doctors" element={<TopDoctors />} />
        <Route path="/queue-analysis" element={<QueueAnalysis />} />
        <Route path="/create" element={<CreateAppointmentForm />} />
        <Route index element={
          <div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ประสิทธิภาพการจอง</h1>
              <p className="text-gray-600 mt-1">จัดการนัดหมายผู้ป่วยและข้อมูลการรักษา</p>
            </div>

            <Tabs defaultValue="appointments" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-fit grid-cols-2">
                  <TabsTrigger value="appointments" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    นัดหมาย
                  </TabsTrigger>
                  <TabsTrigger value="patients" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    ผู้ป่วย
                  </TabsTrigger>
                </TabsList>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => navigate('/appointments/create')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  นัดหมายใหม่
                </Button>
              </div>

              <TabsContent value="appointments">
                <AppointmentList />
              </TabsContent>

              <TabsContent value="patients">
                <PatientList />
              </TabsContent>
            </Tabs>
          </div>
        } />
      </Routes>
    </div>
  );
};

export default Appointments;
