import React from 'react'
import { CoinSection, ContentSection, ContainerText } from './style'

export const ContentCard = ({ title, value }) => {
  return (
    <>
      <ContainerText>
        <ContentSection>
          <span className="informativeBodyTitleGreen">{title}</span>
          <CoinSection className="statementTableBody">
            { value }
          </CoinSection>
        </ContentSection>
      </ContainerText>
    </>
  )
}
