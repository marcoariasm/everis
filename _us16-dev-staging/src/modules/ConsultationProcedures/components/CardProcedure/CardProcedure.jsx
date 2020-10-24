import React from "react";
import up from "../../../../shared/images/up.svg";

import {
  CardProcedureGrid,
  IconContainer,
  HeaderCard,
  IconArrow,
  Point
} from './styles';

function CardProcedure({
  registrationDay,
  afiliateName,
  procedureState,
  procedureName
}) {
  return (
    <CardProcedureGrid>
      <HeaderCard>
        <Point Inprocess={procedureState === 'IN_PROCESS'} />
        <span className="bodyTextSmall">Registrado {registrationDay}</span>
      </HeaderCard>
      <div></div>
      <span className="cardTitle">{procedureName}</span>
      <div className="is-responsive"></div>
      <IconContainer className="tableHeaderTitle not-responsive">
        <IconArrow src={up} alt="up" />
      </IconContainer>
      <span className="bodyTextSmall">Afiliado: {afiliateName}</span>
      <div className="is-responsive"></div>
      <span className="tableHeaderTitle is-responsive">
        Estado: {procedureState}
      </span>
      <IconContainer className="is-responsive">
        <IconArrow src={up} alt="up" />
      </IconContainer>
    </CardProcedureGrid>
  );
}

export default CardProcedure;
