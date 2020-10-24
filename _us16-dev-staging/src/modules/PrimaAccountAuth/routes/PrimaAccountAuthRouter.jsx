import React from "react";
import {Route, Switch} from "react-router-dom";
import RecaptchaLogin from "../pages/Login/RecaptchaLogin";
const PrimaAccountAuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/login" component={RecaptchaLogin} />
    </Switch>
  )
}

export default PrimaAccountAuthRouter;