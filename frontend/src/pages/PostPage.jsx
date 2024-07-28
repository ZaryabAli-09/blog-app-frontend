import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FooterCom from "../components/Footer";

const PostPage = () => {
  const navigate = useNavigate();
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/getposts?slug=${postSlug}`
        );
        const data = await res.json();
        if (res.ok) {
          setPost(data.posts[0]);
        }
        if (!res.ok) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRecentPost = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/getposts?limit=3`
        );
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
        if (!res.ok) {
          console.log(data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
    fetchRecentPost();
  }, [postSlug]);
  return (
    <>
      <div className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        {" "}
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>{" "}
        <img
          src={post && post.image}
          alt={post && post.title}
          className="mt-10 p-3 max-h-[600px] w-full object-cover"
        />
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
      </div>

      <h1 className="ml-20 text-2xl font-semibold w-auto  p-5 rounded-md relative top-2 text-black">
        Recent Articles
      </h1>
      <div className=" flex flex-col items-center justify-between py-5 px-20 sm:flex-row sm:px-2 ">
        {recentPosts &&
          recentPosts.map((post, i) => {
            return (
              <div
                key={i}
                className="card w-full overflow-hidden shadow-gray-400 shadow-lg   text-gray-500 h-80  flex flex-col items-center justify-center m-2 rounded hover:cursor-pointer uppercase "
                onClick={() => {
                  navigate(`/post/${post.slug}`), window.scrollTo(0, 0);
                }}
              >
                <img
                  className="w-full h-60 object-cover bg-gray-100  sm:h-60 sm:w-full sm:object-cover"
                  src={post.image}
                  alt={post.title}
                />
                <h1 className="text-center text-md mt-1">{post.title}</h1>
                <div className="w-full p-2 flex justify-between items-center text-gray-500 ">
                  <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                  <div>{post.category}</div>
                </div>
              </div>
            );
          })}
      </div>
      <FooterCom />
    </>
  );
};

export default PostPage;
