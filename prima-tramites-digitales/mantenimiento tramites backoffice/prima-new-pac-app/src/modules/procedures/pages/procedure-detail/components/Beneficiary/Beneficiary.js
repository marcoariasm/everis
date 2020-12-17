import Accordion from "shared/components/Accordion/index";
import React from "react";
import {
  ContactContainer,
  ContactDescription,
  ContactTitle,
  ContentTab,
} from "./styles";

function Beneficiary({ beneficary, index }) {
  const title = () => (
    <div>
      <span className="informationFooterText">{`Beneficiario ${index}:`}</span>
      <br />
      <span>{`${beneficary.firstName} ${
        beneficary.secondName ? beneficary.secondName : ""
      } ${beneficary.fatherLastname} ${beneficary.motherLastname}`}</span>
    </div>
  );
  return (
    <Accordion title={title()}>
      <ContentTab>
        <ContactContainer>
          <div>
            <ContactTitle>{"Tipo de doc"}</ContactTitle>
            <ContactDescription>{beneficary.documentType}</ContactDescription>
          </div>
          <div>
            <ContactTitle>{"N° de documento"}</ContactTitle>
            <ContactDescription>{beneficary.documentNumber}</ContactDescription>
          </div>
          {beneficary.birthdate && (
            <div>
              <ContactTitle>{"Fecha de nacimiento"}</ContactTitle>
              <ContactDescription>{beneficary.birthdate}</ContactDescription>
            </div>
          )}
        </ContactContainer>
        <ContactContainer>
          <div>
            <ContactTitle>{"Sexo"}</ContactTitle>
            <ContactDescription>
              {beneficary.gender === "M" ? "Masculina" : "Femenina"}
            </ContactDescription>
          </div>
          <div>
            <ContactTitle>{"Parentesco"}</ContactTitle>
            <ContactDescription>{beneficary.relationship}</ContactDescription>
          </div>
          {beneficary.hasDisability && (
            <div>
              <ContactTitle>{"Condición"}</ContactTitle>
              <ContactDescription className="capitalize">
                {beneficary.hasDisability.toLowerCase()}
              </ContactDescription>
            </div>
          )}
        </ContactContainer>
      </ContentTab>
    </Accordion>
  );
}

export default Beneficiary;
