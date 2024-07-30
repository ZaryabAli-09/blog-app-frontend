// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "techscrollblog.firebaseapp.com",
  projectId: "techscrollblog",
  storageBucket: "techscrollblog.appspot.com",
  messagingSenderId: "361345055475",
  appId: "1:361345055475:web:e9a277e5976ddf01f35586",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
