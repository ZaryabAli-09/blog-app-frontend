import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      return setErrorMessage("Please fill out all required fields");
    }
    const formData = {
      username,
      email,
      password,
    };
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      if (response.ok) {
        setLoading(false);
        setErrorMessage(data.message);
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center  mt-12 ">
      <form
        className="bg-white shadow-lg rounded  w-full md:w-1/2 px-8 pt-6 pb-8 mb-4 border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            UserName
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between flex-col space-y-2">
          <button
            className="bg-sky-950 hover:bg-blue-800 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm"
            type="submit"
          >
            {loading ? "Loading..." : "SIGN UP"}
          </button>
          <OAuth />
        </div>
        <div className="flex space-x-1 mt-2">
          <span className="text-sm">Have an account?</span>
          <Link className="text-blue-800 text-sm" to={"/signin"}>
            Sign In
          </Link>
        </div>
        {errorMessage ? (
          <div
            className={`p-2 ${
              errorMessage === "Signup successfull"
                ? "bg-green-400"
                : "bg-red-400"
            } text-white rounded text-center bg-opacity-70`}
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

export default SignUp;
