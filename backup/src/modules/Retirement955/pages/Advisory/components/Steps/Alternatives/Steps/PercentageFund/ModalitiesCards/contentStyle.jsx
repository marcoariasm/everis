import React from 'react'

import { CoinSection, ContentSection, ContainerText } from './style'

export const ContentCard = ({ totalBalance, title }) => {
  return (
    <>
      <ContainerText>
        <ContentSection>
          <span className="informativeBodyTitleGreen">{title}</span>
          <CoinSection className="statementTableBody">
            S/ {totalBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </CoinSection>
        </ContentSection>
      </ContainerText>
    </>
  )
}
