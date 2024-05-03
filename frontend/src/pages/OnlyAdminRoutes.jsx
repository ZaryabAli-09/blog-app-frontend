import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
const PrivateRoute = () => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    <>{location.pathname === "/create-post" ? <CreatePost /> : <EditPost />}</>
  ) : (
    <Navigate to={"/signin"} />
  );
};

export default PrivateRoute;
