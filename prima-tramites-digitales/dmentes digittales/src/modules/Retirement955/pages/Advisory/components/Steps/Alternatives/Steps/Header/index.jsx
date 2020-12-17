import React from 'react'
import MediaQuery from 'react-responsive'

import { Balance, ContainerText, IntroText, ModalitiesText } from './styles'

export function currencyFormat(num){
  return num? parseFloat(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'): '0.00'
  //return num === 0 ? '0.00' : 
}

export const Header = ({ introText, modalitiesText, textTotalBalance, totalBalance }) => {
  return (
    <>
      {totalBalance && (
        <ContainerText>
          <Balance className="informativeBodyTitleGreen">
            {textTotalBalance} S/ {currencyFormat(totalBalance.totalAmount)}
          </Balance>
          <IntroText className="informationSubTitle">{introText}</IntroText>
          <MediaQuery maxDeviceWidth={767}>
            <ModalitiesText>
              <span className="informativeBodyTitleGreen">{modalitiesText}</span>
            </ModalitiesText>
          </MediaQuery>
        </ContainerText>
      )}
    </>
  )
}
