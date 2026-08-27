import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashOverview from "../components/DashOverview";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromurl = urlParams.get("tab");
    setTab(tabFromurl || "dashboard-overview");
  }, [location.search]);

  return (
    <div className="sm:flex min-h-screen bg-gray-50">
      <DashSideBar />
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "users" && <DashUsers />}
        {tab === "dashboard-overview" && <DashOverview />}
      </div>
    </div>
  );
};

export default Dashboard;
