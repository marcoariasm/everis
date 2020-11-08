 import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//custom components
import RecaptchaLogin from "../pages/Login/RecaptchaLogin";
import AppSession from "modules/shared/libs/AppSession";
import Advisory from "modules/Retirement955/pages/Advisory";

const AuthRouter = () => {
  const {user} = useSelector(state => state.auth);
  const session = AppSession.get();
  const hasSession = (!session || Object.keys(session).length === 0 || session.errorCode) ? false:true;

  return (
    <Switch>
      <Route
        component={
          (props) => (hasSession) ? <Redirect to='/inicio'/> :<Route path="/login" component={RecaptchaLogin}/>
        }
      />

      {
        /*
        <Route
        component={
          (props) => (user || hasSession) ? <Redirect to='/'/> : <RecaptchaLogin {...props} />
        }
      />
        * */
      }

    </Switch>
  )
}

export default AuthRouter;