import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";

import { RxCross2 } from "react-icons/rx";
const Header = () => {
  const [menu, setMenu] = useState(false);
  const currentUser = useSelector((state) => {
    return state.user;
  });

  function onMenuBurger() {
    setMenu(!menu);
  }
  return (
    <>
      <div className="flex items-center justify-between bg-white text-gray-600 h-20 shadow-md">
        <div className="ml-3 flex items-center space-x-2">
          <img
            style={{ width: "30px", borderRadius: "20px" }}
            src={logo}
            alt="logo"
          />
          <div className="text-sm font-bold text-purple-600 md:text-lg">
            <Link to="/">Tech Scrolls</Link>
          </div>
        </div>

        <nav className="text-sm  md:text-base hidden md:block">
          <ul className="flex space-x-6">
            <Link to="/" className="hover:text-purple-500">
              Home
            </Link>
            <Link to="/blogs" className="hover:text-purple-500">
              Blogs
            </Link>
            <Link to="/about" className="hover:text-purple-500">
              About
            </Link>
            <Link to="/contact" className="hover:text-purple-500">
              Contact
            </Link>
          </ul>
        </nav>

        <div className="flex items-center space-x-4 px-4">
          <div className="flex items-center justify-center w-10 h-10 border border-purple-600 py-2 px-2 rounded-full cursor-pointer hover:border-purple-700">
            <FaSearch className="text-2xl" />
          </div>
          {!currentUser ? (
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 text-xs">
              <Link to="/signin">Sign In</Link>
            </button>
          ) : (
            <div>
              <Link
                to="/dashboard?tab=profile"
                className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold hover:bg-purple-700"
              >
                {currentUser.username[0].toUpperCase()}
              </Link>
            </div>
          )}

          {!menu ? (
            <RxHamburgerMenu
              className="text-xl md:hidden cursor-pointer hover:text-2xl"
              onClick={onMenuBurger}
            />
          ) : (
            <RxCross2
              className="text-xl md:hidden cursor-pointer hover:text-2xl"
              onClick={onMenuBurger}
            />
          )}
        </div>
      </div>

      <nav
        className={`${
          !menu ? "opacity-0 invisible" : "opacity-100 visible"
        } transition-opacity md:hidden duration-300 z-10 bg-white text-gray-800 shadow-md rounded-xl flex flex-col space-y-4 px-4 py-2 w-60 md:w-80 absolute right-2 top-16`}
      >
        <ul className="flex flex-col">
          <Link to="/" className="p-2 rounded hover:bg-gray-200">
            Home
          </Link>
          <Link to="/about" className="p-2 rounded hover:bg-gray-200">
            About
          </Link>
          <Link to="/contact" className="p-2 rounded hover:bg-gray-200">
            Projects
          </Link>
          <Link to="/blogs" className="p-2 rounded hover:bg-gray-200">
            Blogs
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Header;
