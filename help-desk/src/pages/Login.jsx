import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/footer-logo.svg";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    return email.toLowerCase().endsWith("@bicnepal.edu.np");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Use your institutional email");
      return;
    }

    try {
      setError("");
      setLoading(true);

      // ✅ FIXED: was "http://localhost:3007/login"
      const res = await fetch("http://localhost:3007/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requiresOTPVerification) {
          localStorage.setItem("otpEmail", email);
          navigate("/verify-otp");
          return;
        }

        if (data.accountDisabled) {
          setError("Your account is deactivated. Contact admin.");
          return;
        }

        setError(data.error || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("student", JSON.stringify(data.student));

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* HEADER */}
          <div
            className="px-6 py-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(73, 3, 3, 0.85), rgba(5, 35, 86, 0.85))",
            }}
          >
            <img
              src={Logo}
              alt="BIC Logo"
              className="w-20 h-20 object-contain mx-auto mb-3"
            />
            <h1 className="text-2xl font-semibold text-white mb-1">
              Welcome Back!
            </h1>
            <p className="text-white text-xs">
              Secure gateway for Academic Helpdesk
            </p>
          </div>

          {/* FORM */}
          <div className="px-10 py-8 space-y-5">

            {/* EMAIL */}
            <div>
              <p className="text-xs font-semibold uppercase mb-1.5">
                Email or Institutional ID
              </p>
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3">
                <input
                  type="email"
                  placeholder="student@bicnepal.edu.np"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="bg-transparent flex-1 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <p className="text-xs font-semibold uppercase mb-1.5">
                Password
              </p>
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="bg-transparent flex-1 text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm text-gray-500">Remember me</span>
              </div>
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-red-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-blue-900 hover:bg-blue-800 transition"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            {/* SIGNUP */}
            <p className="text-center text-sm text-gray-500 pt-2">
              New to the institution?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-900 font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}