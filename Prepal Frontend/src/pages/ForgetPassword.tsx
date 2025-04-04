import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import toast from "react-hot-toast";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot-password`, { email });
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      toast.error("Error sending password reset link.");
    }
  };

  const handleSignIn = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 md:p-14 my-40 mx-9 poppins bg-black text-white rounded-lg">
      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-white">Forgot Your Password?</h1>
        <p className="text-gray-400 text-lg">Don't worry! Enter your email address to reset your password.</p>
      </div>

      {/* Right section - Forgot Password Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-black">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md text-black bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded-md text-white bg-black hover:bg-gray-900"
          >
            Send Reset Link
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400">
          Remembered your password? <a href="/login" onClick={handleSignIn} className="font-medium hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
