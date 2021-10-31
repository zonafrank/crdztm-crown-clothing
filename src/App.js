import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from './components/header/header.component';
import { auth } from "./firebase/firebase.utils";
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signin-and-signup/signin-and-signup.component';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return () => unsubscribeFromAuth();
  }, [])

  useEffect(() => {
    if (!currentUser) {

    }
  }, [currentUser])

  console.log(currentUser)
  
  return (
    <div className="App">
      <Header currentUser={currentUser} />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUpPage} />
      </Switch>
      
    </div>
  );
}

export default App;
