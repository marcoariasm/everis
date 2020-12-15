import React from 'react';
import Card from 'global/components/v1/Card/Card';
import TabFooter from 'modules/Retirement955/components/TabFooter/TabFooter';
import StepTwoOne from './StepTwoOne';
import StepTwoTwo from './StepTwoTwo';
import StepTwoThree from './StepTwoThree';

const StepTwo = ({ setStep }) => {
  const handleNextStep = () => {
    console.log('handleNextStep');

    return true;
  };

  return (
    <>
      <Card>
        <StepTwoOne />
        <StepTwoTwo />
        <StepTwoThree />
      </Card>
      <TabFooter setStep={setStep} next={handleNextStep} />
    </>
  );
};

export default StepTwo;
