import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import modules from 'modules/shared';

const { Roles: { show } } = modules.libs;

const PrivateRoute = ({ component: Component, section, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (show(section)) {
        return <Component {...props} />
      }
      return <Redirect to="/inicio" />;
    }}
  />
);

export default PrivateRoute;
