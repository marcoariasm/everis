import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Modal from 'global/components/v2/Modal/Modal';

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
  ModalButtonContainer,
  GoBack
} from './styles';
import CloseModal from 'modules/Retirement955/pages/DataValidation/popPup/CloseModal';

const loginConfirmationModal = {
  title: 'Datos Validados',
  // description: '',
  message: 'Apellidos y nombres del afiliado',
  // message2: '',
  notice: 'Importante',
  text: `Si no es el afiliado, `,
  gobackButton: 'Volver',
  confirmationButton: 'Continuar'
}


const ValidationModal = ({ showModal = false, onClose, icon, handleBtnModal, affiliate }) => {

  return (
    <Modal hidden={true} show={showModal} onClose={onClose} hideButtonCancel={true}>
      <ModalContent>
        <ModalIcon src={icon} />
        <ModalMessage>{loginConfirmationModal.title}</ModalMessage>
        {/* <ModalDescription>{loginConfirmationModal.description}</ModalDescription> */}
        <ModalNotification>
          <ModalDescription>{loginConfirmationModal.message}</ModalDescription>
          <ModalHighlitedDescription>{affiliate}</ModalHighlitedDescription>
          {/* <ModalDescription>{loginConfirmationModal.message2}</ModalDescription>
          <ModalHighlitedDescription>{'9** *** 274'}</ModalHighlitedDescription> */}
        </ModalNotification>
        {/* <ModalNotice>{loginConfirmationModal.notice}</ModalNotice> */}
        <ModalText>{loginConfirmationModal.text}<GoBack onClick={onClose}>{" vuelva a validar aquí"}</GoBack></ModalText>
        <ModalButtonContainer>
          <Button2 classButton="btn-cancelar" onClick={onClose}>{loginConfirmationModal.gobackButton}</Button2>
          <Button onClick={handleBtnModal}>{loginConfirmationModal.confirmationButton}</Button>
        </ModalButtonContainer>
      </ModalContent>
    </Modal>
  )
}

export default ValidationModal