import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/sign-in/index";
import HomePage from "@/pages/home/index";
import TermsPage from "@/pages/terms";
import FloatingActions from "@/components/floating-actions";
import PolicyPage from "@/pages/policy";
import AuthProvider from "@/context/AuthContext";
import Protected from "@/lib/Protected";
import { Toaster } from "sonner";
import SignUpPage from "./pages/sign-up";
import Dashboard from "./pages/dahsboard";
import ForgotPage from "./pages/forgot";
import ResetPasswordPage from "./pages/reset-password";
import UserListPage from "./pages/users";

export default function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            >
              <Route path="users"  element={<UserListPage />} />
            </Route>
            {/* raiz -> sempre manda pra /home */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* 404 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
      <div className="relative flex items-center justify-center">
        <FloatingActions />
      </div>
      <Toaster />
    </>
  );
}
