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
  const [allPosts, setAllPosts] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const fetchAllPosts = async () => {
    try {
      setSpinner(true);
      const res = await fetch(
        `http://localhost:3000/api/posts/getposts?limit=11`
      );
      const data = await res.json();
      if (res.ok) {
        setSpinner(false);
        setLatestTopPost(data.posts[0]);
        setAllPosts(data.posts.slice(1));
      } else {
        setSpinner(false);
        console.log("error while fetching all posts");
      }
    } catch (err) {
      setSpinner(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, [currentUser]);

  // Sample data for sidebar
  const author = {
    name: "Zaryab Ali",
    picture: "https://via.placeholder.com/150",
    description:
      "Zaryab is a passionate full stack web developer and side hustle blogger.",
  };
  const socialLinks = [
    { platform: "Twitter", url: "https://twitter.com/janedoe" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/janedoe" },
    { platform: "Instagram", url: "https://instagram.com/janedoe" },
  ];
  const recentPosts = allPosts ? allPosts.slice(0, 5) : [];
  const categories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow flex-col sm:flex-row">
        <main className="w-full md:w-4/5 p-4">
          <div className="w-full max-w-6xl mx-auto">
            <h1 className="bg-gray-50 mb-2 pl-5 py-4 text-3xl font-bold text-purple-600">
              Latest Stories
            </h1>
            {latestTopPost && (
              <div
                onClick={() => navigate(`/post/${latestTopPost.slug}`)}
                className="card mx-auto relative hover:cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 mb-8"
                style={{
                  width: "100%",
                  padding: "20px",
                  backgroundColor: "rgb(246,246,246)",
                  border: "none",
                }}
              >
                <img
                  src={latestTopPost.image}
                  className="w-full h-80 object-cover hover:opacity-90 transition-opacity duration-300"
                  alt="..."
                />
                <div className="absolute bottom-8 left-8  bg-opacity-50 text-white p-4 rounded-lg">
                  <h5 className="card-title text-xl uppercase font-bold">
                    {latestTopPost.title}
                  </h5>
                  <p
                    className="text-sm mt-2"
                    dangerouslySetInnerHTML={{
                      __html: latestTopPost.content.slice(0, 110),
                    }}
                  ></p>
                  <div className="space-x-3 mt-3">
                    <span className="bg-purple-500 p-1 text-sm rounded text-white font-bold">
                      {new Date(latestTopPost.createdAt).toLocaleDateString()}
                    </span>
                    <span className="bg-purple-500 p-1 text-sm rounded text-white font-bold">
                      {latestTopPost.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="cards md:grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6  md:text-md md:m-2 ">
              {allPosts ? (
                allPosts.map((post) => (
                  <div
                    key={post._id}
                    className="p-5 bg-white hover:opacity-80  duration-300 relative hover:cursor-pointer rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
                    onClick={() => navigate(`/post/${post.slug}`)}
                  >
                    <img
                      src={post.image}
                      className="w-full h-48 object-cover"
                      alt="..."
                    />
                    <div className="p-4">
                      <h5 className="card-title  text-md sm:text-lg md:text-lg font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h5>
                      <p
                        className="text-sm text-gray-700 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: post.content.slice(0, 100),
                        }}
                      >
                        {/* {post.content.slice(0, 100)}... */}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={
                              post.authorAvatar ||
                              "https://via.placeholder.com/150"
                            }
                            className="w-8 h-8 rounded-full object-cover"
                            alt={post.author}
                          />
                          <span className="text-sm text-gray-600">
                            {post.author}
                          </span>
                        </div>
                        <div className="space-x-3 text-sm text-gray-600">
                          <span>
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="bg-purple-500 p-1 text-sm rounded text-white font-bold">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full mt-5">
                  <Spinner className="flex justify-center w-30 h-20" />
                </div>
              )}
            </div>
          </div>
        </main>
        <Sidebar
          author={author}
          socialLinks={socialLinks}
          recentPosts={recentPosts}
          categories={categories}
        />
      </div>
      <FooterCom />
    </div>
  );
};

export default Home;
