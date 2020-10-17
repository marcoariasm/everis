import React from 'react'
import { Link } from 'react-router-dom'

import { size } from 'shared/styles/Responsive'
import styled from 'styled-components'

import Button from 'global/components/Button/ButtonNormal/Button'

const Content = styled.div`
  display: flex;
  margin: 1.5em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  @media screen and (min-width: ${size.laptopM}) {
    padding-top: 30px;
  }
`
function ContentButton({ text, classButton, link }) {
  return (
    <Content>
      <Link to={link}>
        <Button classButton={classButton} widthB="260px" heightB="44px">
          {text}
        </Button>
      </Link>
    </Content>
  )
}

export default ContentButton
