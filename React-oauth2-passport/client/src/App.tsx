import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Homepage } from "./Component/Homepage/Homepage";
import { LoginPage } from "./Component/LoginPage/LoginPage";
import NavBar from './Component/NavBar/NavBar';
import { myContext } from './Context';

function App() {
  const userObject = useContext(myContext);
  console.log(userObject);
  
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={Homepage} />
        {
          userObject
          ? null
          : (<Route path="/login" component={LoginPage} />)
        } 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
