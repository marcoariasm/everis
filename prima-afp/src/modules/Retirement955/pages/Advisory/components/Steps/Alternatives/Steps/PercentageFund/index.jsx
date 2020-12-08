import React from 'react'
import MediaQuery from 'react-responsive'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { ModalitiesCards } from './ModalitiesCards'
import { Modalities } from './Modalities'
import { Header } from '../Header'
import { Footer } from './Footer'

export const PercentageFund = ({ onChange, totalBalance }) => {
  return (
    <>
      <Header
        introText={textAlternatives.introText3}
        modalitiesText={textAlternatives.modalitiesTextThree}
        textTotalBalance={textAlternatives.totalBalance}
        totalBalance={totalBalance}
      />
      <MediaQuery minDeviceWidth={767}>
        <Modalities totalBalance={totalBalance} />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={767}>
        <ModalitiesCards totalBalance={totalBalance} />
      </MediaQuery>
      <Footer onChange={onChange} />
    </>
  )
}
