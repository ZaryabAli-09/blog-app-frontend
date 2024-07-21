import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccessAction } from "../reduxStore/store";
import { MdDelete } from "react-icons/md";
import { BsFileEarmarkPost } from "react-icons/bs";
const DashSideBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => {
    return state.user;
  });
  async function onSignOutHandler() {
    try {
      const response = await fetch(`http://localhost:3000/api/user/signout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        return dispatch(signInSuccessAction.signOut());
      }
      if (!response.ok) {
        return alert("error occur while signing out");
      }
    } catch (error) {
      return alert("error occur while signing out");
    }
  }
  async function onDeleteAccountHandler() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(signInSuccessAction.deleteUser());
      }
      if (!response.ok) {
        return alert("error occur while deleting your account");
      }
    } catch (error) {
      return alert("error occur while deleting your account");
    }
  }
  return (
    <div className="bg-sky-900 sm:w-52 sm:h-auto sm:min-h-screen p-2 ">
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-sky-800"
          to={"create-post"}
        >
          <BsFileEarmarkPost className="mr-1" /> Create a post
        </Link>
      )}
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-sky-800 "
          to={"/dashboard?tab=dashboard-overview"}
        >
          <MdDashboard className="mr-1" />
          Dashboard
        </Link>
      )}
      <Link
        className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-sky-800 "
        to={"/dashboard?tab=profile"}
      >
        <CgProfile className="mr-1" />
        Profile{" "}
        <span className="bg-green-500 text-white text-xs   ml-2 px-1 font-semibold rounded">
          {currentUser.isAdmin ? "Admin" : "User"}
        </span>
      </Link>
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-sky-800 "
          to={"/dashboard?tab=posts"}
        >
          <MdPostAdd className="mr-1" />
          Posts
        </Link>
      )}
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-sky-800 "
          to={"/dashboard?tab=users"}
        >
          <CiUser className="mr-1" />
          Users
        </Link>
      )}{" "}
      <button
        onClick={onSignOutHandler}
        className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-sky-800"
      >
        <FaArrowRight className="mr-1 text-sm" />
        Sign Out
      </button>
      <button
        onClick={onDeleteAccountHandler}
        className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-red-500"
      >
        <MdDelete className="mr-1 text-sm" />
        Delete Account
      </button>
    </div>
  );
};

export default DashSideBar;
