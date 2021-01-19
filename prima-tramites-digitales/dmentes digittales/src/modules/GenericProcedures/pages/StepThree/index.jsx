import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFile, addFileBeneficiary } from "../../redux/actions/Procedure";

import { allColors } from "global/styles";
import validado from "shared/images/validado.svg";

import Accordion, { BulletedList } from "global/components/v2/Accordion";
import DocumentsModal from "global/components/v2/Modals/DocumentsModal";
import FinalModal from "../../components/Modals/FinalModal";
import MainTitle from "global/components/v2/Titles/MainTitle";
import Stepper from "global/components/v2/Stepper";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import MaterialUploader from "global/components/v2/MaterialUploader";
import Button from "global/components/v2/Button";
import { uploadFile } from "modules/GenericProcedures/services/uploadFile";
import { UserContext } from "modules/App/pages/MainDashboardLayout";
import { registerSimpleProcedure } from "modules/GenericProcedures/services/registerSimpleProcedure";
import useProcedureInformation from "modules/GenericProcedures/services/useProcedureInformation";
import { inactivateFile } from "modules/GenericProcedures/services/inactivateFile";
import { obfuscateData } from "modules/shared/helpers/HelperObfuscate";
import  { relationShipCodes, conditionCodes } from 'modules/GenericProcedures/constants/beneficiariesConstants';

const Text = styled.div`
  margin: 10px 0 0 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
`;

