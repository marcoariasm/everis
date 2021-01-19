import React, { useState, useEffect } from "react";
import {StepWrapper, StyledList, Step} from './styles';

function Stepper(props) {
  const [steps, setSteps] = useState(props.stepList);
  const [activeView, setActiveView] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  let action = props.action;
  
  useEffect(() => {
    const activeStep = steps.find((step) => step.status === "active");
    if (activeStep) {
      setActiveView(activeStep.component);
    }
  }, [steps]);

  useEffect(() => {
    updateCurrent(props.action, steps);
  }, [props.action]);

  const updateCurrent = (action, stateSteps) => {
    if (action === currentStep + 1) {
      nextStep(stateSteps);
    } else if (action === currentStep - 1) {
      backStep(stateSteps);
    } 
  };
  const nextStep = (stateSteps) => {
    let hasActive = false;
    const updatedArray = stateSteps.map((step, i) => {
      if (step.status === "active" && i <= stateSteps.length - 1) {
        step.status = "completed";
      } else if (
        !hasActive &&
        step.status !== "completed" &&
        i <= stateSteps.length - 1
      ) {
        step.status = "active";
        hasActive = true;
      }
      return step;
    });
    setCurrentStep(currentStep + 1);
    setSteps(updatedArray);
  };

  const backStep = () => {
    const reversed = steps.reverse();
    let hasActive = false;
    const backStep = reversed
      .map((step, i) => {
        if (step.status === "completed" && !hasActive && i < reversed.length) {
          step.status = "active";
          hasActive = true;
        } else if (step.status === "active" && i >= 0 && i < reversed.length) {
          step.status = "";
        }
        return step;
      })
      .reverse();
    setCurrentStep(currentStep - 1);
    setSteps(backStep);
  };
  return (
      <StepWrapper>
        <StepList steps={steps} />
        <StepContainer>{activeView}</StepContainer>
      </StepWrapper>
  );
}

function StepContainer(props) {
  return <div>{props.children}</div>;
}

function StepList(props) {
  return (
    <StyledList>
      {props.steps &&
        props.steps.map((step, i) => {
          return (
            <Step totalSteps={props.steps.length} key={i} className={step.status}>
              {step.label}
            </Step>
          );
        })}
    </StyledList>
  );
}

export default Stepper;