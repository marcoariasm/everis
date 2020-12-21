import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCodeProcedure } from "../../redux/actions/Procedure";

import { allColors } from "global/styles";
import validado from "shared/images/validado.svg";

import Accordion, { BulletedList } from "global/components/v2/Accordion";
import Button from "global/components/v2/Button";
import FinalModal from "../../components/Modals/FinalModal";
import DocumentsModal from "global/components/v2/Modals/DocumentsModal";
import MainTitle from "global/components/v2/Titles/MainTitle";
import MaterialUploader from "global/components/v2/MaterialUploader";
import Stepper from "global/components/v2/Stepper";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import WhiteCard from "global/components/v2/Cards/WhiteCard";

import { uploadFile } from "modules/GenericProcedures/services/uploadFile";
import { registerSimpleProcedure } from "modules/GenericProcedures/services/registerSimpleProcedure";
import { UserContext } from "modules/App/pages/MainDashboardLayout";
import useProcedureInformation from "modules/GenericProcedures/services/useProcedureInformation";
import { useEffect } from "react";
import AlertCard2 from "global/components/v2/Cards/AlertCard2";
import { inactivateFile } from "modules/GenericProcedures/services/inactivateFile";
import { obfuscateData } from "modules/shared/helpers/HelperObfuscate";

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
  margin-bottom: 4em;
`;

const LinkToDocuments = styled.p`
  text-decoration: underline;
  margin: 15px 0 20px 0;
  color: ${allColors.colorOrangeMain};
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

export const SectionTitle = styled.p`
  font-size: 18px;
  font-family: "Calibri";
  color: #00a499;
  font-weight: bold;
  padding-left: 1.1em;
`;

const stepsSimpleProcedure = [
  {
    label: "Detalle del trámite",
    status: "completed",
  },
  {
    label: "Adjunta documentos",
    status: "active",
  },
];

const stepsProcedureWithBeneficiaries = [
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

const StepTwo = () => {
  const { id } = useParams();
  const history = useHistory();
  const user = React.useContext(UserContext);

  const INITIAL_DATA = {
    idRequest: 0,
    idTypeRequest: 0,
    comment: null,
    beneficiaries: [],
    documents: [],
    documentsBeneficiary: [],
    email: null,
    cellphone: null,
  };

  const [generalDocError, setGeneralError] = useState({});
  const [generalDocLoading, setGeneralLoading] = useState(false);
  const [showModal, setModalVisibility] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [dataProcedure, setDataProcedure] = useState(INITIAL_DATA);
  const [showModalDocuments, setShowModalDocuments] = useState(false);
  const [successResponse, setSuccessResponse] = useState({
    code: "",
    cellphone: "",
    email: "",
  });
  const [documents, setDocuments] = useState([]);
  const [uploaded, setUploaded] = useState([]);

  const comment = useSelector((state) => state.procedure.comment);
  const cellphone = useSelector((state) => state.procedure.cellphone);
  const email = useSelector((state) => state.procedure.email);
  const idReq = useSelector((state) => state.procedure.id);
  let file = useSelector((state) => state.procedure.files);

  let dispatch = useDispatch();

  /**
   * Procedures excluded from document uploaded validation 
   */
  const procedures = [1,2,4,15,21,26,28,30,33,35,44,46,50,53,54,55,56,57,58,59,60,64,65,70,77,79];
  const proceduresBeneficiaries = [17,24,36,39,41,43];

  useEffect(() => {
    if (successResponse.code === "" || successResponse.code === undefined)
      setShowAlert(true);
    else setModalVisibility(true);
  }, [successResponse.code]);

  const handleBtnModal = () => {
    history.push("/inicio");
  };

  const handleChange = async (file) => {
    setGeneralLoading(true);
    setGeneralError({});
    let [...copyDocuments] = documents;
    copyDocuments.push(file[0]);
    const response = await uploadFile(file[0], idReq, "R");
    if (response.error) {
      setGeneralLoading(false);
      return setGeneralError(response);
    }
    setDocuments(copyDocuments);
    setUploaded([...uploaded, response.idRequestDocument]);
    setGeneralLoading(false);
  };

  const idInteger = parseInt(id);

  const sendDataProcedure = async () => {
    setModalVisibility(true);
    let dataRequest = {
      idRequest: idReq,
      idTypeRequest: idInteger,
      comment: comment,
      beneficiaries: [],
      documents: [],
      documentsBeneficiary: [],
      email,
      cellphone,
    };
    setDataProcedure(dataRequest);
    const response = await registerSimpleProcedure(dataRequest);
    if (response !== undefined) {
      dispatch(setCodeProcedure(response.codeRequest));
      setSuccessResponse({
        code: response.codeRequest,
        cellphone: obfuscateData(cellphone),
        email: obfuscateData(email),
      });
    } else {
      // error
    }
  };

  const { data: configuration } = useProcedureInformation(id);

  const handleDeleteFile = async (file, index) => {
    let [...copyDocuments] = documents;
    copyDocuments.splice(index, 1);
    setDocuments(copyDocuments);

    let [...copyUploaded] = uploaded;
    copyUploaded.splice(index, 1);
    setUploaded(copyUploaded);

    let idRequestDocument = uploaded[index];
    const resp = await inactivateFile(idRequestDocument);
  }

  return (
    <WhiteCard>
      <Text>
        <span>{"Nueva solicitud de trámite"}</span>
      </Text>
      <MainTitle title={configuration.name} />

      <ContainerStepper>
        <Stepper
          stepList={
            configuration.inBeneficiary == "1"
              ? stepsProcedureWithBeneficiaries
              : stepsSimpleProcedure
          }
        />
      </ContainerStepper>

      <>
        <TitleGreen text={"Recomendaciones"} />
        <BulletedList
          textList={[
            "El peso de cada documento no debe exceder de 8MB.",
            "Documentos válidos PDF, JPG y PNG.",
            "Verifica que todos los datos del documento sean legibles.",
          ]}
        />
        <br />

        <Accordion title={"Documentos generales"} label={""}>
          <LinkToDocuments onClick={() => setShowModalDocuments(true)}>
            {"Ver detalle de los documentos a adjuntar"}
          </LinkToDocuments>
          <MaterialUploader
            className="width-100"
            files={documents}
            loading={generalDocLoading}
            error={generalDocError.error ? generalDocError : null}
            onChange={handleChange}
            deleteFile={handleDeleteFile}
            description={"Documentos"}
            btnLabel={"Subir archivo"}
            IsEditable={true}
          />
        </Accordion>

        <div className="alignCenterVertically">
          <Button
            onClick={sendDataProcedure}
            className="buttonRegularResponsive primary-btn"
            disabled={ 
              procedures.includes(idInteger)
              ? false
              : !documents.length  
            }
          >
            Continuar
          </Button>
        </div>

        <AlertCard2
          hidden={showAlert}
          text1={"Lo sentimos ha ocurrido un error"}
          showLink={false}
        />

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
          children={
            configuration.documents.length > 0 ? (
              <DocumentsSection documentsInfo={configuration.documents} />
            ) : (
              ""
            )
          }
        />
      </>
    </WhiteCard>
  );
};

export default StepTwo;
