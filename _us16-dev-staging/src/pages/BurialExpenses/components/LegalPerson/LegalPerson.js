import OutlinedButton from "modules/Home/components/OutlinedButton";
import MaterialInput from "modules/shared/components/MaterialInput";
import ContentButton from "pages/BurialExpenses/components/FooterSection/ContentButton";
import React from "react";
import { burialExpenses } from "shared/constant/BurialExpenses";
import favorito from "shared/images/favorito.svg";
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

export const ContainerButtonWithIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${allColors.colorGrayBorder};
  margin-bottom: 2em;
  padding-bottom: 1em;
`;

export const ContainerInputs = styled.div`
  @media only screen and (max-width: ${size.mobileL}) {
    flex-direction: column;
    > form {
      margin-top: 1em;
    }
  }

  @media only screen and (min-width: ${size.mobileL}) {
    > form:nth-child(even) {
      margin-left: 1em;
    }
    margin: 1.5em 0;
  }
  display: flex;
  justify-content: center;
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

export const Description = styled.p`
  margin: 1em 0 1.5em;
  color: ${allColors.colorGrayText};
`;

function LegalPersonS() {
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
      <span className="informativeBodyTitleGreen">Datos de la empresa</span>
      <ContainerInputs>
        <MaterialInput placeholder="RUC" />
        <MaterialInput placeholder="Razón social" />
      </ContainerInputs>
      <ContainerInputs>
        <MaterialInput placeholder="Correo electrónico de la empresa" />
        <MaterialInput placeholder="Teléfono móvil de la empresa" />
      </ContainerInputs>
      <ContainerButtonWithIcon>
        <OutlinedButton
          className="container-button-with-icon"
          color={allColors.colorGreen}
          iconImg={favorito}
          label="Guardar como favorito"
        ></OutlinedButton>
      </ContainerButtonWithIcon>
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

export default LegalPersonS;
