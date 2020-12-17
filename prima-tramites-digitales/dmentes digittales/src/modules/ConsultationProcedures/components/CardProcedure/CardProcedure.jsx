import React from "react";
import up from "../../../../shared/images/up.svg";
import { states } from "../../constants/states";
import { statesColors } from "../../constants/states";
import { useRouteMatch } from "react-router-dom";

import {
  CardProcedureGrid,
  IconContainer,
  HeaderCard,
  IconArrow,
  Point,
} from "./styles";

function CardProcedure({
  registrationDay,
  afiliateName,
  procedureState,
  procedureName,
}) {
  const { url } = useRouteMatch();

  const currentProcedureState = states.find(
    (state) => state.value === procedureState
  );

  return (
    <CardProcedureGrid hasAffiliate={!!afiliateName}>
      <HeaderCard>
        <Point color={statesColors[currentProcedureState.code]} />
        <span className="cardTitle not-responsive">{procedureName}</span>
        <span className="bodyTextSmall is-responsive">
          Fecha de registro: {registrationDay}
        </span>
      </HeaderCard>
      <div></div>
      <span className="cardTitle is-responsive">{procedureName}</span>
      <span className="bodyTextSmall not-responsive">
        {afiliateName
          ? `${
              url.includes("apoderados") ? "Solicitante:" : "Afiliado:"
            } ${afiliateName}`
          : ""}
      </span>
      <div className="is-responsive"></div>
      <IconContainer className="tableHeaderTitle not-responsive">
        <IconArrow src={up} alt="up" />
      </IconContainer>
      <span className="bodyTextSmall not-responsive">
        Fecha de registro: {registrationDay}
      </span>
      {afiliateName && (
        <>
          <span className="bodyTextSmall is-responsive">
            {`${
              url.includes("apoderados") ? "Solicitante:" : "Afiliado:"
            } ${afiliateName}`}
          </span>
          <div className="is-responsive"></div>
        </>
      )}
      <div className="flex is-responsive">
        <Point color={statesColors[currentProcedureState.code]} />
        <span className="informationFooterText">
          {currentProcedureState.value}
        </span>
      </div>
      <IconContainer className="is-responsive">
        <IconArrow src={up} alt="up" />
      </IconContainer>
    </CardProcedureGrid>
  );
}

export default CardProcedure;
