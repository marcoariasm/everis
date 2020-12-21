import React from 'react'

import { CoinSection, ContentSection, ContainerText } from './style'

export const ContentCard = ({ cantPension, mount, title, titleMensual }) => {
  return (
    <>
      <ContainerText>
        <ContentSection>
          <span className="informativeBodyTitleGreen">{title}</span>
          {cantPension && <CoinSection className="statementTableBody">{cantPension}</CoinSection>}
        </ContentSection>
        <ContentSection>
          <span className="informativeBodyTitleGreen">{titleMensual}</span>
          {mount && <CoinSection className="statementTableBody">{mount}</CoinSection>}
        </ContentSection>
      </ContainerText>
    </>
  )
}
