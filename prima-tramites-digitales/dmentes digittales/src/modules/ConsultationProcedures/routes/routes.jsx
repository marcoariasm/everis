import React, { useState } from "react";
import { Route } from "react-router-dom";
import ConsultationProcedures from "../pages/ConsultationProcedures/ConsultationProcedures";
import Messages from "../pages/Messages/Messages";
import ProcedureDetail from "../pages/ProcedureDetail/ProcedureDetail";
import { ProcedureDetailContext } from "./UserProcedureDetailContext";

const routesProcedureDetail = [
  {
    path: "/detalles-tramite/tramite/:id",
    component: ProcedureDetail,
  },
  {
    path: "/detalles-tramite/apoderados/tramite/:id",
    component: ProcedureDetail,
  },
  {
    path: "/detalles-tramite/tramite/:id/mensajes",
    component: Messages,
  },
  {
    path: "/detalles-tramite/apoderados/tramite/:id/mensajes",
    component: Messages,
  },
];

const ConsultationProceduresRoute = () => {
  const [procedureDetail, setProcedureDetail] = useState({});
  const [statesTypes, setStatesTypes] = useState([]);

  return (
    <>
      <ProcedureDetailContext.Provider
        value={{
          procedureDetail,
          statesTypes,
          setProcedureDetail,
          setStatesTypes,
        }}
      >
        <Route
          exact
          path="/detalles-tramite"
          component={ConsultationProcedures}
        />
        <Route
          exact
          path="/detalles-tramite/apoderados"
          component={ConsultationProcedures}
        />
        {routesProcedureDetail.map((_, i) => (
          <Route exact key={i} path={_.path} component={_.component} />
        ))}
      </ProcedureDetailContext.Provider>
    </>
  );
};

export default ConsultationProceduresRoute;
