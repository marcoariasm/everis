import React from 'react'

import { MAIN_MIN_AMOUNT } from 'modules/Retirement955/constants/Parameters'

import { LegalRejaMin100 } from '../LegalRejaMin100'
import { LegalRejaMax100 } from '../LegalRejaMax100'
import CardGray from 'modules/shared/components/CardGrey'

import { ContentImage } from './style'

import Validacion from 'shared/images/validacion.svg'

export const GridAdvisoryInformation = ({ amount, days, email, profile, hasRuc }) => {
  return (
    <>
      {amount < MAIN_MIN_AMOUNT && (
        <CardGray classButton="card-gray">
          <ContentImage>
            <img src={Validacion} alt="Validacion" />
          </ContentImage>
          <LegalRejaMin100 days={days} email={email} profile={profile} hasRuc={hasRuc} />
        </CardGray>
      )}
      {amount >= MAIN_MIN_AMOUNT && <LegalRejaMax100 email={email} />}
    </>
  )
}
