import React, { useEffect, useState, useContext } from "react";
import Header from "modules/shared/components/Header";
import WhiteCard from "modules/shared/components/WhiteCard";
import userGreen from "shared/images/userGreen.svg";
import Stepper from "global/components/v2/Stepper";
import StepTwo from "../../components/StepTwo/StepTwo";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { statusesSteps, states } from "../../constants/states";
import { getProcedureDetail } from "../../services";
import { ProcedureDetailContext } from "modules/ConsultationProcedures/routes/UserProcedureDetailContext";
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
  let { id } = useParams();
  const { url } = useRouteMatch();
  const { procedureDetail, setProcedureDetail } = useContext(
    ProcedureDetailContext
  );
  const currentProcedureState = states.find(
    (state) => state.value === procedureDetail.status
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  useEffect(() => {
    getProcedureDetail(id)
      .then((response) => {
        setProcedureDetail(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  const getStepStatus = (stepIndex) => {
    const currentStatus = currentProcedureState.step;
    if (stepIndex === currentStatus) {
      return "active";
    }
    if (stepIndex > currentStatus) {
      return "";
    }
    return "completed";
  };

  const containerActiveStep = () => (
    <StepperContent>
      <StepTwo procedure={procedureDetail} onChange={incrementCurrentStep} />
    </StepperContent>
  );

  const steps = () =>
    statusesSteps.map((statuses, index) => {
      const stepStatuses = procedureDetail.statuses.filter((status) =>
        statuses.find((state) => state.code === status.name)
      );

      const currentStatusStep =
        stepStatuses.length > 0
          ? [...stepStatuses].pop()
          : { name: statuses[0].code };

      const currentStatus = states.find(
        (state) => state.code === currentStatusStep.name
      );

      return {
        label: (
          <LabelStep>
            <span>{currentStatus.value}</span>
            {currentStatusStep && <span>{currentStatusStep.registerDate}</span>}
          </LabelStep>
        ),
        status: getStepStatus(index + 1),
        component: containerActiveStep(),
      };
    });

  const Messages = (className) => {
    const isRepresntativeAndHaveMessages =
      url.includes("apoderados") && procedureDetail.messages.length > 0;
    if (isRepresntativeAndHaveMessages || !url.includes("apoderados")) {
      return (
        <Link to={`${url}/mensajes`} className={className}>
          <PaginationButton>Ver mensajes</PaginationButton>
        </Link>
      );
    } else {
      return <></>;
    }
  };

  const incrementCurrentStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        {procedureDetail && Object.values(procedureDetail).length > 0 && (
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
              <Stepper action={currentStepIndex} stepList={steps()}></Stepper>
            </StepperContainer>
          </>
        )}
      </WhiteCard>
    </>
  );
}

export default ProcedureDetail;
