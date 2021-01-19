import React from 'react'
import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { ContentGrid, GridHeader, GridTable, GridRowTable, TitleContent, TitleHeader } from './style'
import { useAlternatives, getSimulationValue } from '../../../../../../../../contexts/AlternativesProvider'
import {propOr} from "ramda"

export const Modalities = () => {
  const { simulations } = useAlternatives();
  const getSimulation25 = getSimulationValue(propOr({}, '25', simulations));
  const getSimulation50 = getSimulationValue(propOr({}, '50', simulations));
  const getSimulation75 = getSimulationValue(propOr({}, '75', simulations));

  return (
    <>
      <ContentGrid>
        <GridHeader>
          <TitleHeader className="tableHeaderTitle">{textAlternatives.modalitiesTextTwo}</TitleHeader>
          <TitleHeader className="tableHeaderTitle">{textAlternatives.titleCardTwo}</TitleHeader>
          <TitleHeader className="tableHeaderTitle">{textAlternatives.textPensionTwo}</TitleHeader>
        </GridHeader>
        <GridTable>
          <GridRowTable>
            <TitleContent>
              <span className="statementTableBody">25%</span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                { getSimulation25('deliveryAmount')}
              </span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                { getSimulation25('scheduledWithdrawal')}
              </span>
            </TitleContent>
          </GridRowTable>
          <GridRowTable>
            <TitleContent>
              <span className="statementTableBody">50%</span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                { getSimulation50('deliveryAmount')}
              </span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                { getSimulation50('scheduledWithdrawal')}
              </span>
            </TitleContent>
          </GridRowTable>
          <GridRowTable>
            <TitleContent>
              <span className="statementTableBody">75%</span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                { getSimulation75('deliveryAmount')}
              </span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                { getSimulation75('scheduledWithdrawal')}
              </span>
            </TitleContent>
          </GridRowTable>
        </GridTable>
      </ContentGrid>
    </>
  )
}
