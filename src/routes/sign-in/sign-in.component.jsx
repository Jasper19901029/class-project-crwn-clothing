import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // 跟資料庫連接時都要用async function
  const logGoogelUser = async () => {
    // 解構user
    const { user } = await signInWithGooglePopup();

    // 將user資料帶入
    createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogelUser}>
        Sign in with signInWithGooglePopup
      </button>
    </div>
  );
};

export default SignIn;
