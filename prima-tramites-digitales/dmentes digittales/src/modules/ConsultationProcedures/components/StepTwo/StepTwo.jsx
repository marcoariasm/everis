import Accordion from "global/components/v2/Accordion";
import DocumentList from "modules/shared/components/DocumentList";
import React from "react";
import pdfIcon from "shared/images/pdfIcon.svg";
import Beneficiary from "../Beneficiary/Beneficiary";
import { downloadFileRequest } from "../../services";
import {downloadFile} from "../../../shared/helpers/HelperDowloadFile";
import InformationProcedures from "../InformationProcedure/InformationProcedure";
import {
  ContentStepTwo,
  ContentTab,
  SubTittle,
  DownloadInformativeDocuments,
} from "./styles";

function StepTwo({ procedure }) {
  const beneficiaries = () =>
    procedure.beneficiaries.map((item, i) => (
      <Beneficiary beneficary={item} key={i} index={i + 1} />
    ));

  const downloadFileOfMessage = (event, id, documentName) => {
    event.preventDefault();
    const payload = { idRequestDocument: id };

    downloadFileRequest(payload)
    .then((response) => response.blob())
    .then((blob) => downloadFile(blob, documentName))
    .catch((error) => {
      console.log(error)
      alert(error);
    });
  };

  return (
    <ContentStepTwo>
      {procedure.affiliate && (
        <InformationProcedures
          person={procedure.affiliate}
          tittleAccordion="solicitante"
        />
      )}

      {procedure.applicant && (
        <InformationProcedures
          person={procedure.applicant}
          tittleAccordion="afiliado"
        />
      )}

      {procedure.representative && (
        <InformationProcedures
          person={procedure.representative}
          tittleAccordion="representante"
        />
      )}

      {procedure.beneficiaries.length > 0 && (
        <>
          <SubTittle>Beneficiarios</SubTittle>
          {beneficiaries()}
        </>
      )}

      {(procedure.documents.length > 0 ||
        procedure.documentsBeneficiary.length > 0) && (
        <SubTittle>Documentos adjuntos</SubTittle>
      )}

      {procedure.documents.length > 0 && (
        <Accordion title={"Documentos generales"}>
          <ContentTab className="document-container">
            <DocumentList
              handleAction={downloadFileOfMessage}
              files={procedure.documents}
              loading={false}
              IsEditable={false}
            />
          </ContentTab>
        </Accordion>
      )}

      {procedure.documentsBeneficiary.length > 0 && (
        <Accordion title={"Documentos del afiliado"}>
          <ContentTab className="document-container">
            <DocumentList
              handleAction={downloadFileOfMessage}
              files={procedure.documentsBeneficiary}
              loading={false}
              IsEditable={false}
            />
          </ContentTab>
        </Accordion>
      )}

      <DownloadInformativeDocuments
        href={procedure.documentInformative}
        target="_blank"
      >
        <img src={pdfIcon} alt="pdfIcon" />
        <span className="headerSubTitleHighligh">
          Descarga los documentos informativos
        </span>
      </DownloadInformativeDocuments>
    </ContentStepTwo>
  );
}

export default StepTwo;
