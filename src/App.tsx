
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import ErrorBoundary from '@/components/security/ErrorBoundary';
import RouteGuard from '@/components/security/RouteGuard';

// Pages
import Index from '@/pages/Index';
import MainMenu from '@/pages/MainMenu';
import StaffMenu from '@/pages/StaffMenu';
import NotFound from '@/pages/NotFound';

// Admin Pages
import Dashboard from '@/pages/Dashboard';
import Appointments from '@/pages/Appointments';
import HrDashboard from '@/pages/HRDashboard';
import Branch from '@/pages/Branch';
import Feedback from '@/pages/Feedback';
import Alerts from '@/pages/Alerts';
import Finance from '@/pages/Finance';
import Analytics from '@/pages/Analytics';
import Tasks from '@/pages/Tasks';
import Expenses from '@/pages/Expenses';
import Inventory from '@/pages/Inventory';

// Staff Pages
import StaffPatients from '@/pages/StaffPatients';
import StaffAppointments from '@/pages/StaffAppointments';
import StaffTreatments from '@/pages/StaffTreatments';
import StaffInvoicing from '@/pages/StaffInvoicing';
import StaffFollowup from '@/pages/StaffFollowup';
import StaffChat from '@/pages/StaffChat';
import StaffTasks from '@/pages/StaffTasks';
import StaffProduct from '@/pages/StaffProduct';
import StaffClaim from '@/pages/StaffClaim';

function App() {
  const renderWithSidebar = (Component: React.ComponentType, requiredRole?: string, requiredPermission?: string) => (
    <RouteGuard requiredRole={requiredRole} requiredPermission={requiredPermission}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 overflow-auto">
            <Component />
          </main>
        </div>
      </SidebarProvider>
    </RouteGuard>
  );

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Index />} />
              <Route path="/" element={
                <RouteGuard>
                  <MainMenu />
                </RouteGuard>
              } />
              <Route path="/main-menu" element={
                <RouteGuard requiredRole="ceo">
                  <MainMenu />
                </RouteGuard>
              } />
              <Route path="/staff-menu" element={
                <RouteGuard requiredRole="staff">
                  <StaffMenu />
                </RouteGuard>
              } />
              
              {/* Admin Routes - CEO only */}
              <Route path="/dashboard/*" element={renderWithSidebar(Dashboard, 'ceo', 'admin:all')} />
              <Route path="/appointments/*" element={renderWithSidebar(Appointments, 'ceo', 'admin:all')} />
              <Route path="/hr-dashboard/*" element={renderWithSidebar(HrDashboard, 'ceo', 'admin:all')} />
              <Route path="/branch/*" element={renderWithSidebar(Branch, 'ceo', 'admin:all')} />
              <Route path="/feedback/*" element={renderWithSidebar(Feedback, 'ceo', 'admin:all')} />
              <Route path="/alerts/*" element={renderWithSidebar(Alerts, 'ceo', 'admin:all')} />
              <Route path="/finance/*" element={renderWithSidebar(Finance, 'ceo', 'admin:all')} />
              <Route path="/analytics/*" element={renderWithSidebar(Analytics, 'ceo', 'admin:all')} />
              <Route path="/tasks/*" element={renderWithSidebar(Tasks, 'ceo', 'admin:all')} />
              <Route path="/expenses/*" element={renderWithSidebar(Expenses, 'ceo', 'admin:all')} />
              <Route path="/inventory/*" element={renderWithSidebar(Inventory, 'ceo', 'admin:all')} />
              
              {/* Staff Routes - Staff only */}
              <Route path="/staff/patients/*" element={renderWithSidebar(StaffPatients, 'staff', 'read:patients')} />
              <Route path="/staff/appointments/*" element={renderWithSidebar(StaffAppointments, 'staff', 'write:appointments')} />
              <Route path="/staff/treatments/*" element={renderWithSidebar(StaffTreatments, 'staff', 'read:patients')} />
              <Route path="/staff/invoicing/*" element={renderWithSidebar(StaffInvoicing, 'staff', 'read:invoices')} />
              <Route path="/staff/followup/*" element={renderWithSidebar(StaffFollowup, 'staff', 'read:patients')} />
              <Route path="/staff/chat/*" element={renderWithSidebar(StaffChat, 'staff', 'read:patients')} />
              <Route path="/staff/tasks/*" element={renderWithSidebar(StaffTasks, 'staff', 'read:patients')} />
              <Route path="/staff/product/*" element={renderWithSidebar(StaffProduct, 'staff', 'read:patients')} />
              <Route path="/staff/claim/*" element={renderWithSidebar(StaffClaim, 'staff', 'read:patients')} />
              
              {/* Unauthorized Route */}
              <Route path="/unauthorized" element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
                    <p className="text-gray-600">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
                  </div>
                </div>
              } />
              
              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
