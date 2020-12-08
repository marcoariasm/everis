import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Procedure from 'modules/GenericProcedures/pages/Procedure'
import StepOne from 'modules/GenericProcedures/pages/StepOne'
import StepTwo from 'modules/GenericProcedures/pages/StepTwo'
import StepTwo2 from 'modules/GenericProcedures/pages/StepTwo-with-beneficiaries'
import StepThree from 'modules/GenericProcedures/pages/StepThree'
const HomeRoute = () => {
  const { path } = useRouteMatch();


  return (
    <Switch>

      <Route exact path={`${path}/tramite/:id/paso-uno`} component={StepOne} />
      <Route exact path={`${path}/tramite/:id/paso-dos`} component={StepTwo} />
      <Route exact path={`${path}/tramite/:id/registrar-beneficiarios`} component={StepTwo2} />
      <Route exact path={`${path}/tramite/:id/paso-tres`} component={StepThree} />
      <Route exact path={`${path}/tramite/:id`} component={Procedure} />

    </Switch>
  );
};

export default HomeRoute;
