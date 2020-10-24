import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

import { size } from 'shared/styles/Responsive';
import { allColors } from 'shared/styles/index';
import asessment from '../../../shared/images/asessment.png';

import Accordion, { BulletedList } from '../../../shared/components/Accordion';
import AsessmentModal from '../../components/Modals/AsessmentModal'
import MainTitle from '../../components/Titles/MainTitle';
import WhiteCard from '../../../shared/components/Cards/WhiteCard';
import Button from '../../../shared/components/Button';
import { TwoColumnsFlexContainer } from '../../../shared/components/UtilityComponents';

import { persons } from '../../services/MockData/data';

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

const Grid2Col = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: stretch;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`

const textProcedure = {
    titleAccordion1 : "Importante",
    titleAccordion2 : "Etapas del proceso",
    titleAccordion3 : "Requisitos para el trámite",
    titleAccordion4 : "Documentos que necesitas tener a la mano",
    titleAccordion5 : "Documentos de los beneficiarios que necesitas tener a la mano",
}

const Procedure = () => {

    const history = useHistory();
    const handleBtnModal = () => {
        history.push(`/nueva-solicitud/tramite?id=${resp.typeRequestId}`, {resp: resp, user: user});
    }
    
    const location = useLocation();
    const id = location.search;
    // console.log(`id es ${id.charAt(4)}`);
    
    const { state } = useLocation();
    const { resp, user } = state;
    // console.log(resp, user);
    
    const email = persons[0].personalData.email
    const cellPhone = persons[0].personalData.cellphone
    const dataUser = {
        email: email,
        cellPhone: cellPhone
    }

    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <WhiteCard>
                <MainTitle title={resp.name} />
                <Text>
                    <span>{resp.description}</span>
                </Text>

                <Accordion title={textProcedure.titleAccordion1}
                    label={""}
                    children={resp.informationImportant}
                />
                <Accordion title={textProcedure.titleAccordion2}
                    label={""}
                    children={<BulletedList textList={resp.stages} />}
                />
                <Accordion title={textProcedure.titleAccordion3}
                    label={""}
                    children={<BulletedList textList={resp.requirements} />}
                />
                <Accordion title={textProcedure.titleAccordion4}
                    label={""}
                    children={<BulletedList textList={resp.documents} />}
                />
                {(resp.inBeneficiary == "1")?
                    (
                        <Accordion title={textProcedure.titleAccordion5}
                            label={""}
                            children={<BulletedList textList={resp.documents} />}
                        />
                    )
                    :("")
                }

                <TwoColumnsFlexContainer>
                    <Button
                        className="buttonSmallResponsive alignSelfCenter primary-outlined-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Necesito asesoría
                    </Button>
                    <Button
                        className="buttonSmallResponsive alignSelfCenter primary-btn"
                        onClick={() => history.push(`/nueva-solicitud/paso-uno/tramite?id=${resp.typeRequestId}`, {resp: resp, user: user})}
                    >
                        Iniciar trámite
                    </Button>
                </TwoColumnsFlexContainer>
            </WhiteCard>
            <AsessmentModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                icon={asessment}
                handleBtnModal={handleBtnModal}
                dataUser={dataUser}
            />
        </>
    )
};

export default Procedure;
