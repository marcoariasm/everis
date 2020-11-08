import React from 'react'
import styled from 'styled-components'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

export const ContentFinalText = styled.div`
  margin-top: 0;
  margin-bottom: 30px;
  background-color: white;
  padding: 10px 32px;
  width: 100%;
  text-align: center;
  display: inline-block;
  border: 2px solid #00A499;
  border-radius: 15px;
  span {
    color: #00A499;
  }
`

const ContetPrimaryText = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  span {
    font-weight: normal;
  }
`


export const TextFinal = () => {
  return (
    <>  
    <ContetPrimaryText>
      <span className="titleFooter">{textAlternatives.titlefinalnew}</span>
    </ContetPrimaryText>
    <ContentFinalText>
      <span className="titleFooter">{textAlternatives.titleFinal}</span>
    </ContentFinalText>
    </>
    
  )
}
