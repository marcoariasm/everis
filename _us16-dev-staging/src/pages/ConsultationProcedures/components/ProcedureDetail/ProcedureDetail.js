import React, { useState } from "react";
import { size } from "shared/styles/Responsive";
import styled from "styled-components";
import userGreen from "shared/images/userGreen.svg";
import Stepper from "global/components/Stepper/Stepper";
import StepTwo from "../StepTwo/StepTwo";
import { Link } from "react-router-dom";
import { allColors } from "shared/styles/index";

export const Title = styled.h1`
  margin: 15px 0 1.5em;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    text-align: left;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 20px;
  }
`;

export const PaginationButton = styled.button`
  outline: none;
  background: ${allColors.colorWhiteBase};
  border: 1.4px solid ${allColors.colorGreen};
  border-radius: 6px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${allColors.colorGreen};
  cursor: pointer;
  font-family: Calibri;
  padding: 2px 0;
  margin: 0.5em 0;
  width: 115px;
  @media only screen and (max-width: ${size.mobileL}) {
    width: 130px;
  }
`;

export const UserExecutiveImg = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 1em 0 0;
  @media only screen and (max-width: ${size.mobileL}) {
    margin: 0 1.5em 0 1em;
    width: 30px;
    height: 30px;
  }
`;

export const ExecutiveCard = styled.div`
  border: 1px solid #ff000000;
  border: 1px solid ${allColors.colorGreen};
  border-radius: 6px;
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: center;
  margin-left: 1em;
  padding: 10px 1em;
  @media only screen and (min-width: ${size.mobileL}) {
  }
  @media only screen and (max-width: ${size.mobileL}) {
    grid-template-columns: 1fr;
    > .not-responsive {
      display: none;
    }
  }
`;

export const InformationExecutive = styled.div`
  padding-right: 0.5em;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${size.mobileL}) {
    > .is-responsive {
      display: none;
    }
  }
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: ${size.mobileL}) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

export const StepperContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4em 0 1em;
`;

export const StepperContent = styled.div`
  margin-top: 3em;
`;

export const LabelStep = styled.div`
  font-family: "Calibri";
  display: flex;
  font-size: 14px;
  flex-direction: column;
  > span:first-child {
    margin-bottom: 0.5em;
    font-weight: bold;
  }
`;

export const ExecutiveContainer = styled.div`
  display: flex;
`;

function ProcedureDetail({ procedureName }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const steps = () => [
    {
      label: (
        <LabelStep>
          <span>Registrado</span>
          <span>04/08/2020</span>
          <span>11:00 am</span>
        </LabelStep>
      ),
      status: "completed",
      component: (
        <StepperContent>
          <StepTwo onChange={incrementCurrentStep} />
        </StepperContent>
      ),
    },
    {
      label: (
        <LabelStep>
          <span>Observado</span>
          <span>14/08/2020</span>
          <span>10:00 am</span>
        </LabelStep>
      ),
      status: "active",
      component: (
        <StepperContent>
          <StepTwo onChange={incrementCurrentStep} />
        </StepperContent>
      ),
    },
    {
      label: (
        <LabelStep>
          <span>Finalizado</span>
        </LabelStep>
      ),
      status: "",
      component: (
        <StepperContent>
          <div onChange={incrementCurrentStep}>hola</div>
        </StepperContent>
      ),
    },
  ];

  const incrementCurrentStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <>
      <Title className="headerTitleHighligh">Estado de mis trámites</Title>
      <Header>
        <div>
          <h3 className="bodyTextSmall">Datos del trámite</h3>
          <h2 className="headerSubTitleHighligh">{procedureName}</h2>
        </div>
        <ExecutiveCard>
          <div className="flex">
            <UserExecutiveImg src={userGreen} alt="userGreen" />
            <InformationExecutive>
              <span className="bodyTextSmall">Ejecutivo:</span>
              <span className="valueFormTitle">Roberto Martinez</span>
              <Link
                to="/proceso95-5/consultation-procedures-messages"
                className="is-responsive"
              >
                <PaginationButton>Ver mensajes</PaginationButton>
              </Link>
            </InformationExecutive>
          </div>
          <Link
            to="/proceso95-5/consultation-procedures-messages"
            className="not-responsive flex fcenter"
          >
            <PaginationButton>Ver mensajes</PaginationButton>
          </Link>
        </ExecutiveCard>
      </Header>
      <StepperContainer>
        <Stepper action={currentStepIndex} stepList={steps()} />
      </StepperContainer>
    </>
  );
}

export default ProcedureDetail;
