import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../pages/ApplicantLogin';
import CreateAccount from '../pages/ApplicantCreateAccount';
import ResendVerification from '../pages/ResendVerification';
import ApplicantDetailsForm from '../pages/ApplicantDetailsForm';
import RecoverPassword from '../pages/RecoverPassword';
import Welcome from '../pages/Welcome';

const route = {
  path: '/login-solicitante',
  component: Login,
}

const LoginRoute = () => (
  <Switch>
    <Route path={'/bienvenido'} component={Welcome} />
    <Route exact path={route.path} component={route.component} /> 
    <Route path={'/crear-cuenta'} component={CreateAccount} /> 
    <Route path={'/reenviar-verificacion'} component={ResendVerification} /> 
    <Route path={'/completar-registro'} component={ApplicantDetailsForm} /> 
    <Route path={'/recuperar-contrasena'} component={RecoverPassword} />
  </Switch>
);

export default LoginRoute;