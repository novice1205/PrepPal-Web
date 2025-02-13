import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../index.css";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { token } = useParams<{ token: string }>(); // Get token from URL params
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });

      if (response.data.success) {
        toast.success("Password reset successful!");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  const handleLogin = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-40 mx-9 p-5 md:p-14 poppins bg-black text-white rounded-lg">
      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Reset Your Password</h1>
        <p className="text-gray-400">Create a new, strong password to keep your account secure.</p>
      </div>

      {/* Right section - Reset Password Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-black">Create New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-black">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md text-black bg-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md text-black bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded-md text-white bg-black hover:bg-gray-900"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400">
          Remember your password? <a href="/login" onClick={handleLogin} className="font-medium hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
