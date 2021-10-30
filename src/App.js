import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from './pages/homepage/homepage.component';

function Hats() {
  return <h1>Hats</h1>
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/shop/hats" component={Hats} exact />
      </Switch>
      
    </div>
  );
}

export default App;
