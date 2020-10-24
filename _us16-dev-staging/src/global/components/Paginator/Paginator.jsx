import React from 'react'
import styled from 'styled-components'

//import { Link } from 'react-router-dom'
import { size } from 'shared/styles/Responsive'

import Button from 'global/components/Button/ButtonNormal/Button'

const ContainerPaginator = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 20px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    margin: 30px 60px 30px 60px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin: 30px 103px 30px 103px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 30px 9% 30px 9%;
  }
`
const Paginator = ({ widthB, heightB, onClick }) => {
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
        >
          Regresar
        </Button>
        <Button
          id="next"
          classButton="btn-siguiente"
          widthB={widthB}
          heightB={heightB}
          onClick={(e) => handleChangeClick(e)}
        >
          Siguiente
        </Button>
      </ContainerPaginator>
    </>
  )
}
export default Paginator
