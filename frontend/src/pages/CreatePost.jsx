import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import app from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [uploadBtnClick, setUploadBtnClick] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // firebase image uplaod
  const [fileUrl, setFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  async function uploadImageHandler(e) {
    e.preventDefault();
    if (!file) {
      return setImageFileUploadError("Please provide image file");
    }

    setImageFileUploadError(null);
    setUploadBtnClick(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("could not upload image (file must be 5MB)");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
          setUploadBtnClick(false);
        });
      }
    );
  }

  async function publishPostHandler(e) {
    e.preventDefault();
    if (!title || !category || !fileUrl || !content) {
      return setErrorMessage("please fill all the required fields");
    }
    const formData = {
      title,
      category,
      image: fileUrl,
      content,
    };
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
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
      <h1 className="text-center text-3xl font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4 mt-2">
        <div className="flex flex-col gap-2 sm:flex-row justify-between">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            required
            id="title"
            className="rounded sm:w-full"
          />
          <select
            required
            className="rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="uncategorized">Select category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React js</option>
            <option value="mongodb">Mongo DB</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border border-sky-900 p-3 rounded">
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
            className="rounded bg-sky-300 p-2"
          />
          <button
            onClick={uploadImageHandler}
            className="p-2 rounded border-black border font-bold text-sm  hover:bg-sky-700 hover:text-white"
          >
            {uploadBtnClick && imageFileUploadProgress < 100
              ? "uploading..."
              : "Upload Image"}
          </button>
        </div>
        {imageFileUploadError ? (
          <div className="text-white bg-red-400 p-2 w-full rounded text-center bg-opacity-70 ">
            {imageFileUploadError}
          </div>
        ) : (
          ""
        )}

        {fileUrl ? <img src={fileUrl} alt="" /> : ""}
        <ReactQuill
          required
          onChange={(value) => setContent(value)}
          className="h-72"
          theme="snow"
          placeholder="write something here"
        />
        <button
          className="w-full bg-sky-900 mt-10 p-3 text-white rounded hover:bg-sky-800"
          onClick={publishPostHandler}
        >
          {loading ? "loading..." : "Publish"}
        </button>
      </form>
      {errorMessage ? (
        <div
          className={`p-2 mt-1 ${
            errorMessage === "Post published successfully"
              ? "bg-green-400"
              : "bg-red-400"
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
