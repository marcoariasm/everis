import React, { useEffect, useState } from "react";
import RadioButtonList from "modules/shared/components/RadioButtonList";
import { allColors } from "shared/styles/index";
import styled from "styled-components";
import MaterialSelect from "modules/shared/components/MaterialSelect";
import MaterialInput from "modules/shared/components/MaterialInput";
import { burialExpenses } from "shared/constant/BurialExpenses";
import { size } from "shared/styles/Responsive";

export const ContainerInputs = styled.div`
  display: flex;
  justify-content: end;

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
    margin: 1em 0;
  }
`;

export const ContainerSelect = styled.form`
  @media screen and (min-width: ${size.tablet}) {
    width: 50%;
  }
  border: 2px solid ${allColors.colorGrayLight};
  border-radius: 8px;
  height: 48px;
  position: relative;
  display: flex;
`;

export const Description = styled.p`
  margin: 1em 0 1.5em;
  color: ${allColors.colorGrayText};
`;

function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState();
  const [bankName, setNameBank] = useState();
  const [typeAccount, setTypeAccount] = useState();
  const [numberAccount, setNumberAccount] = useState();
  const [intebankAccount, setIntebankAccount] = useState();

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
        Selecciona la forma de pago
      </span>
      <Description>
        Recuerda que si tu iniciaste el trámite, entonces
        <strong>
          {" "}
          tu nombre debe figurar en las boletas o facturas y además tus datos
          deben coincidir con la cuenta bancaria que indiques.
        </strong>
        <br />
        <br />
        La cuenta bancaria debe ser personal y no mancomunada.
      </Description>
      <RadioButtonList
        className="radio-button-container"
        onChange={setPaymentMethod}
        items={burialExpenses.stepTwo.paymentMethods}
      />
      {paymentMethod === "paymentInAccount" ? (
        <>
          <ContainerInputs>
            <ContainerSelect>
              <MaterialSelect
                placeholder={"Banco"}
                selectOptions={selectOptions}
              />
            </ContainerSelect>
            <ContainerSelect>
              <MaterialSelect
                placeholder={"Tipo de cuenta"}
                selectOptions={selectOptions}
              />
            </ContainerSelect>
          </ContainerInputs>
          <ContainerInputs>
            <MaterialInput placeholder="Correo electrónico de la empresa" />
            <MaterialInput placeholder="Teléfono móvil de la empresa" />
          </ContainerInputs>
        </>
      ) : (
        <></>
      )}
      {paymentMethod === "paymentInBankCounter" ? (
        <>
          <ContainerInputs>
            <ContainerSelect>
              <MaterialSelect
                placeholder={"Banco"}
                selectOptions={selectOptions}
              />
            </ContainerSelect>
          </ContainerInputs>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PaymentMethod;
