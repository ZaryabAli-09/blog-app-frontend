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
  const confirmationDialogRef = useRef(null);

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
        console.log(data);
        setSpinner(false);
        setFetchedPosts(data.posts);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
      if (!res.ok) {
        setSpinner(false);
        console.log(data);
        return;
      }
    } catch (error) {
      setSpinner(false);
      console.log(error.message);
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
      console.log(error.message);
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
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto w-full ">
      <div className="lg:mx-20 mt-1 mb-10 ">
        <table className="min-w-full table-auto whitespace-nowrap  shadow-lg border rounded ">
          <thead className="text-left font-semibold text-gray-500 text-md uppercase bg-gray-100">
            <tr>
              <th className=" px-3 py-3">UPDATED</th>
              <th className=" px-3 py-3">IMAGE</th>
              <th className=" px-3 py-3">POST TITLE</th>
              <th className=" px-3 py-3">CATEGORY</th>
              <th className=" px-3 py-3">DELETE</th>
              <th className=" px-3 py-3">EDIT</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.isAdmin && fetchedPosts.length > 0 ? (
              fetchedPosts.map((post, i) => {
                return (
                  <tr
                    key={i}
                    className=" text-sm hover:bg-gray-200 border cursor-pointer"
                  >
                    <td className=" px-3 py-3">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className=" px-3 py-3">
                      <img
                        className="w-20 h-10 object-cover"
                        src={post.image}
                        alt="post-image"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="hover:text-blue-500 hover:underline "
                        onClick={() => navigate(`/post/${post.slug}`)}
                      >
                        {post.title}
                      </span>
                    </td>
                    <td className=" px-3 py-3">{post.category}</td>
                    <td className=" px-3 py-3 ">
                      <span
                        onClick={() => {
                          setPostId(post._id);
                          setOnPostDelete(true);
                        }}
                        className="text-red-500 cursor-pointer "
                      >
                        <MdDelete className="text-lg hover:text-xl " />
                      </span>
                    </td>
                    <td className=" px-3 py-3">
                      <Link
                        to={`/edit-post/${post._id}`}
                        className="text-blue-500 "
                      >
                        <FaEdit className="text-lg hover:text-xl " />
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : fetchedPosts && fetchedPosts.length <= 0 ? (
              <div className="text-center p-3">No posts</div>
            ) : (
              <div className=" flex justify-center   my-5 ">
                <Spinner className="w-10 h-10" />
              </div>
            )}
          </tbody>
        </table>

        <div className="w-full flex justify-center">
          {showMore && (
            <button
              className="underline text-teal-500 self-center "
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
