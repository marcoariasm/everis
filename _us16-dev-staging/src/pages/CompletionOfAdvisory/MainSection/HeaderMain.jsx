import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const Content = styled.div`
  margin-top: 27px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    margin: 30px calc(6% - 20px) 0px calc(6% - 20px);
  }
`
const ContentTitle = styled.div`
  width: 100%;
  text-align: center;
  > span {
    font-size: 24px;
    line-height: 26px;
  }
`

const ContentText = styled.div`
  margin-top: 27px;
  text-align: center;
  margin-bottom: 40px;
  & > span {
    font-size: 18px;
    line-height: 22px;
  }
`

export default function HeaderMain({ title, subtitle }) {
  return (
    <Content>
      <ContentTitle>
        <span className="title">{title}</span>
      </ContentTitle>
      <ContentText>
        <span className="text">{subtitle}</span>
      </ContentText>
    </Content>
  )
}
