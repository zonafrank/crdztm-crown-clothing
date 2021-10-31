import React from "react";
import SignIn from "../../components/signin/signin.component";
import SignUp from "../../components/signup/signup.component";
import "./signin-and-signup.styles.scss";


function SignInAndSignUpPage() {
  return <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>;
}

export default SignInAndSignUpPage;
