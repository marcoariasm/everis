import React from 'react'
import styled from 'styled-components'
import 'PrimaWebTransactionalApp.css'

const StyledContainer = styled.div`
  min-height: 100vh;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  grid-area: content;
`

const Container = ({ children }) => {
  return (
    <>
      <StyledContainer>{children}</StyledContainer>
    </>
  )
}
export default Container
