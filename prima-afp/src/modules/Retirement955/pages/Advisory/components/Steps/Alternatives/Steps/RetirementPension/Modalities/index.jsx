import React from 'react'
import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'
import { propOr } from 'ramda'


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

import { useAlternatives, getSimulationValue } from '../../../../../../../../contexts/AlternativesProvider';

export const Modalities = () => {
  const { simulations } = useAlternatives()
  const retirementPension = propOr({}, '0', simulations)
  const getSimulation = getSimulationValue(retirementPension)

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
              <PensionAmount>
                <span className="statementTableBody">
                  { getSimulation('scheduledWithdrawal') }
                </span>
              </PensionAmount>
          </GridRowTable>
          <GridRowTable>
            <TitleContent>
              <span className="tableBodyTitle">{textAlternatives.familyName} Familiar</span>
            </TitleContent>
            <span className="tableBodyText">
              <span>{textAlternatives.familyChar1}</span>
            </span>
              <PensionAmount>
                <span className="statementTableBody">
                  { getSimulation('familyLifeAnnuity') }
                </span>
              </PensionAmount>
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
              <ContentPensionGroup>
                <ContentPension>
                  <PensionText>
                    <span className="tableBodyText">{textAlternatives.deferredName} 1 año</span>
                  </PensionText>
                  <PensionAmount>
                    <span className="statementTableBody">
                      { getSimulation('temporaryRent') }
                    </span>
                  </PensionAmount>
                </ContentPension>
                <ContentPension>
                  <PensionText>
                    <span className="tableBodyText">{textAlternatives.familyName} Diferida</span>
                  </PensionText>
                  <PensionAmount>
                    <span className="statementTableBody">
                      { getSimulation('deferredLifeAnnuity') }
                    </span>
                  </PensionAmount>
                </ContentPension>
              </ContentPensionGroup>
          </GridRowTable>
        </GridTable>
      </ContentGrid>
    </>
  )
}
