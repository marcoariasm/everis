import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import asessment from "shared/images/asessment.png";
import {
  CardComponent,
  Text,
  Description,
  ButtonOutlinedAdvisory,
  IconPDF,
  DocumentLink,
  CheckboxLabel,
} from "./styles";

import Accordion, { BulletedList } from "global/components/v2/Accordion";
import AlertCard2 from "global/components/v2/Cards/AlertCard2";
import AsessmentModal from "../../components/Modals/AsessmentModal";
import Button from "global/components/v2/Button";
import MainTitle from "global/components/v2/Titles/MainTitle";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import { TwoColumnsFlexContainer } from "global/components/v2/UtilityComponents";
import Loading from "global/components/v2/Loading";
import StaticAlert from "global/components/v2/StaticAlert";
import MaterialCheckbox from "global/components/v2/MaterialCheckbox";
import pdfIcon from "modules/shared/images/pdfIcon.svg";
import WarningIcon from "modules/shared/images/warningIcon.svg";

import useProcedureInformation from "../../services/useProcedureInformation";
import {
  setAsessment,
  setCellphone,
  setEmail,
  setPersons,
} from "../../redux/actions/Procedure";
import { UserContext } from "modules/App/pages/MainDashboardLayout";
import { registerAsessment } from "modules/GenericProcedures/services/registerAsessment";
import { obfuscateData } from "modules/shared/helpers/HelperObfuscate";
import { validateProcedure } from "modules/GenericProcedures/services/validateProcedure";
import { tryCatch } from "ramda";

const textProcedure = {
  title: "Nueva solicitud de trámite",
  titleImportant: "Importante",
  titleStages: "Etapas del proceso",
  titleRequirements: "Requisitos para el trámite",
  titleGeneralDocuments: "Documentos que necesitas tener a la mano",
  titleBeneficiaryDocuments:
    "Documentos de los beneficiarios que necesitas tener a la mano",
};

const DocumentsSection = ({ documentsInfo }) => {
  return documentsInfo.map((document, index) => {
    const documentsList = document.documents.map((item) => item.nameDocument);
    return (
      <div key={index + document.nameGroupDocument} className="pt1em pb1em">
        <p className="informationFooterText bold pb1em">
          <b>{document.nameGroupDocument}</b>
        </p>
        <BulletedList textList={documentsList} />
      </div>
    );
  });
};

