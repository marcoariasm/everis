import React, { useEffect, useState } from "react";
import Accordion from "./components/Accordion";
import styled from "styled-components";
import {
  MaterialSelect,
  OutlinedSelectContainer,
} from "modules/procedures/shared/components/index";
import { formatComboCategories } from "modules/procedures/constants/formatCombo";
import CheckBox from "global/components/v1/CheckBox/CheckBox";
import TextArea from "./components/TextArea/index";
import {
  ContainerTwo,
  Tittle,
  DetailContainer,
  Card1,
  Card2,
  Card3,
  ContainerButtonSave,
  ButtonSave,
} from "./style";
import ListStep from "./components/ListStep/index";
import ListRequirement from "./components/ListRequirement/index";
import {
  getListCategories,
  getProcedure,
  updateProcedure,
} from "./services/index";
import { useHistory, useParams } from "react-router-dom";
import "./settingProcedureDetail.scss";

const SettingProcedureDetail = () => {
  const [request, setRequest] = useState();
  const [loading, setLoading] = useState(true);
  const [documentation, setDocumentation] = useState([]);
  const [inBeneficiary, setInBeneficiary] = useState(false);
  const [inDocumentInformative, setInDocumentInformative] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const [documentsBeneficiary, setDocumentsBeneficiary] = useState([]);
  const [status, setStatus] = useState([]);

  let { id } = useParams();
  
  const parseDocuments = (request) => {
    let tmpDoc = [];
    if (request.documents.length>0) {
      request.documents.forEach((_) =>
      tmpDoc.push({
        nameGroup: _.nameGroupDocument,
        documents: _.documents,
      })
      );
    }
    let tmpDocBenef = [];
    if (request.documentsBeneficiary.length>0){
      request.documentsBeneficiary.forEach((_) =>
      tmpDocBenef.push({
        nameGroup: _.nameGroupDocument,
        documents: _.documents,
      })
      );
    }
    let tmpStatus = [];
    if (request.status.length>0){
      request.status.forEach((_) =>
      tmpStatus.push({
        nameGroup: _.nameStatus,
        documents: _.reasons  ,
      })
    );
  }
  request.inBeneficiary === "0"
  ? setInBeneficiary(false)
  : setInBeneficiary(true);
  request.inDocumentInformative === "0"
  ? setInDocumentInformative(false)
  : setInDocumentInformative(true);
  setDocumentation(tmpDoc);
  setDocumentsBeneficiary(tmpDocBenef);
  setStatus(tmpStatus);
};

const handleCheckBeneficiary = (e) => {
  setInBeneficiary(e.target.checked);
};

const handleCheckDocumentInformative = (e) => {
  setInDocumentInformative(e.target.checked);
  };

  useEffect(() => {
    if (id != 0 && loading) {
      getProcedure(id)
        .then((response) => {
          setLoading(false);
          setRequest(response);
          parseDocuments(response);
        })
        .catch((error) => {
          setLoading(true);
          console.log(error);
        });

      getListCategories()
        .then((response) => {
          setListCategories(response);
        })
        .catch((error) => {});
    }
    if (id == 0 && loading) {
      setRequest({});
      setLoading(false);

      getListCategories()
        .then((response) => {
          setListCategories(response);
        })
        .catch((error) => {});
    }
  }, [request]);

  return (
    <>
      {id == 0 ? (
        <Tittle> Nuevo trámite </Tittle>
      ) : (
        <Tittle> Actualizar trámite - {request && request.name}</Tittle>
      )}
      <ContainerTwo>
        {request && (
          <DetailContainer>
            <Card1>
              {listCategories.length > 0 && (
                <OutlinedSelectContainer>
                  <MaterialSelect
                    fontFamily="FS Emeric"
                    selectWidth="100%"
                    selectOptions={formatComboCategories(listCategories)}
                    placeholder="Seleccionar categoría"
                    initialValue={request.idCategory}
                  />
                </OutlinedSelectContainer>
              )}
              <div className="mrg-top">
                <TextArea
                  labelValue="Nombre del trámite"
                  height="48"
                  currentValue={request.name}
                />
              </div>
              <div className="mrg-top">
                <TextArea
                  labelValue="Pequeña descripción en menú"
                  height="48"
                  currentValue={request.description}
                />
              </div>
              <div className="mrg-top">
                <TextArea
                  labelValue="Detalle del trámite"
                  height="131"
                  currentValue={request.descriptionLarge}
                />
              </div>
              <div className="mrg-top">
                <TextArea
                  labelValue="Importante"
                  height="137"
                  className="mrg-top"
                  currentValue={request.informationImportant}
                />
              </div>
              <CheckBox
                width={800}
                type="checkbox"
                checked={inBeneficiary}
                onChange={handleCheckBeneficiary}
                label="Incluir registro de beneficiarios"
                id="checkboxBeneficiaries"
                name="checkboxInBeneficiaries"
              />
              <CheckBox
                width={800}
                type="checkbox"
                checked={inDocumentInformative}
                onChange={handleCheckDocumentInformative}
                label="Incluir cartillas informativas"
                id="checkboxTemplate"
                name="checkboxTemplate"
              />
              <TextArea
                hidden={!inDocumentInformative}
                height="137"
                className="mrg-top"
                currentValue={
                  request.inDocumentInformative === "1"
                    ? request.documentInformative
                    : ""
                }
              />
            </Card1>
            <Card2>
              <ListStep
                label="Etapas del proceso"
                list={request.stages}
                nameButton="Añadir etapas del proceso"
              />

              <ListRequirement
                label="Requisitos para el trámite"
                list={request.requirements}
                nameButton="Añadir requisitos"
              />
            </Card2>
            <Card3>
              <Accordion
                key="0"
                title="Documentos que necesitas tener a la mano"
                listGroup={documentation}
                setListGroup={setDocumentation}
                labelGroup={"Sub-Agrupación"}
                labelItem={"Documento"}
              />
              <Accordion
                key="1"
                title="Documentos del beneficiario que necesitas tener a la mano"
                hidden={!inBeneficiary}
                listGroup={documentsBeneficiary}
                setListGroup={setDocumentsBeneficiary}
                labelGroup={"Sub-Agrupación"}
                labelItem={"Documento"}
              />
              <Accordion
                key="2"
                title="Estados y motivos"
                listGroup={status}
                setListGroup={setStatus}
                labelGroup={"Estado"}
                labelItem={"Motivo"}
              />
            </Card3>
          </DetailContainer>
        )}
        {id === 0 && (
          <DetailContainer>
            <Card1>
              {listCategories.length > 0 && (
                <OutlinedSelectContainer>
                  <MaterialSelect
                    fontFamily="FS Emeric"
                    selectWidth="100%"
                    selectOptions={formatComboCategories(listCategories)}
                    placeholder="Seleccionar categoría"
                    initialValue={"0"}
                  />
                </OutlinedSelectContainer>
              )}
              <div className="mrg-top">
                <TextArea labelValue="Nombre del trámite" height="48" />
              </div>
              <div className="mrg-top">
                <TextArea
                  labelValue="Pequeña descripción en menú"
                  height="48"
                />
              </div>
              <div className="mrg-top">
                <TextArea labelValue="Detalle del trámite" height="131" />
              </div>
              <div className="mrg-top">
                <TextArea
                  labelValue="Importante"
                  height="137"
                  className="mrg-top"
                />
              </div>
              <CheckBox
                width={800}
                type="checkbox"
                radius="true"
                label="Incluir registro de beneficiarios"
                id="newCheckboxBeneficiaries"
                name="newCheckboxBeneficiaries"
                checked={false}
              />
              <CheckBox
                width={800}
                type="checkbox"
                radius="true"
                label="Incluir cartillas informativas"
                id="newCheckboxTemplate"
                name="newCheckboxTemplate"
                checked={false}
              />
              <TextArea height="137" className="mrg-top" />
            </Card1>
            <Card2>
              <ListStep
                label="Etapas del proceso"
                list={[]}
                nameButton="Añadir etapas del proceso"
              />

              <ListRequirement
                label="Requisitos para el trámite"
                list={[]}
                nameButton="Añadir requisitos"
              />
            </Card2>
            <Card3>
              <Accordion
                title="documento"
                // listGroup={documents}
                // setListGroup={setDocuments}
                labelGroup={"Sub-Agrupación"}
                labelItem={"Documento"}
              />
            </Card3>
          </DetailContainer>
        )}
        <ContainerButtonSave style={{ marginTop: 18 }}>
          <ButtonSave>Guardar Cambios</ButtonSave>
        </ContainerButtonSave>
      </ContainerTwo>
    </>
  );
};

export default SettingProcedureDetail;
