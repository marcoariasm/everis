import React from 'react'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'
import { AlternativeContext } from '../../../context'


import {
  ContentCaracteristic,
  ContentGrid,
  ContentPension,
  ContentPensionGroup,
  ContentSubTitle,
  GridHeader,
  GridTable,
  GridRowTable,
  PensionAmount,
  PensionText,
  SubTitleContent,
  TitleContent,
  TitleHeader,
} from './style'
import Alternatives from '../../../Alternatives'
import { currencyFormat } from '../../Header'

export const Modalities = ({ pension, percentages }) => {
  const state = React.useContext(AlternativeContext)

  let listPorcentTotals = []
  if (pension) {
    listPorcentTotals = pension.porcentTotals
  }
  return (
    <>
      <ContentGrid>
        <GridHeader>
          <TitleHeader className="tableHeaderTitle">{textAlternatives.modalitiesText}</TitleHeader>
          <TitleHeader className="tableHeaderTitle">{textAlternatives.titleCard}</TitleHeader>
          <TitleHeader className="tableHeaderTitle">{textAlternatives.textPension}</TitleHeader>
        </GridHeader>
        <GridTable>
          <GridRowTable>
            <TitleContent>
              <span className="tableBodyTitle">{textAlternatives.sheduledName}</span>
            </TitleContent>
            <ContentCaracteristic>
              <span className="tableBodyText">{textAlternatives.sheduledChar1}</span>
              <span className="tableBodyText">{textAlternatives.sheduledChar2}</span>
              <span className="tableBodyText">{textAlternatives.sheduledChar3}</span>
            </ContentCaracteristic>
            {pension && (
              <PensionAmount>
                <span className="statementTableBody">
                  S/ {currencyFormat(percentages.alternatives.retirementPension.scheduledWithdrawal)}
                </span>
              </PensionAmount>
            )}
          </GridRowTable>
          <GridRowTable>
            <TitleContent>
              <span className="tableBodyTitle">{textAlternatives.familyName} Familiar</span>
            </TitleContent>
            <span className="tableBodyText">
              <span>{textAlternatives.familyChar1}</span>
            </span>
            {pension && (
              <PensionAmount>
                <span className="statementTableBody">
                  S/ {currencyFormat(percentages.alternatives.retirementPension.deferredLifeAnnuity)}
                </span>
              </PensionAmount>
            )}
          </GridRowTable>
          <GridRowTable>
            <TitleContent>
              <span className="tableBodyTitle">
                {textAlternatives.deferredName} con {textAlternatives.familyName} Diferida
              </span>
            </TitleContent>
            <ContentSubTitle>
              <SubTitleContent>
                <span className="titleFooter">{textAlternatives.deferredName}</span>
                <span className="tableBodyText">{textAlternatives.deferredChar1}</span>
                <span className="tableBodyText">{textAlternatives.deferredChar2}</span>
              </SubTitleContent>
              <SubTitleContent>
                <span className="titleFooter">{textAlternatives.familyName} Diferida</span>
                <span className="tableBodyText">{textAlternatives.deferredChar3}</span>
                <span className="tableBodyText">{textAlternatives.deferredChar4}</span>
              </SubTitleContent>
            </ContentSubTitle>
            {pension && (
              <ContentPensionGroup>
                <ContentPension>
                  <PensionText>
                    <span className="tableBodyText">{textAlternatives.deferredName} 1 año</span>
                  </PensionText>
                  <PensionAmount>
                    <span className="statementTableBody">
                      S/ {currencyFormat(percentages.alternatives.retirementPension.temporaryRent)}
                    </span>
                  </PensionAmount>
                </ContentPension>
                <ContentPension>
                  <PensionText>
                    <span className="tableBodyText">{textAlternatives.familyName} Diferida</span>
                  </PensionText>
                  <PensionAmount>
                    <span className="statementTableBody">
                      S/ {currencyFormat(percentages.alternatives.retirementPension.deferredLifeAnnuity)}
                    </span>
                  </PensionAmount>
                </ContentPension>
              </ContentPensionGroup>
            )}
          </GridRowTable>
        </GridTable>
      </ContentGrid>
    </>
  )
}
