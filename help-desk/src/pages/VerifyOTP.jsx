import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 📌 Get email from localStorage
  const email = localStorage.getItem("otpEmail");

  const handleVerify = async () => {
    if (!otp) {
      setError("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3007/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setError("");

        // 🔐 Save token if backend returns it
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        alert("Verified successfully ✅");

        navigate("/dashboard");
      }

    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-5">

        <h2 className="text-2xl font-semibold text-center">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Enter the OTP sent to your email
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 bg-gray-100 rounded-xl text-center text-lg tracking-widest"
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 bg-blue-900 text-white rounded-xl"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-sm text-blue-600 cursor-pointer"
        >
          Back to Login
        </p>

      </div>
    </div>
  );
}