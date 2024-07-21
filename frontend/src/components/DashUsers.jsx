import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Spinner } from "flowbite-react";
const DashUsers = () => {
  const [showMore, setShowMore] = useState(true);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const [deleteBtnClick, setDeleteBtnClick] = useState("");
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        setSpinner(true);
        const res = await fetch("http://localhost:3000/api/user/getusers", {
          credentials: "include",
        });
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
          return;
        }
      } catch (err) {
        setSpinner(false);
        console.log(err);
      }
    };
    getUser();
  }, [currentUser]);
  async function deleteUserHandler() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/delete/${deleteBtnClick}`,
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
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (deleteBtnClick.length > 5 && currentUser.isAdmin) {
    deleteUserHandler();
    setDeleteBtnClick("");
  }
  async function handleShowMore(e) {
    e.preventDefault();
    const startIndex = fetchedUsers.length;
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/getusers?startIndex=${startIndex}`,
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
      console.log(error.message);
    }
  }
  return (
    <div className="overflow-x-auto w-full ">
      <div className="lg:mx-20 mt-1 mb-10">
        <table className="min-w-full table-auto whitespace-nowrap  shadow-lg border rounded ">
          <thead className="text-left font-semibold text-gray-500 text-md uppercase bg-gray-100">
            <tr>
              <th className=" px-4 py-2">CREATED</th>
              <th className=" px-4 py-2">PROFILE</th>
              <th className=" px-4 py-2">NAME</th>
              <th className=" px-4 py-2">EMAIL</th>
              <th className=" px-4 py-2">ADMIN</th>
              <th className=" px-4 py-2">DELETE</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.isAdmin && fetchedUsers.length > 0 ? (
              fetchedUsers.map((user) => {
                return (
                  <tr className="text-xs border">
                    <td className=" px-4 py-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className=" px-4 py-2">
                      <img
                        className="w-10 h-10 object-cover rounded-full"
                        src={user.profilePicture}
                        alt="profilepicture"
                      />
                    </td>
                    <td className=" px-4 py-2">{user.username}</td>
                    <td className=" px-4 py-2">{user.email}</td>
                    <td className=" px-4 py-2 ">
                      {user.isAdmin ? (
                        <TiTick className="text-xl text-green-500" />
                      ) : (
                        <ImCross className="text-md text-red-500" />
                      )}
                    </td>
                    <td className=" px-4 py-2">
                      <span
                        onClick={() => setDeleteBtnClick(user._id)}
                        className="text-red-500 cursor-pointer hover:underline"
                      >
                        <MdDelete className="text-lg hover:text-xl" />
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : fetchedUsers && fetchedUsers.length <= 0 ? (
              <div className="text-center p-3">No Users</div>
            ) : (
              <div className=" flex justify-center   my-5 ">
                <Spinner className="w-10 h-10" />
              </div>
            )}
          </tbody>
        </table>
        <div className="w-full flex justify-center">
          {showMore && (
            <button
              onClick={handleShowMore}
              className="underline text-teal-500 self-center "
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashUsers;
