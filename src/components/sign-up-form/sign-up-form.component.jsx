import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import {
  createAuthWithUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

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
      const { user } = await createAuthWithUserWithEmailAndPassword(
        email,
        password
      );
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
    <div>
      <h1>Sign Up With Email and Password</h1>
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
