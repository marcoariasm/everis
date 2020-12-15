import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import { isEmpty, isNil } from 'ramda';
import SharedModule from 'modules/shared';
import Login from '../pages/Login';

const { AppSession } = SharedModule.libs;

const AuthRouter = () => {
  const existSession = () => {
    const user = AppSession.getUser();
    return !isEmpty(user) && !isNil(user);
  };
  return (
    <Switch>
      <Route
        component={
          (props) => (
            (existSession())
              ? <Redirect to="/inicio" />
              : (
                <Route
                  exact
                  path="/login"
                  component={Login}
                  {...props}
                />
              )
          )
        }
      />
    </Switch>
  );
};

export default AuthRouter;
