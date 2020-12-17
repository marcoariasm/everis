import React from "react";
import DocumentList from "shared/components/DocumentList";
import Accordion from "shared/components/Accordion/index";
import Beneficiary from "../Beneficiary/Beneficiary";
import InformationProcedures from "../InformationProcedure/InformationProcedure";
import downloadFile from "shared/helpers/HelperDowloadFile";
import { downloadFileRequest } from "../../services";

import { ContentStepTwo, ContentTab, SubTittle, Card } from "./styles";

function SectionLeft({ procedure }) {
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
        console.log(error);
        alert(error);
      });
  };
  return (
    <ContentStepTwo>
      <Card>
        <SubTittle>Datos del trámite</SubTittle>

        {procedure.affiliate && (
        <InformationProcedures
          person={procedure.affiliate}
          tittleAccordion="afiliado"
        />
      )}

      {procedure.applicant && (
        <InformationProcedures
          person={procedure.applicant}
          tittleAccordion="solicitante"
        />
      )}

      {procedure.representative && (
        <InformationProcedures
          person={procedure.representative}
          tittleAccordion="representante"
        />
      )}

      {procedure.comment && (
        <InformationProcedures
          detail={procedure.comment}
          tittleAccordion="tramite"
          procedure={procedure}
        />
      )}

        {procedure.beneficiaries.length > 0 && (
          <>
            <SubTittle>Beneficiarios</SubTittle>
            {beneficiaries()}
          </>
        )}
      </Card>

      {(procedure.documents.length > 0 ||
        procedure.documentsBeneficiary.length > 0) && (
        <Card>
          <SubTittle>Documentos adjuntos</SubTittle>
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
            <Accordion title={"Documentos de beneficiarios"}>
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
        </Card>
      )}
    </ContentStepTwo>
  );
}

export default SectionLeft;
