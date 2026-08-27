import React, { useEffect, useState, memo } from "react";
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";

const DashOverview = () => {
  const currentUser = useSelector((state) => state.user);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/getusers-length`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    } catch (error) {
      // silent
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/getposts-length`,

        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      }
    } catch (error) {
      // silent
    }
  };
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto w-full">
      <div className="flex-wrap flex gap-6 justify-center mt-10">
        <div className="flex flex-col p-6 gap-4 md:w-72 w-full rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm uppercase tracking-wide">Total Posts</h3>
              <p className="text-3xl font-bold text-gray-800">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-purple-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center font-medium">
              <HiArrowNarrowUp className="mr-1" />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-6 gap-4 md:w-72 w-full rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-gray-500 text-sm uppercase tracking-wide">Total Users</h3>
              <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-purple-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center font-medium">
              <HiArrowNarrowUp className="mr-1" />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DashOverview);
