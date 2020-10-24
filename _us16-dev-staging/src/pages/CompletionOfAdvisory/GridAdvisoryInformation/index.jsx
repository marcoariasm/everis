import React from 'react'

import { LegalRejaMin100 } from '../LegalRejaMin100'
import { LegalRejaMax100 } from '../LegalRejaMax100'
import { ContentImage } from './style'
import CardGray from 'shared/components/CardGrey'

import Validacion from 'shared/images/validacion.svg'

export const GridAdvisoryInformation = ({ amount, days, email, profile, ruc }) => {
  return (
    <>
      {amount < 100000 && (
        <CardGray classButton="card-gray">
          <ContentImage>
            <img src={Validacion} alt="Validacion" />
          </ContentImage>
          <LegalRejaMin100 days={days} email={email} profile={profile} ruc={ruc} />
        </CardGray>
      )}
      {amount >= 100000 && <LegalRejaMax100 email={email} />}
    </>
  )
}
