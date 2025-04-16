import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./pages/LoginForm";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./pages/DashboardLayout";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route 
            path="/*" 
            element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
            } 
          />
          <Route path="/profile" element={
            <DashboardLayout>
              <ProfileSettings/>
            </DashboardLayout>
          }/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;