import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManagement';
import ActivityManagement from './pages/ActivityManagement';
import BookingsPage from './pages/BookingsPage'; 
import PaymentsPage from './pages/PaymentsPage';
import QRScanPage from './pages/QRScanPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <AuthProvider>
      {/* ADD TOASTER FOR NOTIFICATIONS */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes with Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['superadmin', 'manager', 'accountant', 'security']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manager-dashboard" element={<Dashboard />} />
            <Route path="accountant-dashboard" element={<Dashboard />} />
            <Route path="security-dashboard" element={<Dashboard />} />

            {/* User Management - Super Admin Only */}
            <Route
              path="users"
              element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            {/* Activity Management - Super Admin & Manager */}
            <Route
              path="activities"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'manager', 'accountant']}>
                  <ActivityManagement />
                </ProtectedRoute>
              }
            />

            {/*  BOOKINGS PAGE  */}
            <Route 
              path="bookings" 
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'manager','accountant']}>
                  <BookingsPage />
                </ProtectedRoute>
              } 
            />
            {/*  PAYMENTS MANAGEMENT */}
            <Route
              path="payments"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'manager', 'accountant']}>
                  <PaymentsPage />
                </ProtectedRoute>
              }
            />

             {/* QR SCANNER  */}
            <Route 
              path="scan" 
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'manager', 'security']}>
                  <QRScanPage />
                </ProtectedRoute>
              } 
            />
            {/* SUPPORT MANAGEMENT - NEW */}
            <Route
              path="support"
              element={
                <ProtectedRoute allowedRoles={['superadmin', 'manager']}>
                  <SupportPage />
                </ProtectedRoute>
              }
            />
            {/* Other placeholder routes */}
            <Route 
              path="reports" 
              element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold">Reports - Coming Soon</h2>
                </div>
              } 
            />
            <Route 
              path="settings" 
              element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold">Settings - Coming Soon</h2>
                </div>
              } 
            />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />

          {/* Catch all - 404 */}
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;