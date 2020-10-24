import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { allColors } from 'shared/styles';
import validado from '../../../../shared/images/validado.svg';

import Accordion, { DoubleLabel, BulletedList } from '../../../../shared/components/Accordion';
import FinalModal from '../../../components/Modals/FinalModal'
import MainTitle from '../../../components/Titles/MainTitle';
import Stepper from '../../../../shared/components/Stepper';
import TitleGreen from '../../../components/Titles/TitleGreen';
import WhiteCard from '../../../../shared/components/Cards/WhiteCard';
import MaterialUploader from '../../../../shared/components/MaterialUploader';
import Button from '../../../../shared/components/Button';


const Text = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
`

const StepThree = () => {

  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const handleBtnModal = () => {
    history.push('/inicio/nueva-solicitud/afiliado/');
  }
  
  const steps = [
    {
      label: 'Detalle del trámite',
      status: 'completed'
    },
    {
      label: 'Beneficiarios',
      status: 'completed'
    },
    {
      label: 'Adjunta documentos',
      status: 'active'
    },
  ];

  const documents = [
  {
      name: 'identity-document.jpg',
      size: '153Kb'
  },
  {
      name: 'acta-de-nacimiento.pdf',
      size: '153Kb'
  },
  {
      name: 'acta.jpg',
      size: '153Kb'
  }
]

const handleChange = (file) => {
      console.log('New file uploaded: ', file);
    }

  return (
    <>
      <WhiteCard>
        <MainTitle title={"Nueva solicitud de trámite"} />
        <Text>
          <span>{"Nombre del trámite"}</span>
        </Text>

        <ContainerStepper>
          <Stepper stepList={steps} />
        </ContainerStepper>

        <TitleGreen text={"Recomendaciones"} />
        <BulletedList
              textList={[
                'El peso de cada documento no debe exceder de 8MB.',
                'Documentos válidos PDF, JPG y PNG.',
                'Verifica que todos los datos del documento sean legibles.',
              ]}
            />
        <br/>

        <Accordion
          title={'Documentos generales'}
        >
          <MaterialUploader
            className="width-100"
            files={documents}
            loading={false}
            onChange={handleChange}
            description={'Documentos'}
            btnLabel={'Subir archivo'}
            IsEditable={true}
          />
        </Accordion>

        <Accordion
          title={'Documentos de beneficiarios'}
        >
          <MaterialUploader
            className="width-100"
            files={documents}
            loading={false}
            onChange={handleChange}
            description={'Documentos'}
            btnLabel={'Subir archivo'}
            IsEditable={true}
          />
        </Accordion>

        <div className="alignCenterVertically">
          <Button
            onClick={() => setModalVisibility(true)}
            className="buttonRegularResponsive primary-btn"
            // disabled={!beneficiariesList.length && !beneficiaryStatement}
          >
            Continuar
          </Button>
        </div>

      </WhiteCard>
      <FinalModal
        showModal={showModal}
        onClose={() => setModalVisibility(false)}
        icon={validado}
        handleBtnModal={handleBtnModal}
      />
    </>
  )
};

export default StepThree