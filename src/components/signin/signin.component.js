import React, { useState } from "react";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input-component";
import "./signin.styles.scss";

function SignIn() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleGoogleSignIn(e) {
    e.preventDefault();
    signInWithGoogle()
      .then((response) => console.log)
      .catch((err) => console.log);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit button clicked.");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  console.log(loginData);
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={loginData.email}
          required
          id="email"
          handleChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          required
          id="password"
          handleChange={handleChange}
        />

        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton onClick={handleGoogleSignIn} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;