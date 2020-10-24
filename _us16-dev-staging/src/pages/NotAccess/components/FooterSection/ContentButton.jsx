import React from 'react'
import styled from 'styled-components'

import { allColors } from 'shared/styles/index'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0px;
`
const ButtonPrincipal = styled.a`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  padding: ${(props) => props.heightB} ${(props) => props.widthB};
  color: ${allColors.white};
  background: ${allColors.orange};
  border-radius: 8px;
  @media only screen and (max-width: 375px) {
    padding: 10px 15px;
  }
`

function ContentButton({ url, widthB, heightB, texto }) {
  return (
    <Content>
      <ButtonPrincipal className="bodyText" href={url} target="blank" widthB={widthB} heightB={heightB}>
        {texto}
      </ButtonPrincipal>
    </Content>
  )
}

export default ContentButton
