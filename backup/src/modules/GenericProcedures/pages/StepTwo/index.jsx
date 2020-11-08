import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addFile } from "../../redux/actions/Procedure";

import { allColors } from "global/styles";
import validado from "shared/images/validado.svg";

import Accordion, { BulletedList } from "global/components/v2/Accordion";
import Button from "global/components/v2/Button";
import FinalModal from "../../components/Modals/FinalModal";
import MainTitle from "global/components/v2/Titles/MainTitle";
import MaterialUploader from "global/components/v2/MaterialUploader";
import Stepper from "global/components/v2/Stepper";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import WhiteCard from "global/components/v2/Cards/WhiteCard";

import { uploadFile } from "modules/GenericProcedures/services/uploadFile";
import { registerSimpleProcedure } from "modules/GenericProcedures/services/registerSimpleProcedure";
import { UserContext } from "modules/App/pages/MainDashboardLayout";

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

/****Accordion content styles */

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

const StepTwo = () => {
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const user = React.useContext(UserContext);

  const comment = useSelector(state => state.procedure.comment);
  const cellphone = useSelector(state => state.procedure.cellphone);
  const idRequest = useSelector(state => state.procedure.id);

  const INITIAL_DATA = {
    idRequest: 0,
    idTypeRequest: 0,
    comment: null,
    beneficiaries: [],
    documents: [],
    documentsBeneficiary: [],
    email: null,
    cellphone: null
  };

  const INITIAL_RESPONSE = {
    code: '',
    email: '',
    cellphone: '',
  }

  const [dataProcedure, setDataProcedure] = useState(INITIAL_DATA);
  const [successResponse, setSuccessResponse] = useState(INITIAL_RESPONSE);
  const [documents, setDocuments] = useState([]);
  const [successUpload, setSuccessUpload] = useState({});

  let file = useSelector((state) => state.procedure.files);
  // console.log(`uploaded file in store -> ${file}`);

  let dispatch = useDispatch();

  const handleBtnModal = () => {
    history.push("/inicio");
  };

  const handleChange = async (file) => {
    console.log("New file uploaded: ", file);
    let [...copyDocuments] = documents;
    console.log(file[0]);
    copyDocuments.push(file[0]);
    const response = await uploadFile(file[0], 1);
    console.log("response upload is ", response.idRequestDocument);
    dispatch(addFile(response.idRequestDocument));
    setDocuments(copyDocuments);
  };

  const arrayDocs = useSelector(state => state.procedure.documents)
  const arrayModified = arrayDocs.map(ide => ({idRequestDocument:ide}));
  // console.log("array modified is ", arrayModified);
  const idInteger = parseInt(id);

  const sendDataProcedure = () => {
    let dataRequest = {
      idRequest: idRequest,
      idTypeRequest: idInteger,
      comment: comment,
      beneficiaries: [],
      // documents: [...arrayModified],
      documents: [],
      documentsBeneficiary: [],
      email: user.email?user.email:"correo****@correo.com",
      cellphone: cellphone,
    };
    setDataProcedure(dataRequest);
    console.log("request to be sent => ", dataRequest);
    let response = registerSimpleProcedure(dataRequest)
    .then(resp => {
      console.log("response is ", resp)
      response = resp;
    });
    if (response !== undefined){
      setSuccessResponse({
        code: response.codeRequest,
        email: dataRequest.email,
        cellphone: dataRequest.cellphone
      });
      setModalVisibility(true);
    }
  };

  const configuration = useSelector((state) => state.procedure.configuration);

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
              ? // true
                // si el tramite tiene beneficiarios
                stepsProcedureWithBeneficiaries
              : // si el tramite no tiene beneficiarios
                stepsSimpleProcedure
          }
        />
      </ContainerStepper>

      {/* si el tramite no tiene beneficiarios */}
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
          <MaterialUploader
            className="width-100"
            files={documents}
            loading={false}
            onChange={handleChange}
            description={"Documentos"}
            btnLabel={"Subir archivo"}
            IsEditable={true}
          />
        </Accordion>

        <div className="alignCenterVertically">
          <Button
            onClick={sendDataProcedure}
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
          data={successResponse ? successResponse : null}
        />
      </>
    </WhiteCard>
  );
};

export default StepTwo;
