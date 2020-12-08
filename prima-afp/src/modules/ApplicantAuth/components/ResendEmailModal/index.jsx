import React from 'react';
import Modal from 'global/components/v1/Modal';
import MaterialInput from 'global/components/v2/MaterialInput';
import { loginConfirmationModal } from '../../../shared/constant/ConstantApplicantLogin';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { size } from 'global/styles/Responsive';
import { UrlStyles, ModalIcon, ModalContent } from '../styles';
import { useSelector } from 'react-redux';

export const ModalNotification = styled.div`
  border-radius: 6px;
  border: 1px solid #00ae99;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 2em;
  margin-top: 2em;
  @media screen and (max-width: ${size.tabletS})  {
    padding: 20px 0.8em;
  }
`;

const ResendEmailModal = ({ showModal = false, onClose, icon, email, hideResendBtn = false, documentData = {}, idApplicant }) => {
    const history = useHistory();
  
  const goToVerifyAgain = () => {
    history.push('/reenviar-verificacion', { email, ...documentData, idApplicant });
  }
  
    return (
      <Modal hidden={true} show={showModal} onClose={onClose}>
        <ModalContent>
          <ModalIcon src={icon} />
          <p className="modalHeaderTitle textCenter pt1em">
            {loginConfirmationModal.title}
          </p>
          <p className="tableBodyText textCenter pt1em">{loginConfirmationModal.description}</p>
          <ModalNotification>
              <p className="tableBodyText textCenter">{email ? loginConfirmationModal.message : loginConfirmationModal.messageNoEmail}</p>
              { email && <p className="modalHighlightedText">{email}</p>}
          </ModalNotification>
          <p className="informativeBodyText textCenter pt4em pb4em">{loginConfirmationModal.advice}</p>
          { !hideResendBtn && <UrlStyles className="textCenter" onClick={goToVerifyAgain}>{loginConfirmationModal.noEmail}</UrlStyles>}
        </ModalContent>
      </Modal>
    )
  }

  export default ResendEmailModal;