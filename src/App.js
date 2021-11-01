import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import { setCurrentUser } from "./redux/user/user.actions";


function App(props) {
  const {setCurrentUser} = props;
  
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribeFromAuth();
  }, [setCurrentUser]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/signin" render={() => props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage  />)} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

const mapStateToProps = ({user}) => {
  return {currentUser: user.currentUser};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
