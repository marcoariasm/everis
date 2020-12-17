import React from 'react'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { ContentGrid } from './style'
import { ContentCard } from './contentStyle'

import Card from 'global/components/v2/Card/Card'

import Arrow from 'shared/images/arrow.svg'

export const ModalitiesCards = ({ pension }) => {
  let listPorcentTotals = []
  if (pension) {
    listPorcentTotals = pension.porcentTotals
  }
  return (
    <>
      <ContentGrid>
        <Card title="25%" options={false} image={Arrow} type="normal">
          <ContentCard
            cantPension={listPorcentTotals[0].scheduledWithdrawal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            mount={listPorcentTotals[0].mount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            title={textAlternatives.titleCardTwo}
            titleMensual={textAlternatives.textPensionTwo}
          />
        </Card>
        <Card title="50%" options={false} image={Arrow} type="normal">
          <ContentCard
            cantPension={listPorcentTotals[1].scheduledWithdrawal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            mount={listPorcentTotals[1].mount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            title={textAlternatives.titleCardTwo}
            titleMensual={textAlternatives.textPensionTwo}
          />
        </Card>
        <Card title="75%" options={false} image={Arrow} type="normal">
          <ContentCard
            cantPension={listPorcentTotals[2].scheduledWithdrawal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            mount={listPorcentTotals[2].mount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            title={textAlternatives.titleCardTwo}
            titleMensual={textAlternatives.textPensionTwo}
          />
        </Card>
      </ContentGrid>
    </>
  )
}
