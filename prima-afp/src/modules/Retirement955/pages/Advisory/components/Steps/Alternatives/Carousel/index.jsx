import React from 'react'
import { ReactSVG } from 'react-svg'
import Carousel from 'react-elastic-carousel'

import { Wrapper, Page } from './styles'

export const SlideView = ({ src, funct }) => {
  return (
    <Wrapper>
      <Carousel showArrows={false} onChange={(item) => funct(item.index)}>
        {src.map((el, index) => (
          <Page key={index}>
            <ReactSVG src={el.name} />
            <p className="cardTitle">{el.label}</p>
          </Page>
        ))}
      </Carousel>
    </Wrapper>
  )
}
