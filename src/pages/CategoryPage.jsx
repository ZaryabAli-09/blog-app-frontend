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
        } else {
          console.log("Error fetching category posts");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [category]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 ml-4 text-purple-600">
        {category.toUpperCase()}{" "}
      </h1>
      {loading ? (
        <div className="flex items-center justify-center w-full mt-5">
          <Spinner className="flex justify-center w-30 h-20" />
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
                className="p-5 bg-white hover:opacity-80 transition-opacity duration-300 relative hover:cursor-pointer rounded-lg overflow-hidden shadow-lg transform hover:scale-105"
              >
                <img
                  src={post.image}
                  className="w-full h-48 object-cover"
                  alt={post.title}
                />
                <div className="p-4">
                  <h5 className="card-title text-lg font-semibold text-gray-900 mb-2 ">
                    {post.title}
                  </h5>
                  <p
                    className="text-sm text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: post.content.slice(0, 100),
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {post.category}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
