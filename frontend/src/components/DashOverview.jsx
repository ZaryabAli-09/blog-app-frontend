import React, { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";

const DashOverview = () => {
  const currentUser = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/user/getusers?limit=5",
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/posts/getposts?limit=5"
      );
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto w-full">
      <div className="flex-wrap flex gap-4 justify-center mt-10">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md border">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md border">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashOverview;