const LinkToDocuments = styled.p`
  text-decoration: underline;
  margin: 15px 0 20px 0;
  color: ${allColors.colorOrangeMain};
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const DocumentsSection = ({ documentsInfo }) => {
  return documentsInfo.map((document, index) => {
    const documentsList = document.documents.map((item) => item.nameDocument);
    return (
      <div key={index + document.nameGroupDocument} className="pt1em pb1em">
        <p className="modalHighlightedText bold pb1em">
          {document.nameGroupDocument}
        </p>
        <BulletedList textList={documentsList} />
      </div>
    );
  });
};

const StepThree = () => {
  const { id } = useParams();
  const history = useHistory();

  const [generalDocError, setGeneralError] = useState({});
  const [generalDocLoading, setGeneralLoading] = useState(false);

  const [beneficiaryDocError, setBeneficiaryError] = useState({});
  const [beneficiaryDocLoading, setBeneficiaryLoading] = useState(false);

  const [showModal, setModalVisibility] = useState(false);
  const [documentsGeneral, setDocumentsGeneral] = useState([]);
  const [documentsBeneficiary, setDocumentsBeneficiary] = useState([]);
  const [uploaded, setUploaded] = useState([]);
  const [uploadedB, setUploadedB] = useState([]);
  const [successResponse, setSuccessResponse] = useState({});
  const [dataProcedure, setDataProcedure] = useState({});
  const [showModalBenefDocuments, setShowModalBenefDocuments] = useState(false);
  const [showModalDocuments, setShowModalDocuments] = useState(false);

  const storeProcedures = useSelector((state) => state.procedures);
  const { selectedBeneficiaries } = storeProcedures;

  const idReq = useSelector((state) => state.procedure.id);

  const handleBtnModal = () => {
    history.push("/inicio/nueva-solicitud/afiliado/");
  };

  const proceduresBeneficiaries = [17];

  const steps = [
    {
      label: "Detalle del trámite",
      status: "completed",
    },
    {
      label: "Beneficiarios",
      status: "completed",
    },
    {
      label: "Adjunta documentos",
      status: "active",
    },
  ];

  const handleChange = async (file) => {
    setGeneralLoading(true);
    setGeneralError({});
    let [...copyDocuments] = documentsGeneral;
    copyDocuments.push(file[0]);
    const response = await uploadFile(file[0], idReq, "R");
    if (response.error) {
      setGeneralLoading(false);
      return setGeneralError(response);
    }
    setDocumentsGeneral(copyDocuments);
    setUploaded([...uploaded, response.idRequestDocument]);
    setGeneralLoading(false);
  };

  const handleChangeDocsBeneficiary = async (file2) => {
    setBeneficiaryLoading(true);
    setBeneficiaryError({});
    let [...copyDocuments2] = documentsBeneficiary;
    copyDocuments2.push(file2[0]);
    const response = await uploadFile(file2[0], idReq, "B");
    if (response.error) {
      setBeneficiaryLoading(false);
      return setBeneficiaryError(response);
    }
    setDocumentsBeneficiary(copyDocuments2);
    setUploadedB([...uploadedB, response.idRequestDocument]);
    setBeneficiaryLoading(false);
  };

  const idInteger = parseInt(id);
  const procedureStore = useSelector((state) => state.procedure);
  const { cellphone, comment, beneficiaryStatement, email } = procedureStore;

  const sendDataProcedure = async () => {
    let dataRequest = {
      idRequest: idReq,
      idTypeRequest: idInteger,
      comment,
      beneficiaries: selectedBeneficiaries.map((benefy) => ({
        idBeneficiary: benefy.beneficiaryId,
        idRelationship: relationShipCodes[benefy.relationship],
        idDisability: conditionCodes[benefy.hasDisability || benefy.disability]
      })),
      documents: null,
      documentsBeneficiary: null,
      email,
      cellphone,
    };
    setDataProcedure(dataRequest);
    let response = await registerSimpleProcedure(dataRequest);
    let resp = response;
    if (resp !== undefined) {
      setSuccessResponse({
        code: resp.codeRequest,
        email: obfuscateData(dataRequest.email),
        cellphone: obfuscateData(dataRequest.cellphone),
      });
    }
    setModalVisibility(true);
  };

  useEffect(() => {
    if (!successResponse.code);
    else setModalVisibility(true);
  }, [successResponse.code]);

  const { data: configuration } = useProcedureInformation(id);

  const handleDeleteFile = async (file, index) => {
    let [...copyDocuments] = documentsGeneral;
    copyDocuments.splice(index, 1);
    setDocumentsGeneral(copyDocuments);

    let [...copyUploaded] = uploaded;
    copyUploaded.splice(index, 1);
    setUploaded(copyUploaded);

    let idRequestDocument = uploaded[index];
    const resp = await inactivateFile(idRequestDocument);
  };

  const handleDeleteFileB = async (file, index) => {
    let [...copyDocuments] = documentsBeneficiary;
    copyDocuments.splice(index, 1);
    setDocumentsBeneficiary(copyDocuments);

    let [...copyUploaded] = uploadedB;
    copyUploaded.splice(index, 1);
    setUploadedB(copyUploaded);

    let idRequestDocument = uploadedB[index];
    const resp = await inactivateFile(idRequestDocument);
  };

  const sortDocuments = (documents) =>
    documents.sort((a, b) => {
      const x = a.documents[0].ordenation;
      const y = b.documents[0].ordenation;
      return x - y;
    });

    const isFormValid = () => {
      if (proceduresBeneficiaries.includes(parseInt(id))) return false;
      return beneficiaryStatement ? !documentsGeneral.length : !documentsGeneral.length || !documentsBeneficiary.length;
    }

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

        <TitleGreen text={"Recomendaciones"} />
        <BulletedList
          textList={[
            "El peso de cada documento no debe exceder de 8MB.",
            "Documentos válidos PDF, JPG y PNG.",
            "Verifica que todos los datos del documento sean legibles.",
          ]}
        />
        <br />

        <Accordion title={"Documentos generales"}>
          <LinkToDocuments onClick={() => setShowModalDocuments(true)}>
            {"Ver detalle de los documentos generales a adjuntar"}
          </LinkToDocuments>
          <MaterialUploader
            className="width-100"
            files={documentsGeneral}
            loading={generalDocLoading}
            error={generalDocError.error ? generalDocError : null}
            onChange={handleChange}
            deleteFile={handleDeleteFile}
            description={"Documentos"}
            btnLabel={"Subir archivo"}
            IsEditable={true}
          />
        </Accordion>

        {beneficiaryStatement === true ? (
          ""
        ) : (
          <Accordion title={"Documentos de beneficiarios"}>
            <LinkToDocuments onClick={() => setShowModalBenefDocuments(true)}>
              {"Ver detalle de los documentos de beneficiarios a adjuntar"}
            </LinkToDocuments>
            <MaterialUploader
              className="width-100"
              files={documentsBeneficiary}
              loading={beneficiaryDocLoading}
              error={beneficiaryDocError.error ? beneficiaryDocError : null}
              onChange={handleChangeDocsBeneficiary}
              deleteFile={handleDeleteFileB}
              description={"Documentos"}
              btnLabel={"Subir archivo"}
              IsEditable={true}
            />
          </Accordion>
        )}

        <div className="alignCenterVertically">
          <Button
            onClick={sendDataProcedure}
            className="buttonRegularResponsive primary-btn"
            disabled={isFormValid()}
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
        data={successResponse ? successResponse : null}
      />
      <DocumentsModal
        showModal={showModalDocuments}
        onClose={() => setShowModalDocuments(false)}
        content={"Contenido"}
        children={
          configuration.documents.length > 0 ? (
            <DocumentsSection
              documentsInfo={sortDocuments(configuration.documents)}
            />
          ) : (
            ""
          )
        }
      />

      <DocumentsModal
        showModal={showModalBenefDocuments}
        onClose={() => setShowModalBenefDocuments(false)}
        content={"Contenido"}
        children={
          configuration.documentsBeneficiary.length > 0 ? (
            <DocumentsSection
              documentsInfo={sortDocuments(configuration.documentsBeneficiary)}
            />
          ) : (
            ""
          )
        }
      />
    </>
  );
};

export default StepThree;
