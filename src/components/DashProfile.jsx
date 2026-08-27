import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccessAction } from "../reduxStore/store";

const DashProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(
    currentUser.profilePicture || null
  );
  const [bio, setBio] = useState(currentUser.bio || "");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  async function onUpdatedUserFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    if (username) formData.append("username", username);
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (profilePicFile) formData.append("profilePic", profilePicFile);
    formData.append("bio", bio || "");

    if (formData.entries().next().done) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          body: formData,
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
        setProfilePicFile(null);
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col  items-center mt-20 ">
      <div className=" p-10 border rounded-md shadow-lg">
        <h1 className="font-bold text-center  mb-4 sm:text-xl">Profile</h1>
        <form
          onSubmit={onUpdatedUserFormSubmit}
          className=" flex items-center flex-col space-y-2 w-80"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border flex items-center justify-center bg-gray-200 text-gray-400">
            {profilePicPreview ? (
              <img
                src={profilePicPreview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-5xl">
                {currentUser.username?.split("")[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="rounded w-full text-sm"
          />
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
          <textarea
            className="rounded w-full"
            placeholder="Bio"
            defaultValue={currentUser.bio || ""}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
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
