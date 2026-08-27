// CategoryPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/posts/getposts?category=${category}`
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (err) {
        // silent
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [category]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-purple-600 border-l-4 border-purple-600 pl-4 capitalize">
        {category}
      </h1>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-20">
          <Spinner className="w-10 h-10 text-purple-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                onClick={() => {
                  navigate(`/post/${post.slug}`);
                }}
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
                  />
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
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">No posts found in this category.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
