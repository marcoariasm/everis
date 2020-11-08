import React from 'react'
import styled from 'styled-components'

const Style = styled.div`
  width: 100%;
  margin-right: 1%;
  cursor: pointer;
`
const Content = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  grid-template-rows: 40px auto;
  align-items: center;
`

const StyleStep = (props) => {
  return (
    <Style props={props} onClick={props.onClick}>
      <Content>{props.children}</Content>
    </Style>
  )
}
export default StyleStep
