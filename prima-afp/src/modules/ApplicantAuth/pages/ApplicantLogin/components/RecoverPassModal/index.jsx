import React, { useState, useEffect } from 'react';
import Modal from 'global/components/v1/Modal';
import DropdownInput from 'global/components/v2/DropdownInput';
import { recoverAccountRequest, getDocumentList } from '../../../../services/index.service';
import { idDocumentOptions } from '../../../../../shared/constant/ConstantMaterialSelect';
import Button from 'global/components/v2/Button';
import { recoverFormModal } from '../../../../../shared/constant/ConstantApplicantLogin';
import { documentDropdownValidations } from '../../../../../shared/constant/ConstantValidations';
import { useForm } from 'react-hook-form';
import { ModalContent, ModalIcon } from '../../../../components/styles';
import ErrorHandler from 'global/components/v2/ErrorHandler';
import Loading from 'global/components/v2/Loading';
import StaticAlert from 'global/components/v2/StaticAlert';
import WarningIcon from 'modules/shared/images/warningIcon.svg';


const ButtonSection = ({ loading = false, disabled = false, onClick }) => {
  if (loading) return <div className="regularLoadingBtnPadding">
    <Loading className="small-spinner">Cargando...</Loading>
  </div>;
  return (
    <Button
      className="marginBtnRegularPosition primary-btn"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {recoverFormModal.submitBtn}
    </Button>
  )
}


const RecoverPassModal = ({ showModal = false, onClose, icon }) => {
  const [idDocument, setIdDocument] = useState({});
  const [verificationSent, setVerificationSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);
  const [docType, setDocType] = useState();
  const [docNum, setDocNum] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState, errors, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { },
    criteriaMode: 'all'
  });
  const { isValid, touched } = formState;

  useEffect(() => {
    chargeSelect();
  }, []);

  const chargeSelect = async() => {
     const options = await getDocumentList();
     if (!options || options && !options.length) return setSelectOptions(idDocumentOptions);
     setSelectOptions(options);
  }

  const formSubmitAction = async(payload) => {
      setLoading(true);
      const response = await recoverAccountRequest(payload);
      if (!response.errorMessage) return setVerificationSent(true);
      setErrorMessage(response.errorMessage);
      setLoading(false);
  };

  const handleOnClose = () => {
    if (!onClose) return;
    setVerificationSent(false);
    onClose();
  }

  const handleDocumentChange = (value) => {
    setDocNum(value.inputValue);
    if (value.selectValue) setDocType(value.selectValue.value);
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
        <p className="tableBodyText textCenter pb2em">{recoverFormModal.formTitle}</p>
          <DropdownInput
            resetInputWhenSelectChange={true}
            registerInput={register(documentDropdownValidations(docType))}
            registerSelect={register}
            capitalizeInput={docType === 2}
            onChange={handleDocumentChange}
            selectOptions={selectOptions}
            name={recoverFormModal.inputNames.documentNumber}
            selectName={recoverFormModal.inputNames.documentType}
            placeholder={recoverFormModal.dropdownPlaceholder}
          />
          <ErrorHandler
            className="errorHandlerDropdown"
            isTouched={touched[recoverFormModal.inputNames.documentNumber]}
            errors={errors}
            name={recoverFormModal.inputNames.documentNumber}
          />
          <StaticAlert
            show={errorMessage.length > 0}
            message={errorMessage}
            img={WarningIcon}
          />
          <ButtonSection loading={loading} disabled={!isValid} onClick={handleSubmit(formSubmitAction)} />
        </>}
      </ModalContent>
    </Modal>
  )
}

export default RecoverPassModal;