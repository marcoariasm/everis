import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: grid;
  grid-template-rows: 80px auto 50px;
  align-items: center;
  margin: 0 20px;
`
const TPrincipal = styled.div`
  text-align: center;
  border-radius: 0.55rem;
`
const ContentInfoValidate = styled.div`
  align-self: flex-start;
  text-align: center;
  border-radius: 0.77rem;
`
const ContentInfoValue = styled.p`
  text-align: center;
  border-radius: 7.5px;
`

function CardInformationGray({ title, text, value }) {
  return (
    <Content>
      <TPrincipal>
        <span className="informativeBodyTitleGreen">{title}</span>
      </TPrincipal>
      <ContentInfoValidate className="bodyText">{text}</ContentInfoValidate>
      {value ? <ContentInfoValue className="bodyText">* Valor UIT: S/ {value}</ContentInfoValue> : <div></div>}
    </Content>
  )
}

export default CardInformationGray
