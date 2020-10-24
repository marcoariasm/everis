import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProceduresList from 'modules/GenericProcedures/pages/ProceduresList'
import ProceduresWithBeneficiaries from 'modules/GenericProcedures/pages/ProceduresWithBeneficiaries'
import ProceduresWithoutBeneficiaries from 'modules/GenericProcedures/pages/ProceduresWithoutBeneficiaries'
// import StepOne from 'modules/GenericProcedures/pages/WithoutBeneficiaries/StepOne'
// import StepTwo from 'modules/GenericProcedures/pages/WithoutBeneficiaries/StepTwo'
//import StepOneBeneficiaries from 'modules/GenericProcedures/pages/WithBeneficiaries/StepOne'
//import StepTwoBeneficiaries from 'modules/GenericProcedures/pages/WithBeneficiaries/StepTwo'
// import StepThree from 'modules/GenericProcedures/pages/WithBeneficiaries/StepThree'
import Procedure from 'modules/GenericProcedures/pages/Procedure'
import StepOne from 'modules/GenericProcedures/pages/StepOne'
import StepTwo from 'modules/GenericProcedures/pages/StepTwo'
import StepThree from 'modules/GenericProcedures/pages/StepThree'
const HomeRoute = () => {
  const { path } = useRouteMatch();


  return (
    <Switch>
      {/* <Route exact path={`${path}`}"/new-procedure/" component={ProceduresWithBeneficiaries} /> */}
      {/* <Route exact path={`${path}/con-beneficiarios`}component={ProceduresWithBeneficiaries} />
      <Route exact path={`${path}/sin-beneficiarios/:user`}component={ProceduresWithoutBeneficiaries} />
      <Route exact path={`${path}/sin-beneficiarios/paso-uno`} component={StepOne} />
      <Route exact path={`${path}/sin-beneficiarios/paso-dos`} component={StepTwo} />
      <Route exact path={`${path}/con-beneficiarios/paso-uno`} component={StepOneBeneficiaries} />
      <Route exact path={`${path}/con-beneficiarios/paso-dos`} component={StepTwoBeneficiaries} />
      <Route exact path={`${path}/con-beneficiarios/paso-tres`} component={StepThree} /> */}

      <Route exact path={`${path}/paso-uno/tramite`} component={StepOne} />
      <Route exact path={`${path}/paso-dos/tramite`} component={StepTwo} />
      <Route exact path={`${path}/paso-tres/tramite`} component={StepThree} />
      <Route exact path={`${path}/tramite`} component={Procedure} />

    </Switch>
  );
};

export default HomeRoute;
