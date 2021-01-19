import React from 'react';
import Modal from 'global/components/v2/Modal';

import {
  Button,
  ModalContent,
  ModalMessage,
  ModalNotification,
  ModalDescription,
  ModalButtonContainer,
} from './styles';

const loginConfirmationModal = {
  title: 'Documentos',
  confirmationButton: 'Volver',
}

const DocumentsModal = ({ showModal = false, onClose, icon, handleBtnModal, content, children }) => {
  return (
    <Modal hidden={true} show={showModal} onClose={onClose} hiddenButonCancel={true}>
      <ModalContent>
        <ModalMessage>{loginConfirmationModal.title}</ModalMessage>
        <ModalNotification>
          <ModalDescription>
            {children}
          </ModalDescription>
          {/* <ModalHighlitedDescription>{content}</ModalHighlitedDescription> */}
          <br />
        </ModalNotification>
        <ModalButtonContainer>
          <Button onClick={onClose}>{loginConfirmationModal.confirmationButton}</Button>
        </ModalButtonContainer>
      </ModalContent>
    </Modal>
  )
}

export default DocumentsModal;
