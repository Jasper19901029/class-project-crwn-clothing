import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
// setCurrentUser(user); 改用onAuthStateChangedListener
// import { UserContext } from "../../contexts/user.context";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// change to styled-components
// import "./sign-up-form.styles.scss";
import { SignUpContainer, SignUpTitle } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // setCurrentUser(user); 改用onAuthStateChangedListener
  // const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user); 改用onAuthStateChangedListener
      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("email already in use");
      }
      console.log("error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <SignUpTitle>Don't have an account?</SignUpTitle>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          value={displayName}
          name="displayName"
          type="text"
          onChange={handleChange}
        />

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

        <FormInput
          label="Comfirm Password"
          required
          value={confirmPassword}
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
