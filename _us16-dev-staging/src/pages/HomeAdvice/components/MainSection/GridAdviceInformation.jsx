import React from 'react'

import { profilingValue } from 'shared/constant/Parameters'

import Max100k from 'pages/HomeAdvice/components/MainSection/Max100k'
import RejaMin100k from 'pages/HomeAdvice/components/MainSection/RejaMin100k'
import LegalMin100k from 'pages/HomeAdvice/components/MainSection/LegalMin100k'

function GridAdviceInformation({ amount, profile }) {
  return (
    <>
      {amount < 100000 && (
        <>
          {(profile === profilingValue[0].value || profile === profilingValue[1].value) && <RejaMin100k />}
          {(profile === profilingValue[2].value || profile === profilingValue[3].value) && <LegalMin100k />}
        </>
      )}
      {amount >= 100000 && <Max100k />}
    </>
  )
}
export default GridAdviceInformation
