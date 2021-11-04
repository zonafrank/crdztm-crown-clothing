import React, { useState } from "react";
import { connect } from "react-redux";
import {
  emailSignInStart, googleSignInStart
} from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input-component";
import "./signin.styles.scss";

function SignIn({ googleSignInStart, emailSignInStart }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = loginData;
    emailSignInStart(email, password);
    setLoginData({ email: "", password: "" })
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
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
