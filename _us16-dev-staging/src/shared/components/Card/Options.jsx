import React, { useState } from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import Modal from 'global/components/Modal/ModalPac'
import EditBeneficiarie from 'shared/images/lapiz.svg'
import DeleteBeneficiarie from 'shared/images/deleteBeneficiarie.svg'

const StyledOptions = styled.div`
  float: right;
  margin-right: 10px;
  margin-top: 22px;
  @media screen and (min-width: ${size.tablet}) {
    margin-right: 29px;
  }
  > img {
    display: inline-flex;
    align-items: initial;
    margin-left: 20px;
    @media only screen and (min-width: ${size.mobileL}) and (max-width: ${size.tablet}) {
      margin-left: 10px;
    }
    @media screen and (min-width: ${size.tablet}) {
      margin-left: 0px;
    }
  }
  > span {
    cursor: pointer;
    font-family: FS Emeric;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: #696158;
    padding-left: 5px;
    margin-right: 32px;
    display: none;
    @media screen and (min-width: ${size.tablet}) {
      display: initial;
      padding-left: 5px;
      margin-right: 32px;
    }
  }
`
const Options = ({ onClick, onDelete, item }) => {
  const [showWarning, setShowWarning] = useState(false)
  const handleDelete = () => {
    onDelete((prevState) => {
      return prevState.filter((object) => {
        if (item.beneficiaryId === object.beneficiaryId) {
          return false
        }
        return object
      })
    })
  }

  const handleConfirm = () => {
    handleDelete()
    setShowWarning(false)
  }

  return (
    <>
      <Modal
        widthB="100px"
        heightB="40px"
        width="41%"
        padding="40px"
        justifyContent="flex-end"
        nameButton="Aceptar"
        show={showWarning}
        onClose={() => setShowWarning(false)}
        onButtonClick={handleConfirm}
      >
        <span className="informativeTitleSmall" style={{ paddingBottom: 40 }}>
          Eliminar Beneficiarios
        </span>
        <label className="bodyText" style={{ paddingBottom: 80 }}>
          ¿Deseas eliminar los beneficiarios seleccionados?
        </label>
      </Modal>
      <StyledOptions>
        <img alt='img' src={EditBeneficiarie} />
        <span id="editar" onClick={onClick}>
          Editar datos
        </span>
        <img alt='img' src={DeleteBeneficiarie} />
        <span id="eliminar" onClick={() => setShowWarning(true)}>
          Eliminar
        </span>
      </StyledOptions>
    </>
  )
}
export default Options
