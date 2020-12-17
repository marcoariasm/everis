import React from 'react'
import MediaQuery from 'react-responsive'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { TextFinal } from './TextFinal'
import { ModalitiesCards } from './ModalitiesCards'
import { Modalities } from './Modalities'
import { Header } from '../Header'
import { Footer } from '../Footer'

export const RetirementPension = ({ pension, totalBalance, percentages }) => {
  return (
    <>
      <Header
        introText={textAlternatives.introText}
        modalitiesText={textAlternatives.modalitiesText}
        textTotalBalance={textAlternatives.totalBalance}
        totalBalance={totalBalance}
      />
      <MediaQuery minDeviceWidth={767}>
        <Modalities percentages={percentages} pension={pension} />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={767}>
        <ModalitiesCards pension={pension} />
      </MediaQuery>
      <TextFinal />
      <Footer />
    </>
  )
}
