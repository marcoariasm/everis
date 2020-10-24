import React from 'react'
import styled from 'styled-components'

import TextModal from './TextModal'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'

const CharTitle = styled.span`
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
`
const CharPop = styled.ul`
  list-style-type: none;
`
const CharText = styled.li`
  text-align: justify;
  font-size: 18px;
  line-height: 24px;
`

function PopPup() {
  return (
    <>
      <TextModal>
        <CharTitle className="informativeTitleSmall">{textAlternatives.popUpText1}</CharTitle>
        <CharPop>
          <CharText className="bodyText">- {textAlternatives.popUpText2}</CharText>
        </CharPop>
        <CharPop>
          <CharText className="bodyText">- {textAlternatives.popUpText3}</CharText>
        </CharPop>
        <CharPop>
          <CharText className="bodyText">- {textAlternatives.popUpText4}</CharText>
        </CharPop>
      </TextModal>
    </>
  )
}

export default PopPup
