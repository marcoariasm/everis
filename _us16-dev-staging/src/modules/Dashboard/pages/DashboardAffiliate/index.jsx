import React from "react";
import { Link } from "react-router-dom";

import misTramites from "../../components/images/misTramites.svg";
import solicitud from "../../components/images/solicitud.svg";
import tramitesRealizados from "../../components/images/tramitesRealizados.svg";
import iliustracion from "../../components/images/iliustracion.svg";
import {
  PortraitImage,
  CardGrid,
  ButtonCard1,
  ButtonCard2,
  ButtonCard3,
  ResponsiveBlock1,
  Content,
  Image,
  Title,
  Text,
  TitleOrange,
} from "./styles";

import { persons } from "../../core/MockServer/data.json";

import TitleGray from "../../components/Titles/TitleGray";
import WhiteCard from "../../components/Cards/WhiteCard";

const textDashboardAffiliate = {
  greeting: "Hola ",
  contentGreeting:
    "Realiza tus trámites desde la comodidad de tu casa de forma ",
  hightlighGreeting: "rápida y fácil",
  responsiveGreeting: "¿En qué podemos ayudarte?",
  titleCard1: "Nueva solicitud de trámite",
  titleCard2: "Estado de mis trámites",
  titleCard3: "Trámites realizados por apoderados",
  textCard1: "Ingresa nuevas solicitudes de trámites, son 100% online",
  textCard2:
    "Consulta el estado de tus trámites y responde las notificaciones de tus solicitudes",
  textCard3:
    "Consulta los trámites que un representante ha realizado a tu nombre",
};

const linkDashboardAffiliate = {
  linkButton1: "/inicio/menu",
  linkButton2: "#",
  linkButton3: "#",
};

const DashboardAffiliate = () => {
  // const user = afiliado?.firstName.trim();
  const isAffiliate = persons && persons[0].personalData.isAffiliate;
  const isApplicant = persons && persons[1].personalData.isApplicant;

  const user = persons && persons[0].personalData.firstName.trim();

  return (
    isAffiliate?(
      < WhiteCard >
        <PortraitImage>
          <img src={iliustracion}></img>
        </PortraitImage>

        <TitleGray
          user={user}
          text={textDashboardAffiliate.contentGreeting}
          text2={textDashboardAffiliate.hightlighGreeting}
          hideOnMobile={true}
        />

        <TitleOrange>
          <span className="responsiveUser">¡Hola {user}!</span>
          <span className="responsiveGreeting">
            {textDashboardAffiliate.responsiveGreeting}
          </span>
        </TitleOrange>

        <CardGrid>
          {/*Nueva solicitud de trámite*/}
          <ButtonCard1>
            <Link to={linkDashboardAffiliate.linkButton1}>
              <Content>
                <Image>
                  <img src={solicitud} alt={""} />
                </Image>
                <Title>{textDashboardAffiliate.titleCard1}</Title>
                <ResponsiveBlock1>
                  <Text>{textDashboardAffiliate.textCard1}</Text>
                </ResponsiveBlock1>
              </Content>
            </Link>
          </ButtonCard1>

          {/* "Estado de mis trámites" */}
          <ButtonCard2>
            <Link to={linkDashboardAffiliate.linkButton2}>
              <Content>
                <Image>
                  <img src={misTramites} alt="" />
                </Image>
                <Title>{textDashboardAffiliate.titleCard2}</Title>
                <ResponsiveBlock1>
                  <Text>{textDashboardAffiliate.textCard2}</Text>
                </ResponsiveBlock1>
              </Content>
            </Link>
          </ButtonCard2>

          {/* "Trámites realizados por apoderados" */}
          <ButtonCard3>
            <Link to={linkDashboardAffiliate.linkButton3}>
              <Content>
                <Image>
                  <img src={tramitesRealizados} alt="" />
                </Image>
                <Title>{textDashboardAffiliate.titleCard3}</Title>
                <ResponsiveBlock1>
                  <Text>{textDashboardAffiliate.textCard3}</Text>
                </ResponsiveBlock1>
              </Content>
            </Link>
          </ButtonCard3>
        </CardGrid>
      </WhiteCard >
    ):("error")
  )
};

export default DashboardAffiliate;
