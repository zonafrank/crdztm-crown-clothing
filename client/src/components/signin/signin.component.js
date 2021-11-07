import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart
} from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input-component";
import "./signin.styles.scss";

function SignIn() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const history = useHistory();
  
  const loggedInUser = useSelector(selectCurrentUser)
  

  if (loggedInUser) {
    history.push("/")
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = loginData;
    dispatch(emailSignInStart({ email, password }));
    setLoginData({ email: "", password: "" });
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
            onClick={() => dispatch(googleSignInStart)}
            isGoogleSignIn
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
