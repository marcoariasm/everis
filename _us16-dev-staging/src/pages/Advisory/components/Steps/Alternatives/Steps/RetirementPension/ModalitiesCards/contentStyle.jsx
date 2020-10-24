import React from 'react'

import { Characteristics, CoinSection, ContainerText, ContentCaracteristic, TitleSection } from './style'

export const ContentCard = ({ amountPension, listPorcentTotals, pension, products, textPension, titleCard }) => {
  return (
    <>
      <ContainerText>
        <TitleSection className="tableBodyTitle">{titleCard}</TitleSection>
        {products.map((product, keysIndex) => {
          return (
            <ContentCaracteristic key={keysIndex}>
              {products.length > 1 && (
                <p className="tableBodyText" style={{ paddingBottom: 10 }}>
                  {product.name}
                </p>
              )}
              {product.values.map((element, indexKey) => {
                return (
                  <Characteristics key={indexKey} className="tableBodyText">
                    {element.value}
                  </Characteristics>
                )
              })}
            </ContentCaracteristic>
          )
        })}

        <TitleSection className="tableBodyTitle">{textPension}</TitleSection>
        {listPorcentTotals === 'duo' &&
          amountPension.map((element, index) => {
            return (
              <div key={index} style={{ textAlign: 'center' }}>
                <p key={index} className="bodyTextSecundary" style={{ paddingTop: 30 }}>
                  {element.name}
                </p>
                <CoinSection key={'coin' + index} className="statementTableBody" style={{ paddingTop: -12 }}>
                  S/ {pension[index].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </CoinSection>
              </div>
            )
          })}
        {listPorcentTotals !== 'duo' && (
          <CoinSection key="noDuo" className="statementTableBody">
            S/ {pension.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </CoinSection>
        )}
      </ContainerText>
    </>
  )
}
