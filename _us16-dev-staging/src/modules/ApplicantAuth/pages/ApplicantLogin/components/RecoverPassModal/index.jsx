import React, { useState } from 'react';
import Modal from '../../../../../../global/components/Modal';
import DropdownInput from '../../../../../shared/components/DropdownInput';
import { resendVerification } from '../../../../core/ApplicantLoginService';
import { idDocumentOptions } from '../../../../../shared/constant/ConstantMaterialSelect';
import Button from '../../../../../shared/components/Button';
import { recoverFormModal } from '../../../../../shared/constant/ConstantApplicantLogin';
import { useForm } from 'react-hook-form';
import { ModalContent, ModalIcon } from '../../../../components/styles';

const RecoverPassModal = ({ showModal = false, onClose, icon }) => {
  const [idDocument, setIdDocument] = useState({});
  const [verificationSent, setVerificationSent] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: { }
  });
  const { isValid } = formState;


  const formSubmitAction = async(payload) => {
    const response = await resendVerification(payload);
    if (response) return setVerificationSent(true);
  };

  const handleOnClose = () => {
    if (onClose) {
      setVerificationSent(false);
      onClose();
    }
  }

  return (
    <Modal hidden={true} show={showModal} onClose={handleOnClose}>
      <ModalContent>
        <ModalIcon src={icon} />
        <p className="modalHeaderTitle textCenter pt1em">{recoverFormModal.title}</p>
        <p className="tableBodyText textCenter pt2em">
          { verificationSent ? recoverFormModal.emailSent : recoverFormModal.description}
        </p>
        { !verificationSent && <>
        <p className="tableBodyText textCenter pb1em">{recoverFormModal.formTitle}</p>
          <DropdownInput
            numericInput={true}
            registerInput={register({ required: true })}
            registerSelect={register}
            selectOptions={idDocumentOptions}
            name={recoverFormModal.inputNames.documentNumber}
            selectName={recoverFormModal.inputNames.documentType}
            placeholder={recoverFormModal.dropdownPlaceholder}
          />
          <Button
            className="marginBtnRegularPosition"
            disabled={!isValid}
            onClick={handleSubmit(formSubmitAction)}
          >
            {recoverFormModal.submitBtn}
          </Button>
        </>}
      </ModalContent>
    </Modal>
  )
}

export default RecoverPassModal;