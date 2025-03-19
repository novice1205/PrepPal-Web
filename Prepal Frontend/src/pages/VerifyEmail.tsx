import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../index.css";

const VerifyEmail: React.FC = () => {
  const [code, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/auth/verify-email`, {
        code,
      });

      console.log(response.data);
      toast.success("OTP verification successful");

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("OTP verification failed! Please check your OTP and try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 md:p-14 my-40 mx-9 poppins bg-black text-white rounded-lg">
      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Verify Your Email
        </h1>
        <p className="text-gray-400 text-lg">Verifying your email.</p>
      </div>

      {/* Right section - Verify OTP */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <div className="verify-email-container">
          <h2 className="text-2xl font-semibold mb-6 text-black">Verify Your Email</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-black">
                Enter 6-digit OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={code}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                className="w-full p-2 border border-gray-600 rounded-md text-black bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 rounded-md text-white bg-black hover:bg-gray-900"
            >
              Verify
            </button>
          </form>
        </div>
        <p className="mt-4 text-sm text-gray-400">Literally, you probably haven't heard of them.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
