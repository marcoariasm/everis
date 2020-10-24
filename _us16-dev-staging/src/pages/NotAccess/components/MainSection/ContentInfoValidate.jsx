import React from 'react'
import styled from 'styled-components'

//import { size } from 'shared/styles/Responsive'

const Content = styled.div`
  display: inherit;
  padding-bottom: 10px;
`
const ImageValidation = styled.img`
  width: 10px;
  height: 10px;
  margin: 3px 12px 12px 0px;
`

function ContentInfoValidate({ imgValidation, texto }) {
  return (
    <Content className="bodyText">
      <ImageValidation src={imgValidation} alt={imgValidation} />
      <label>{texto}</label>
    </Content>
  )
}

export default ContentInfoValidate
