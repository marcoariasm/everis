import React from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

import Button from 'global/components/v1/Button/ButtonNormal/Button'

const ContainerPaginator = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 20px 0px 20px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    margin: 30px 60px 0px 60px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin: 30px 103px 0px 103px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 30px 9% 0px 9%;
  }
`
const Paginator = ({ widthB, heightB, onClick, nameButton,disabledContinueButton=false,disabledBackButton=false, loadingBackButton = false, loadingContinueButton = false }) => {
  function handleChangeClick(event) {
    onClick(event.target.id)
  }
  return (
    <>
      <ContainerPaginator>
        <Button
          id="return"
          classButton="btn-anterior"
          widthB={widthB}
          heightB={heightB}
          onClick={(e) => handleChangeClick(e)}
          isLoading={loadingBackButton}
          disabled={disabledBackButton}
        >
          Regresar
        </Button>
        <Button
          id="next"
          classButton="btn-siguiente"
          widthB={widthB}
          heightB={heightB}
          onClick={(e) => handleChangeClick(e)}
          isLoading={loadingContinueButton}
          disabled={disabledContinueButton}
        >
          {nameButton ? nameButton : 'Siguiente'}
        </Button>
      </ContainerPaginator>
    </>
  )
}
export default Paginator
