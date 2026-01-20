import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import LeadsPage from "@/pages/LeadsPage";
import LeadDetailsPage from "@/pages/LeadDetailsPage";
import CreateLeadPage from "@/pages/CreateLeadPage";
import UsersPage from "@/pages/UsersPage";
import PerformancePage from "@/pages/PerformancePage";
import ReportsPage from "@/pages/ReportsPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import NotFound from "@/pages/NotFound";
import CalendarPage from "./pages/CalanderPage";
import PropertyPage from "./pages/Properties";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected Routes - All Roles */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leads/:id"
              element={
                <ProtectedRoute>
                  <LeadDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Admin & Supervisor */}
            <Route
              path="/leads"
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'sales_supervisor']}>
                  <LeadsPage />
                </ProtectedRoute>
              }
            />

               <Route
              path="/calendar"
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'sales_supervisor']}>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />

                <Route
              path="/properties"
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'sales_supervisor']}>
                  <PropertyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leads/new"
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'sales_supervisor']}>
                  <CreateLeadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/performance"
              element={
                <ProtectedRoute allowedRoles={['super_admin', 'sales_supervisor']}>
                  <PerformancePage />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Admin Only */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes - Sales Agent */}
            <Route
              path="/my-leads"
              element={
                <ProtectedRoute allowedRoles={['sales_agent']}>
                  <LeadsPage myLeadsOnly />
                </ProtectedRoute>
              }
            />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
