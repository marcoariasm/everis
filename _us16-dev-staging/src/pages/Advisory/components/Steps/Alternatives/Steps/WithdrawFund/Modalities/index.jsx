import React, { useState, useEffect } from 'react'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'
import {alternativerService25 , alternativerService50, alternativerService75} from 'redux/services/alternatives.service'

import { ContentGrid, GridHeader, GridTable, GridRowTable, TitleContent, TitleHeader } from './style'
import { currencyFormat } from '../../Header'

export const Modalities = ({ pension }) => {
  var listPorcentTotals = []
  if (pension) {
    listPorcentTotals = pension.porcentTotals
  }
  const [percentage25, setPercentage25] = useState(false)
  const [percen25, setPercen25] = useState(false)
  const [percentage50, setPercentage50] = useState(false)
  const [percen50, setPercen50] = useState(false)
  const [percentage75, setPercentage75] = useState(false)
  const [percen75, setPercen75] = useState(false)

  useEffect(() => {
    alternativerService25().then(response => {
      setPercentage25(response.deliveryAmount)
      setPercen25(response.scheduledWithdrawal)
    })

    alternativerService50().then(response => {
      setPercentage50(response.deliveryAmount)
      setPercen50(response.scheduledWithdrawal)
    })

    alternativerService75().then(response => {
      setPercentage75(response.deliveryAmount)
      setPercen75(response.scheduledWithdrawal)
    })

  }, [])

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
                S/ {currencyFormat(percentage25)}
              </span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                S/ {currencyFormat(percen25)}
              </span>
            </TitleContent>
          </GridRowTable>
          <GridRowTable>
            <TitleContent>
              <span className="statementTableBody">50%</span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                S/ {currencyFormat(percentage50)}
              </span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                S/ {currencyFormat(percen50)}
              </span>
            </TitleContent>
          </GridRowTable>
          <GridRowTable>
            <TitleContent>
              <span className="statementTableBody">75%</span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                S/ {currencyFormat(percentage75)}
              </span>
            </TitleContent>
            <TitleContent>
              <span className="statementTableBody">
                S/ {currencyFormat(percen75)}
              </span>
            </TitleContent>
          </GridRowTable>
        </GridTable>
      </ContentGrid>
    </>
  )
}
