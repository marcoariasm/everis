import React from "react";
import { useRouteMatch } from "react-router-dom";
import up from "../../../../shared/images/up.svg";
import {
  CardProcedureGrid,
  HeaderCard,
  IconArrow,
  IconContainer,
  Point,
} from "./styles";

function CardProcedure({ procedure, userType, statesTypes }) {
  const statesColors = [
    "colorGrayLineDashed",
    "colorBlueInfo",
    "colorGreensuccess",
    "colorRedError",
    "colorGreen",
    "colorGrayLineDashed",
    "colorOrangeMain",
  ];
  const { url } = useRouteMatch();
  const currentProcedureState = statesTypes.find(
    (state) => state.name === procedure.status
  );

  const getUser = () => {
    if (
      (userType === "applicant" || url.includes("apoderados")) &&
      !procedure.representative
    ) {
      return userType === "applicant"
        ? `Afiliado: ${procedure.affiliate}`
        : `Solicitante: ${procedure.applicant}`;
    } else if (procedure.representative) {
      return url.includes("apoderados")
        ? `Representante: ${procedure.representative}`
        : `Afiliado: ${procedure.affiliate}`;
    }
    return "";
  };

  return (
    <CardProcedureGrid hasAffiliate={true}>
      {currentProcedureState && (
        <>
          <HeaderCard>
            <Point color={statesColors[currentProcedureState.idStatus - 1]} />
            <span className="cardTitle not-responsive">
              {procedure.nameTypeRequest}
            </span>
            <span className="bodyTextSmall is-responsive">
              Fecha de registro: {procedure.dateRegister}
            </span>
          </HeaderCard>
          <div></div>
          <span className="cardTitle is-responsive">
            {procedure.nameTypeRequest}
          </span>
          <span className="bodyTextSmall not-responsive">{getUser()}</span>
          <div className="is-responsive"></div>
          <IconContainer className="tableHeaderTitle not-responsive">
            <IconArrow src={up} alt="up" />
          </IconContainer>
          <span className="bodyTextSmall not-responsive">
            Fecha de registro: {procedure.dateRegister}
          </span>
          {(userType === "applicant" ||
            url.includes("apoderados") ||
            procedure.representative) && (
            <>
              <span className="bodyTextSmall is-responsive">{getUser()}</span>
              <div className="is-responsive"></div>
            </>
          )}
          <div className="flex is-responsive">
            <Point color={statesColors[currentProcedureState.idStatus - 1]} />
            <span className="informationFooterText">{procedure.status}</span>
          </div>
          <IconContainer className="is-responsive">
            <IconArrow src={up} alt="up" />
          </IconContainer>
        </>
      )}
    </CardProcedureGrid>
  );
}

export default CardProcedure;
