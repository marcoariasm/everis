import React from "react";
import styled from "styled-components";

import { size } from "shared/styles/Responsive";
import { allColors } from "shared/styles/index";
import asesoria2 from "../../shared/images/asesoria2.svg";
import jubilacion from "../../shared/images/jubilacion.svg";
import retiro2 from "../../shared/images/retiro2.svg";

import AccordionContainer, {
  DoubleLabel,
  BulletedList,
} from "../../components/Accordion3";
import ButtonCard from "../../components/Cards/ButtonCard";
import List from "../../components/List/List";
import MainTitle from "../../components/Titles/MainTitle";
import SearchBox from "../../components/SearchBox";
import TitleGreen from "../../components/Titles/TitleGreen";
import WhiteCard from "../../components/Cards/WhiteCard";

const CardList = styled.div`
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  margin: 10px 16px 16px 16px;
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
  link1: "#",
  link2: "#",
  link3: "#",
};

const informationTramitesPersonales = {
  information: [
    {
      name: "Ahorros voluntarios",
      groupDescription: "Apertura de cuenta y plan flexible",
      type: "list",
      value: [
        "Apertura de cuentas de Aportes Voluntarios",
        "Cancelación de Plan Flexible",
      ],
    },
    {
      name: "Aportes",
      groupDescription: "Aportes de independiente, cambio de fondo y más",
      type: "list",
      value: [
        "Cambio de fondo",
        "Cargo en cuenta para tu aporte de independiente",
        "Actualización del Vínculo Laboral",
        "Inicio de Cobranza",
      ],
    },
    {
      name: "Bono de Reconocimiento",
      groupDescription: "Bonos y apelaciones",
      type: "list",
      value: [
        "Carta para la ONP",
        "Reconsideraciones y/o Apelaciones",
        "Trámite de Bono de Reconocmiento",
      ],
    },
    {
      name: "Desafiliación",
      groupDescription:
        "Desafiliación, nulidad, si estás afiliado a 2 AFP y más",
      type: "list",
      value: [
        "Denuncia al promotor",
        "Desafiliación",
        "Multiafiliación",
        "Nulidad",
      ],
    },
    {
      name: "Desistimiento de trámite",
      groupDescription: "Si ya no deseas continuar con tu trámite iniciado",
      type: "list",
      value: ["Desistimiento de trámites"],
    },
    {
      name: "Devolución de Aportes",
      groupDescription: "Afiliados, jubilados en otro régimen y más",
      type: "list",
      value: [
        "Devolución de Aportes de Afiliados",
        "Devolución de Aportes de Jubilados en otro regimen (Circular 040-2004)",
        "Devolución de Aportes por DU 037-94",
      ],
    },
    {
      name: "Invalidez",
      groupDescription:
        "Evaluación, pensión, apelaciones, inclusión de beneficiarios y más",
      type: "list",
      value: [
        "Evaluación y Calificación de Invalidez",
        "Revisión y/o Apelación de dictámenes",
        "Pensión de Invalidez",
        "Pensión de Jubilación Anticipada por Enfermedad Terminal o Cancer",
        "Retiro de hasta 50% de tu fondo por Enfermedad Terminal o Cancer",
        "Cambio de forma de pago",
        "Cambio de modalidad",
        "Convenio Perú-España, Ibero 1-CM ISS",
        "Exclusión de beneficiarios",
        "Inclusión de beneficiarios",
        "Regimen Pesquero",
        "Repacto de pensión",
        "Pensión por recupero de aportes en cobranza",
      ],
    },
    {
      name: "Jubilación",
      groupDescription: "",
      type: "list",
      value: [
        "Fondo Complementario de Jubilación Minera, Metalúrgica y Siderúrgica",
        "Pensión Complementaria de Pensión Mínima",
        "Pensión de Jubilación Anticipada Ordinaria",
        "Pensión de Jubilación Anticipada por Enfermedad Terminal o Cancer",
        "Pensión de Jubilación Anticipada por desempleo",
        "Pensión de Jubilación Labores de Riesgo Genérico",
        "Pensión de Jubilación Legal",
        "Pensión de Jubilación por Labores de Riesgo Extraordinario",
        "Pensión Mínima de Jubilación",
        "Reconsideraciones y/o Apelaciones",
        "Cambio de forma de pago",
        "Cambio de Modalidad",
        "Convenios Perú-España, Ibero 1-CM ISS",
        "Exclusión de beneficiarios",
        "Inclusión de beneficiarios",
        "Regimen Pesquero",
        "Repacto de pensión",
        "Pensión por recupero de aportes en cobranza",
      ],
    },
    {
      name: "Requerimientos",
      groupDescription: "Actualización de datos, estado de cuenta y más",
      type: "list",
      value: [
        "Actualización de datos",
        "Actualización de datos de beneficiarios",
        "Certificado de Afiliación",
        "Certificado de Pensionista",
        "Certificado de Supervivencia",
        "Constancia de 4.5% - ESSALUD",
        "Constancia de 95.5%",
        "Contrato de Afiliación",
        "Envío de Boletas de Pago",
        "Estado de Cuenta",
      ],
    },
    {
      name: "Retiro de Aportes",
      groupDescription: "Retiro hipotecario y más",
      type: "list",
      value: [
        "Retiro de hasta 50% de tu fondo por Enfermedad Terminal o Cancer",
        "Retiro 25% Hipotecario",
        "Retiro Aportes Voluntarios Sin Fin Previsional",
        "Retiro de hasta el 100%",
        "Transferencias de Fondos al Exterior",
      ],
    },
    {
      name: "Sobrevivencia",
      groupDescription: "Gastos de sepelio, herencias, pensiones y más",
      type: "list",
      value: [
        "Aviso de Siniestro",
        "Gastos de Sepelio",
        "Herencia",
        "Pensión de Sobrevivencia",
        "Cambio de forma de pago",
        "Cambio de Modalidad",
        "Exclusión de beneficiarios",
        "Inclusión de beneficiarios",
        "Regimen Pesquero",
        "Repacto de Pensión",
        "Pensión por Recupero de aportes en cobranza",
      ],
    },
  ],
};

const TramitesPersonales = () => {
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
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                subtitle={"Apertura de cuenta y plan flexible"}
                title={"Ahorros voluntarios"}
              />
            }
          >
            <BulletedList
              textList={[
                "Apertura de cuentas de Aportes Voluntarios",
                "Cancelación de Plan Flexible",
              ]}
            />
          </AccordionContainer>

          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Aportes"}
                subtitle={"Aportes de independiente, cambio de fondo y más"}
              />
            }
          >
            <BulletedList
              textList={[
                "Cambio de fondo",
                "Cargo en cuenta para tu aporte de indpendiente",
                "Actualización del Vínculo Laboral",
                "Inicio de Cobranza",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Bonos y Apelaciones"}
                subtitle={"Bono de Reconocimiento"}
              />
            }
          >
            <BulletedList
              textList={[
                "Carta para la ONP",
                "Reconsideraciones y/o Apelaciones",
                "Trámite de Bono de Reconocmiento",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                subtitle={
                  "Desafiliación, nulidad, si estás afiliado a 2 AFP y más"
                }
                title={"Desafiliación"}
              />
            }
          >
            <BulletedList
              textList={[
                "Denuncia al promotor",
                "Desafiliación",
                "Multiafiliación",
                "Nulidad",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Desistimiento de trámite"}
                subtitle={"Si ya no deseas continuar con tu trámite iniciado"}
              />
            }
          >
            <BulletedList textList={["Desistimiento de trámites"]} />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Devolución de aportes"}
                subtitle={"Afiliados, jubilados en otro régimen y más"}
              />
            }
          >
            <BulletedList
              textList={[
                "Devolución de Aportes de Afiliados",
                "Devolución de Aportes de Jubilados en otro regimen (Circular 040-2004)",
                "Devolución de Aportes por DU 037-94",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Invalidez"}
                subtitle={
                  "Evaluación, pensión, apelaciones, inclusión de beneficiarios y más"
                }
              />
            }
          >
            <BulletedList
              textList={[
                "Evaluación y Calificación de Invalidez",
                "Revisión y/o Apelación de dictámenes",
                "Pensión de Invalidez",
                "Pensión de Jubilación Anticipada por Enfermedad Terminal o Cancer",
                "Retiro de hasta 50% de tu fondo por Enfermedad Terminal o Cancer",
                "Cambio de forma de pago",
                "Cambio de modalidad",
                "Convenio Perú-España, Ibero 1-CM ISS",
                "Exclusión de beneficiarios",
                "Inclusión de beneficiarios",
                "Regimen Pesquero",
                "Repacto de pensión",
                "Pensión por recupero de aportes en cobranza",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={<DoubleLabel title={"Jubilación"} subtitle={""} />}
          >
            <BulletedList
              textList={[
                "Fondo Complementario de Jubilación Minera, Metalúrgica y Siderúrgica",
                "Pensión Complementaria de Pensión Mínima",
                "Pensión de Jubilación Anticipada Ordinaria",
                "Pensión de Jubilación Anticipada por Enfermedad Terminal o Cancer",
                "Pensión de Jubilación Anticipada por desempleo",
                "Pensión de Jubilación Labores de Riesgo Genérico",
                "Pensión de Jubilación Legal",
                "Pensión de Jubilación por Labores de Riesgo Extraordinario",
                "Pensión Mínima de Jubilación",
                "Reconsideraciones y/o Apelaciones",
                "Cambio de forma de pago",
                "Cambio de Modalidad",
                "Convenios Perú-España, Ibero 1-CM ISS",
                "Exclusión de beneficiarios",
                "Inclusión de beneficiarios",
                "Regimen Pesquero",
                "Repacto de pensión",
                "Pensión por recupero de aportes en cobranza",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Requerimientos"}
                subtitle={"Actualización de datos, estado de cuenta y más"}
              />
            }
          >
            <BulletedList
              textList={[
                "Actualización de datos",
                "Actualización de datos de beneficiarios",
                "Certificado de Afiliación",
                "Certificado de Pensionista",
                "Certificado de Supervivencia",
                "Constancia de 4.5% - ESSALUD",
                "Constancia de 95.5%",
                "Contrato de Afiliación",
                "Envío de Boletas de Pago",
                "Estado de Cuenta",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Retiro de aportes"}
                subtitle={"Retiro hipotecario y más"}
              />
            }
          >
            <BulletedList
              textList={[
                "Retiro de hasta 50% de tu fondo por Enfermedad Terminal o Cancer",
                "Retiro 25% Hipotecario",
                "Retiro Aportes Voluntarios Sin Fin Previsional",
                "Retiro de hasta el 100%",
                "Transferencias de Fondos al Exterior",
              ]}
            />
          </AccordionContainer>
          <AccordionContainer
            labelComponent={
              <DoubleLabel
                title={"Sobrevivencia"}
                subtitle={"Gastos de sepelio, herencias, pensiones y más"}
              />
            }
          >
            <BulletedList
              textList={[
                "Aviso de Siniestro",
                "Gastos de Sepelio",
                "Herencia",
                "Pensión de Sobrevivencia",
                "Cambio de forma de pago",
                "Cambio de Modalidad",
                "Exclusión de beneficiarios",
                "Inclusión de beneficiarios",
                "Regimen Pesquero",
                "Repacto de Pensión",
                "Pensión por Recupero de aportes en cobranza",
              ]}
            />
          </AccordionContainer>

          {/* fin de children */}
        </React.Fragment>

        {/* information={informationTramitesPersonales} /> */}

        {/* {informationTramitesPersonales.information.map((item, i) => (
          <AccordionContainer
            title={item.name}
            groupDescription={item.groupDescription}
            children={<List value={item.value} />}
            key={i}
          />
        ))} */}

        {/* <SearchModule information={informationTramitesPersonales}>
        </SearchModule> */}
      </WhiteCard>
    </>
  );
};

export default TramitesPersonales;
