import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

import { size } from 'shared/styles/Responsive';
import { allColors } from 'shared/styles';
import CheckIcon from '../../../shared/images/email.svg';

import ConfirmationModal from '../../components/Modals/ConfirmationModal'
import MainTitle from '../../components/Titles/MainTitle';
import Stepper from '../../../shared/components/Stepper';
import TextArea from '../../components/TextArea/TextArea';
import TitleGreen from '../../components/Titles/TitleGreen';
import WhiteCard from '../../../shared/components/Cards/WhiteCard';
import Button from '../../../shared/components/Button';


const CardList = styled.div`
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  margin: 10px 16px 16px 16px;
  min-height: 100%;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 3%;
    grid-row-gap: 3%;
    width: 100%;
    margin: auto;
    margin-top: 30px;
    min-height: 100%;
  }
`;

const Text = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const NormalText = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    color: ${allColors.colorGrayText};
  }
`;

const Grid2Col = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: stretch;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`

const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
`

const steps1 = [
  {
    label: 'Detalle del trámite',
    status: 'active'
  },
  {
    label: 'Adjunta documentos',
    status: ''
  },
];

const steps2 = [
  {
    label: 'Detalle del trámite',
    status: 'active'
  },
  {
    label: 'Beneficiarios',
    status: ''
  },
  {
    label: 'Adjunta documentos',
    status: ''
  },
];

const StepOne = () => {

  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(false);
  const handleBtnModal = () => {
    history.push('/generic-procedures/with-beneficiaries');
  };

  const { state } = useLocation();
  const { resp, user } = state;
  console.log(resp.inBeneficiary);

  return (
    <>
      <WhiteCard>
        <MainTitle title={resp.name} />
        <Text>
          <span>{"Nueva solicitud de trámite"}</span>
        </Text>

        <ContainerStepper>
          <Stepper stepList={ 
            (resp.inBeneficiary == "1")?
              (steps2)
            : (steps1)
          } />
        </ContainerStepper>

        <TitleGreen text={"Queremos brindarte una respuesta rápida a tu solicitud"} />

        <NormalText>
          <span>{"Por ello es importante que nos comentes toda la información que consideres que podría agilizar el proceso."}</span>
        </NormalText>

        <TextArea onChange={setTextAreaValue} label={"Detalle del trámite"} />

        <div className="alignCenterVertically">
          <Button
            onClick={() => history.push(`/nueva-solicitud/paso-dos/tramite?id=${resp.typeRequestId}`, {resp: resp, user: user})}
            className="buttonRegularResponsive primary-btn"
            disabled={!textAreaValue}
          >
            Continuar
          </Button>
        </div>

      </WhiteCard>
      <ConfirmationModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        icon={CheckIcon}
        handleBtnModal={handleBtnModal}
      />
    </>
  )
};

export default StepOne;