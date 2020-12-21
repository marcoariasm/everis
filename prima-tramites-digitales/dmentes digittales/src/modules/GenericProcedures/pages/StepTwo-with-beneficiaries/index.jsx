import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import CheckIcon from "shared/images/email.svg";
import NewBeneficiary from "shared/images/newBeneficiary.svg";
import {
  CheckboxContainer,
  BeneficiariesText,
  IconContainer,
  BeneficiariesContent,
  BeneficiariesButton,
  ContainerButton,
  ContainerStepper,
  Text,
  OutlinedButton,
} from "./styles";
import { size } from 'global/styles/Responsive';

import MaterialCheckbox from "global/components/v2/MaterialCheckbox";
import ConfirmationModal from "global/components/v2/Modals/ConfirmationModal";
import MainTitle from "global/components/v2/Titles/MainTitle";
import Stepper from "global/components/v2/Stepper";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import { Statement } from "global/components/v2/UtilityComponents/components";
import Accordion, { DoubleLabel } from "global/components/v2/Accordion";
import { ThreeColumnsContainer } from "global/components/v2/UtilityComponents";
import { ItemValue } from "global/components/v2/UtilityComponents/components";
import Button from "global/components/v2/Button";
import NewBeneficiaryModal from "./components/NewBeneficiaryModal";

import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_BENEFICIARY_FROM_NEW_request,
  EDIT_BENEFICIARY_FROM_NEW_request,
  DELETE_ALL_beneficiaries,
  REPLACE_ALL_beneficiaries,
  SET_SELECTED_beneficiaries
} from "redux/actions/Procedures";
import { setStatementBeneficiary } from "./../../redux/actions/Procedure";
import useProcedureInformation from "modules/GenericProcedures/services/useProcedureInformation";
import {
  getSelectOptions,
  selectType,
  getBeneficiariesFromUser
} from "modules/GenericProcedures/services";
import  { relationShipCodes, conditionCodes, genreOptions } from 'modules/GenericProcedures/constants/beneficiariesConstants';
import { UserContext } from "modules/App/pages/MainDashboardLayout";

const steps = [
  {
    label: "Detalle del trámite",
    status: "completed",
  },
  {
    label: "Beneficiarios",
    status: "active",
  },
  {
    label: "Adjunta documentos",
    status: "",
  },
];

export const ButtonsSection = styled.div`
  display: grid;
  grid-template-columns: 40% auto auto;
  grid-column-gap: 20px;
  @media screen and (max-width: ${size.tablet}) {
    grid-template-columns: 10% auto auto;
    grid-row-gap: 20px;
    grid-template-rows: auto auto; 
  }
`;

export const SectionTitle = styled.p`
  font-size: 18px;
  font-family: "Calibri";
  color: #00a499;
  font-weight: bold;
  padding-left: 1.1em;
`;

const AccordionContent = ({ beneficiary, index, selects = {} }) => {
  const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const deleteBeneficiary = () => {
    dispatch(DELETE_BENEFICIARY_FROM_NEW_request(index));
  };

  const editBeneficiary = (newValue) => {
    dispatch(EDIT_BENEFICIARY_FROM_NEW_request({ index, newValue }));
  };

  const editHandler = () => {
    setShowNewBeneficiaryModal(true);
    setEdit(true);
  };

  const handleOnClose = () => {
    setEdit(false);
    setShowNewBeneficiaryModal(false);
  };


  return (
    <>
      <div style={{ paddingTop: "2em" }}>
        <SectionTitle>Datos personales</SectionTitle>
        <ThreeColumnsContainer>
          <ItemValue title={"Tipo de doc."} value={beneficiary.documentType} />
          <ItemValue
            title={"Nº de documento"}
            value={beneficiary.documentNumber}
          />
          <ItemValue
            title={"Fecha de nacimiento"}
            value={beneficiary.birthdate}
          />
          <ItemValue title={"Sexo"} value={beneficiary.gender} />
          <ItemValue title={"Parentesco"} value={beneficiary.relationship} />
          <ItemValue
            title={"Condición"}
            value={beneficiary.disability || beneficiary.hasDisability}
          />
        </ThreeColumnsContainer>
      </div>
      <ButtonsSection>
        <OutlinedButton
          onClick={deleteBeneficiary}
          className="rightBtnBeneficiary"
        >
          <p style={{ fontSize: "14px", fontWeight: "bold", color: "#00ae99" }}>
            Eliminar
          </p>
        </OutlinedButton>
      </ButtonsSection>
      <NewBeneficiaryModal
        index={index}
        onClick={editBeneficiary}
        edit={edit}
        defaultState={{
          ...beneficiary,
          relationship: relationShipCodes[beneficiary.relationship],
          hasDisability: conditionCodes[beneficiary.disability || beneficiary.hasDisability],
          gender: genreOptions[beneficiary.gender]
        }}
        show={showNewBeneficiaryModal}
        onClose={handleOnClose}
        relationshipOptions={selects.relationshipOptions}
        documentResponse={selects.documentOptions}
        conditionResponse={selects.conditionOptions}
        genderOptions={selects.genderOptions}
      />
    </>
  );
};

