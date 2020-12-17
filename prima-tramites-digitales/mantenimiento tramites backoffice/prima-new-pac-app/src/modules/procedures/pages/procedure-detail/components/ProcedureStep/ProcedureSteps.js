import Stepper from "global/components/Stepper/Stepper";
import Button from "global/components/v1/Button/Button";
import {
  MaterialSelect,
  OutlinedSelectContainer,
} from "modules/procedures/shared/components/index";
import React, { useContext, useEffect, useState } from "react";
import { ProcedureDetailContext } from "../../../../routes/UserProcedureDetailContext";
import {
  changeProcedureState,
  getProcedureDetail,
  getStatesForTypeProcedure,
} from "../../services";
import {
  ContainerButton,
  ContainerSelects,
  LabelStep,
  StepperContainer,
} from "./styles";

function ProcedureSteps({ idExecutive }) {
  const stepNumbers = [1, 2, 3];
  const { procedureDetail, setProcedureDetail } = useContext(
    ProcedureDetailContext
  );
  const [currentStep, setcurrentStep] = useState(null);
  const [statesTypes, setStatesTypes] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [currentReason, setCurrentReason] = useState(null);

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

  const getCurrentStateAndCurrentReason = (states) => {
    const stateOfCurrentProcedure = states.find(
      (state) => state.value === procedureDetail.status
    );
    const currentReason = stateOfCurrentProcedure.reasons.find(
      (reason) => reason.idReason === procedureDetail.idReason
    );
    setcurrentStep(stateOfCurrentProcedure.step);
    setCurrentState(stateOfCurrentProcedure);
    setCurrentReason(currentReason);
  };

  useEffect(() => {
    if (
      procedureDetail &&
      Object.values(procedureDetail).length > 0 &&
      !!statesTypes &&
      statesTypes.length > 0
    ) {
      getCurrentStateAndCurrentReason(statesTypes);
    }
  }, [procedureDetail]);

  useEffect(() => {
    if (!statesTypes) {
      getStatesForTypeProcedure().then((response) => {
        setStatesTypes(response);
        getCurrentStateAndCurrentReason(response);
      });
    }
  }, []);

  const handleCurrentState = (event) => {
    if (event) {
      setCurrentState(event);
      setCurrentReason({});
    }
  };

  const handleCurrentReason = (event) => {
    if (event) {
      setCurrentReason(event);
    }
  };

  const getDetailProcedure = () => {
    getProcedureDetail(procedureDetail.idRequest)
      .then((response) => {
        setProcedureDetail(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const changeStateOfProcedure = (event) => {
    event.preventDefault();
    const payload = {
      idStatus: currentState.idStatus,
      idReason: currentReason.idReason,
    };

    changeProcedureState(procedureDetail.idRequest, payload)
      .then((response) => {
        getDetailProcedure();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <>
      {!!statesTypes && !!currentState && !!currentReason && (
        <>
          <StepperContainer>
            <Stepper stepList={steps()} />
          </StepperContainer>
          <ContainerSelects>
            <OutlinedSelectContainer>
              <MaterialSelect
                fontFamily={"FS Emeric"}
                selectWidth="100%"
                initialValue={currentState.value}
                onChange={handleCurrentState}
                selectOptions={statesTypes}
                placeholder="Estado"
                name="Estado"
                disabled={
                  currentStep === 3 ||
                  !procedureDetail.executive ||
                  idExecutive !== procedureDetail.executive.idExecutive
                }
              />
            </OutlinedSelectContainer>
            <OutlinedSelectContainer>
              <MaterialSelect
                fontFamily={"FS Emeric"}
                initialValue={currentReason.value}
                reset={currentState}
                selectWidth="100%"
                onChange={handleCurrentReason}
                selectOptions={currentState.reasons}
                placeholder="Motivo"
                name="Motivo"
                disabled={
                  currentStep === 3 ||
                  !procedureDetail.executive ||
                  idExecutive !== procedureDetail.executive.idExecutive
                }
              />
            </OutlinedSelectContainer>
          </ContainerSelects>
          <ContainerButton>
            <Button
              disabled={
                Object.values(currentState).length === 0 ||
                Object.values(currentReason).length === 0 ||
                currentStep === 3 ||
                !procedureDetail.executive ||
                idExecutive !== procedureDetail.executive.idExecutive
              }
              onClick={changeStateOfProcedure}
            >
              Guardar
            </Button>
          </ContainerButton>
        </>
      )}
    </>
  );
}

export default ProcedureSteps;
