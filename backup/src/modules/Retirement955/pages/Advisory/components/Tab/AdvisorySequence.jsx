import React, { Children, Fragment } from 'react'

import { titlesTab } from 'modules/Retirement955/constants/ConstantTitlesTab'

import StyleStep from './options/StyleStep'
import StyleLine from './options/StyleLine'
import StepTitle from './options/StepTitle'
import HeaderTitle from './options/HeaderTitle'
import ContentStep from './options/ContentStep'
import Circle from './options/Circle'
import BodySequency from './options/BodySequency'

const AdvisorySequence = ({ children, step, setStep }) => {
  const childrenArray = Children.toArray(children)
  const listSteps = () => {
    return childrenArray.map((a = {}, i) => (
      <Fragment key={i}>
        {step > i ? (
          <StyleStep
            size={childrenArray.length}
            i={i}
            index={i - 1}
            step={step}
            equal={step === i}
            setStep={setStep}
            onClick={() => setStep(() => i)}>
            <Circle index={i - 1} step={step}>
              <label>{i + 1}</label>
            </Circle>
            <StepTitle index={i - 1} step={step}>
              {titlesTab[i]}
            </StepTitle>
            <StyleLine index={i - 1} step={step}></StyleLine>
          </StyleStep>
        ) : (
          <StyleStep size={childrenArray.length} index={i - 1} i={i} step={step} equal={step === i} setStep={setStep}>
            <Circle index={i - 1} step={step}>
              <label>{i + 1}</label>
            </Circle>
            <StepTitle index={i - 1} step={step}>
              {titlesTab[i]}
            </StepTitle>
            <StyleLine index={i - 1} step={step}></StyleLine>
          </StyleStep>
        )}
      </Fragment>
    ))
  }
  return (
    <>
      <ContentStep>
        <HeaderTitle>Etapa 01: Asesoría</HeaderTitle>
        <BodySequency>{listSteps()}</BodySequency>
      </ContentStep>
      {childrenArray[step]}
    </>
  )
}
export default AdvisorySequence
