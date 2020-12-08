import React from 'react'
import { propOr } from 'ramda'
import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'
import { ContentGrid, ContentModalities } from './style'
import { ContentCard } from './contentStyle'
import Card from 'global/components/v2/Card/Card'
import Arrow from 'shared/images/arrow.svg'
import { useAlternatives, getSimulationValue } from '../../../../../../../../contexts/AlternativesProvider'

export const ModalitiesCards = ({ totalBalance }) => {
  const { simulations } = useAlternatives();
  const getSimulation955 = getSimulationValue(propOr({}, '95.5', simulations))
  const getSimulation45 = getSimulationValue(propOr({}, '4.5', simulations))
  return (
    <>
      {totalBalance && (
        <ContentGrid>
          <Card title="95.5%" options={false} image={Arrow} type="normal">
            <ContentCard value={getSimulation955('deliveryAmount')} totalBalance={totalBalance['mount95']} title={textAlternatives.titleCardTwo} />
          </Card>
          <ContentModalities>
            <span className="informativeBodyTitleGreen">{textAlternatives.modalitiesTextFour}</span>
          </ContentModalities>
          <Card title="4.5%" options={false} image={Arrow} type="normal">
            <ContentCard value={getSimulation45('deliveryAmount')} totalBalance={totalBalance['mount4.5']} title={textAlternatives.titleCardThree} />
          </Card>
        </ContentGrid>
      )}
    </>
  )
}
