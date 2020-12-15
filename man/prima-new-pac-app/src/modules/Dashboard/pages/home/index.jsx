import React from "react";
import { Link } from "react-router-dom";

import asesoria from "shared/images/asesoria.svg";
import iliustracion from "shared/images/iliustracion.svg";
import misTramites from "shared/images/misTramites.svg";

import {
  PortraitImage,
  CardGrid,
  ButtonCard1,
  ButtonCard2,
  ResponsiveBlock1,
  Content,
  Image,
  Title,
  Text,
  TitleOrange,
} from "./style";

import CardTitleGray from "shared/components/Card/CardTitleGray";
import WhiteCard from "shared/components/Card/WhiteCard";
import SharedModule from 'modules/shared';



const DashboardClient = () => {
  
const { useMe } = SharedModule.hooks;
const { advisor } = useMe();
  const textDashboardClient = {
    greeting: `Hola ${advisor.names}`,
    contentGreeting: "Gestiona los trámites  ",
    hightlighGreeting: "de forma rápida y fácil",
    textCard1: "Consulta y gestiona Asesoría 95.5% ",
    textCard2: "Consulta y gestiona todo los demás trámites",
  };
  
  const linkDashboardClient = {
    linkButton1: "/proceso95-5",
    linkButton2: "/tramites/detalles-tramites/",
  };

 
  return (
    <WhiteCard>
      <PortraitImage>
        <img src={iliustracion}></img>
      </PortraitImage>

      <CardTitleGray
        user={advisor.names}
        text={textDashboardClient.contentGreeting}
        text2={textDashboardClient.hightlighGreeting}
        hideOnMobile={true}
      />

      <TitleOrange>
       <span className="responsiveUser">¡Hola !{advisor.names}</span>
        <span className="responsiveGreeting">
          {textDashboardClient.responsiveGreeting}
        </span>
      </TitleOrange>

      <CardGrid>
        <ButtonCard1>
          <Link to={linkDashboardClient.linkButton1}>
            <Content>
              <Image>
                <img src={asesoria} alt={""} />
              </Image>
              <Title>{textDashboardClient.titleCard1}</Title>
              <ResponsiveBlock1>
                <Text>{textDashboardClient.textCard1}</Text>
              </ResponsiveBlock1>
            </Content>
          </Link>
        </ButtonCard1>

        <ButtonCard2>
          <Link to={linkDashboardClient.linkButton2}>
            <Content>
              <Image>
                <img src={misTramites} alt="" />
              </Image>
              <Title>{textDashboardClient.titleCard2}</Title>
              <ResponsiveBlock1>
                <Text>{textDashboardClient.textCard2}</Text>
              </ResponsiveBlock1>
            </Content>
          </Link>
        </ButtonCard2>
      </CardGrid>
    </WhiteCard>
  );
};

export default DashboardClient;
