import React from "react";
import { Link } from "react-router-dom";
import {
  ButtonCard1,
  ButtonCard2,
  ResponsiveBlock1,
  Content,
  Image,
  Title,
  Text,
  CardGrid,
} from "./styles";
import misTramites from "shared/images/misTramites.svg";
import solicitud from "shared/images/solicitud.svg";

const textDashboardApplicant = {
  newProcedure: "Nueva solicitud de trámite",
  procedureDetails: "Estado de mis trámites",
  newProcedureDescription: "Ingresa nuevas solicitudes de trámites, son 100% online",
  procedureDetailsDescription:
    "Consulta el estado de tus trámites y responde las notificaciones de tus solicitudes",
};

const linkDashboardApplicant = {
  validateAffiliate: "/inicio/validar-afiliado",
  procedureDetails: "/detalles-tramite",
};
export default function ApplicantOptions() {
  return (
    <CardGrid>
      <ButtonCard1>
        <Link to={linkDashboardApplicant.validateAffiliate}>
          <Content>
            <Image>
              <img src={solicitud} alt={textDashboardApplicant.newProcedure} />
            </Image>
            <Title>{textDashboardApplicant.newProcedure}</Title>
            <ResponsiveBlock1>
              <Text>{textDashboardApplicant.newProcedureDescription}</Text>
            </ResponsiveBlock1>
          </Content>
        </Link>
      </ButtonCard1>

      <ButtonCard2>
        <Link to={linkDashboardApplicant.procedureDetails}>
          <Content>
            <Image>
              <img src={misTramites} alt={textDashboardApplicant.procedureDetails} />
            </Image>
            <Title>{textDashboardApplicant.procedureDetails}</Title>
            <ResponsiveBlock1>
              <Text>{textDashboardApplicant.procedureDetailsDescription}</Text>
            </ResponsiveBlock1>
          </Content>
        </Link>
      </ButtonCard2>
    </CardGrid>
  );
}
