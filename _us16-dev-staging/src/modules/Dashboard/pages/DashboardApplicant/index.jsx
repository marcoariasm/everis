import React from "react"
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { size } from "shared/styles/Responsive"
import { persons } from "../../core/MockServer/data.json";

import misTramites from "../../components/images/misTramites.svg"
import solicitud from "../../components/images/solicitud.svg"
import iliustracion from '../../components/images/iliustracion.svg'

import TitleGray from "../../components/Titles/TitleGray"
import WhiteCard from "../../components/Cards/WhiteCard"

import {
  TopImage,
  ButtonCard1,
  ButtonCard2,
  ResponsiveBlock1,
  Content,
  Image,
  Title,
  Text,
  TitleOrange
} from './styles'


const CardGrid = styled.div`
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 10px 16px 16px 16px;
  grid-template-areas:
    "button1" "button2";
  @media only screen and (min-width: ${size.tablet}) {
    margin: 54px 52px 52px 41px;  
    grid-column-gap: 3%;
    grid-row-gap: 3%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "button1 button2";
    width: 100%;
    margin: auto;
    padding-top: 20px;
}  
`

const textDashboardApplicant = {
  greeting: "Hola ",
  contentGreeting: "Realiza tus trámites desde la comodidad de tu casa de forma ",
  hightlighGreeting: "rápida y fácil",
  responsiveGreeting: "¿En qué podemos ayudarte?",
  titleCard1: "Nueva solicitud de trámite",
  titleCard2: "Estado de mis trámites",
  textCard1: "Ingresa nuevas solicitudes de trámites, son 100% online",
  textCard2: "Consulta el estado de tus trámites y responde las notificaciones de tus solicitudes",
}

const linkDashboardApplicant = {
  linkButton1: "/inicio/menu",
  linkButton2: "/detalles-tramite",
}

const DashboardApplicant = () => {
  const isAffiliate = persons && persons[0].personalData.isAffiliate;
  const isApplicant = persons && persons[1].personalData.isApplicant;

  const user = persons && persons[1].personalData.firstName.trim();

  return (
    isApplicant ? (
      <WhiteCard>

        <TopImage>
          <img src={iliustracion}></img>
        </TopImage>

        <TitleGray
          user={user}
          text={textDashboardApplicant.contentGreeting}
          text2={textDashboardApplicant.hightlighGreeting}
          hideOnMobile={true}
        />

        <TitleOrange>
          <span className="responsiveUser">¡Hola {user}!</span>
          <span className="responsiveGreeting">
            {textDashboardApplicant.responsiveGreeting}
          </span>
        </TitleOrange>

        <CardGrid>

          {/*Nueva solicitud de trámite*/}
          <ButtonCard1>
            <Link to={linkDashboardApplicant.linkButton1}>
              <Content>
                <Image>
                  <img src={solicitud} alt={textDashboardApplicant.titleCard1} />
                </Image>
                <Title>{textDashboardApplicant.titleCard1}</Title>
                <ResponsiveBlock1>
                  <Text>
                    {textDashboardApplicant.textCard1}
                  </Text>
                </ResponsiveBlock1>
              </Content>
            </Link>
          </ButtonCard1>

          {/* "Estado de mis trámites" */}
          <ButtonCard2>
            <Link to={linkDashboardApplicant.linkButton2}>
              <Content>
                <Image>
                  <img src={misTramites} alt={textDashboardApplicant.titleCard2} />
                </Image>
                <Title>{textDashboardApplicant.titleCard2}</Title>
                <ResponsiveBlock1>
                  <Text>
                    {textDashboardApplicant.textCard2}
                  </Text>
                </ResponsiveBlock1>
              </Content>
            </Link>
          </ButtonCard2>

        </CardGrid>

      </WhiteCard>
    ) : ("error")
  )
};

export default DashboardApplicant;
