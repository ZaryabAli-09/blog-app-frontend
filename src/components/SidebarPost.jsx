// Sidebar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Sidebar = ({ author, socialLinks, recentPosts }) => {
  const [categories, setCategories] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories/get-categories`,
        );
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        // silent
      }
    };

    const fetchFeaturedPosts = async () => {
      try {
        setFeaturedLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/featured`,
        );
        const data = await res.json();
        if (res.ok) {
          setFeaturedPosts(data.posts || []);
        }
      } catch (err) {
        // silent
      } finally {
        setFeaturedLoading(false);
      }
    };

    fetchCategories();
    fetchFeaturedPosts();
  }, []);

  return (
    <aside className="w-full sm:w-[200px] md:w-[260px] p-4 bg-white mt-4 md:mt-0 rounded-xl shadow-sm">
      <div className="flex items-center mb-6 sm:hidden md:block">
        {/* {author.picture ? (
          <img
            src={author.picture}
            alt={author.name}
            className="md:ml-5 w-16 h-16 rounded-full object-cover border-2 border-purple-500"
          />
        ) : (
          <div className="md:ml-5 w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-purple-500">
            {author.name?.[0]?.toUpperCase() || "A"}
          </div>
        )} */}
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-purple-600">
            {author.name}
          </h2>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            {author.description}
          </p>

          <div className="mt-3 flex space-x-3">
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
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-purple-600 border-b border-purple-200 pb-2">
          Featured
        </h3>
        {featuredLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : featuredPosts.length > 0 ? (
          <ul className="space-y-2">
            {featuredPosts.map((post) => (
              <li key={post._id}>
                <Link
                  to={`/post/${post.slug}`}
                  className="text-gray-600 text-sm hover:text-purple-600 transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No featured posts yet.</p>
        )}
      </div>
      <div className="hidden sm:block">
        <h3 className="text-lg font-semibold mb-3 text-purple-600 border-b border-purple-200 pb-2">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                to={`/category/${category}`}
                className="text-purple-600 hover:text-purple-800 transition-colors block capitalize"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
