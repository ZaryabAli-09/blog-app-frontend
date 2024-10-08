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
    <div className="bg-sky-900 sm:w-56 sm:h-auto sm:min-h-screen p-2 ">
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
        onClick={() => {
          setSignOutPopUp(true);
          setDeleteAccPopUp(false);
        }}
        className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-sky-800"
      >
        <FaArrowRight className="mr-1 text-sm" />
        Sign Out
      </button>
      <button
        onClick={() => {
          setDeleteAccPopUp(true);
          setSignOutPopUp(false);
        }}
        className="flex items-center bg-sky-950 text-white w-full rounded-md p-2 my-2 hover:bg-red-500"
      >
        <MdDelete className="mr-1 text-sm" />
        Delete Account
      </button>
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
