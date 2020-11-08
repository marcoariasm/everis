import React from "react";
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import DashboardHome from "../pages/DashboardHome";
import Menu from "../pages/Menu";
import NewProcedureAffiliate from "../pages/NewProcedureAffiliate";
import ValidateAffiliate from "../pages/ValidateAffiliate";
const HomeRoute = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path= {`${path}`} component={DashboardHome} />
      <Route exact path={`${path}/menu`} component={Menu} />
      <Route
        exact
        path={`${path}/validar-afiliado`}
        component={ValidateAffiliate}
      />
      <Route
        exact
        path={`${path}/nueva-solicitud/afiliado`}
        component={NewProcedureAffiliate}
      />
    </Switch>
  );
};

export default HomeRoute;
