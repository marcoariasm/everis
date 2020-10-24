import React, { useState } from "react";
import Header from "shared/components/Header";
import WhiteCard from "shared/components/WhiteCard";
import userGreen from "shared/images/userGreen.svg";
import Stepper from "global/components/Stepper/Stepper";
import StepTwo from "../../components/StepTwo/StepTwo";
import { Link, useParams } from "react-router-dom";
import ProcedureDetailResponse from "../../services/responses/dm-procedure.response";
import moment from "moment";

import {
  Title,
  PaginationButton,
  UserExecutiveImg,
  ExecutiveCard,
  InformationExecutive,
  HeaderProcedure,
  StepperContainer,
  StepperContent,
  LabelStep,
} from "./styles";

function ProcedureDetail() {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const { id } = useParams();

  const getStepStatus = (stepIndex) => {
    if (stepIndex === ProcedureDetailResponse.statusId) {
      return "active";
    }
    if (stepIndex > ProcedureDetailResponse.statusId) {
      return "";
    }
    return "completed";
  };

  const steps = () => [
    {
      label: (
        <LabelStep>
          <span>Registrado</span>
          <span>
            {moment(ProcedureDetailResponse.registerDate).format(
              "DD/MM/YYYY HH:mm a"
            )}
          </span>
        </LabelStep>
      ),
      status: getStepStatus(1),
      component: (
        <StepperContent>
          <StepTwo
            procedure={ProcedureDetailResponse}
            onChange={incrementCurrentStep}
          />
        </StepperContent>
      ),
    },
    {
      label: <LabelStep> Observado</LabelStep>,
      status:  getStepStatus(2),
      component: null,
    },
    {
      label: <LabelStep> Finalizado</LabelStep>,
      status:  getStepStatus(3),
      component: null,
    },
  ];

  const incrementCurrentStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        <Title className="headerTitleHighligh">Estado de mis trámites</Title>
        <HeaderProcedure>
          <div>
            <h3 className="bodyTextSmall">Datos del trámite</h3>
            <h2 className="headerSubTitleHighligh">Gastos de sepelio</h2>
          </div>
          <ExecutiveCard>
            <div className="flex">
              <UserExecutiveImg src={userGreen} alt="userGreen" />
              <InformationExecutive>
                <span className="bodyTextSmall">Ejecutivo:</span>
                <span className="valueFormTitle">Roberto Martinez</span>
                <Link
                  to="/proceso95-5/consultation-procedures/12/messages"
                  className="is-responsive"
                >
                  <PaginationButton>Ver mensajes</PaginationButton>
                </Link>
              </InformationExecutive>
            </div>
            <Link
              to={`/tramites-detalle/tramite/${id}/messages`}
              className="not-responsive flex fcenter"
            >
              <PaginationButton>Ver mensajes</PaginationButton>
            </Link>
          </ExecutiveCard>
        </HeaderProcedure>
        <StepperContainer>
          <Stepper action={currentStepIndex} stepList={steps()} />
        </StepperContainer>
      </WhiteCard>
    </>
  );
}

export default ProcedureDetail;
