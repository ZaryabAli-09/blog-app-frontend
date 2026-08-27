import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  async function publishPostHandler(e) {
    e.preventDefault();
    if (!file) {
      return setImageFileUploadError("Please provide image file");
    }
    if (!title || !category || !content) {
      return setErrorMessage("please fill all the required fields");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts/create`,
        {
          method: "POST",

          body: formData,
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setLoading(false);

        setTimeout(() => {
          navigate(`/post/${data.slug}`);
        }, 1000);
        return setErrorMessage("Post published successfully");
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

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">Create a post</h1>
      <form className="flex flex-col gap-5 mt-2">
        <div className="flex flex-col gap-3 sm:flex-row justify-between">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            required
            id="title"
            className="rounded sm:w-full border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
          />
          <select
            required
            className="rounded border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="uncategorized">Select category</option>
            <option value="general">General</option>
            <option value="inspiration">Inspiration</option>
            <option value="technology">Technology</option>
            <option value="reactjs">React JS</option>
            <option value="mongodb">Mongo DB</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border border-purple-200 p-4 rounded-lg bg-purple-50">
          <input
            required
            accept="image/*"
            type="file"
            onChange={(e) => {
              if (e.target.files[0].type.split("/")[0] !== "image") {
                return setImageFileUploadError("Please provide image");
              }

              setFile(e.target.files[0]);
            }}
            className="rounded bg-white p-2 border border-gray-200"
          />
        </div>
        {imageFileUploadError ? (
          <div className="text-white bg-red-400 p-2 w-full rounded text-center bg-opacity-70 ">
            {imageFileUploadError}
          </div>
        ) : (
          ""
        )}
        <ReactQuill
          required
          onChange={(value) => setContent(value)}
          className="h-72 bg-white rounded-lg border border-gray-300"
          theme="snow"
          placeholder="write something here"
        />
        <button
          className="w-full bg-purple-600 mt-6 p-3 text-white rounded hover:bg-purple-700 transition-colors font-semibold"
          onClick={publishPostHandler}
        >
          {loading ? <Spinner className="inline mr-2" size="sm" /> : null}
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
      {errorMessage ? (
        <div
          className={`p-2 mt-4 ${
            errorMessage === "Post published successfully"
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-red-100 text-red-700 border border-red-400"
          } text-white w-full rounded text-center bg-opacity-70`}
        >
          {errorMessage}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreatePost;
