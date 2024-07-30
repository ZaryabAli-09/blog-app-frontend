import React from "react";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.user);
  return currentUser ? <Dashboard /> : <Navigate to={"/signin"} />;
};

export default PrivateRoute;
