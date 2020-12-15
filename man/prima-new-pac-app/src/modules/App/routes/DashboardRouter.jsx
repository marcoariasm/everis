import React from 'react';
import PropTypes from 'prop-types';
import { map, prop } from 'ramda';
import { Redirect, Switch } from 'react-router-dom';
import LateralMenuNavigation from '../components/LateralMenu/LateralMenuNavigation';
import MainDashboardLayout from '../pages/MainDashboardLayout';
import GuardedRoute from './GuardedRoute';

const DashboardRouter = ({ modules = [] }) => {
  const renderComponent = (component) => {
    const ComponentTag = component;
    return <ComponentTag />;
  };
  const layoutComponent = (module) => (
    <MainDashboardLayout
      lateralMenu={(
        <LateralMenuNavigation
          path={prop('pathBase', module)}
          navItems={prop('navigationItems', module)}
          key={prop('pathBase', module)}
        />
      )}
    >
      { renderComponent(prop('componentRouter', module)) }
    </MainDashboardLayout>
  );
  return (
    <Switch>
      <Redirect exact from="/" to="/inicio" />
      {
        map(
          (module) => (
            <GuardedRoute
              path={prop('pathBase', module)}
              key={prop('pathBase', module)}
              component={() => layoutComponent(module)}
            />
          ),
          modules,
        )
      }
    </Switch>
  );
};

DashboardRouter.propTypes = {
  modules: PropTypes.array,
};

export default DashboardRouter;
