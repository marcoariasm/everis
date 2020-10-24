import React from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

import { size } from "shared/styles/Responsive";
import { allColors } from "shared/styles";
import asesoria2 from "../../components/images/asesoria2.svg";
import jubilacion from "../../components/images/jubilacion.svg";
import retiro2 from "../../components/images/retiro2.svg";

import AccordionContainer, {
  DoubleLabel,
  BulletedList,
} from "modules/shared/components/Accordion3";
import ButtonCard from "../../components/Cards/ButtonCard";
import MainTitle from "../../components/Titles/MainTitle";
import SearchBox from "../../components/SearchBox";
import TitleGreen from "../../components/Titles/TitleGreen";
import WhiteCard from "../../components/Cards/WhiteCard";
import {personalProcedures} from './mockData'

import { ProcedureService } from "modules/GenericProcedures/services/ProceduresService"
import { persons } from 'modules/GenericProcedures/core/MockServer/data.json';
import { procedures } from 'modules/GenericProcedures/services/MockData/procedures';


const CardList = styled.div`
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  margin: 10px 0;
  min-height: 100%;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 3%;
    grid-row-gap: 3%;
    width: 100%;
    margin: auto;
    margin-top: 30px;
    min-height: 100%;
  }
`;

const Text = styled.div`
  margin: 10px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const textTramitesPersonales = {
  title: "Nueva solicitud de trámite",
  content: "Trámites que puedes realizar",
  subtitle1: "Trámites destacados",
  content1: "Los más solicitados",
  subtitle2: "Todos los trámites",
  content2: "Más de 50 trámites 100% digitales",
  title1: "Asesoría 95.5%",
  title2: "Retiro 95.5%",
  title3: "Jubilación Anticipada Ordinaria",
  text1: "",
  text2: "",
  text3: "",
  description1: "(pequeña descripción)",
  description2: "(pequeña descripción)",
  description3: "(pequeña descripción)",
};

const linkTramitesPersonales = {
  // link1: "/proceso95-5",
  link1: "#",
  link2: "/proceso95-5",
  // link3: "/nueva-solicitud/con-beneficiarios",
  link3: "#",
};

const TramitesPersonales = () => {

  let history = useHistory();
  // const user = persons && persons[0].personalData;

  const procedureService = new ProcedureService();
  
  const li = procedures.map(procedure => procedure.name);
  
  const toggleGetProcedure = (idTypeRequest) => {
    procedureService.getProcedure(idTypeRequest).then(
      response => {
        console.log(response);
        history.push(`/nueva-solicitud/tramite?id=${idTypeRequest}`, {resp: response});
      }
    );
  }

  return (
    <>
      <WhiteCard>
        <MainTitle title={textTramitesPersonales.title} />
        <Text>
          <span>{textTramitesPersonales.content}</span>
        </Text>

        <TitleGreen text={textTramitesPersonales.subtitle1} />
        <Text>
          <span>{textTramitesPersonales.content1}</span>
        </Text>

        <CardList>
          {/* Asesoria 95.5% */}
          <ButtonCard
            link={linkTramitesPersonales.link1}
            onClick={() => toggleGetProcedure(1)}
            imgSrc={asesoria2}
            title={textTramitesPersonales.title1}
            text={textTramitesPersonales.text1}
            description={textTramitesPersonales.description1}
          />

          {/* Retiro 95.5% */}
          <ButtonCard
            link={linkTramitesPersonales.link2}
            imgSrc={retiro2}
            title={textTramitesPersonales.title2}
            text={textTramitesPersonales.text2}
            description={textTramitesPersonales.description2}
          />

          {/* Jubilación Anticipada Ordinaria */}
          <ButtonCard
            link={linkTramitesPersonales.link3}
            onClick={() => toggleGetProcedure(2)}
            imgSrc={jubilacion}
            title={textTramitesPersonales.title3}
            text={textTramitesPersonales.text3}
            description={textTramitesPersonales.description3}
          />
        </CardList>

        <TitleGreen text={textTramitesPersonales.subtitle2} />
        <Text>
          <span>{textTramitesPersonales.content2}</span>
        </Text>

        <SearchBox children={""} />

        <React.Fragment>
          {/* inicio de children */}

          {personalProcedures &&
            personalProcedures.information.map((group, index) => {
              return (
                <AccordionContainer
                  key={index}
                  labelComponent={
                    <DoubleLabel
                      title={group.name}
                      subtitle={group.groupDescription}
                    />
                  }
                >
                  <BulletedList
                    textList={group.value.map((item, i) => {
                      return item;
                    })}
                  />
                </AccordionContainer>
              );
            })}
          {/* fin de children */}
        </React.Fragment>

      </WhiteCard>
    </>
  );
};

export default TramitesPersonales;
