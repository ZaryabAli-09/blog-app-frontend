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
    setTab(tabFromurl);
  }, [location.search]);
  return (
    <div className="sm:flex ">
      <DashSideBar />
      {tab == "profile" && <DashProfile />}
      {tab == "posts" && <DashPosts />}
      {tab == "users" && <DashUsers />}
      {tab == "dashboard-overview" && <DashOverview />}
    </div>
  );
};

export default Dashboard;
