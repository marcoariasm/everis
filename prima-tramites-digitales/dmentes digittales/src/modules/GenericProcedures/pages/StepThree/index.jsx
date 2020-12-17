import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFile, addFileBeneficiary } from "../../redux/actions/Procedure";

import { allColors } from "global/styles";
import validado from "shared/images/validado.svg";


import Accordion, {
  // DoubleLabel,
  BulletedList,
} from "global/components/v2/Accordion";
import FinalModal from "../../components/Modals/FinalModal";
import MainTitle from "global/components/v2/Titles/MainTitle";
import Stepper from "global/components/v2/Stepper";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import MaterialUploader from "global/components/v2/MaterialUploader";
import Button from "global/components/v2/Button";

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

const StepThree = () => {
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [documentsGeneral, setDocumentsGeneral] = useState([]);
  const [documentsBeneficiary, setDocumentsBeneficiary] = useState([]);
  let dispatch = useDispatch();
  let dispatch2 = useDispatch();

  let procedure = useSelector((state) => state.procedure);

  const handleBtnModal = () => {
    history.push("/inicio/nueva-solicitud/afiliado/");
  };

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

  const documents = [
    // {
    //     name: 'identity-document.jpg',
    //     size: '153Kb'
    // },
    // {
    //     name: 'acta-de-nacimiento.pdf',
    //     size: '153Kb'
    // },
    // {
    //     name: 'acta.jpg',
    //     size: '153Kb'
    // }
  ];

  const handleChange = (file) => {
    console.log("New file uploaded: ", file);
    let [...copyDocuments] = documentsGeneral;
    console.log(file[0]);
    copyDocuments.push(file[0]);
    setDocumentsGeneral(copyDocuments);
    dispatch(addFile(copyDocuments));
  };

  const handleChangeDocsBeneficiary = (file2) => {
    console.log("New file uploaded beneficiary: ", file2);
    let [...copyDocuments2] = documentsBeneficiary;
    console.log(file2[0]);
    copyDocuments2.push(file2[0]);
    setDocumentsBeneficiary(copyDocuments2);
    dispatch2(addFileBeneficiary(copyDocuments2));
  };

  return (
    <>
      <WhiteCard>
        <Text>
          <span>{"Nombre del trámite"}</span>
        </Text>
        <MainTitle title={"Nueva solicitud de trámite"} />

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
          <MaterialUploader
            className="width-100"
            files={documentsGeneral}
            loading={false}
            onChange={handleChange}
            description={"Documentos"}
            btnLabel={"Subir archivo"}
            IsEditable={true}
          />
        </Accordion>

        <Accordion title={"Documentos de beneficiarios"}>
          <MaterialUploader
            className="width-100"
            files={documentsBeneficiary}
            loading={false}
            onChange={handleChangeDocsBeneficiary}
            description={"Documentos"}
            btnLabel={"Subir archivo"}
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
        data={{
          id: "ACTA-ASE-0000000006",
          registerDate: "2020.10.29 17:18:23",
        }}
      />
    </>
  );
};

export default StepThree;
