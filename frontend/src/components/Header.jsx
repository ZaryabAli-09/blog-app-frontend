import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccessAction } from "../reduxStore/store";
import logo from "../assets/logo.png";
import { RxCross2 } from "react-icons/rx";
const Header = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const currentUser = useSelector((state) => {
    return state.user;
  });
  const [dropDown, setDropDown] = useState("hidden");
  function onProfilePic() {
    setMenu(false);
    if (dropDown === "hidden") {
      setDropDown("visible");
    } else if (dropDown === "visible") {
      setDropDown("hidden");
    }
  }
  async function onSignOutHandler() {
    try {
      const response = await fetch("http://localhost:3000/api/user/signout", {
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

  function onMenuBurger() {
    // setMenu(!menu);
    setMenu(!menu);
    setDropDown("hidden");
  }
  return (
    <>
      <div className="flex items-center justify-between bg-sky-950 text-white h-14">
        <div className="ml-3 flex  items-center space-x-1">
          <img
            style={{ width: "30px", borderRadius: "20px" }}
            src={logo}
            alt="logo"
          />
          <div className="font-semibold text-xs whitespace-nowrap text-white md:text-lg ">
            <Link to={"/"}>Tech Scrolls</Link>
          </div>
        </div>
        <div>
          <input
            type="text"
            className=" bg-slate-800 rounded-lg border-none px-4 w-32 sm:w-80 md:w-96 h-8 text-xs"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center space-x-3 px-4">
          {!currentUser ? (
            <button className="bg-slate-800 p-2 rounded-lg font-semibold hover:bg-slate-900 text-xs">
              {" "}
              <Link to={"/signin"}>Sign In</Link>{" "}
            </button>
          ) : (
            <div className="">
              <img
                onClick={onProfilePic}
                className="w-8 rounded-2xl relative left-0 top-0 cursor-pointer"
                src={currentUser.profilePicture}
                alt="profile picture"
              />
              <div
                className={` ${dropDown} z-10 absolute top-16 right-4 bg-opacity-80 bg-gray-300 p-4 text-black rounded-xl flex flex-col space-y-4  `}
              >
                <p className="text-xs font-bold">{currentUser.username}</p>
                <p className="font-semibold">{currentUser.email}</p>
                <Link
                  className="bg-sky-950 p-2 text-center rounded hover:bg-sky-900 text-white"
                  to={"/dashboard?tab=profile"}
                >
                  Profile
                </Link>
                <button
                  className="bg-sky-950  p-2 rounded hover:bg-sky-900 text-white"
                  onClick={onSignOutHandler}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {!menu ? (
            <RxHamburgerMenu
              className="text-xl cursor-pointer hover:text-2xl w-10"
              onClick={onMenuBurger}
            />
          ) : (
            <RxCross2
              className="text-xl cursor-pointer hover:text-2xl w-10"
              onClick={onMenuBurger}
            />
          )}
        </div>
      </div>

      <nav
        className={`${
          !menu ? "opacity-10 invisible " : "opacity-100"
        }transition-opacity duration-300 z-10  bg-gray-300  text-white rounded-xl flex flex-col space-y-4 px-4 py-2 w-60 md:w-80 absolute h-48 right-2 top-16 `}
      >
        <ul className="flex flex-col">
          <Link
            to={"/"}
            className="bg-sky-950 p-2 m-1 mt-4 rounded hover:bg-sky-800 "
          >
            Home
          </Link>

          <Link
            to={"/about"}
            className="bg-sky-950 p-2 m-1 rounded hover:bg-sky-800 "
          >
            About
          </Link>

          <Link
            to={"/projects"}
            className="bg-sky-950 p-2  m-1 rounded hover:bg-sky-800 "
          >
            Projects
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Header;
