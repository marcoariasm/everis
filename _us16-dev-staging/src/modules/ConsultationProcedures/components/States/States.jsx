import React from "react";

import { Point, State, ContainerStates } from './styles';

function States() {
  return (
    <ContainerStates>
      <State>
        <Point Inprocess={true} />
        <span className="bodyTextSmall">En proceso</span>
      </State>
      <State>
        <Point Inprocess={false} />
        <span className="bodyTextSmall">Observado</span>
      </State>
    </ContainerStates>
  );
}

export default States;
