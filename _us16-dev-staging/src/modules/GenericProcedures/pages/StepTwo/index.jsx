import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

import { size } from 'shared/styles/Responsive';
import { allColors } from 'shared/styles';
import CheckIcon from '../../../shared/images/email.svg';
import NewBeneficiary from '../../../shared/images/newBeneficiary.svg';
import validado from '../../../shared/images/validado.svg';

import MaterialCheckbox from '../../../shared/components/MaterialCheckbox';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import FinalModal from '../../components/Modals/FinalModal'
import MainTitle from '../../components/Titles/MainTitle';
import Stepper from '../../../shared/components/Stepper';
import MaterialUploader from '../../../shared/components/MaterialUploader';
import TitleGreen from '../../components/Titles/TitleGreen';
import WhiteCard from '../../../shared/components/Cards/WhiteCard';
import { Statement } from '../../../shared/components/UtilityComponents/components';
import Accordion, { DoubleLabel, BulletedList } from '../../../shared/components/Accordion';
import { ThreeColumnsContainer, TwoColumnsContainerBorder } from '../../../shared/components/UtilityComponents';
import { ItemValue } from '../../../shared/components/UtilityComponents/components';
import Button from '../../../shared/components/Button';
import NewBeneficiaryModal from './components/NewBeneficiaryModal';

const Text = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const ContainerButton = styled.div`
  margin: 60px auto;
  justify-content: center;
  align-items: center;
`

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.7em 0;
  @media screen and (max-width: ${size.tabletM})  {
    margin: 1.5em 0;
  }
`;

const BeneficiariesButton = styled.button`
   margin: 0 auto;
   border: 1.4px solid #00ae99;
   border-radius: 6px;
   display: table;
   padding: 1.6em 4em;
   opacity: ${props => props.disabled ? '0.7' : '1'};
   outline: none;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const BeneficiariesContent = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const BeneficiariesText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #00ae99;
`;

const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
  margin-bottom: 4em;
`;

/****Accordion content styles */

const OutlinedButton = styled.button`
    border: 1.4px solid #00ae99;
    border-radius: 6px;
    display: table;
    padding: 0.8em 2em;
    outline: none;
    min-width: 110px;
`;

export const SectionTitle = styled.p`
  font-size: 18px;
  font-family: 'Calibri';
  color: #00A499;
  font-weight: bold;
  padding-left: 1.1em;
`;

const steps1 = [
  {
    label: 'Detalle del trámite',
    status: 'completed'
  },
  {
    label: 'Adjunta documentos',
    status: 'active'
  },
];

