import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import $ from 'global/styles';

import ButtonImage from 'global/components/v1/ButtonImagen/ButtonImage';
import CheckBox from 'global/components/v1/CheckBox/CheckBox';
import TabFooter from 'modules/Retirement955/components/TabFooter/TabFooter';
import Modal from 'global/components/v1/Modal/Modal';
import Icon from 'shared/images/ICON.svg';

const StepOne = ({ setStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [checkValidado, setCheckValidado] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  useEffect(() => {
    if (!checkValidado) {
      setNextStep(false);
    }
  }, [checkValidado]);

  const handleSaveChange = () => {
    if (checkValidado) {
      setNextStep(true);
    } else {
      setShowModal(true);
    }
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleNextStep = () => {
    console.log('handleNextStep');
    return true;
  };

  return (
    <>
      <TitleStep>Validación de identidad</TitleStep>
      <Card>
        <Note>Antes de continuar con el trámite, es necesario validar si el afiliado cuenta con un número de documento de identidad.</Note>
        <ButtonImage
          icon={Icon}
          width="334px"
          color={$.blanco}
          bcolor={$.mainColor2}
          label="Validar identidad en Reniec"
          onClick={() => {
            window.open('https://www.google.com/', '_blank');
          }}
        />
        <ContentCheck>
          <CheckBox
            type="checkbox"
            radius="true"
            label="La identidad del cliente ha sido validada con RENIEC"
            id="validacionReniec2"
            checked={checkValidado}
            width={800}
            onChange={() => setCheckValidado(!checkValidado)}
          />
        </ContentCheck>
      </Card>
      <TabFooter
        showBackButton={false}
        setStep={setStep}
        save={handleSaveChange}
        next={handleNextStep}
        disabled={!nextStep}
      />
      <Modal
        show={showModal}
        onClose={handleHideModal}
        onClick={() => handleHideModal()}
        nameButton="Entendido"
        hideButtonCancel
        justifyContent="space-around"
        width="281px"
      >
        <TextInfo>
          La casilla de validación de identidad del cliente
          con RENIEC, no se encuentra marcada.
        </TextInfo>
      </Modal>
    </>
  );
};

export default StepOne;

const TitleStep = styled.h1`
  font-size: 23px;
  color: ${$.mainColor2};
  padding-bottom: 22px;
  letter-spacing: 0.02em;
  font-weight: 600;
  font-family: FS Emeric;
`;

const Card = styled.div`
  border: 0.553163px solid rgba(194, 194, 194, 0.8);
  box-shadow: 0px 4.7414px 7.90233px rgba(164, 164, 164, 0.25);
  border-radius: 8px;
  padding: 46px 38px 40px;
  opacity: 0.8;
  font-family: Calibri;
  background-color: ${$.blanco};
`;

const Note = styled.p`
  color: ${$.gris};
  opacity: .8;
  font-size: 18px;
  padding-bottom: 25px;
  font-weight: normal;
  font-family: Calibri;
  letter-spacing: 0.02em;
`;

const ContentCheck = styled.div`
  width: 410px;
  padding-top: 30px;
`;

const TextInfo = styled.p`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: ${$.gris};
  opacity: 0.55;
`;
