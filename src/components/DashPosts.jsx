import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Spinner } from "flowbite-react";
import ConfirmationDialog from "./ConfirmationDialog";
const DashPosts = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [postId, setPostId] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [onPostDelete, setOnPostDelete] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState({});
  const confirmationDialogRef = useRef(null);

  const toggleFeatured = async (postId) => {
    try {
      setFeaturedLoading((prev) => ({ ...prev, [postId]: true }));
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/featured/${postId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFetchedPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, featured: !post.featured }
              : post
          )
        );
      }
    } catch (error) {
      // silent
    } finally {
      setFeaturedLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  useEffect(() => {
    if (onPostDelete && confirmationDialogRef.current) {
      confirmationDialogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [onPostDelete]);
  const fetchPost = async () => {
    try {
      setSpinner(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/getposts`
      );
      const data = await res.json();
      if (res.ok) {
        setSpinner(false);
        setFetchedPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
      if (!res.ok) {
        setSpinner(false);
        return;
      }
    } catch (error) {
      setSpinner(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  async function handleShowMore(e) {
    e.preventDefault();
    const startIndex = fetchedPosts.length;
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/posts/getposts?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setFetchedPosts((prev) => [...prev, ...data.posts]);
      }
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (error) {
      // silent
    }
  }

  const deletePostHandler = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/deletepost/${postId}/${
          currentUser._id
        }`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFetchedPosts((prev) => prev.filter((post) => post._id !== postId));
      }
      if (!res.ok) {
        setSpinner(false);
      }
    } catch (error) {
      // silent
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="lg:mx-20 mt-1 mb-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full table-auto whitespace-nowrap">
            <thead className="text-left font-semibold text-gray-500 text-sm uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Post Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUser.isAdmin && fetchedPosts.length > 0 ? (
                fetchedPosts.map((post, i) => {
                  return (
                    <tr key={i} className="text-sm border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <img
                          className="w-20 h-12 object-cover rounded-lg"
                          src={post.image}
                          alt="post-image"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-purple-600 font-medium hover:underline cursor-pointer"
                          onClick={() => navigate(`/post/${post.slug}`)}
                        >
                          {post.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleFeatured(post._id)}
                          disabled={featuredLoading[post._id]}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                            post.featured
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {featuredLoading[post._id]
                            ? "..."
                            : post.featured
                            ? "Yes"
                            : "No"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            onClick={() => {
                              setPostId(post._id);
                              setOnPostDelete(true);
                            }}
                            className="text-red-500 cursor-pointer hover:text-red-700 transition-colors"
                          >
                            <MdDelete className="text-lg" />
                          </span>
                          <Link
                            to={`/edit-post/${post._id}`}
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <FaEdit className="text-lg" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : fetchedPosts && fetchedPosts.length <= 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-8 text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg font-medium">No posts found</p>
                      <p className="text-sm text-gray-400">Create your first post to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-8">
                    <Spinner className="w-8 h-8 text-purple-600 mx-auto" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-center mt-6">
          {showMore && (
            <button
              className="text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center gap-2"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </div>
      </div>
      <div ref={confirmationDialogRef} className="w-96 mx-auto mb-10">
        {onPostDelete && (
          <ConfirmationDialog
            message={"Are you sure you want to delete this post?"}
            onCancel={() => setOnPostDelete(false)}
            onConfirm={() => {
              currentUser.isAdmin && deletePostHandler();
              setPostId("");
              setOnPostDelete(false);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default DashPosts;
