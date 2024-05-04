import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccessAction } from "../reduxStore/store";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase.js";

const DashProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // firebase states
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [onProfileImg, setOnProfileImg] = useState(false);

  async function onUpdatedUserFormSubmit(e) {
    e.preventDefault();
    if (!imageFileUrl) {
      setImageFileUrl(currentUser.profilePicture);
    }
    setOnProfileImg(false);

    const formData = {
      username,
      email,
      password,
      profilePicture: imageFileUrl,
    };
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${window.location.origin}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        setErrorMessage(data.message);
      }
      if (response.ok) {
        setLoading(false);
        dispatch(signInSuccessAction.updateUser(data.data));
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  async function uploadImage() {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
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
          setImageFileUrl(downloadURL);
        });
      }
    );
  }
  function profileImgClickHandler() {
    setOnProfileImg(!onProfileImg);
  }

  return (
    <div className="w-full flex flex-col  items-center mt-20 ">
      <div className=" p-10 border rounded-md shadow-lg">
        <h1 className="font-bold text-center  mb-4 sm:text-xl">Profile</h1>
        <form
          onSubmit={onUpdatedUserFormSubmit}
          className=" flex items-center flex-col space-y-2 w-80"
        >
          <div className={onProfileImg ? "visible" : "hidden"}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div
            className="w-20 rounded-full overflow-hidden border h-20 flex items-center justify-center cursor-pointer"
            onClick={profileImgClickHandler}
          >
            <img
              src={imageFileUrl || currentUser.profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              alt=""
              className={
                imageFile && imageFileUploadProgress < 100
                  ? `opacity-20`
                  : "opacity-100"
              }
            />
          </div>
          <input
            className="rounded w-full"
            type="text"
            defaultValue={currentUser.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="rounded w-full"
            type="email"
            defaultValue={currentUser.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded w-full"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-sky-900 text-white font-semibold hover:bg-sky-800 p-2 rounded"
          >
            {loading ? "Loading..." : "Update"}
          </button>

          {errorMessage ? (
            <div
              className={`p-2 ${
                errorMessage === "Updated user successfully"
                  ? "bg-green-400"
                  : "bg-red-400"
              } text-white w-full rounded text-center bg-opacity-70`}
            >
              {errorMessage}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default DashProfile;
