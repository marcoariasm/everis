import React, { useState } from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import ExitImage from 'shared/images/exit.svg'
import {userActions} from 'redux/actions/User/user.actions';
import {useDispatch} from 'react-redux'
import { Advisor_ClearData } from 'redux/actions/Advisor';
import GlobalModule from 'global'


const CerrarSessionStyled = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  padding-left: 35px;
  width: 100%;
  margin: 0;
  bottom: 0;
  img {
    margin: 0px 27px 0px 0px;
    width: auto;
  }
  p {
    font-family: FS Emeric;
    font-size: 16px;
    font-style: normal;
    font-weight: 450;
    line-height: 18px;
  }
  @media screen and (max-width: ${size.laptopL}) {
    padding-left: 15%;
    bottom: 20%;
    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 22px;
    }
  }
  @media screen and (max-width: ${size.laptopL}) and (orientation: landscape) {
    bottom: 25%
  }
}
 
`
const ButtonGroup = styled.div`
  @media only screen and (max-width: 49.9em) {
    div {
      button {
        width: 80%auto;
      }
      div {
        display: flex;
        justify-content: center;
        order: 1;
        margin-top: 1rem;
      }
      div:last-child {
        display: flex;
        justify-content: center;
        order: 0;
      }
    }
  }
`


const CloseSession = () => {
  const [modalConfirm, setModalConfirm] = useState(false)


  const {
    modal: { ModalV2, ModalBody, ModalFooter },
    layouts: { Col, Row },
  } = GlobalModule.components.v2
  const { NButton } = GlobalModule.components.v1
  
  const openModalConfirm = () => {
    setModalConfirm(true)
  }
  const closeModalConfirm = () => {
    setModalConfirm(false)
  }
  const confirmExit = () => {
    setModalConfirm(false)
    dispatch(userActions.logout())
    dispatch(Advisor_ClearData())
  }
  
  const dispatch = useDispatch()

  const handleCloseSession = () => {
    openModalConfirm()
  }

  return (
    <>
      <a onClick={handleCloseSession} >
        <CerrarSessionStyled >
          <img src={ExitImage} alt="Cerrar Session" />
          <p>Cerrar sesión</p>
        </CerrarSessionStyled>
      </a>
      <ModalV2 show={modalConfirm} centered borderRadius="1rem" padding="1rem">
        <ModalBody>
          <span className="bodyText">No has culminado la Etapa 1 del trámite, si sales se perderá toda la información que has registrado</span>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Row center autoFlex>
              <Col xs={12}>
                <NButton className="white" onClick={closeModalConfirm}>
                  No
                </NButton>
              </Col>
              <Col xs={12}>
                <NButton onClick={confirmExit}>Sí</NButton>
              </Col>
            </Row>
          </ButtonGroup>
        </ModalFooter>
      </ModalV2>
    </>
  )
}

export default CloseSession
