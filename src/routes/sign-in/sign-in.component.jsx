// comment的部分是練習用的
// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  /* 練習用重新導向到新的頁面登入
  * 在useEffect中,async function要在useEffect中建立一個新的function再重新呼叫
  useEffect(() => {
    const asyncInUseEffectNeedToDoThis = async () => {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };
    asyncInUseEffectNeedToDoThis();
  }, []);
*/
  // 跟資料庫連接時都要用async function
  const logGoogelUser = async () => {
    // 解構user
    const { user } = await signInWithGooglePopup();
    console.log(user);
    // 將user資料帶入
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogelUser}>
        Sign in with signInWithGooglePopup
      </button>
      {/*練習用 <button onClick={signInWithGoogleRedirect}>
        Sign in with signInWithGoogleRedirect
      </button> */}
    </div>
  );
};

export default SignIn;
