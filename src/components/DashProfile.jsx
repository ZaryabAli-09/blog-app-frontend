import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccessAction } from "../reduxStore/store";

const DashProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser.username || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(
    currentUser.profilePicture || null
  );
  const [bio, setBio] = useState(currentUser.bio || "");

  useEffect(() => {
    setUsername(currentUser.username || "");
    setEmail(currentUser.email || "");
    setBio(currentUser.bio || "");
    if (!profilePicFile && currentUser.profilePicture) {
      setProfilePicPreview(currentUser.profilePicture);
    }
  }, [currentUser, profilePicFile]);

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
    if (username && username !== currentUser.username) formData.append("username", username);
    if (email && email !== currentUser.email) formData.append("email", email);
    if (password) formData.append("password", password);
    if (profilePicFile) formData.append("profilePic", profilePicFile);
    if (bio !== currentUser.bio) formData.append("bio", bio || "");

    if (formData.entries().next().done) {
      return setErrorMessage("No changes to update");
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
        setProfilePicPreview(data.data.profilePicture || null);
        setProfilePicFile(null);
        setPassword("");
        setErrorMessage("Updated user successfully");
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
    <div className="w-full flex flex-col items-center mt-20">
      <div className="p-10 border rounded-md shadow-lg">
        <h1 className="font-bold text-center mb-4 sm:text-xl">Profile</h1>
        <form
          onSubmit={onUpdatedUserFormSubmit}
          className="flex items-center flex-col space-y-3 w-80"
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 flex items-center justify-center bg-gray-200 text-gray-400 shadow-md">
            {profilePicPreview ? (
              <img
                src={profilePicPreview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl font-bold text-purple-600">
                {currentUser.username?.split("")[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <label className="cursor-pointer bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
          <input
            className="rounded w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none px-3 py-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="rounded w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="rounded w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none px-3 py-2"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />
          <input
            className="rounded w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none px-3 py-2"
            placeholder="New password (optional)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-sky-900 text-white font-semibold hover:bg-sky-800 p-2 rounded transition-colors"
          >
            {loading ? "Updating..." : "Update Profile"}
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
