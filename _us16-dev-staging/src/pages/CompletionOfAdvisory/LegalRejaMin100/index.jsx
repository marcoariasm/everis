import React from 'react'

import { CompletionAdvisory } from 'shared/constant/ConstantCompletionOfAdvisory'
import { profilingValue } from 'shared/constant/Parameters'

import { ContentText } from './style'

export const LegalRejaMin100 = ({ days, email, profile, ruc }) => {
  return (
    <>
      {(profile === profilingValue[0].value || profile === profilingValue[1].value) && (
        <ContentText>
          <span className="bodyText">
            {ruc === true && <span>{CompletionAdvisory.dataRejaConRuc}</span>}
            {ruc === false && <span>{CompletionAdvisory.dataRejaSinRuc}</span>}
            {days}
            {CompletionAdvisory.rejaText}
            {email}.
          </span>
          <span className="bodyText">{CompletionAdvisory.rejaText2}</span>
        </ContentText>
      )}
      {(profile === profilingValue[2].value || profile === profilingValue[3].value) && (
        <ContentText>
          <span className="bodyText">
            {CompletionAdvisory.dataLegalMin100}
            {email}.
          </span>
          <span className="bodyText">{CompletionAdvisory.dataLegalMin1002}</span>
        </ContentText>
      )}
    </>
  )
}
