import React, { useEffect, useState } from "react";
import ContentButton from "pages/BurialExpenses/components/FooterSection/ContentButton";
import { burialExpenses } from "shared/constant/BurialExpenses";
import { allColors } from "shared/styles/index";
import styled from "styled-components";
import { size } from "shared/styles/Responsive";

import MaterialInput from "modules/shared/components/MaterialInput";
import MaterialSelect from "modules/shared/components/MaterialSelect";

export const Description = styled.p`
  margin: 1.5em 0;
  color: ${allColors.colorGrayText};
`;

export const ContainerButtons = styled.div`
  margin: 4em 0 2em;
`;

export const ContainerSelect = styled.form`
  width: 100%;
  border: 2px solid ${allColors.colorGrayLight};
  border-radius: 8px;
  height: 48px;
  position: relative;
  display: flex;
  margin-bottom: 1em;
`;

export const ContainerInputs = styled.div`
  display: flex;
  justify-content: center;

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
`;

export const TitleInputs = styled.span`
  margin: 1.5em 0;
`;

function FormStepOne() {
  const selectOptions = [
    {
      value: "Muerte Natural",
      name: "Muerte Natural",
      shortName: "Muerte Natural",
    },
    {
      value: "Muerte por accidente",
      name: "Muerte por accidente",
      shortName: "Muerte por accidente",
    },
    {
      value: "Muerte por accidente laboral",
      name: "Muerte por accidente laboral",
      shortName: "Muerte por accidente laboral",
    },
  ];
  const [formIsValid, setFormValidity] = useState(false);
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [causeOfDeath, setCauseOfDeath] = useState({});

  useEffect(() => {
    validateForm();
  }, [dateOfDeath]);

  const validateForm = () => {
    if (dateOfDeath.length && causeOfDeath.inputValue)
      return setFormValidity(true);
    setFormValidity(false);
  };

  return (
    <>
      <Description>{burialExpenses.stepOne.description}</Description>
      <TitleInputs className="informativeBodyTitleGreen">
        Datos sobre el fallecimento
      </TitleInputs>
      <ContainerInputs>
        <MaterialInput
          inputIsDate={true}
          onChange={setDateOfDeath}
          placeholder={burialExpenses.stepOne.formLabels.dateOfDeath}
        />
        <ContainerSelect>
          <MaterialSelect
            placeholder={"Motivo de fallecimiento"}
            onChange={setCauseOfDeath}
            selectOptions={selectOptions}
          />
        </ContainerSelect>
      </ContainerInputs>
      <ContainerButtons>
        <ContentButton
          classButton="btn-pagina-principal"
          text={burialExpenses.stepOne.buttonName}
        />
      </ContainerButtons>
    </>
  );
}

export default FormStepOne;
