import React, { useEffect, useState } from 'react'
import MediaQuery from 'react-responsive'
import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'
import { alternativerService45 } from '../../../../../../../../../../redux/services/alternatives.service'
import { alternativeConstants } from '../../../../../../../../../../redux/constants/alternative.constants'

import {
  CardGrayEsSalud,
  CharacteristicsEsSalud,
  ContainerText,
  PensionEsSaludText,
  Space,
  SubTitle,
  TitleFinal,
} from './styles'

export const TextFinal = ({ totalBalance, balance45 }) => {
  const [percentage45, setPercentage45] = useState(false)

  useEffect(() => {
    setPercentage45(balance45)
  })

  

  return (
    <>
      {totalBalance && (
        <ContainerText>
          <TitleFinal>
            <span className="informationFooterText">* {textAlternatives.textFinal3}</span>
          </TitleFinal>
          <SubTitle>
            <span className="tableBodyTitle">{textAlternatives.textFinal4}</span>
          </SubTitle>
          <CardGrayEsSalud>
            <PensionEsSaludText>
              <span className="statementTableBody">
                S/ {percentage45}
              </span>
            </PensionEsSaludText>
            <MediaQuery minDeviceWidth={767}>
              <Space />
            </MediaQuery>
            <CharacteristicsEsSalud>
              <span className="tableBodyText">- {textAlternatives.textFinal5}</span>
              <span className="tableBodyText">- {textAlternatives.textFinal6}</span>
            </CharacteristicsEsSalud>
          </CardGrayEsSalud>
        </ContainerText>
      )}
    </>
  )
}
