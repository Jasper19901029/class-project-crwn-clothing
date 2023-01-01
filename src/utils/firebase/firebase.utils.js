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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
  // 'login_hint': 'user@example.com'
});

// 身份驗證
export const auth = getAuth();

// 跳出新視窗登入
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// signInWithRedirect重新導向新頁面，登入後會重新mount整個web app
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// 指向firestore資料庫
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  // writeBatch: 批量處理
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  // 開始處理
  await batch.commit();
  console.log("done");
};

export const getCollectionAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// 登入後確認是否已經有存在的使用者,如果沒有則新增在firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  /** doc(first, second, third)中的paramert
   * first: 實例的database
   * second: database中的collection
   * third: collection中的data
   * 雖然目前firestore中沒有這些資料,但還是會生成
   */
  const userDocRef = doc(db, "users", userAuth.uid);

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
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
