import React, { useState } from "react";
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
import ConfirmationDialog from "./ConfirmationDialog";
const DashSideBar = () => {
  const dispatch = useDispatch();
  const [signOutPopUp, setSignOutPopUp] = useState(false);
  const [deleteAccPopUp, setDeleteAccPopUp] = useState(false);
  const currentUser = useSelector((state) => {
    return state.user;
  });
  async function onSignOutHandler() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/signout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
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
        `${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`,
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
    <div className="bg-white sm:w-56 sm:h-auto sm:min-h-screen p-4 border-r border-gray-200 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-purple-600 px-2">Dashboard</h2>
      </div>
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-purple-50 text-purple-700 w-full rounded-lg p-3 my-2 hover:bg-purple-100 transition-colors font-medium"
          to={"create-post"}
        >
          <BsFileEarmarkPost className="mr-3" /> Create a post
        </Link>
      )}
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-purple-50 text-purple-700 w-full rounded-lg p-3 my-2 hover:bg-purple-100 transition-colors font-medium"
          to={"/dashboard?tab=dashboard-overview"}
        >
          <MdDashboard className="mr-3" />
          Dashboard
        </Link>
      )}
      <Link
        className="flex items-center bg-purple-50 text-purple-700 w-full rounded-lg p-3 my-2 hover:bg-purple-100 transition-colors font-medium"
        to={"/dashboard?tab=profile"}
      >
        <CgProfile className="mr-3" />
        Profile
        <span className={`ml-auto text-white text-xs px-2 py-0.5 rounded-full font-semibold ${currentUser.isAdmin ? "bg-purple-600" : "bg-gray-400"}`}>
          {currentUser.isAdmin ? "Admin" : "User"}
        </span>
      </Link>
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-purple-50 text-purple-700 w-full rounded-lg p-3 my-2 hover:bg-purple-100 transition-colors font-medium"
          to={"/dashboard?tab=posts"}
        >
          <MdPostAdd className="mr-3" />
          Posts
        </Link>
      )}
      {currentUser.isAdmin && (
        <Link
          className="flex items-center bg-purple-50 text-purple-700 w-full rounded-lg p-3 my-2 hover:bg-purple-100 transition-colors font-medium"
          to={"/dashboard?tab=users"}
        >
          <CiUser className="mr-3" />
          Users
        </Link>
      )}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            setSignOutPopUp(true);
            setDeleteAccPopUp(false);
          }}
          className="flex items-center bg-purple-50 text-purple-700 w-full rounded-lg p-3 my-2 hover:bg-purple-100 transition-colors font-medium"
        >
          <FaArrowRight className="mr-3 text-sm" />
          Sign Out
        </button>
        <button
          onClick={() => {
            setDeleteAccPopUp(true);
            setSignOutPopUp(false);
          }}
          className="flex items-center bg-red-50 text-red-600 w-full rounded-lg p-3 my-2 hover:bg-red-100 transition-colors font-medium"
        >
          <MdDelete className="mr-3 text-sm" />
          Delete Account
        </button>
      </div>
      {signOutPopUp && (
        <ConfirmationDialog
          message="Are you sure you want to logout?"
          onConfirm={onSignOutHandler}
          onCancel={() => setSignOutPopUp(false)}
        />
      )}
      {deleteAccPopUp && (
        <ConfirmationDialog
          message="Are you sure you want to delete this account?"
          onConfirm={onDeleteAccountHandler}
          onCancel={() => setDeleteAccPopUp(false)}
        />
      )}
    </div>
  );
};

export default DashSideBar;
