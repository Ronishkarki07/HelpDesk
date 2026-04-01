import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOTP";

// Temporary dashboard (you can improve later)
function Dashboard() {
  return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Dashboard 🚀</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* OTP Verification */}
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;