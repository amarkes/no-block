import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/sign-in/index";
import HomePage from "@/pages/home/index";
import TermsPage from "./pages/terms";
import FloatingActions from "./components/floating-actions";
import PolicyPage from "./pages/policy";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </Router>
      <div className="relative flex items-center justify-center">
        <FloatingActions />
      </div>
    </div>
  );
}