const steps2 = [
  {
    label: 'Detalle del trámite',
    status: 'completed'
  },
  {
    label: 'Beneficiarios',
    status: 'active'
  },
  {
    label: 'Adjunta documentos',
    status: ''
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

const AccordionContent = () => {
  return (
    <>
      <div style={{ paddingTop: '2em' }}>
        <SectionTitle>Datos personales</SectionTitle>
        <ThreeColumnsContainer>
          <ItemValue title={'Document'} value={'DNI'} />
          <ItemValue title={'Nº de documento'} value={'46528165'} />
          <ItemValue title={'Fecha de nacimiento'} value={'12/02/1970'} />
          <ItemValue title={'Sexo'} value={'Masculino'} />
          <ItemValue title={'Parentesco'} value={'Hermano'} />
          <ItemValue title={'Condición'} value={'Sano'} />
        </ThreeColumnsContainer>
        <SectionTitle>Datos de contacto</SectionTitle>
        <TwoColumnsContainerBorder>
          <ItemValue title={'Correo electrónico'} value={'correonuevo@gmail.com'} />
          <ItemValue title={'Teléfono móvil'} value={'949 015 485'} />
        </TwoColumnsContainerBorder>
        <SectionTitle>Forma de pago</SectionTitle>
        <TwoColumnsContainerBorder>
          <ItemValue title={'Banco'} value={'Banco de Crédito del Perú (BCP)'} />
          <ItemValue title={'Tipo de cuenta'} value={'Cuanta de ahorros'} />
          <ItemValue title={'Cuenta Interbancaria'} value={'193-012849392-083'} />
        </TwoColumnsContainerBorder>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '40% auto auto', gridColumnGap: '20px' }}>
        <OutlinedButton style={{ gridColumn: 3, gridRow: 1 }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ae99' }}>Eliminar</p>
        </OutlinedButton>
        <OutlinedButton style={{ gridColumn: 4, gridRow: 1 }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ae99' }}>Editar</p>
        </OutlinedButton>
      </div>
    </>
  )
}


const StepTwo = () => {

  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [beneficiaryStatement, setBeneficiaryStatement] = useState(false);
  const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);

  const handleBtnModal = () => {
    history.push('/inicio');
  }

  const handleChange = (file) => {
    console.log('New file uploaded: ', file);
  }

  const { state } = useLocation();
  const { resp, user } = state;
  // console.log(resp.inBeneficiary);

  const beneficiariesList = [
    {
      name: 'Álvares Perez Andrea Fernanda',
      personalData: {
        documentType: 'DNI',
        sex: 'Femenino',
        documentNumber: '46528165',
        relationship: 'Hermano',
        birthdate: '12/02/1970',
        state: 'Sano'
      },
      contactData: {
        email: 'correonuevo@gmail.com',
        cellphone: '949 015 485'
      },
      paymentMethod: {
        bank: 'Banco de Crédito del Perú (BCP)',
        accountNumber: '193-012849392-083',
        accountType: 'Cuanta de ahorros'
      }
    }
  ]

  return (
    <>
      <WhiteCard>
        <MainTitle title={resp.name} />
        <Text>
          <span>{"Nueva solicitud de trámite"}</span>
        </Text>

        <ContainerStepper>
          <Stepper stepList={
            (resp.inBeneficiary == "1") 
            // si el tramite tiene beneficiarios
            ? steps2
            // si el tramite no tiene beneficiarios
            : steps1
          } />
        </ContainerStepper>

        {
          (resp.inBeneficiary == "1") 
  
          ? (
            beneficiariesList.map((beneficiary, i) => (
              <Accordion
                key={i}
                labelComponent={<DoubleLabel title={`Beneficiario ${i + 1}`} subtitle={beneficiary.name} />}
              >
                <AccordionContent />
              </Accordion> )),
              (<>
                <ContainerButton>
                  <BeneficiariesButton
                    disabled={beneficiaryStatement}
                    onClick={() => setShowNewBeneficiaryModal(true)}
                  >
                    <BeneficiariesContent>
                      <IconContainer><img src={NewBeneficiary} /></IconContainer>
                      <BeneficiariesText>Añadir beneficiarios</BeneficiariesText>
                    </BeneficiariesContent>
                  </BeneficiariesButton>

                </ContainerButton>


                <CheckboxContainer>
                  <MaterialCheckbox onChange={setBeneficiaryStatement} label={"Declaro no tener beneficiarios"} />
                </CheckboxContainer>

                <Statement
                  show={beneficiaryStatement}
                  announcement={'De tener beneficiarios y no declararlos, estos podrán verse afectados de requerir hacer un trámite futuro.'}
                />

                <div className="alignCenterVertically">
                  <Button
                    onClick={() => history.push('/nueva-solicitud/paso-tres/tramite')}
                    className="buttonRegularResponsive primary-btn"
                    disabled={!beneficiariesList.length && !beneficiaryStatement}
                  >
                    Continuar
              </Button>
                </div>
                <NewBeneficiaryModal show={showNewBeneficiaryModal} onClose={() => setShowNewBeneficiaryModal(false)} />
                <ConfirmationModal
                  showModal={showModal}
                  onClose={() => setModalVisibility(false)}
                  icon={CheckIcon}
                  handleBtnModal={handleBtnModal}
                />
              </>)
            )

            : // si el tramite no tiene beneficiarios
            (<>
              <TitleGreen text={"Recomendaciones"} />
              <BulletedList
                textList={[
                  'El peso de cada documento no debe exceder de 8MB.',
                  'Documentos válidos PDF, JPG y PNG.',
                  'Verifica que todos los datos del documento sean legibles.'
                ]}
              />
              <br />

              <Accordion title={"Documentos generales"}
                label={""}
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
                >
                  Continuar
            </Button>
              </div>

              <FinalModal
                showModal={showModal}
                onClose={() => setModalVisibility(false)}
                icon={validado}
                handleBtnModal={handleBtnModal}
              />
            </>)
        }

      </WhiteCard>
    </>
  )
};

export default StepTwo