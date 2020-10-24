import React, { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal';

import {
  LoginContainer,
  FormContainer,
  LogInAnteTitle,
  LoginTitle,
  TitleUnderline,
  AffiliateForm,
  EmailContainer,
  RecoverAccountSection,
  RecoverAccounText,
  CheckboxContainer,
  ButtonContainer,
  Button,
  Button2,
  UrlStyles,
  ModalContent,
  ModalIcon,
  ModalMessage,
  ModalNotification,
  ModalDescription,
  ModalHighlitedDescription,
  ModalNotice,
  ModalText,
  ModalLink,
  ModalButtonContainer
} from './styles';

const loginConfirmationModal = {
  title: 'Datos Validados',
  // description: '',
  message: 'Apellidos y nombres del afiliado',
  // message2: '',
  notice: 'Importante',
  text: 'Si no es el afiliado, vuelva a validar',
  gobackButton: 'Volver',
  confirmationButton: 'Continuar'
}

const ValidationModal = ({ showModal = false, onClose, icon, handleBtnModal, affiliate }) => {
  return (
    <Modal hidden={true} show={showModal} onClose={onClose} hideButtonCancel={true}>
      <ModalContent>
        <ModalIcon src={icon} />
        <ModalMessage>{loginConfirmationModal.title}</ModalMessage>
        <ModalNotification>
          <ModalDescription>{loginConfirmationModal.message}</ModalDescription>
          <ModalHighlitedDescription>{affiliate}</ModalHighlitedDescription>
        </ModalNotification>
        <ModalText>{loginConfirmationModal.text}<a href="/home/validate/affiliate">{"aquí"}</a></ModalText>
        <ModalButtonContainer>
          <Button2 classButton="btn-cancelar" onClick={handleBtnModal}>{loginConfirmationModal.gobackButton}</Button2>
          <Button onClick={handleBtnModal}>{loginConfirmationModal.confirmationButton}</Button>
        </ModalButtonContainer>
      </ModalContent>
    </Modal>
  )
}

export default ValidationModal