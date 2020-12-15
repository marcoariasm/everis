import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home/index';

const HomeRouter = () => (
  <Switch>
    <Route path="/inicio" component={HomePage} />
  </Switch>
);

export default HomeRouter;
