import React from 'react';
import Modal from '../../../../../../global/components/v1/Modal';
import EmailIcon from '../../../../../shared/images/email.svg';
import HourGlass from '../../../../../shared/images/hourglass.svg';
import ErrorIcon from '../../../../../shared/images/error.svg';
import { useHistory } from 'react-router-dom';
import { ModalIcon, ModalContent } from '../../../../components/styles';
import Button from '../../../../../../global/components/v2/Button';
import { verifyModal } from '../../../../../shared/constant/ConstantApplicantSignup';

const VerificationModal = ({ show = false, icon, error = false, isValid = false, onClose }) => {
   const history = useHistory();
   const handleBtn = () => history.push('/login-solicitante');

   const Icon = error ? ErrorIcon : isValid ? EmailIcon : HourGlass;
   const title = error ? verifyModal.errorTitle : isValid ? verifyModal.title : verifyModal.defeatedTitle;

   const ContentText = () => {
       if (error) return <>
          <p className="tableBodyText textCenter">{verifyModal.errorDescription}</p>
          <p className="titleFooter textCenter pt1em">{verifyModal.invalidLink}</p>
        </>;
       if (!isValid || error) return <p className="titleFooter textCenter">{verifyModal.invalidLink}</p>;
       return <></>
   }

    return (
        <Modal hidden={true} show={show} onClose={onClose}>
          <ModalContent>
            <ModalIcon src={Icon} />
            <p className="modalHeaderTitle textCenter pt1em pb1em">{title}</p>
            <ContentText />
          </ModalContent>
          <Button
            onClick={handleBtn}
            className="modalBtn primary-btn"
          >
            {verifyModal.btnText}
          </Button>
        </Modal>
    )
}

export default VerificationModal;