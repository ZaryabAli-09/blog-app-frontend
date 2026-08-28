import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

const EditPost = () => {
  const navigate = useNavigate();
  const param = useParams();
  const postId = param.postId;
  const currentUser = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(null);

  const PLACEHOLDER_IMAGE = "https://via.placeholder.com/800x400?text=No+Image";

  async function publishPostHandler(e) {
    e.preventDefault();
    if (!title || !category || !content) {
      return setErrorMessage("please fill all the required fields");
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/editpost/${postId}/${
          currentUser._id
        }`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setErrorMessage("Post updated successfully");
        setTimeout(() => {
          navigate(`/post/${data.slug}`);
        }, 1000);
      }
      if (!response.ok) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      return setErrorMessage(error.message);
    }
  }
  useEffect(() => {
    async function getSpecifcPost() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/getposts?postId=${postId}`
        );
        const data = await res.json();
        if (res.ok) {
          setCategory(data.posts[0].category);
          setContent(data.posts[0].content);
          setPreview(data.posts[0].image || PLACEHOLDER_IMAGE);
          setTitle(data.posts[0].title);
        }
      } catch (error) {
        // silent
      }
    }
    getSpecifcPost();
  }, [postId]);

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
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.split("/")[0] !== "image") {
        return setImageError("Please provide an image file");
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setImageError(null);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">Edit a post</h1>
      <form onSubmit={publishPostHandler} className="flex flex-col gap-5 mt-2">
        <div className="flex flex-col gap-3 sm:flex-row justify-between">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            required
            id="title"
            className="rounded sm:w-full border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
          />
          <select
            value={category}
            required
            className="rounded border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {categoriesLoading && (
          <p className="text-sm text-gray-500">Loading categories...</p>
        )}

        <div className="flex flex-col gap-3">
          <label className="cursor-pointer bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors w-fit">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {imageError && (
            <div className="text-red-500 text-sm">{imageError}</div>
          )}
          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img
              src={preview || PLACEHOLDER_IMAGE}
              alt="Preview"
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>
        </div>

        <ReactQuill
          value={content}
          required
          onChange={(value) => setContent(value)}
          className="h-72 bg-white rounded-lg border border-gray-300"
          theme="snow"
          placeholder="write something here"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 mt-6 p-3 text-white rounded hover:bg-purple-700 transition-colors font-semibold"
        >
          {loading ? <Spinner className="inline mr-2" size="sm" /> : null}
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
      {errorMessage && (
        <div
          className={`p-2 mt-4 ${
            errorMessage === "Post edited successfully"
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-red-100 text-red-700 border border-red-400"
          } text-white w-full rounded text-center bg-opacity-70`}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default EditPost;
