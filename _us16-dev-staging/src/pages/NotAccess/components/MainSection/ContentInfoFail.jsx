import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  display: inherit;
  padding-bottom: 10px;
`

function ContentInfoFail({ texto }) {
  return (
    <Content className="bodyText">
      <label>{texto}</label>
    </Content>
  )
}

export default ContentInfoFail
