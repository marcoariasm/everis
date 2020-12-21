import React from 'react'
import MediaQuery from 'react-responsive'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { TextFinal } from './TextFinal'
import { ModalitiesCards } from './ModalitiesCards'
import { Modalities } from './Modalities'
import { Header } from '../Header'
import { Footer } from '../Footer'

export const WithdrawFund = ({ totalBalance, balance45 }) => {
  return (
    <>
      <Header
        introText={textAlternatives.introText2}
        modalitiesText={textAlternatives.modalitiesTextTwo}
        textTotalBalance={textAlternatives.totalBalance}
        totalBalance={totalBalance}
      />
      <MediaQuery minDeviceWidth={767}>
        <Modalities />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={767}>
        <ModalitiesCards />
      </MediaQuery>
      <TextFinal balance45={balance45} totalBalance={totalBalance} />
      <Footer />
    </>
  )
}
