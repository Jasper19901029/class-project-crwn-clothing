// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHH88eE27W2OFFiuz-uzYBURsaIO3lIyw",
  authDomain: "crwn-clothing-db-aacce.firebaseapp.com",
  projectId: "crwn-clothing-db-aacce",
  storageBucket: "crwn-clothing-db-aacce.appspot.com",
  messagingSenderId: "739258302508",
  appId: "1:739258302508:web:56e5c50b6a163fb23b9189",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
