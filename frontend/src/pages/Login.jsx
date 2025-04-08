import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submit for login or signup
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(
            "🎉 Account created successfully! You're now logged in.",
            { position: "top-right" }
          );
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("👋 Welcome back! You're now logged in.", {
            position: "top-right",
          });
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Go to home if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-lg transition-all duration-300"
    >
      {/* Title */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800 dark:bg-gray-400" />
      </div>

      {/* Name field for Sign Up only */}
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Name"
          required
        />
      )}

      {/* Email field */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Email"
        required
      />

      {/* Password field */}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        placeholder="Password"
        required
      />

      {/* Toggle Login/Sign Up */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer"></p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer dark:text-gray-400 hover:text-black dark:hover:text-white transition-all"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer dark:text-gray-400 hover:text-black dark:hover:text-white transition-all"
          >
            Login Here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all">
        {currentState === "Login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
