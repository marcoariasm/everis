import React from "react";
import Accordion from "global/components/v2/Accordion";

import {
  ContactContainer,
  ContactDescription,
  ContactTitle,
  ContentTab,
} from "./styles";

function InformationProcedures({ person, tittleAccordion, detail, procedure }) {
  return (
    <>
      <Accordion title={`Datos del ${tittleAccordion}`}>
        <ContentTab>
          {tittleAccordion != "tramite" && (
            <>
              <ContactContainer className="isResponsive">
                <div>
                  <ContactTitle>{"Apellidos y nombres"}</ContactTitle>
                  <ContactDescription>
                    {`${person.firstName} ${
                      person.secondName ? person.secondName : ""
                    } ${person.fatherLastname} ${person.motherLastname}`}
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
                  <ContactDescription>
                    {person.documentNumber}
                  </ContactDescription>
                </div>
              </ContactContainer>
              {tittleAccordion !== "afiliado" && (
                <ContactContainer>
                  {person.birthdate && (
                    <div>
                      <ContactTitle>{"Fecha de nacimiento"}</ContactTitle>
                      <ContactDescription>
                        {person.birthdate}
                      </ContactDescription>
                    </div>
                  )}
                  {person.relationship && (
                    <div>
                      <ContactTitle>{"Parentesco"}</ContactTitle>
                      <ContactDescription>
                        {person.relationship}
                      </ContactDescription>
                    </div>
                  )}
                </ContactContainer>
              )}
              <ContactContainer className="isResponsive">
                <div>
                  <ContactTitle>{"Correo electrónico"}</ContactTitle>
                  <ContactDescription>{person.email}</ContactDescription>
                </div>
                {person.cellphone && (
                  <div>
                    <ContactTitle>{"Teléfono móvil"}</ContactTitle>
                    <ContactDescription>{person.cellphone}</ContactDescription>
                  </div>
                )}
              </ContactContainer>
            </>
          )}
          {detail && tittleAccordion === "tramite" && (
            <>
              <ContactContainer className="isResponsive">
                <div>
                  <ContactTitle>{"Correo electrónico"}</ContactTitle>
                  <ContactDescription>{procedure.email}</ContactDescription>
                </div>
                <div>
                  <ContactTitle>{"Teléfono móvil"}</ContactTitle>
                  <ContactDescription>{procedure.cellphone}</ContactDescription>
                </div>
              </ContactContainer>
              <ContactContainer className="isResponsive">
                <div>
                  <ContactTitle>{"Detalle del trámite"}</ContactTitle>
                  <span>{detail}</span>
                </div>
              </ContactContainer>
            </>
          )}
        </ContentTab>
      </Accordion>
    </>
  );
}

export default InformationProcedures;
