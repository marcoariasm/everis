import React from 'react'

import { CompletionAdvisory } from 'shared/constant/ConstantCompletionOfAdvisory'

import { ContentTitle, SubTitle } from './style'

export const HeaderMain = ({ mount }) => {
  return (
    <ContentTitle>
      {mount < 100000 && <h1 className="informativeTitle">{CompletionAdvisory.title}</h1>}
      {mount >= 100000 && <h1 className="informativeTitle">{CompletionAdvisory.title2}</h1>}
      {mount < 100000 ? <SubTitle className="informationSubTitle">{CompletionAdvisory.subtitle}</SubTitle> : ''}
    </ContentTitle>
  )
}
