// Import the functions you need from the SDKs you need
// firebase庫是整個firebase的功能,所以import initializeApp時要選擇初始化的位置firebase/app
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 登入驗證功能是在firebase/auth內
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// firebase的設定,這邊使用的apiKey是公鑰,所以公開在客戶端沒關係,但要記得在firebase中的設定要注意,才不會被別人使用
const firebaseConfig = {
  apiKey: "AIzaSyBHH88eE27W2OFFiuz-uzYBURsaIO3lIyw",
  authDomain: "crwn-clothing-db-aacce.firebaseapp.com",
  projectId: "crwn-clothing-db-aacce",
  storageBucket: "crwn-clothing-db-aacce.appspot.com",
  messagingSenderId: "739258302508",
  appId: "1:739258302508:web:56e5c50b6a163fb23b9189",
};

// 初始化 Firebase
const firebaseApp = initializeApp(firebaseConfig);

// 實例一個新的Google帳號登入驗證
const googleProvider = new GoogleAuthProvider();

// Google登入驗證設定, 選擇一個帳號(單純google登入的介面要求)
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// 身份驗證
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// signInWithRedirect會重新開啟一個頁面，登入後會重新mount整個web app
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// 指向firestore資料庫
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  /** doc(first, second, third)中的paramert
   * first: 實例的database
   * second: database中的collection
   * third: collection中的data
   * 雖然目前firestore中沒有這些資料,但還是會生成
   */
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  // 讀取firestore資料,doc網址:https://firebase.google.com/docs/reference/js/firestore_#getdoc
  // getDoc(檔案的位置reference)
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot, userSnapshot.exists());

  // 如果不存在,則會新增一個新的user
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
