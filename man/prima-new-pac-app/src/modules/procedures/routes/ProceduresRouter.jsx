import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import TramitesDetalle from "./../pages/procedure-detail/index";
import Tramites from "./../pages/procedure-list/index";
import Ejecutivos from "./../pages/executive-list/index";
import EjecutivoDetalle from "./../pages/executive-detail/index";
import SettingProcedureList from "./../pages/setting-procedure-list/index";
import SettingProcedureDetail from "./../pages/setting-procedure-detail/index";
import { ProcedureDetailContext } from "./UserProcedureDetailContext";
import { ROLE_ADMIN, ROLE_SUPERVISOR } from 'modules/procedures/constants/roles'

const Web = () => {
  const [procedureDetail, setProcedureDetail] = useState({});
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/detalles-tramites`} component={Tramites} />
      <RestrictedRoute exact path={`${path}/ejecutivos-list`}>
        <Ejecutivos />
      </RestrictedRoute>

      <RestrictedRoute exact path={`${path}/ejecutivos-list/:id`}>
        <EjecutivoDetalle />
      </RestrictedRoute>

      <RestrictedRoute  exact path={`${path}/tramites-setting`}>
        <SettingProcedureList/>
      </RestrictedRoute>
      <RestrictedRoute  exact path={`${path}/tramites-setting/:id`} >
        <SettingProcedureDetail/>
      </RestrictedRoute>
   
      <ProcedureDetailContext.Provider
        value={{ procedureDetail, setProcedureDetail }}
      >
        <Route
          path={`${path}/detalles-tramites/:id`}
          component={TramitesDetalle}
        />
      </ProcedureDetailContext.Provider>
    </Switch>
  );
};

function RestrictedRoute({ children, ...rest }) {
  const roles = JSON.parse(sessionStorage.getItem("roles"));
  const isAdmin = roles
    ? roles.roles.includes(ROLE_ADMIN) ||
      roles.roles.includes(ROLE_SUPERVISOR)
    : false;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/tramites/detalles-tramites/"
            }}
          />
        )
      }
    />
  );
}

export default Web;
