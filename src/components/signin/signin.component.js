import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input-component";
import "./signin.styles.scss";

function SignIn() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleGoogleSignIn(e) {
    e.preventDefault();
    signInWithGoogle()
      .then((response) => {
        console.log(response)
        setLoginData({email: "", password: ""})
      })
      .catch((err) => console.log);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = loginData;

    try {
      await auth.signInWithEmailAndPassword(email, password)
      setLoginData({email: "", password: ""})
    } catch (error) {
      console.log(error) 
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

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
          id="login-email"
          handleChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          required
          id="login-password"
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
