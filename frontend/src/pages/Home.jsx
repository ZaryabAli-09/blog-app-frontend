import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FooterCom from "../components/Footer";
import { Spinner } from "flowbite-react";
const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [latestTopPost, setLatestTopPost] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  // const [spinner1, setSpinner1] = useState(false);
  const [spinner2, setSpinner2] = useState(false);
  const fetchLatestStoryTopPost = async () => {
    try {
      // setSpinner1(true);
      const res = await fetch(
        `http://localhost:3000/api/posts/getposts?limit=1`
      );
      const data = await res.json();
      if (res.ok) {
        // setSpinner1(false);
        setLatestTopPost(data.posts[0]);
      }
      if (!res.ok) {
        // setSpinner1(false);
        console.log("error while fetch lateststorytop post");
      }
    } catch (err) {
      // setSpinner1(false);
      console.log(err);
    }
  };
  const fetchAllPosts = async () => {
    try {
      setSpinner2(true);
      const res = await fetch(
        `http://localhost:3000/api/posts/getposts?limit=10`
      );
      const data = await res.json();
      if (res.ok) {
        setSpinner2(false);
        await data.posts.shift();
        setAllPosts(data.posts);
      }
      if (!res.ok) {
        setSpinner2(false);
        console.log("error while fetch all posts");
      }
    } catch (err) {
      setSpinner2(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLatestStoryTopPost();
    fetchAllPosts();
  }, [currentUser]);
  return (
    <div>
      <h1 className="bg-gray-200 pl-20 py-4 text-3xl font-bold ">
        Latest Stories
      </h1>

      {latestTopPost ? (
        <div
          onClick={() => navigate(`/post/${latestTopPost.slug}`)}
          className="card mx-auto relative hover:cursor-pointer"
          style={{
            width: "100%",
            padding: "20px",
            backgroundColor: "rgb(246,246,246)",
            border: "none",
          }}
        >
          <img
            src={latestTopPost.image}
            className="w-full h-80 object-cover hover:opacity-60 transition-opacity duration-300"
            alt="..."
          />
          <div className="absolute bottom-8 left-8">
            <h5 className="card-title text-xl  uppercase font-bold text-black">
              {latestTopPost.title}
            </h5>
            <div className=" space-x-3 mt-3">
              <span className="bg-gray-200 p-1 text-sm rounded ">
                {new Date(latestTopPost.createdAt).toLocaleDateString()}
              </span>
              <span className="bg-gray-200 p-1 text-sm rounded">
                {" "}
                {latestTopPost.category}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="cards flex flex-col justify-between  md:flex-row  text-sm md:text-md  md:m-2  md:flex-wrap ">
        {allPosts ? (
          allPosts.map((post, i) => {
            return (
              <div
                key={post._id}
                className="p-5 border bg-[rgb(246,246,246)]  md:w-1/2 lg:w-1/3 mt-5 md:mt-10  h-full md:h-[500px] hover:opacity-80 transition-opacity duration-300 md:relative hover:cursor-pointer"
                onClick={() => navigate(`/post/${post.slug}`)}
              >
                <img
                  src={post.image}
                  className="w-full h-72  object-cover "
                  alt="..."
                />
                <div className="md:absolute bottom-3">
                  <h5 className="card-title text-xl  text-black uppercase font-bold ">
                    {post.title}
                  </h5>
                  <div className=" space-x-3 mt-3">
                    <span className="bg-gray-200 p-1  rounded ">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="bg-gray-200 p-1  rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className=" flex items-center justify-center w-full mt-5">
            <Spinner className="flex justify-center w-30 h-20" />
          </div>
        )}
      </div>
      <FooterCom />
    </div>
  );
};

export default Home;
