import React from 'react'
import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'
import { useAlternatives, getSimulationValue } from '../../../../../../../../contexts/AlternativesProvider';

import {
  ContentGrid,
  ContentGridBodyTable,
  GridHeader,
  GridTable,
  GridRowTable,
  TitleContent,
  TitleHeader,
} from './style'
import {propOr} from "ramda";

export const Modalities = () => {
  const { simulations } = useAlternatives();
  const getSimulation955 = getSimulationValue(propOr({}, '95.5', simulations));
  const getSimulation45 = getSimulationValue(propOr({}, '4.5', simulations));

  return (
    <>
      <ContentGrid>
        <ContentGridBodyTable>
          <GridHeader>
            <TitleHeader className="tableHeaderTitle">{textAlternatives.modalitiesTextThree}</TitleHeader>
            <TitleHeader className="tableHeaderTitle">{textAlternatives.titleCardTwo}</TitleHeader>
          </GridHeader>
          <GridTable>
            <GridRowTable>
              <TitleContent>
                <span className="statementTableBody">95.5%</span>
              </TitleContent>
              <TitleContent>
                <span className="statementTableBody">
                  { getSimulation955('deliveryAmount') }
                </span>
              </TitleContent>
            </GridRowTable>
          </GridTable>
        </ContentGridBodyTable>
        <ContentGridBodyTable>
          <GridHeader>
            <TitleHeader className="tableHeaderTitle">{textAlternatives.modalitiesTextFour}</TitleHeader>
            <TitleHeader className="tableHeaderTitle">{textAlternatives.titleCardThree}</TitleHeader>
          </GridHeader>
          <GridTable>
            <GridRowTable>
              <TitleContent>
                <span className="statementTableBody">4.5%</span>
              </TitleContent>
              <TitleContent>
                <span className="statementTableBody">
                  { getSimulation45('deliveryAmount') }
                </span>
              </TitleContent>
            </GridRowTable>
          </GridTable>
        </ContentGridBodyTable>
      </ContentGrid>
    </>
  )
}
