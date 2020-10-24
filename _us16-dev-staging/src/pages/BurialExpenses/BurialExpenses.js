import MaterialCheckbox from "modules/shared/components/MaterialCheckbox";
import ContentButton from "pages/BurialExpenses/components/FooterSection/ContentButton";
import React from "react";
import Header from "shared/components/Header";
import WhiteCard from "shared/components/WhiteCard";
import { burialExpenses } from "shared/constant/BurialExpenses";
import InformativeCards from "./components/InformativeCards/InformativeCards";
import pdfIcon from "shared/images/pdfIcon.svg";
import { allColors } from "shared/styles/index";
import { size } from "shared/styles/Responsive";
import FormStepOne from "./components/steps/FormStepOne";
import FormStepTwo from "./components/steps/FormStepTwo";
import styled from "styled-components";

export const Title = styled.h1`
  margin-top: 15px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    text-align: center;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

export const ContainerCheckbox = styled.div`
  margin: 2.5em 1.5em;
`;

export const IconPDF = styled.img`
  margin-right: 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    width: 35px;
  }
`;

export const Description = styled.p`
  margin: 1.5em 0;
  color: ${allColors.colorGrayText};
`;

const CardComponent = styled.div`
  height: 60px;
  background: ${allColors.white};
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  margin: 1.5em 0;
  width: fit-content;

  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${size.mobileL}) {
    border: 1px solid #e8e8e8;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.08);
    border-radius: 6px;
    padding: 0 2.5em;
  }
`;
const ContainerButtons = styled.div`
  @media only screen and (max-width: ${size.mobileL}) {
    flex-direction: column;
  }
  display: flex;
  margin-top: 2em;
  justify-content: center;
`;

function BurialExpenses() {
  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        <Title className="headerTitleHighligh">{burialExpenses.title}</Title>
        <>
          {/* <Description>{burialExpenses.description}</Description>
          <InformativeCards information={burialExpenses.information} />
          <CardComponent>
            <IconPDF
              src={pdfIcon}
              alt={burialExpenses.documentDownloadIconName}
            />
            <span className="link" color={allColors.colorOrangeMain}>
              {burialExpenses.documentDownloadDescription}
            </span>
          </CardComponent>
          <ContainerCheckbox>
            <MaterialCheckbox
              label={burialExpenses.validateUserReadInformation}
            />
          </ContainerCheckbox>
          <ContainerButtons>
            <ContentButton
              classButton="btn-cancelar"
              text={burialExpenses.buttonsName.primary}
            />
            <ContentButton
              classButton="btn-pagina-principal"
              text={burialExpenses.buttonsName.secondary}
            />
          </ContainerButtons> */}

          {/* <FormStepOne/> */}
          <FormStepTwo/>
        </>
      </WhiteCard>
    </>
  );
}

export default BurialExpenses;
