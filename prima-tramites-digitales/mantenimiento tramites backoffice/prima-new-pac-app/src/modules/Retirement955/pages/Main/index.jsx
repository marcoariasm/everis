import React, { useState } from 'react';

import Tab from 'modules/Retirement955/components/Tab/Tab';
import InfoAfiliado from 'modules/Retirement955/components/InfoAfiliado';
import { StepOne, StepTwo, StepThree } from './Steps';

const Index = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      <InfoAfiliado />
      <Tab step={step}>
        <StepOne setStep={setStep} />
        <StepTwo setStep={setStep} />
        <StepThree setStep={setStep} />
      </Tab>
    </>
  );
};

export default Index;
