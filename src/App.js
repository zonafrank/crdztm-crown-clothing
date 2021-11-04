import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.css";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

function App(props) {
  const { checkUserSession } = props;
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckoutPage} exact />
        <Route
          exact
          path="/signin"
          render={() =>
            props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
