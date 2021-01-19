import React from "react";

import { Point, State, ContainerStates } from "./styles";

function States({ isFinished }) {
  return (
    <ContainerStates>
      {isFinished ? (
        <>
          <State>
            <Point colorClassName="colorOrangeMain" />
            <span className="bodyTextSmall">Finalizado</span>
          </State>
          <State>
            <Point colorClassName="colorGrayLineDashed" />
            <span className="bodyTextSmall">Rechazado</span>
          </State>
        </>
      ) : (
        <>
          <State>
            <Point colorClassName="colorGrayLineDashed" />
            <span className="bodyTextSmall">Registrado</span>
          </State>
          <State>
            <Point colorClassName="colorBlueInfo" />
            <span className="bodyTextSmall">En proceso</span>
          </State>
          <State>
            <Point colorClassName="colorRedError" />
            <span className="bodyTextSmall">Observado</span>
          </State>
          <State>
            <Point colorClassName="colorGreensuccess" />
            <span className="bodyTextSmall">Aceptado</span>
          </State>
          <State>
            <Point colorClassName="colorGreen" />
            <span className="bodyTextSmall">En pagos</span>
          </State>
        </>
      )}
    </ContainerStates>
  );
}

export default States;