const Procedure = () => {
  const user = React.useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();

  const ide = parseInt(id);

  const INITIAL_REQUEST = {
    idTypeRequest: 0,
    idTypeTask: 0,
    idAffiliate: null,
    idApplicant: null,
    idRepresentative: null,
  };

  const { data: information } = useProcedureInformation(ide);

  const [dataAsessment, setDataAsessment] = useState(INITIAL_REQUEST);
  const [showModal, setShowModal] = useState(false);
  const [showAlertProcedure, setShowAlertProcedure] = useState(false);
  const [showAlertAsessment, setShowAlertAsessment] = useState(false);
  const [readDocuments, setReadDocuments] = useState(false);
  const [showToolTip, setShowTooltip] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const [advisory, setAdvisory] = useState("");

  let dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (readDocuments) {
      setShowTooltip(false);
      setChecked(true);
    }
  }, [readDocuments]);

  const inValidAffiliate = useSelector((state) =>
    state.affiliate.affiliate ? true : false
  );
  const idValAff = useSelector((state) =>
    state.affiliate.affiliate ? state.affiliate.affiliate.affiliateId : null
  );

  let email = user.email;
  let cellphone = user.cellphone;

  const createDataRequest = (idT, idTyRequest) => {
    let idAff = null;
    let idAppl = null;
    let idRepr = null;
    let idValidAff = idValAff;
    if (user.usertype === "affiliate") {
      if (!inValidAffiliate) {
        idAff = user.idAffiliate;
      } else {
        idAff = idValidAff;
        idRepr = user.idAffiliate;
      }
    } else if (user.usertype === "applicant") {
      if (inValidAffiliate) {
        idAff = idValidAff;
        idAppl = user.idApplicant;
      }
    }
    let request = {
      idTypeRequest: idTyRequest,
      idTypeTask: idT,
      idAffiliate: idAff,
      idApplicant: idAppl,
      idRepresentative: idRepr,
    };
    dispatch(setEmail(email));
    dispatch(setCellphone(cellphone));
    return request;
  };

  const handleBeginAsessment = async () => {
    const requestBeginAdvisory = createDataRequest(1, ide);
    setDataAsessment(requestBeginAdvisory);
    const response = await validateProcedure(requestBeginAdvisory);
    if (!response) {
      setShowAlertAsessment(true);
      setReadDocuments(false);
    } else {
      setShowModal(true);
    }
  };

  const handleRequestAssesment = async () => {
    setShowModal(false);
    const response = await registerAsessment(dataAsessment);
    if (!response) {
      setShowAlertAsessment(true);
      setReadDocuments(false);
    } else {
      setAdvisory(response.codeRequest);
      history.push("/inicio/");
    }
  };

  const handleBeginProcedure = async () => {
    if (ide === 61) {
      history.push("/proceso95-5");
    } else {
      const request = createDataRequest(2, ide);
      setDataAsessment(request);
      dispatch(setPersons(request));
      const response = await registerAsessment(request);
      if (!response) {
        setShowAlertProcedure(true);
        setReadDocuments(false);
      } else {
        dispatch(setAsessment(response.idRequest));
        history.push(`/nueva-solicitud/tramite/${id}/paso-uno`);
      }
    }
  };

  const sortDocuments = (documents) =>
    documents.sort((a, b) => {
      const x = a.documents[0].ordenation;
      const y = b.documents[0].ordenation;
      return x - y;
    });

  return (
    <>
      <WhiteCard>
        {information ? (
          <>
            <Text>
              <span>{textProcedure.title}</span>
            </Text>

            <MainTitle title={information && information.name} />

            <Description>
              <span>{information && information.descriptionLarge}</span>
            </Description>

            {information && information.informationImportant && (
              <Accordion
                title={textProcedure.titleImportant}
                label={""}
                children={information && information.informationImportant}
              />
            )}

            {information && information.stages.length > 0 && (
              <Accordion
                title={textProcedure.titleStages}
                label={""}
                children={
                  <BulletedList
                    textList={
                      information &&
                      information.stages.map((stage) => stage.nameStage)
                    }
                  />
                }
              />
            )}

            {information && information.requirements.length > 0 && (
              <Accordion
                title={textProcedure.titleRequirements}
                label={""}
                children={
                  <BulletedList
                    textList={
                      information &&
                      information.requirements.map((req) => req.nameRequirement)
                    }
                  />
                }
              />
            )}

            {information && information.documents.length > 0 && (
              <Accordion
                show={information.documents.length > 0}
                title={textProcedure.titleGeneralDocuments}
                children={
                  <DocumentsSection
                    documentsInfo={sortDocuments(information.documents)}
                  />
                }
              />
            )}
            {information && information.documentsBeneficiary.length > 0 && (
              <Accordion
                show={information.documents.length > 0}
                title={textProcedure.titleBeneficiaryDocuments}
                children={
                  <>
                    <DocumentsSection
                      documentsInfo={sortDocuments(
                        information.documentsBeneficiary
                      )}
                    />
                  </>
                }
              />
            )}
            {information.inDocumentInformative === "1" && (
              <>
                <CardComponent>
                  <IconPDF src={pdfIcon} alt={"pdf_icon"} />
                  <a href={
                    `${process.env.REACT_APP_REPOSITORY_DOCUMENTS}/${encodeURI(information && information.name)}.pdf`
                    } target="_blank" download>
                  <DocumentLink className="link">
                    {"Descarga la Cartilla informativa"}
                  </DocumentLink>
                  </a>
                </CardComponent>
              </>
            )}
            <MaterialCheckbox
              disabled={checked}
              onChange={setReadDocuments}
              value={"read-information"}
              showToolTip={showToolTip}
              tooltipContent={
                <>
                  <p className="informationFooterText">
                    Queremos que estés informado de todo el proceso, por ello es
                    importante que leas toda la información.
                  </p>
                  <p className="informationFooterText bold mt1em">
                    Para poder continuar con el trámite marca la casilla.
                  </p>
                </>
              }
            >
              <CheckboxLabel>
                {"Declaro haber leído la información"}
              </CheckboxLabel>
            </MaterialCheckbox>
            <StaticAlert
              show={errorMessage.length > 0}
              message={errorMessage}
              img={WarningIcon}
              noMargin={true}
              className="mt2em mb1em"
            />

            <TwoColumnsFlexContainer>
              {id === "61" || id === "62" ? (
                ""
              ) : (
                <ButtonOutlinedAdvisory
                  onClick={handleBeginAsessment}
                  disabled={!readDocuments}
                >
                  Necesito asesoría
                </ButtonOutlinedAdvisory>
              )}

              <Button
                className="buttonSmallResponsive alignSelfCenter primary-btn"
                onClick={handleBeginProcedure}
                disabled={!readDocuments}
              >
                Iniciar trámite
              </Button>
            </TwoColumnsFlexContainer>

            <AlertCard2
              showLink={true}
              hidden={!showAlertProcedure}
              text1={"Ya existe un trámite en curso"}
              text2={"Por favor consulta sobre su estado en este "}
              text3={"o verifica con tu afiliado/beneficiario"}
              link={"/detalles-tramite/"}
            />
            <AlertCard2
              showLink={true}
              hidden={!showAlertAsessment}
              text1={"Ya existe una asesoría en curso"}
              text2={
                "Por favor espera la respuesta para continuar. Para regresar haz clic en este "
              }
              link={"/inicio/"}
            />
          </>
        ) : (
          <div style={{ padding: "20vh 0" }}>
            <Loading>Cargando...</Loading>
          </div>
        )}
      </WhiteCard>
      <AsessmentModal
        showModal={showModal}
        onClose={handleClose}
        icon={asessment}
        handleOpen={handleRequestAssesment}
        dataUser={{
          email: obfuscateData(email),
          cellphone: obfuscateData(cellphone),
          code: advisory,
        }}
      />
    </>
  );
};

export default Procedure;
