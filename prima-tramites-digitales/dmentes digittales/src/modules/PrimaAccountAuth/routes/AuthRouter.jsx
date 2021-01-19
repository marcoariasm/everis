import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AppSession from 'modules/shared/libs/AppSession';
import RecaptchaLogin from '../pages/Login/RecaptchaLogin';

const AuthRouter = () => {
  const session = AppSession.get();
  const hasSession = !((!session || Object.keys(session).length === 0 || session.errorCode));

  return (
    <Switch>
      <Route
        component={
          () => ((hasSession) ? <Redirect to="/inicio" /> : <Route path="/login" component={RecaptchaLogin} />)
        }
      />
    </Switch>
  );
};

export default AuthRouter;
