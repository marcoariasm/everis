import React from 'react'

import { profilingValue, MAIN_MIN_AMOUNT } from 'modules/Retirement955/constants/Parameters'

import Max100k from 'modules/Retirement955/pages/HomeAdvice/components/MainSection/Max100k'
import RejaMin100k from 'modules/Retirement955/pages/HomeAdvice/components/MainSection/RejaMin100k'
import LegalMin100k from 'modules/Retirement955/pages/HomeAdvice/components/MainSection/LegalMin100k'

function GridAdviceInformation({ amount, profile }) {
  return (
    <>
      {amount < MAIN_MIN_AMOUNT && (
        <>
          {(profile === profilingValue[0].value || profile === profilingValue[1].value) && <RejaMin100k />}
          {(profile === profilingValue[2].value || profile === profilingValue[3].value) && <LegalMin100k />}
        </>
      )}
      {amount >= MAIN_MIN_AMOUNT && <Max100k />}
    </>
  )
}
export default GridAdviceInformation
