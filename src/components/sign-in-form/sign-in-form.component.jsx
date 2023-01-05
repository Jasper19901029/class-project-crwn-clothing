import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
// 改 onAuthStateChangedListener 監聽， auth相關資料移到UserContext處理
// import { UserContext } from "../../contexts/user.context";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

// change to styled-components
// import "./sign-in-form.styles.scss";
import {
  SignUpContainer,
  SignUpTitle,
  ButtonContainer,
} from "./sign-in-form.styles";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // 改 onAuthStateChangedListener 監聽， auth相關資料移到UserContext處理
  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // 解構user
    // const { user } = await signInWithGooglePopup();
    // 改 onAuthStateChangedListener 監聽， auth相關資料移到UserContext處理
    await signInWithGooglePopup();
    // setCurrentUser(user); 改用onAuthStateChangedListener
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user); 改用onAuthStateChangedListener
      resetFormFields();
    } catch (error) {
      // switch (error.code) {
      //   // case "auth/user-not-found":
      //   //   alert("wrong email or password");
      //   //   break;
      //   // case "auth/wrong-password":
      //   //   alert("wrong email or password");
      //   //   break;
      //   // default:
      //   //   alert("something wrong");
      // }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <SignUpTitle>Already have an account?</SignUpTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          value={email}
          name="email"
          type="email"
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          required
          value={password}
          name="password"
          type="password"
          onChange={handleChange}
        />

        <ButtonContainer>
          <Button type="submit">Sign in</Button>
          <Button
            onClick={signInWithGoogle}
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}>
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
