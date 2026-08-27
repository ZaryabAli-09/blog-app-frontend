import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccessAction } from "../reduxStore/store.js";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setErrorMessage("Please fill out all fields!");
    }

    const formData = {
      email,
      password,
    };
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      if (response.ok) {
        setLoading(false);
        setErrorMessage("Login successfully");
        dispatch(signInSuccessAction.signInSuccess(data));
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-12 px-4">
      <form
        className="bg-white shadow-lg rounded-2xl w-full md:w-1/2 px-8 pt-8 pb-8 border border-gray-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl mb-6 font-bold text-center text-gray-800">Sign In</h2>

        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between flex-col space-y-3">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full text-sm font-semibold transition-colors"
            type="submit"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <div className="flex space-x-1 mt-4 justify-center">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <Link className="text-purple-600 text-sm font-medium hover:underline" to={"/signup"}>
            Sign Up
          </Link>
        </div>
        {errorMessage ? (
          <div
            className={`p-3 mt-4 ${
              errorMessage === "Login successfully"
                ? "bg-green-100 text-green-700 border border-green-400"
                : "bg-red-100 text-red-700 border border-red-400"
            } rounded text-center bg-opacity-70`}
          >
            {errorMessage}
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default SignIn;
