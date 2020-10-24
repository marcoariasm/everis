import React, { useState, useEffect } from 'react'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'

import { alternativerService955, alternativerService45 } from '../../../../../../../../redux/services/alternatives.service'
import { alternativeConstants } from '../../../../../../../../redux/constants/alternative.constants'
import alternativeReducer from 'redux/reducers/Alternatives/alternative.reducer'
import { currencyFormat } from '../../Header'

import {
  ContentGrid,
  ContentGridBodyTable,
  GridHeader,
  GridTable,
  GridRowTable,
  TitleContent,
  TitleHeader,
} from './style'



const retirement955 = {
  "deferredLifeAnnuity": 0,
  "deliveryAmount": 0,
  "familyLifeAnnuity": 0,
  "pensionAmount": 0,
  "scheduledWithdrawal": 0,
  "temporaryRent": 0
}

export const Modalities = ({ totalBalance, percentages }) => {
  const [percentage955, setPercentage955] = useState(false)
  const [percentage45, setPercentage45] = useState(false)

  useEffect(() =>{
    alternativerService955().then(response => {
      dispatch({type: alternativeConstants.PERCENTAGE_955, response })
      setPercentage955(response.deliveryAmount)
    })

    alternativerService45().then(response => {
      dispatch({type: alternativeConstants.PERCENTAGE_45, response })
      setPercentage45(response.deliveryAmount)
    })
  }, [])

  const [state, dispatch] = React.useReducer(alternativeReducer, retirement955)
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
                  S/ {currencyFormat(percentage955)}
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
                  S/ {currencyFormat(percentage45)}
                </span>
              </TitleContent>
            </GridRowTable>
          </GridTable>
        </ContentGridBodyTable>
      </ContentGrid>
    </>
  )
}
