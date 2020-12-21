import React from 'react'
import PropTypes from 'prop-types'
import { map, prop } from 'ramda'
import { Redirect, Switch } from 'react-router-dom'
import LateralMenuNavigation from '../components/LateralMenu/LateralMenuNavigation'
import MainDashboardLayout from '../pages/MainDashboardLayout'
import GuardedRoute from './GuardedRoute'
import { homePath } from '../constants'
import { ModalConfirmLeaveProvider } from '../contexts/ModalConfirmLeaveContext';

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
    <ModalConfirmLeaveProvider>
      <Switch>
        <Redirect exact from="/" to={homePath} />
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
    </ModalConfirmLeaveProvider>
  )
}

DashboardRouter.propTypes = {
  modules: PropTypes.array,
}

export default DashboardRouter
