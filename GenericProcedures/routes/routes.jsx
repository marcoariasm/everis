import React from 'react';
import {Route} from 'react-router-dom';
import Home from '../pages/Home/Home';

const route = {
  path: '/home',
  component: Home,
}

const HomeRoute = () => <Route path={route.path} component={route.component} /> 

export default HomeRoute;