import React from "react";
import { Link } from "react-router-dom";

import misTramites from "shared/images/misTramites.svg";
import solicitud from "shared/images/solicitud.svg";
import tramitesRealizados from "shared/images/tramitesRealizados.svg";

import {
  CardGrid,
  ButtonCard1,
  ButtonCard2,
  ButtonCard3,
  ResponsiveBlock1,
  Content,
  Image,
  Title,
  Text,
} from "./styles";

const linkDashboardAffiliate = {
  newProcedure: "/inicio/menu",
  procedureStatus: "/detalles-tramite",
  thirdPartyProcedureStatus: "/detalles-tramite/apoderados",
};

const textDashboardAffiliate = {
  newProcedure: "Nueva solicitud de trámite",
  procedureStatus: "Estado de mis trámites",
  thirdPartyProcedures: "Trámites realizados por apoderados",
  newProcedureDescription:
    "Ingresa nuevas solicitudes de trámites, son 100% online",
  procedureStatusDescription:
    "Consulta el estado de tus trámites y responde las notificaciones de tus solicitudes",
  thirdPartyDescription:
    "Consulta los trámites que un representante ha realizado a tu nombre",
};

export default function AffiliateOptions() {
  return (
    <CardGrid>
      <ButtonCard1>
        <Link to={linkDashboardAffiliate.newProcedure}>
          <Content>
            <Image>
              <img src={solicitud} alt={""} />
            </Image>
            <Title>{textDashboardAffiliate.newProcedure}</Title>
            <ResponsiveBlock1>
              <Text>{textDashboardAffiliate.newProcedureDescription}</Text>
            </ResponsiveBlock1>
          </Content>
        </Link>
      </ButtonCard1>

      <ButtonCard2>
        <Link to={linkDashboardAffiliate.procedureStatus}>
          <Content>
            <Image>
              <img src={misTramites} alt="" />
            </Image>
            <Title>{textDashboardAffiliate.procedureStatus}</Title>
            <ResponsiveBlock1>
              <Text>{textDashboardAffiliate.procedureStatusDescription}</Text>
            </ResponsiveBlock1>
          </Content>
        </Link>
      </ButtonCard2>
      <ButtonCard3>
        <Link to={linkDashboardAffiliate.thirdPartyProcedureStatus}>
          <Content>
            <Image>
              <img src={tramitesRealizados} alt="" />
            </Image>
            <Title>{textDashboardAffiliate.thirdPartyProcedures}</Title>
            <ResponsiveBlock1>
              <Text>{textDashboardAffiliate.thirdPartyDescription}</Text>
            </ResponsiveBlock1>
          </Content>
        </Link>
      </ButtonCard3>
    </CardGrid>
  );
}
