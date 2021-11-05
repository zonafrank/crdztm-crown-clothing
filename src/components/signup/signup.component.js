import React, { useState } from "react";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input-component";
import "./signup.styles.scss";

function SignUp({ signUpStart }) {
  const [state, setState] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (state.password !== state.confirmPassword) {
      alert("password and confirm password do not match");
      return;
    }

    signUpStart({
      displayName: state.displayName,
      email: state.email,
      password: state.password,
    });
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={state.displayName}
          onChange={handleChange}
          label="Display Name"
          id="displayName"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          label="Email"
          id="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          label="Password"
          id="password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          id="confirmPassword"
          required
        />

        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
