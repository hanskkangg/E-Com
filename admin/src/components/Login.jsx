import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

// Login component for admin login
const Login = ({ setToken }) => {
  // State for storing user input (email and password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const onSubmitHandler = async (e) => {
    try {
      // Prevents page reload on form submission
      e.preventDefault();

      // Sending a request to the backend to check login credentials
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      // If login is successful, store the token
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        // Show error message if login fails
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    // Centering the login form on the screen
    <div className="min-h-screen flex items-center justify-center w-full">
      {/* Login form container */}
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        {/* Heading of the login form */}
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

        {/* Form for login */}
        <form onSubmit={onSubmitHandler}>
          {/* Email input field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password input field */}
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login button */}
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
