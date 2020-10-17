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
  ModalHighlitedDescription2,
  ModalNotice,
  ModalText,
  ModalButtonContainer
} from './styles';

const loginConfirmationModal = {
  title: '¡Hemos recibido tu solicitud!',
  description: 'Validaremos la información y tus documentos, pronto una de nuestras ejecutivas se pondrá en contacto contigo.',
  description2: 'El plazo de respuesta es de hasta 7 días útiles.',
  message: 'Correo electrónico',
  message2: 'Teléfono móvil',
  message3: 'Código del trámite:',
  text: 'Revisa en tu correo la constancia de tu trámite en la sección Estado de mis trámites.',
  confirmationButton: 'Volver a Inicio'
}

const FinalModal = ({ showModal = false, onClose, icon, handleBtnModal }) => {
  return (
    <Modal hidden={true} show={showModal} onClose={onClose}>
      <ModalContent>
        <ModalIcon src={icon} />
        <ModalMessage>{loginConfirmationModal.title}</ModalMessage>
        <ModalDescription>{loginConfirmationModal.description}</ModalDescription>
        <ModalDescription>{loginConfirmationModal.description2}</ModalDescription><br/><br/>
          <ModalDescription>{loginConfirmationModal.message}</ModalDescription>
          <ModalHighlitedDescription>{'correo***@gmail.com'}</ModalHighlitedDescription><br/>
          <ModalDescription>{loginConfirmationModal.message2}</ModalDescription>
          <ModalHighlitedDescription>{'9** *** 274'}</ModalHighlitedDescription>
        <ModalNotification>
          <ModalDescription>{loginConfirmationModal.message3}</ModalDescription>
          <ModalHighlitedDescription2>{'49879088984701415'}</ModalHighlitedDescription2>
        </ModalNotification>
        <ModalNotice>{loginConfirmationModal.notice}</ModalNotice>
        <ModalText>{loginConfirmationModal.text}</ModalText>
        <ModalButtonContainer>
          <Button onClick={handleBtnModal}>{loginConfirmationModal.confirmationButton}</Button>
        </ModalButtonContainer>
      </ModalContent>
    </Modal>
  )
}

export default FinalModal