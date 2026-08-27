// Home.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterCom from "../components/Footer";
import { Spinner } from "flowbite-react";
import Sidebar from "../components/SidebarPost";

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [latestTopPost, setLatestTopPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [spinner, setSpinner] = useState(true);

  const fetchAllPosts = async () => {
    try {
      setSpinner(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/getposts?limit=11`
      );
      const data = await res.json();
      if (res.ok) {
        setSpinner(false);
        setLatestTopPost(data.posts[0] || null);
        setAllPosts(data.posts.slice(1) || []);
      } else {
        setSpinner(false);
      }
    } catch (err) {
      setSpinner(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, [currentUser]);

  const author = {
    name: "Zaryab Ali",
    picture: "https://via.placeholder.com/150",
    description:
      "Zaryab Ali is a full stack developer with 2+ years of professional experience specializing in the MERN stack. He builds scalable web applications and shares insights on modern development practices.",
  };
  const socialLinks = [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/zaryab-ali-softdev?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/zky_07?igsh=Yng5dms4eTViY2dz",
    },
  ];
  const recentPosts = allPosts.slice(0, 5);
  const categories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-grow flex-col sm:flex-row">
        <main className="w-full md:w-4/5 p-4">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-purple-600 mb-6 pl-5 border-l-4 border-purple-600">
              Latest Stories
            </h1>

            {latestTopPost && (
              <div
                onClick={() => navigate(`/post/${latestTopPost.slug}`)}
                className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group mb-10 bg-white"
              >
                <div className="relative h-80 sm:h-96 md:h-[500px]">
                  <img
                    src={latestTopPost.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={latestTopPost.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-purple-600 px-3 py-1 text-sm rounded-full font-medium">
                        {new Date(latestTopPost.createdAt).toLocaleDateString()}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 text-sm rounded-full font-medium">
                        {latestTopPost.category.toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                      {latestTopPost.title}
                    </h2>
                    <p
                      className="text-gray-200 text-sm sm:text-base max-w-3xl line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: latestTopPost.content.slice(0, 150),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:text-md md:m-2">
              {allPosts.length > 0 ? (
                allPosts.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => navigate(`/post/${post.slug}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        alt={post.title}
                      />
                      <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {post.category.toUpperCase()}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                      <p
                        className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: post.content.slice(0, 100),
                        }}
                      ></p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <img
                            src={
                              post.author?.profilePicture ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.username || 'A')}&background=random`
                            }
                            className="w-8 h-8 rounded-full object-cover"
                            alt={post.author?.username}
                          />
                          <span className="text-sm text-gray-600 font-medium">
                            {post.author?.username || "Anonymous"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center w-full mt-5">
                  {spinner ? (
                    <Spinner className="w-10 h-10 text-purple-600" />
                  ) : (
                    <p className="text-gray-500">No posts yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
        <Sidebar
          author={author}
          socialLinks={socialLinks}
          recentPosts={recentPosts}
        />
      </div>
      <FooterCom />
    </div>
  );
};

export default Home;
