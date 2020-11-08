import React from 'react'

import { CompletionAdvisory } from 'modules/Retirement955/constants/ConstantCompletionOfAdvisory'
import { MAIN_MIN_AMOUNT } from 'modules/Retirement955/constants/Parameters'

import { ContentTitle, SubTitle } from './style'

export const HeaderMain = ({ mount }) => {
  return (
    <ContentTitle>
      {mount < MAIN_MIN_AMOUNT && <h1 className="informativeTitle">{CompletionAdvisory.title}</h1>}
      {mount >= MAIN_MIN_AMOUNT && <h1 className="informativeTitle">{CompletionAdvisory.title2}</h1>}
      {mount < MAIN_MIN_AMOUNT ? (
        <SubTitle className="informationSubTitle">{CompletionAdvisory.subtitle}</SubTitle>
      ) : (
        ''
      )}
    </ContentTitle>
  )
}
