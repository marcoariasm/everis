import React from 'react'

import { CoinSection, ContentSection, ContainerText } from './style'

export const ContentCard = ({ cantPension, mount, title, titleMensual }) => {
  return (
    <>
      <ContainerText>
        <ContentSection>
          <span className="informativeBodyTitleGreen">{title}</span>
          {cantPension && <CoinSection className="statementTableBody">S/ {cantPension}</CoinSection>}
        </ContentSection>
        <ContentSection>
          <span className="informativeBodyTitleGreen">{titleMensual}</span>
          {mount && <CoinSection className="statementTableBody">S/ {mount}</CoinSection>}
        </ContentSection>
      </ContainerText>
    </>
  )
}
