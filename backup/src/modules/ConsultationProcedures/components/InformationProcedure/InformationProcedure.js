import React from "react";
import Accordion from "global/components/v2/Accordion";
import moment from "moment";

import {
  ContactContainer,
  ContactDescription,
  ContactTitle,
  ContentTab,
} from "./styles";

function InformationProcedures({ person, tittleAccordion }) {
  return (
    <>
      <Accordion
        title={`Datos del ${tittleAccordion}`}
      >
        <ContentTab>
          <ContactContainer>
            <div>
              <ContactTitle>{"Apellidos y nombres"}</ContactTitle>
              <ContactDescription>
                {`${person.firstName} ${person.fatherLastname} ${person.motherLastname}`}
              </ContactDescription>
            </div>
          </ContactContainer>
          <ContactContainer>
            <div>
              <ContactTitle>{"Tipo de doc"}</ContactTitle>
              <ContactDescription>{person.documentType}</ContactDescription>
            </div>
            <div>
              <ContactTitle>{"N° de documento"}</ContactTitle>
              <ContactDescription>{person.documentNumber}</ContactDescription>
            </div>
          </ContactContainer>
          {(person.birthdate || person.relationship) && (
            <ContactContainer>
              {person.birthdate && (
                <div>
                  <ContactTitle>{"Fecha de nacimiento"}</ContactTitle>
                  <ContactDescription>
                    {moment(person.birthdate).format("DD/MM/YYYY")}
                  </ContactDescription>
                </div>
              )}
              {person.relationship && (
                <div>
                  <ContactTitle>{"Parentesco"}</ContactTitle>
                  <ContactDescription>{person.relationship}</ContactDescription>
                </div>
              )}
            </ContactContainer>
          )}
          <ContactContainer className="isResponsive">
            <div>
              <ContactTitle>{"Correo electrónico"}</ContactTitle>
              <ContactDescription>{person.email}</ContactDescription>
            </div>
            {person.phone && (
              <div>
                <ContactTitle>{"Teléfono móvil"}</ContactTitle>
                <ContactDescription>{person.phone}</ContactDescription>
              </div>
            )}
          </ContactContainer>
          {person.detail && (
            <div>
              <ContactTitle>{"Detalle del trámite"}</ContactTitle>
              <span>{person.detail}</span>
            </div>
          )}
        </ContentTab>
      </Accordion>
    </>
  );
}

export default InformationProcedures;
