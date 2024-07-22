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

  async function onUpdatedUserFormSubmit(e) {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };
    if (Object.keys(formData).length === 0) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
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

  return (
    <div className="w-full flex flex-col  items-center mt-20 ">
      <div className=" p-10 border rounded-md shadow-lg">
        <h1 className="font-bold text-center  mb-4 sm:text-xl">Profile</h1>
        <form
          onSubmit={onUpdatedUserFormSubmit}
          className=" flex items-center flex-col space-y-2 w-80"
        >
          <div className="w-20 rounded-full text-gray-400 bg-gray-200 overflow-hidden border h-20 flex items-center justify-center ">
            <div className="text-5xl ">
              {currentUser.username.split("")[0].toUpperCase()}
            </div>
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
