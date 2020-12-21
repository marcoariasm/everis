import React from 'react'
import GlobalModule from 'global';
import styled from "styled-components";
import { useModalConfirmLeave } from '../../contexts/ModalConfirmLeaveContext';

import Col from 'global/components/v2/layouts/Col/Col';
import Row from 'global/components/v2/layouts/Row/Row';
import { ModalV2 } from 'global/components/v2/ModalV2/Modal';
import { ModalBody} from 'global/components/v2/ModalV2/ModalBody';
import { ModalFooter } from 'global/components/v2/ModalV2/ModalFooter';
import NButton from 'global/components/v1/Button/Normal';

// const {
//   modal: { ModalV2, ModalBody, ModalFooter },
//   layouts: { Col, Row },
// } = GlobalModule.components.v2;
// const { NButton } = GlobalModule.components.v1;

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

const  ConfirmLeaveModal = () => {
  const {
    showConfirmModalLeave,
    hideConfirmModalLeave,
    cancelConfirmModalLeave,
    confirmContent
  } = useModalConfirmLeave();

    return (
        <ModalV2 show={showConfirmModalLeave} centered borderRadius="1rem" padding="1rem">
          <ModalBody>
            <strong>{ confirmContent.title }</strong><br></br>
            { confirmContent.content }
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Row center autoFlex>
                <Col xs={12}>
                  <NButton className="white-orange" onClick={cancelConfirmModalLeave}>
                    Cancelar
                  </NButton>
                </Col>
                <Col xs={12}>
                  <NButton className="orange" onClick={hideConfirmModalLeave}>Salir</NButton>
                </Col>
              </Row>
            </ButtonGroup>
          </ModalFooter>
      </ModalV2>
    )
}

export default ConfirmLeaveModal
