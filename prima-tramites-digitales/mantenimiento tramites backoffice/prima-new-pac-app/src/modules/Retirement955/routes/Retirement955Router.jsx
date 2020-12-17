import React from 'react';
import {
  Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import {
  QUERY,
  QUERY_PROCEDURE,
  SCHEDULE,
} from 'modules/Retirement955/constants';
import modules from 'modules/shared';
import Main from '../pages/Main';
import Asesoria from '../pages/Asesoria';
import Agenda from '../pages/Agenda';
import AgendaDetalle from '../pages/Agenda/Details/details';
import AdendaEtapas from '../pages/Agenda/Etapas/Etapas';
import TramitesDocument from '../pages/Tramites/Document';
import TramitesDetalle from '../pages/Tramites/Details';
import Tramites from '../pages/Tramites';
import PrivateRoute from './PrivateRoute';

const { show } = modules.libs.Roles;

const Web = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => {
          if (show(QUERY_PROCEDURE)) {
            return <Redirect to={`${path}/tramites`} />;
          }
          return <Redirect to={`${path}/consulta`} />;
        }}
      />
      <Route exact path={`${path}`} component={Main} />
      <PrivateRoute path={`${path}/agenda/detalle/:id`} component={AgendaDetalle} section={SCHEDULE} />
      <PrivateRoute path={`${path}/agenda`} component={Agenda} section={SCHEDULE} />
      <Route
        path={`${path}/asesoria/:id`}
        component={Asesoria}
        section={SCHEDULE}
      />
      <Route
        path={`${path}/asesoria`}
        component={Asesoria}
        section={SCHEDULE}
      />
      <PrivateRoute path={`${path}/consulta/:id/detalle/:cuspp`} component={AgendaDetalle} section={QUERY} />
      <PrivateRoute path={`${path}/consulta/:id`} component={AdendaEtapas} section={QUERY} />
      <PrivateRoute path={`${path}/consulta`} component={Agenda} section={QUERY} />
      <PrivateRoute path={`${path}/tramites/:id/document/:ruc`} component={TramitesDocument} section={QUERY_PROCEDURE} />
      <PrivateRoute path={`${path}/tramites/:id/document`} component={TramitesDocument} section={QUERY_PROCEDURE} />
      <PrivateRoute path={`${path}/tramites/:id`} component={TramitesDetalle} section={QUERY_PROCEDURE} />
      <PrivateRoute path={`${path}/tramites`} component={Tramites} section={QUERY_PROCEDURE} />
    </Switch>
  );
};

export default Web;