const StepTwo2 = () => {
  const history = useHistory();
  const user = React.useContext(UserContext);
  const { id } = useParams();
  const { data: configuration } = useProcedureInformation(id);
  
  const idReq = useSelector((state) => state.procedure.id);
  const inAffiliate = user.idAffiliate ? true : false;
  const inValidAffiliate = useSelector((state) =>
    state.affiliate.affiliate ? true : false
  );

  const affiliateStore = useSelector((state) => state.affiliate);
  const { affiliate } = affiliateStore;

  useEffect(() => {
    manageAffiliate();
  }, [affiliate]);

  const manageAffiliate = () => {
    if (affiliate) return dispatch(REPLACE_ALL_beneficiaries(affiliate.beneficiaries));
    getBeneficiariesFromCurrentUser();
  }

  const getBeneficiariesFromCurrentUser = async() => {
      const beneficiariesList = await getBeneficiariesFromUser(user.idAffiliate);
      dispatch(REPLACE_ALL_beneficiaries(beneficiariesList));
  }

  const benefValidAffil = useSelector((state) =>
    state.affiliate.affiliate ? state.affiliate.affiliate.beneficiaries : []
  );

  const [showModal, setModalVisibility] = useState(false);

  const [relationshipOptions, setRelationship] = useState([]);
  const [documentOptions, setDocuments] = useState([]);
  const [conditionOptions, setConditions] = useState([]);
  const [genderOptions, setGender] = useState([]);
  const [selectedBeneficiaryIndexes, setSelectedBeneficiaryIndexes] = useState([]);
  
  const [beneficiaryStatement, setBeneficiaryStatement] = useState(false);
  const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);
  const storeProcedures = useSelector((state) => state.procedures);
  const { newRequest, selectedProcedure, selectedBeneficiaries } = storeProcedures;
  const { beneficiaries } = newRequest;

  const dispatch = useDispatch();

  useEffect(() => {
    chargeAllSelects();
  }, []);


  const chargeAllSelects = async () => {
    const relationshipResponse = await getSelectOptions(
      selectType.relationshipOptions
    );
    const documentResponse = await getSelectOptions(selectType.documentOptions);
    const conditionResponse = await getSelectOptions(
      selectType.conditionOptions
    );
    const genderResponse = await getSelectOptions(selectType.genderOptions);
    setRelationship(relationshipResponse);
    setDocuments(documentResponse);
    setConditions(conditionResponse);
    setGender(genderResponse);
  };

  const handleBtnModal = () => {
    history.push('/nueva-solicitud');
  };

  useEffect(() => {
    if (beneficiaryStatement) {
      dispatch(DELETE_ALL_beneficiaries());
      dispatch(setStatementBeneficiary(beneficiaryStatement));
      dispatch(SET_SELECTED_beneficiaries([]))
    }
  }, [beneficiaryStatement]);

  const handleSelectionChange = (isSelected, index) => {
    if (!isSelected) {
       const newSelectedItems = selectedBeneficiaries.filter(item => item.beneficiaryId !== beneficiaries[index].beneficiaryId);
       return dispatch(SET_SELECTED_beneficiaries(newSelectedItems));
    } 
    dispatch(SET_SELECTED_beneficiaries([...selectedBeneficiaries, beneficiaries[index]]))
  }

  const handleNextStep = () => {
     history.push(`/nueva-solicitud/tramite/${id}/paso-tres`);
  }

  useEffect(() => {
    const beneficiariesIds = beneficiaries.map(item => item.beneficiaryId);
    const newSelectedItems = selectedBeneficiaries.filter(item => beneficiariesIds.includes(item.beneficiaryId));
    if (newSelectedItems.length < selectedBeneficiaries.length) dispatch(SET_SELECTED_beneficiaries([]));
  }, [beneficiaries]);

  /**
   * Procedures excluded from document uploaded validation 
   */
  const procedures = [1,2,4,15,21,26,28,30,33,35,44,46,50,53,54,55,56,57,58,59,60,64,65,70,77,79];
  const proceduresBeneficiaries = [17];

  return (
    <>
      <WhiteCard>
        <Text>
          <span>{"Nueva solicitud de trámite"}</span>
        </Text>
        <MainTitle title={configuration.name} />

        <ContainerStepper>
          <Stepper stepList={steps} />
        </ContainerStepper>

        {beneficiaries.length ? <p className="informationFooterText pb2em">Esta es la información que tenemos registrada de tus beneficarios, revísala y de estar conforme selecciónalos para incluirlos en este trámite. SI la información de alguno de ellos no es correcta o no esta actualizada,  no lo selecciones y regístralo nuevamente dando clic en “Añadir beneficiario</p> : <></>}

        {newRequest.beneficiaries.map((beneficiary, i) => (
          <Accordion
            key={i}
            labelComponent={
              <MaterialCheckbox
                onChange={(newValue) => handleSelectionChange(newValue, i)}
                initialValue={beneficiary.newBeneficiary}
              >
                <DoubleLabel
                  title={`Beneficiario ${i + 1}`}
                  subtitle={`${beneficiary.firstName}${' ' + beneficiary.secondName} ${beneficiary.surname} ${beneficiary.motherSurname}`}
                />
              </MaterialCheckbox>
            }
          >
            <AccordionContent
              index={i}
              beneficiary={beneficiary}
              selects={{ relationshipOptions, documentOptions, conditionOptions, genderOptions}}
            />
          </Accordion>
        ))}

        <ContainerButton>
          <BeneficiariesButton
            disabled={beneficiaryStatement}
            onClick={() => setShowNewBeneficiaryModal(true)}
          >
            <BeneficiariesContent>
              <IconContainer>
                <img src={NewBeneficiary} />
              </IconContainer>
              <BeneficiariesText>Añadir beneficiarios</BeneficiariesText>
            </BeneficiariesContent>
          </BeneficiariesButton>
        </ContainerButton>

        {id === "74" ? (
          ""
        ) : (
          <CheckboxContainer>
            <MaterialCheckbox
              onChange={setBeneficiaryStatement}
              label={"Declaro no tener beneficiarios"}
            />
          </CheckboxContainer>
        )}

        <Statement
          show={beneficiaryStatement}
          announcement={
            "De tener beneficiarios y no declararlos, estos podrán verse afectados de requerir hacer un trámite futuro."
          }
        />

        <div className="alignCenterVertically">
          <Button
            onClick={handleNextStep}
            className="buttonRegularResponsive primary-btn"
            disabled={!selectedBeneficiaries.length && !beneficiaryStatement}
          >
            Continuar
          </Button>
        </div>
      </WhiteCard>
      <NewBeneficiaryModal
        show={showNewBeneficiaryModal}
        onClose={() => setShowNewBeneficiaryModal(false)}
        relationshipOptions={relationshipOptions}
        documentResponse={documentOptions}
        conditionResponse={conditionOptions}
        genderOptions={genderOptions}
      />
    </>
  );
};

export default StepTwo2;
