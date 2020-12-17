import React from "react";
import { StepWrapper, StyledList, Step } from "./styles";

function Stepper(props) {

  return (
    <StepWrapper>
      <StepList steps={props.stepList} />
    </StepWrapper>
  );
}

function StepList(props) {
  return (
    <StyledList>
      {props.steps &&
        props.steps.map((step, i) => {
          return (
            <Step
              totalSteps={props.steps.length}
              key={i}
              className={step.status}
            >
              {step.label}
            </Step>
          );
        })}
    </StyledList>
  );
}

export default Stepper;
