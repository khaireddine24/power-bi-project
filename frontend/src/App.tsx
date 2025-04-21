import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./pages/DashboardLayout";
import ProfileSettings from "./pages/ProfileSettings";
import AdminLayout from "./pages/AdminLayout";
import UserManagementPage from "./pages/UserManagementPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
            } 
          />
          <Route path="/dashboard" element={ 
            <DashboardLayout>
                <Dashboard />
              </DashboardLayout>} 
          />
          
          {/* User routes */}
          <Route path="/" element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <DashboardLayout>
                <ProfileSettings />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<UserManagementPage />} />
            <Route path="users" element={<UserManagementPage />} />
          </Route>
          
          {/* Catch all - redirect to dashboard or login */}
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;