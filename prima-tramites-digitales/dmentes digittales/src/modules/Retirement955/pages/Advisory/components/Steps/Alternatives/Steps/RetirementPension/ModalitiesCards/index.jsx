import React from 'react'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { ContentGrid } from './style'
import { ContentCard } from './contentStyle'

import Card from 'global/components/v2/Card/Card'

import Arrow from 'shared/images/arrow.svg'

export const ModalitiesCards = ({ pension }) => {
  let porcentTotals = []
  if (pension) {
    porcentTotals = pension.porcentTotals
  }
  return (
    <>
      <ContentGrid>
        <Card title={textAlternatives.sheduledWithDrawal[0].name} options={false} image={Arrow} type="normal">
          <ContentCard
            titleCard={textAlternatives.titleCard}
            listPorcentTotals="scheduledWithdrawal"
            products={textAlternatives.sheduledWithDrawal}
            textPension={textAlternatives.textPension}
            pension={porcentTotals[3].scheduledWithdrawal}
          />
        </Card>
        <Card title={textAlternatives.familyLifeIncome[0].name} options={false} image={Arrow} type="normal">
          <ContentCard
            titleCard={textAlternatives.titleCard}
            listPorcentTotals="familyLifeIncome"
            products={textAlternatives.familyLifeIncome}
            textPension={textAlternatives.textPension}
            pension={porcentTotals[3].familyLifeAnnuity}
          />
        </Card>
        <Card title="Renta Temporal con Renta Vitalicia Diferida" options={false} image={Arrow} type="double">
          <ContentCard
            titleCard={textAlternatives.titleCard}
            listPorcentTotals="duo"
            amountPension={textAlternatives.amountPension}
            products={textAlternatives.deferredLifeIncome}
            textPension={textAlternatives.textPension}
            pension={[porcentTotals[3].temporaryRent, porcentTotals[3].deferredLifeAnnuity]}
          />
        </Card>
      </ContentGrid>
    </>
  )
}
