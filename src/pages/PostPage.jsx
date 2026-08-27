import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FooterCom from "../components/Footer";
import { Spinner } from "flowbite-react";

const PostPage = () => {
  const navigate = useNavigate();
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
      } catch (error) {
        // silent
      }
    };

    fetchPost();
    fetchRecentPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full mt-20">
        <Spinner className="w-10 h-10 text-purple-600" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Post not found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mt-6 mb-4 text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2 transition-colors"
          >
            <span>&larr;</span> Back
          </button>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-8 mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                {post.author?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {post.author?.username || "Anonymous"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <span className="ml-auto bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-medium">
              {post.category.toUpperCase()}
            </span>
          </div>

          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-[500px] object-cover rounded-2xl mb-10 shadow-lg"
          />

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-purple-600 pl-4">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts &&
              recentPosts.map((recentPost, i) => (
                <div
                  key={i}
                  onClick={() => {
                    navigate(`/post/${recentPost.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      src={recentPost.image}
                      alt={recentPost.title}
                    />
                    <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {recentPost.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                      {recentPost.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {new Date(recentPost.createdAt).toLocaleDateString()}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {recentPost.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <FooterCom />
    </>
  );
};

export default PostPage;
