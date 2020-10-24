import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import ConsultationProcedures from '../pages/ConsultationProcedures/ConsultationProcedures';
import ProcedureDetail from '../pages/ProcedureDetail/ProcedureDetail';
import Messages from '../pages/Messages/Messages';

const routes = [
  {
    path: '/detalles-tramite',
    component: ConsultationProcedures,
  },
  {
    path: '/detalles-tramite/tramite/:id',
    component: ProcedureDetail
  },
  {
    path: '/detalles-tramite/tramite/:id/mensajes',
    component: Messages
  }
];

const ConsultationProceduresRoute = () => {
  return (
    <>
      {routes.map((_, i) => (
        <Route exact key={i} path={_.path} component={_.component} />
      ))}
    </>
  )
}

export default ConsultationProceduresRoute;