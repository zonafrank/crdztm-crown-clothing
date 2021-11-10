import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Header from "./components/header/header.component";
import WithSpinner from "./components/with-spinner/with-spinner.component";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/signin-and-signup/signin-and-signup.component")
);

function App(props) {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  console.log(currentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<WithSpinner />}>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/shop" component={ShopPage} />
            <Route path="/checkout" component={CheckoutPage} exact />
            <Route
              exact
              path="/signin"
              render={() =>
                props.currentUser ? (
                  <Redirect to="/" />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
