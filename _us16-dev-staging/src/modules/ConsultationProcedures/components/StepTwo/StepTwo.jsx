import React from "react";
import Accordion from "modules/shared/components/Accordion";
import MaterialUploader from "modules/shared/components/MaterialUploader";

import {
  ContentStepTwo,
  ContentTab,
  AffiliateInformation,
  ContactContainer,
  ContactTitle,
  ContactDescription,
  SubTittle,
} from "./styles";

function StepTwo({ procedure }) {
  const affiliate = procedure.affiliate;
  return (
    <ContentStepTwo>
      <AffiliateInformation>
        <Accordion title={"Datos del afiliado"}>
          <ContentTab>
            <ContactContainer>
              <div>
                <ContactTitle>{"Apellidos y nombres"}</ContactTitle>
                <ContactDescription>
                  {`${affiliate.firstName} ${affiliate.fatherLastname} ${affiliate.motherLastname}`}
                </ContactDescription>
              </div>
            </ContactContainer>
            <ContactContainer>
              <div>
                <ContactTitle>{"Tipo de doc"}</ContactTitle>
                <ContactDescription>{affiliate.documentType}</ContactDescription>
              </div>
              <div>
                <ContactTitle>{"N° de documento"}</ContactTitle>
                <ContactDescription>{affiliate.documentNumber}</ContactDescription>
              </div>
            </ContactContainer>
            <ContactContainer className="isResponsive">
              <div>
                <ContactTitle>{"Correo electrónico"}</ContactTitle>
                <ContactDescription>{affiliate.email}</ContactDescription>
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
            files={procedure.documents}
            loading={false}
            IsEditable={false}
          />
        </ContentTab>
      </Accordion>
    </ContentStepTwo>
  );
}

export default StepTwo;
