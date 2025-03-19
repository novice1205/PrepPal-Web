import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast
import "../index.css"; // Import the CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Show a processing toast
    const toastId = toast.loading("Logging in...");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log(response.data);

      // Update the toast with a success message
      toast.success("Login successful!", { id: toastId });

      // Redirect to the dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);

      // Update the toast with an error message
      toast.error("Login failed! Please check your credentials.", { id: toastId });
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleForgetPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/forget-password");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 md:p-14 my-20 mx-9 poppins bg-black text-white rounded-lg">
      <Toaster /> {/* Add Toaster component */}

      {/* Left section */}
      <div className="w-full md:w-1/2 space-y-4 mb-8 md:mb-0">
        <h1 className="text-3xl md:text-5xl font-bold text-white">Start your Journey Now</h1>
        <p className="text-gray-400 text-lg">
          Log in to access your account and continue your journey with us.
        </p>
      </div>

      {/* Right section - Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-black">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md text-black bg-white"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md text-black bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-md text-white bg-black hover:bg-gray-900"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-400">
          <a href="/forget-password" onClick={handleForgetPassword} className="hover:underline">
            Forgot password?
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" onClick={handleSignUp} className="font-medium hover:underline text-grey">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
