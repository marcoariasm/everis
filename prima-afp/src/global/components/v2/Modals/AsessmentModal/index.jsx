import React from 'react';
import Modal from 'global/components/v2/Modal';

import {
  Button,
  Button2,
  ModalContent,
  ModalIcon,
  ModalMessage,
  ModalNotification,
  ModalDescription,
  ModalHighlitedDescription,
  ModalNotice,
  ModalText,
  ModalButtonContainer,
} from './styles';

const loginForm = {
  subtitle: 'Cuenta solicitante',
  title: 'Crear cuenta',
  dropdownPlaceholder: 'Nro de documento',
  emailPlaceholder: 'Correo electrónico',
  passwordPlaceholder: 'Contraseña',
  checkboxLabel: 'Recuérdame',
  submitBtnLabel: 'Ingresar',
  forgotPassword: '¿Olvidaste tu contraseña?',
  recoverHere: 'Recupérala aquí',
}

const loginConfirmationModal = {
  title: '¡Estamos para ayudarte!',
  description: 'Un asesor se comunicará contigo en un plazo de hasta 5 días, al siguiente correo o teléfono:',
  message: 'Correo electrónico',
  message2: 'Teléfono móvil',
  notice: 'Importante',
  text: 'Si solicitas la asesoría no podrás dar inicio al trámite hasta que la asesoría culmine.',
  gobackButton: 'Volver',
  confirmationButton: 'Continuar',
}

const AsessmentModal = ({ showModal = false, onClose, icon, handleBtnModal }) => {
  return (
    <Modal hidden={true} show={showModal} onClose={onClose}>
      <ModalContent>
        <ModalIcon src={icon} />
        <ModalMessage>{loginConfirmationModal.title}</ModalMessage>
        <ModalDescription>{loginConfirmationModal.description}</ModalDescription>
        <ModalNotification>
          <ModalDescription>{loginConfirmationModal.message}</ModalDescription>
          <ModalHighlitedDescription>{'correo***@gmail.com'}</ModalHighlitedDescription>
          <br />
          <ModalDescription>{loginConfirmationModal.message2}</ModalDescription>
          <ModalHighlitedDescription>{'9** *** 274'}</ModalHighlitedDescription>
        </ModalNotification>
        <ModalNotice>{loginConfirmationModal.notice}</ModalNotice>
        <ModalText>{loginConfirmationModal.text}</ModalText>
        <ModalButtonContainer>
          <Button2 classButton="btn-cancelar" onClick={handleBtnModal}>
            {loginConfirmationModal.gobackButton}
          </Button2>
          <Button onClick={handleBtnModal}>{loginConfirmationModal.confirmationButton}</Button>
        </ModalButtonContainer>
      </ModalContent>
    </Modal>
  )
}

export default AsessmentModal;
