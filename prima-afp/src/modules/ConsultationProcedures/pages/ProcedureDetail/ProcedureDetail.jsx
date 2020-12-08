import Stepper from "global/components/v2/Stepper";
import { ProcedureDetailContext } from "modules/ConsultationProcedures/routes/UserProcedureDetailContext";
import Header from "modules/shared/components/Header";
import WhiteCard from "modules/shared/components/WhiteCard";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import userGreen from "shared/images/userGreen.svg";
import StepTwo from "../../components/StepTwo/StepTwo";
import { getProcedureDetail } from "../../services";
import {
  ExecutiveCard,
  HeaderProcedure,
  InformationExecutive,
  LabelStep,
  PaginationButton,
  StepperContainer,
  StepperContent,
  Title,
  UserExecutiveImg,
} from "./styles";

function ProcedureDetail() {
  const { id } = useParams();
  const stepNumbers = [1, 2, 3];
  const { url } = useRouteMatch();
  const { procedureDetail, setProcedureDetail, statesTypes } = useContext(
    ProcedureDetailContext
  );
  const [currentStep, setcurrentStep] = useState(null);

  const getprocedureDetail = () =>
    getProcedureDetail(id)
      .then((response) => {
        setProcedureDetail(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

  useEffect(() => {
    if (procedureDetail && Object.values(procedureDetail).length === 0) {
      getprocedureDetail();
    }
  }, []);

  useEffect(() => {
    if (
      procedureDetail &&
      Object.values(procedureDetail).length > 0 &&
      !currentStep
    ) {
      const stateOfCurrentProcedure = statesTypes.find(
        (state) => state.name === procedureDetail.status
      );

      setcurrentStep(stateOfCurrentProcedure.step);
    }
  }, [procedureDetail]);

  const getStepStatus = (stepIndex) => {
    if (stepIndex === currentStep) {
      return currentStep === 3 ? "completed" : "active";
    }
    if (stepIndex > currentStep) {
      return "";
    }
    return "completed";
  };

  const getStepName = (status, stepIndex) => {
    const defaultNameStep =
      !status && stepIndex === 2 ? "En Proceso" : "Finalizado";
    return status ? status.name : defaultNameStep;
  };

  const steps = () =>
    stepNumbers.map((step) => {
      const status = procedureDetail.statuses.find(
        (status) => status.step === step
      );

      return {
        label: (
          <LabelStep>
            <span>{getStepName(status, step)}</span>
            {status && <span>{status.registerDate}</span>}
          </LabelStep>
        ),
        status: getStepStatus(step),
      };
    });

  const containerActiveStep = () => (
    <StepperContent>
      <StepTwo procedure={procedureDetail} />
    </StepperContent>
  );

  const Messages = (className) => (
    <Link to={`${url}/mensajes`} className={className}>
      <PaginationButton>Ver mensajes</PaginationButton>
    </Link>
  );

  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        {procedureDetail &&
          Object.values(procedureDetail).length > 0 &&
          currentStep && (
            <>
              <Title className="headerTitleHighligh">
                {url.includes("apoderados")
                  ? "Trámites realizados por apoderados"
                  : "Estado de mis trámites"}
              </Title>
              <HeaderProcedure>
                <div>
                  <h3 className="bodyTextSmall">Datos del trámite</h3>
                  <h2 className="headerSubTitleHighligh">
                    {procedureDetail.typeRequest}
                  </h2>
                </div>
                <ExecutiveCard>
                  <div className="flex">
                    <UserExecutiveImg src={userGreen} alt="userGreen" />
                    <InformationExecutive>
                      <span className="bodyTextSmall">Ejecutivo:</span>
                      {procedureDetail.executive &&
                        procedureDetail.executive.fullNames && (
                          <span className="valueFormTitle">
                            {procedureDetail.executive.fullNames}
                          </span>
                        )}
                      {Messages("is-responsive")}
                    </InformationExecutive>
                  </div>
                  {Messages("not-responsive flex fcenter")}
                </ExecutiveCard>
              </HeaderProcedure>
              <StepperContainer>
                <Stepper stepList={steps()}></Stepper>
              </StepperContainer>
              {containerActiveStep()}
            </>
          )}
      </WhiteCard>
    </>
  );
}

export default ProcedureDetail;
