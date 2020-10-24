import React from 'react'
import MediaQuery from 'react-responsive'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'

import { ModalitiesCards } from './ModalitiesCards'
import { Modalities } from './Modalities'
import { Header } from '../Header'
import { Footer } from './Footer'

export const PercentageFund = ({ onChange, totalBalance, percentages }) => {
  return (
    <>
      <Header
        introText={textAlternatives.introText3}
        modalitiesText={textAlternatives.modalitiesTextThree}
        textTotalBalance={textAlternatives.totalBalance}
        totalBalance={totalBalance}
      />
      <MediaQuery minDeviceWidth={767}>
        <Modalities percentages={percentages} totalBalance={totalBalance} />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={767}>
        <ModalitiesCards percentages={percentages} totalBalance={totalBalance} />
      </MediaQuery>
      <Footer onChange={onChange} />
    </>
  )
}
