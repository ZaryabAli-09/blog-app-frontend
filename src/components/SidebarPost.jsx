// Sidebar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import generalCimg from "../assets/generalcategoryImg.jpg";
import inspirationCimg from "../assets/inspirationCategoryImg.jpg";
import techCimg from "../assets/techCategoryImg.jpg";

const Sidebar = ({ author, socialLinks, recentPosts }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "${import.meta.env.VITE_API_URL}/api/posts/get-categories"
        );
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories);
        } else {
          console.log("Error fetching categories");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-[] sm:w-[200px] md:w-[260px] p-4 bg-gray-50 mt-4 ">
      <div className="flex items-center mb-6 sm:hidden md:block">
        <img
          src={author.picture}
          alt={author.name}
          className="md:ml-5 w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-purple-600">
            {author.name}
          </h2>
          <p className=" mt-2 text-xs text-gray-600">{author.description}</p>

          <div className="mt-4 flex space-x-4">
            {socialLinks.map((link) => {
              const Icon =
                link.platform === "Twitter"
                  ? FaTwitter
                  : link.platform === "LinkedIn"
                  ? FaLinkedin
                  : link.platform === "Instagram"
                  ? FaInstagram
                  : null;
              return Icon ? (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">
          Staff Picks
        </h3>
        <ul className="space-y-2">
          {recentPosts.map((post) => (
            <li key={post._id}>
              <Link
                to={`/post/${post.slug}`}
                className="text-gray-600  text-xs md:text-sm hover:underline hover:text-purple-600"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden sm:block">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${category}`}
                className="text-blue-600 hover:underline"
              >
                {category == "technology" ? (
                  <img
                    className="overflow-hidden rounded-lg"
                    src={techCimg}
                    alt=""
                  />
                ) : category == "inspiration" ? (
                  <img
                    className="overflow-hidden rounded-lg"
                    src={inspirationCimg}
                    alt=""
                  />
                ) : category == "general" ? (
                  <img
                    className="overflow-hidden rounded-lg"
                    src={generalCimg}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
