import React from 'react';
import { isEmpty, isNil } from 'ramda';
import { Redirect, Route } from 'react-router-dom';
import SharedModule from 'modules/shared/index';

const { libs: { AppSession } } = SharedModule;

const GuardedRoute = ({ component: Component, ...rest }) => {
  const existSession = () => {
    const user = AppSession.get();
    return !isEmpty(user) && !isNil(user);
  };

  const validator = (props) => (
    !existSession() ? <Redirect to="/bienvenido" /> : <Component {...props} />
  );
  return (
    <Route
      {...rest}
      render={validator}
    />
  );
};

export default GuardedRoute;
