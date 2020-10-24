import React, { useState } from 'react'

import AdvisorySequence from './components/Tab/AdvisorySequence'
import GetAdvice from 'pages/Advisory/components/Steps/GetAdvice/GetAdvice'
import RegisterBeneficiaries from 'pages/Advisory/components/Steps/RegisterBeneficiaries/RegisterBeneficiaries'
import Alternatives from 'pages/Advisory/components/Steps/Alternatives/Alternatives'

function Advisory() {
  const [step, setStep] = useState(0)
  return (
    <>
      <AdvisorySequence step={step} setStep={setStep}>
        <GetAdvice setStep={setStep} />
        <RegisterBeneficiaries setStep={setStep} />
        <Alternatives setStep={setStep} />
      </AdvisorySequence>
    </>
  )
}

export default Advisory
