import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Spinner } from "flowbite-react";
import ConfirmationDialog from "./ConfirmationDialog";

const DashUsers = () => {
  const [showMore, setShowMore] = useState(true);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const [deleteBtnClick, setDeleteBtnClick] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [onUserDelete, setOnUserDelete] = useState(false);
  const confirmationDialogRef = useRef(null);

  useEffect(() => {
    if (onUserDelete && confirmationDialogRef.current) {
      confirmationDialogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [onUserDelete]);
  useEffect(() => {
    const getUser = async () => {
      try {
        setSpinner(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/getusers`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setSpinner(false);
          setFetchedUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      if (!res.ok) {
        setSpinner(false);
      }
      } catch (err) {
        setSpinner(false);
      }
    };
    getUser();
  }, [currentUser]);
  async function deleteUserHandler() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/delete/${deleteBtnClick}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFetchedUsers((prev) =>
          prev.filter((user) => user._id !== deleteBtnClick)
        );
      }
      if (!res.ok) {
        // silent
      }
    } catch (error) {
      // silent
    }
  }

  async function handleShowMore(e) {
    e.preventDefault();
    const startIndex = fetchedUsers.length;
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/user/getusers?startIndex=${startIndex}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFetchedUsers((prev) => [...prev, ...data.users]);
      }
      if (data.users.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      // silent
    }
  }
  return (
    <div className="overflow-x-auto w-full">
      <div className="lg:mx-20 mt-1 mb-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full table-auto whitespace-nowrap">
            <thead className="text-left font-semibold text-gray-500 text-sm uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Profile</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Admin</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUser.isAdmin && fetchedUsers.length > 0 ? (
                fetchedUsers.map((user, i) => {
                  return (
                    <tr key={i} className="text-sm border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold hover:bg-purple-700 transition-colors">
                          {user.username[0].toUpperCase()}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{user.username}</td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        {user.isAdmin ? (
                          <TiTick className="text-xl text-green-500" />
                        ) : (
                          <ImCross className="text-xl text-red-400" />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          onClick={() => {
                            setDeleteBtnClick(user._id);
                            setOnUserDelete(true);
                          }}
                          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                        >
                          <MdDelete className="text-lg" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : fetchedUsers && fetchedUsers.length <= 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg font-medium">No users found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-8">
                    <Spinner className="w-8 h-8 text-purple-600 mx-auto" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-center mt-6">
          {showMore && (
            <button
              className="text-purple-600 font-medium hover:text-purple-800 transition-colors"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
      </div>
      <div ref={confirmationDialogRef} className="w-96 mx-auto mb-10">
        {onUserDelete && (
          <ConfirmationDialog
            message={"Are you sure you want to delete this user?"}
            onCancel={() => setOnUserDelete(false)}
            onConfirm={() => {
              currentUser.isAdmin && deleteUserHandler();
              setOnUserDelete(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashUsers;
