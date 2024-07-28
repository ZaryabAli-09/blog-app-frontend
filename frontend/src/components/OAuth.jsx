import React from "react";
import fireAPP from "../firebase.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { signInSuccessAction } from "../reduxStore/store.js";
const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(fireAPP);
  async function handleGoogleAuth(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const formData = {
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlePhotoUrl: resultFromGoogle.user.photoURL,
      };
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/googleAuth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccessAction.signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      className="bg-green-900 hover:bg-green-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm"
      onClick={handleGoogleAuth}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;
