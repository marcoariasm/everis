import React from "react";
import styled from "styled-components";
import Accordion from "modules/shared/components/Accordion";
import { size } from "shared/styles/Responsive";
import { allColors } from "shared/styles/index";
import MaterialUploader from "modules/shared/components/MaterialUploader";

const documents = [
  {
    name: "DNI lado a.jpg",
    size: "153Kb",
  },
  {
    name: "DNI lado b.jpg",
    size: "153Kb",
  },
  {
    name: "DNI lado a.jpg",
    size: "153Kb",
  },
  {
    name: "DNI lado b.jpg",
    size: "153Kb",
  },
];

export const ContentStepTwo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentTab = styled.div`
  padding: 2em 3em;
  &.document-container {
    > div {
      width: 100%;
    }
  }

  @media only screen and (max-width: ${size.mobileL}) {
    padding: 1.5em 1em;
  }
`;

export const AffiliateInformation = styled.div`
  border-bottom: 1px solid ${allColors.colorGrayBorder};
  margin-bottom: 2em;
  padding-bottom: 1em;
`;

export const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 4%;
  padding-bottom: 1.4em;
  @media screen and (max-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
    &.isResponsive {
      grid-template-columns: 100%;
      grid-row-gap: 1em;
      padding-bottom: 1em;
    }
  }
`;

export const ContactTitle = styled.p`
  color: #696158;
  font-size: 12px;
  font-family: FS Emeric;
  display: flex;
  padding-bottom: 5px;
`;

export const ContactDescription = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: FS Emeric;
  font-weight: bold;
`;

export const SubTittle = styled.span`
  color: ${allColors.colorOrangeMainActive};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
`;

function StepTwo() {
  return (
    <ContentStepTwo>
      <AffiliateInformation>
        <Accordion title={"Datos del afiliado"}>
          <ContentTab>
            <ContactContainer>
              <div>
                <ContactTitle>{"Apellidos y nombres"}</ContactTitle>
                <ContactDescription>
                  {"Ramiro Castro, Camila Andrea"}
                </ContactDescription>
              </div>
            </ContactContainer>
            <ContactContainer>
              <div>
                <ContactTitle>{"Tipo de doc"}</ContactTitle>
                <ContactDescription>{"D.N.I"}</ContactDescription>
              </div>
              <div>
                <ContactTitle>{"N° de documento"}</ContactTitle>
                <ContactDescription>{"46528164"}</ContactDescription>
              </div>
            </ContactContainer>
            <ContactContainer className="isResponsive">
              <div>
                <ContactTitle>{"Correo electrónico"}</ContactTitle>
                <ContactDescription>{"correo@gmail.com"}</ContactDescription>
              </div>
              <div>
                <ContactTitle>{"Teléfono móvil"}</ContactTitle>
                <ContactDescription>{"9** ***274"}</ContactDescription>
              </div>
            </ContactContainer>
            <div>
              <ContactTitle>{"Detalle del trámite"}</ContactTitle>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquid ex ea commodi consequat. Quis aute iure
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </span>
            </div>
          </ContentTab>
        </Accordion>
      </AffiliateInformation>
      <SubTittle>Documentos adjuntos</SubTittle>
      <Accordion title={"Documentos generales"}>
        <ContentTab className="document-container">
          <MaterialUploader
            files={documents}
            loading={false}
            IsEditable={false}
          />
        </ContentTab>
      </Accordion>
    </ContentStepTwo>
  );
}

export default StepTwo;
