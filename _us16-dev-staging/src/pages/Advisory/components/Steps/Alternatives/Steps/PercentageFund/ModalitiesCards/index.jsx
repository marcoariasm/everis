import React from 'react'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'

import { ContentGrid, ContentModalities } from './style'
import { ContentCard } from './contentStyle'

import Card from 'shared/components/Card/Card'

import Arrow from 'shared/images/arrow.svg'

export const ModalitiesCards = ({ totalBalance }) => {
  return (
    <>
      {totalBalance && (
        <ContentGrid>
          <Card title="95.5%" options={false} image={Arrow} type="normal">
            <ContentCard totalBalance={totalBalance['mount95']} title={textAlternatives.titleCardTwo} />
          </Card>
          <ContentModalities>
            <span className="informativeBodyTitleGreen">{textAlternatives.modalitiesTextFour}</span>
          </ContentModalities>
          <Card title="4.5%" options={false} image={Arrow} type="normal">
            <ContentCard totalBalance={totalBalance['mount4.5']} title={textAlternatives.titleCardThree} />
          </Card>
        </ContentGrid>
      )}
    </>
  )
}
