import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

import Tab from 'modules/Retirement955/components/Tab/Tab';
import InfoAfiliado from 'modules/Retirement955/components/InfoAfiliado';
import Card from 'global/components/v1/Card/Card';

import './asesoria.sass';
import TabFooterSlots from 'modules/Retirement955/components/TabFooter/TabFooterSlots';
import Button from 'global/components/v1/Button/Button';
import Modal from 'global/components/v1/Modal/Modal';
import styled from 'styled-components';
import $ from 'global/styles';
import { StepOne, StepTwo } from './Steps';
import useFinancialAdviceDetail from '../../api/useFinancialAdviceDetail';
import loading from '../../../../shared/images/loading.svg';
import serviceFetcher from '../../../shared/libs/ServiceFetcher';

const Index = () => {
  const { id } = useParams();

  const [step, setStep] = useState(0);
  const [validacionRENIEC, setvalidacionRENIEC] = useState(false);
  const [afiliadoInformado, setAfiliadoInformado] = useState(false);
  const [saveActive, setSaveActive] = useState(false);
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [nextActive, setNextActive] = useState(false);
  const [saveActiveTwo, setSaveActiveTwo] = useState(false);
  const [nextActiveTwo, setNextActiveTwo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { financialAdviceDetail } = useFinancialAdviceDetail(id);
  const history = useHistory();

  const handleNextStep = () => {
    setStep(() => step + 1);
    setNextActive(false);
  };

  const saveData = async (faId, FavId, validationId) => serviceFetcher(
    `/financial-advice/${faId}/validate/${FavId}`,
    {
      method: 'PUT',
      body: {
        adviceValidationId: 0,
        financialAdviceId: faId,
        pending: false,
        validationData: moment().format('DD/MM/yyyy'),
        validationId,
      },
      authenticated: true,
    },
  );

  const save = async () => {
    setIsSaving(true);

    const validation = financialAdviceDetail.validations.filter(
      (val) => val.validation === 'RENIEC',
    )[0];

    saveData(id, validation.financialAdviceValidationId, validation.validationId)
      .then(() => {
        setIsSaving(false);
        setNextActive(true);
        setShowSaveButton(false);
      });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const gotoTable = () => {
    history.push('/proceso95-5/consulta');
  };

  const checkValidation = () => {
    setvalidacionRENIEC(!validacionRENIEC);

    setSaveActive(!validacionRENIEC);

    if (validacionRENIEC) {
      setNextActive(false);
    }
    setShowSaveButton(true);
  };

  const checkAfiliadoInformado = () => {
    setAfiliadoInformado(!afiliadoInformado);

    setSaveActiveTwo(!afiliadoInformado);

    if (afiliadoInformado) {
      setNextActiveTwo(false);
    }
  };

  const saveTwo = () => {
    setIsSaving(true);

    const validation = financialAdviceDetail.validations.filter(
      (val) => val.validation === 'CONTACTO',
    )[0];

    saveData(id, validation.financialAdviceValidationId, validation.validationId)
      .then(() => {
        setIsSaving(false);
        setNextActiveTwo(true);
        setShowSaveButton(false);
      });
  };

  return (
    <div className="asesoria-page">
      {financialAdviceDetail && <InfoAfiliado FAD={financialAdviceDetail} />}
      <div className="steps">
        <Card className="asesoria-container">
          <Tab step={step}>
            <StepOne
              setStep={setStep}
              validacionRENIEC={validacionRENIEC}
              setcheckValidation={checkValidation}
            />
            <StepTwo
              setStep={setStep}
              afiliadoInformado={afiliadoInformado}
              setAfiliadoInformado={checkAfiliadoInformado}
              comments={comments}
              setComments={setComments}
              accumulatedFund={financialAdviceDetail ? financialAdviceDetail.accumulatedFund : null}
            />
          </Tab>
        </Card>
        <TabFooterSlots
          id="tab-footers"
          showSaveButton={false}
          nextButtonSize={25}
        >
          <TabFooterSlots.LeftSide>
            {step > 0 && (
              <Button
                className="white"
                name="return-1"
                onClick={() => setStep(() => step - 1)}
              >
                Regresar
              </Button>
            )}
          </TabFooterSlots.LeftSide>
          <TabFooterSlots.RightSide>
            {step === 0 && (
              <>
                {isSaving && <img src={loading} alt="Loading" />}
                {!isSaving && (
                <>
                  {showSaveButton && (
                  <Button
                    className="action"
                    name="save1"
                    onClick={save}
                    disabled={!saveActive}
                  >
                    Guardar cambios
                  </Button>
                  )}
                  <Button
                    name="next1"
                    disabled={!(saveActive && nextActive)}
                    onClick={handleNextStep}
                  >
                    Siguiente
                  </Button>
                </>
                )}
              </>
            )}
            {step === 1 && (
              <>
                {isSaving && <img src={loading} alt="Loading" />}
                {!isSaving && (
                <>
                  {setShowSaveButton
                  && (
                    <Button
                      name="save2"
                      className="action"
                      onClick={saveTwo}
                      disabled={!saveActiveTwo}
                    >
                      Guardar cambios
                    </Button>
                  )}
                  <Button
                    name="next2"
                    onClick={handleShowModal}
                    disabled={!nextActiveTwo}
                  >
                    Finalizar Asesoria
                  </Button>
                </>
                )}
              </>
            )}
          </TabFooterSlots.RightSide>
        </TabFooterSlots>
        <Modal
          show={showModal}
          onClose={handleHideModal}
          onButtonClick={gotoTable}
          nameButton="Aceptar"
          hideButtonCancel
          justifyContent="space-around"
          width="385px"
          className="asesoria-modal"
        >
          <TextInfo>
            La asesoría ha sido registrada con éxito
          </TextInfo>
        </Modal>
      </div>
    </div>
  );
};

export default Index;

const TextInfo = styled.p`
  font-family: Calibri;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: ${$.gris};
  margin-bottom: 60px;
`;
