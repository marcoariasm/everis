import MaterialSelect from "modules/shared/components/MaterialSelect";
import ContentButton from "pages/BurialExpenses/components/FooterSection/ContentButton";
import React from "react";
import { burialExpenses } from "shared/constant/BurialExpenses";
import { allColors } from "shared/styles/index";
import { size } from "shared/styles/Responsive";
import styled from "styled-components";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import "./styles.scss";


export const TitleInputs = styled.span`
  margin: 1.5em 0;
`;

export const ContainerButtons = styled.div`
  margin: 4em 0 2em;
`;

export const ContainerInputs = styled.div`
  @media only screen and (max-width: ${size.mobileL}) {
    flex-direction: column;
  }
  display: flex;
  margin: 2em 0;
  justify-content: end;
`;

export const ContainerSelect = styled.div`
  @media screen and (min-width: ${size.tablet}) {
    width: 50%;
  }
  border: 2px solid ${allColors.colorGrayBorder};
  border-radius: 8px;
  height: 48px;
  position: relative;
  display: flex;
  margin-bottom: 1em;
`;

export const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 4%;
  padding-top: 1.4em;
  padding-bottom: 1.8em;
  @media screen and (max-width: ${size.tablet}) {
    grid-template-columns: 100%;
    grid-row-gap: 1em;
    padding-bottom: 1em;
  }
`;

export const ContactTitle = styled.p`
  color: #696158;
  font-size: 12px;
  font-family: FS Emeric;
  display: flex;
`;

export const ContactDescription = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: FS Emeric;
  font-weight: bold;
`;

export const RecoverAccountSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${allColors.colorGrayBorder};
  margin-bottom: 2em;
  padding-bottom: 2em;
`;

export const RecoverAccounText = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: "Calibri";
`;

export const UrlStyles = styled.a`
  color: #ff4f00;
  text-decoration: underline;
`;

export const Description = styled.p`
  margin: 1em 0 1.5em;
  color: ${allColors.colorGrayText};
`;

function NaturalPerson() {
  const selectOptions = [
    { value: "Cónyuge", name: "spouse", shortName: "Cónyuge" },
    { value: "Concubino(a)", name: "concubine", shortName: "Concubino(a)" },
    { value: "Padres", name: "parents", shortName: "Padres" },
    { value: "Hijos", name: "offspring", shortName: "Hijos" },
    { value: "Otro familiar", name: "family", shortName: "Otro familiar" },
    {
      value: "Representante",
      name: "representative",
      shortName: "Representante",
    },
  ];

  return (
    <>
      <span className="informativeBodyTitleGreen">
        Datos personales del solicitante
      </span>
      <ContainerInputs>
        <ContainerSelect>
          <MaterialSelect
            placeholder={"Parentesco"}
            selectOptions={selectOptions}
          />
        </ContainerSelect>
      </ContainerInputs>
      <span className="informativeBodyTitleGreen">
        Confirma tus datos de contacto
      </span>
      <ContactContainer>
        <div>
          <ContactTitle>{"Correo electrónico"}</ContactTitle>
          <ContactDescription>{"correo@gmail.com"}</ContactDescription>
        </div>
        <div>
          <ContactTitle>{"Teléfono móvil"}</ContactTitle>
          <ContactDescription>{"9** ***274"}</ContactDescription>
        </div>
        <div>
          <ContactTitle>{"Teléfono Fijo"}</ContactTitle>
          <ContactDescription>{"01 2****45"}</ContactDescription>
        </div>
      </ContactContainer>
      <RecoverAccountSection>
        <RecoverAccounText>
          Si deseas actualizar tus datos <UrlStyles> ingresa aquí</UrlStyles>
        </RecoverAccounText>
      </RecoverAccountSection>
      <PaymentMethod></PaymentMethod>
      <ContainerButtons>
        <ContentButton
          classButton="btn-pagina-principal"
          text={burialExpenses.stepOne.buttonName}
        />
      </ContainerButtons>
    </>
  );
}

export default NaturalPerson;
