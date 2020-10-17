import React, { useEffect, useState } from 'react';
import Modal from '../../Modal';

import {
  Button,
  ModalContent,
  ModalIcon,
  ModalMessage,
  ModalNotification,
  ModalDescription,
  ModalHighlitedDescription,
  ModalButtonContainer
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
    recoverHere: 'Recupérala aquí'
}
  
const loginConfirmationModal = {
    title: 'Verifica tu email',
    description: 'Sólo falta verificar que realmente eres tú',
    message: 'Te hemos enviado un email de bienvenida a',
    confirmationButton: 'Continuar'
 }

const ConfirmationModal = ({ showModal = false, onClose, icon, handleBtnModal }) => {
  return (
    <Modal hidden={true} show={showModal} onClose={onClose}>
      <ModalContent>
        <ModalIcon src={icon} />
        <ModalMessage>{loginConfirmationModal.title}</ModalMessage>
        <ModalDescription>{loginConfirmationModal.description}</ModalDescription>
        <ModalNotification>
          <ModalDescription>{loginConfirmationModal.message}</ModalDescription>
          <ModalHighlitedDescription>{'correo@gmail.com'}</ModalHighlitedDescription>
        </ModalNotification>
        <ModalButtonContainer>
          <Button onClick={handleBtnModal}>{loginConfirmationModal.confirmationButton}</Button>
        </ModalButtonContainer>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal