import React, { useEffect, useState } from 'react'
import MediaQuery from 'react-responsive'
import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'
import { alternativerService45 } from '../../../../../../../../services/alternatives.service'
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
import {getSimulationValue, useAlternatives} from "../../../../../../../../contexts/AlternativesProvider";
import {propOr} from "ramda";

export const TextFinal = ({ totalBalance }) => {
  const { simulations } = useAlternatives();
  const getSimulation45 = getSimulationValue(propOr({}, '4.5', simulations));

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
                { getSimulation45('deliveryAmount') }
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
