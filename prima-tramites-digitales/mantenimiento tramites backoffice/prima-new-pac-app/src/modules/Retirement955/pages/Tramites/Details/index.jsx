import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  isEmpty, isNil, prop,
} from 'ramda';
import Modules from 'modules/shared';
import moment from 'moment';
import classNames from 'classnames';

import Header from '../../../components/Header/Header';

import './details.sass';
import '../../../components/Table/Table.sass';

import useAfiliadoInformacion from '../../../api/useAfiliadoInformacion';
import CardCollapsible from '../../../../../global/components/v1/CardCollapsible/CardCollapsible';
import TabFooterSlots from '../../../components/TabFooter/TabFooterSlots';
import Button from '../../../../../global/components/v1/Button/Button';
import Modal from '../../../../../global/components/v1/Modal/Modal';
import Select from '../../../../../global/components/v1/SelectMaterial';
import CheckBox from '../../../../../global/components/v1/CheckBox/CheckBox';
import trashIcon from '../../../../../shared/images/iconos/trash.svg';
import addFile from '../../../../../shared/images/iconos/add_file.svg';
import Card from '../../../../../global/components/v1/Card/Card';
import ValidacionAsesoria from './Componentes/ValidacionAsesoria';
import ValidacionDocumentos from './Componentes/ValidacionDocumentos';
import TableDocumentos from '../../../components/Details/TableDocumentos';
import '../../../components/Details/TableDocumentos.sass';
import BoxHistory from './Componentes/BoxHistory';
import UploadFileIcon from './Componentes/UploadFileIcon';
import DatosAfiliado from './Componentes/DatosAfiliado';
import useFinancialAdviceDetail from '../../../api/useFinancialAdviceDetail';
import useFinancialAdviceStates from '../../../api/useFinancialAdviceStates';
import useDocumentManagerDocumenType from '../../../api/useDocumentManagerDocumenType';
import loading from '../../../../../shared/images/loading.svg';
import serviceFetcher from '../../../../shared/libs/ServiceFetcher';
import financialAdviceValidate from '../../../api/financialAdviceValidate';

const { can } = Modules.libs.Roles;

const takeDesicion = 'queryBack.table.validateDocument.viewValidateDocument';

const Details = () => {
  const { id } = useParams();
  let advisor = {};
  const history = useHistory();
  let documents = [];
  let decisionsOptions = [];
  const documentTypeOptions = [];
  let documentData;
  let sunatData;
  let isReadyToSave = false;
  let showSaveButtons = false;
  let financialAdviceDetailState = {};
  let financialAdviceDetailLastState = {};
  let isLegal = false;

  const [decisionSelect, setDecisionSelect] = useState(null);
  const [documentTypeSelect, setDocumentTypeSelect] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [cuspp, setCuspp] = useState(null);
  const [isReja, setIsReja] = useState(null);
  const [monto, setMonto] = useState(0);
  const [uploadDocument, setUploadDocument] = useState({ fileName: '', name: '' });
  const [isSaving, setIsSaving] = useState(false);

  const hasLess100 = monto < 100000;
  let hasLegalPersonDeclaration = false;

  const {
    financialAdviceStates,
  } = useFinancialAdviceStates();

  const {
    financialAdviceDetail,
    isLoading: loadingFinanciaAdvice,
  } = useFinancialAdviceDetail(id);

  const {
    afiliadoInformacion,
    isLoading: afiliadoInformacionLoading,
    isError: afiliadoInformacionError,
  } = useAfiliadoInformacion(cuspp);

  const {
    documentType: documentTypes,
  } = useDocumentManagerDocumenType();

  if (financialAdviceDetail) {
    if (cuspp === null) {
      setCuspp(financialAdviceDetail.affiliateId);
      setIsReja(financialAdviceDetail.regime === 'REJA_APPLICABLE');
      setMonto(financialAdviceDetail.accumulatedFund);
    }

    documents = financialAdviceDetail.attachments;

    financialAdviceDetailState = financialAdviceDetail.states.find(
      (x) => x.state === 'IN_PROCESS',
    );

    financialAdviceDetailLastState = financialAdviceDetail.states[financialAdviceDetail.states.length - 1];

    let tmpData = financialAdviceDetail.validations.find(
      (x) => x.validation === 'CONTACTO',
    );

    if (tmpData) {
      advisor = {
        status: tmpData.pending === false
          ? 'Aceptado'
          : 'Pendiente',
        fecVal: tmpData.validationDate
          ? moment(tmpData.validationDate).format('DD/MM/YYYY')
          : '- -',
        advisorId: financialAdviceDetailState ? financialAdviceDetailState.advisorId : null,
        validatorId: tmpData.pending === false ? tmpData.advisorId : null,
      };
    }

    tmpData = financialAdviceDetail.validations.find(
      (x) => x.validation === 'DOCUMENTO',
    );

    documentData = tmpData || { pending: true };
    documentData.date = tmpData.validationDate;
    documentData.state = tmpData.pending === false
      ? 'Comprobado'
      : 'Pendiente';
    documentData.noDocumentValidationDate = financialAdviceDetailState ? moment(financialAdviceDetailState.date).format('DD/MM/YYYY') : null;

    sunatData = financialAdviceDetail.validations.find(
      (x) => x.validation === 'SUNAT',
    );

    const Legal = financialAdviceDetail.statements.find(
      (x) => x.statement === 'LEGAL_PERSON_DECLARATION',
    );

    if (Legal) {
      hasLegalPersonDeclaration = Legal.accepted;
    }

    if (hasLegalPersonDeclaration === false) {
      sunatData = tmpData;
    }

    isLegal = financialAdviceDetail
        && financialAdviceDetail.regime === 'LEGAL_AGE';
  }

  if (financialAdviceStates) {
    const tmpState = [];
    financialAdviceStates.forEach((state) => {
      if (financialAdviceDetailLastState.stateName === 'Observado' && state.statusDescription === 'Observado') {

      } else if (hasLegalPersonDeclaration === false) {
        tmpState.push({
          value: state.statusId,
          label: state.statusDescription,
        });
      } else if (state.statusDescription !== 'Observado') {
        tmpState.push({
          value: state.statusId,
          label: state.statusDescription,
        });
      }
    });
    decisionsOptions = tmpState;
  }

  if (documentTypes) {
    documentTypes.forEach((type) => {
      documentTypeOptions.push({
        value: type.documentTypeId,
        label: type.documentType,
      });
    });
  }

  const pathList = [
    'Jubilación y/o retiro de hasta el 95.5%', 'Etapa 1',
  ];

  const deleteFile = () => {
    setUploadDocument({
      name: '',
    });
  };

  const onSelectDecision = (e) => {
    setDecisionSelect(e.target.value);

    const tmpData = financialAdviceStates.find(
      (x) => x.statusId === parseInt(e.target.value, 10),
    );

    tmpData.reasons.map((reason) => {
      const tmpReason = reason;
      tmpReason.checked = false;
      tmpReason.fileName = false;

      return tmpReason;
    });

    deleteFile();

    setReasons(tmpData.reasons);
  };

  const checkReason = (reasonIndex) => {
    const tmpReason = reasons[reasonIndex];
    tmpReason.checked = !tmpReason.checked;

    setReasons({ ...reasons, [reasonIndex]: tmpReason });
  };

  const addReasonFile = (file) => {
    setUploadDocument({
      name: file.name,
      fileID: file.fileID,
    });
  };

  const uploadFile = () => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onload = () => {
      console.log(`The upload is completed: ${xhr.status} ${xhr.response}`);
    };

    xhr.upload.onprogress = (event) => {
      console.log(`Uploaded ${event.loaded} of ${event.total} bytes`);
    };

    xhr.upload.onerror = () => {
      console.error('Upload failed.');
    };

    xhr.upload.onabort = () => {
      console.error('Upload cancelled.');
    };

    xhr.open('POST', `${process.env.REACT_APP_API_URL}/financial-advice/${id}/attachment`);

    xhr.setRequestHeader('Authorization', `Bearer ${prop('accessToken', JSON.parse(sessionStorage.getItem('user')))}`);

    const files = document.getElementsByClassName('uploadFile-input')[0];
    const formData = new FormData();
    formData.append('file', files.files[0], files.files[0].name);
    formData.append('affiliateId', financialAdviceDetail.affiliateId);
    formData.append('documentTypeId', documentTypeSelect.toString());

    xhr.send(formData);
  };

  const save = () => {
    const checkedReasons = [];

    setIsSaving(true);

    if (uploadDocument.name !== '') {
      uploadFile(uploadDocument);
    }

    const tmpSUNAT = financialAdviceDetail.validations.find(
      (x) => x.validation === 'SUNAT',
    );

    const legalValue = financialAdviceDetail.statements.find(
      (x) => x.statement === 'LEGAL_PERSON_DECLARATION',
    );

    if (tmpSUNAT && legalValue.accepted) {
      financialAdviceValidate(financialAdviceDetail.financialAdviceId, tmpSUNAT.financialAdviceValidationId)
        .then(() => {
          console.log('SUNAT updated!');
        });
    }
    const tmpDocumento = financialAdviceDetail.validations.find(
      (x) => x.validation === 'DOCUMENTO',
    );

    if (tmpDocumento && legalValue.accepted === false) {
      financialAdviceValidate(financialAdviceDetail.financialAdviceId, tmpDocumento.financialAdviceValidationId)
        .then(() => {
          console.log('SUNAT updated!');
        });
    }

    Object.keys(reasons).forEach((reason) => {
      if (reasons[reason].checked === true) {
        checkedReasons.push(reasons[reason].reasonId);
      }
    });

    serviceFetcher(
      `${process.env.REACT_APP_API_URL}/financial-advice/${id}/states`,
      {
        method: 'POST',
        body: {
          financialAdviceDocumentId: id,
          reasons: checkedReasons,
          stateId: parseInt(decisionSelect.toString(), 10),
        },
        authenticated: true,
      },
    )
      .then(() => {
        history.push('/proceso95-5/tramites');
      });
  };

  const showAsesoria2 = isReja && !hasLess100;

  const onSelectFileType = (e) => {
    setDocumentTypeSelect(e.target.value);
  };

  const decisiones = {
    decisiones: false,
    motivo: false,
    evidencia: false,
  };

  const hasReasons = reasons ? Object.values(reasons).find(
    (x) => x.checked === true,
  ) : [];

  if (hasLegalPersonDeclaration) {
    switch (financialAdviceDetailLastState.state) {
      case 'IN_PROCESS':
        if (sunatData.pending) {
          decisiones.decisiones = true;
          showSaveButtons = true;
          switch (decisionSelect) {
            case '5':
            // IN PROGRESS
              decisiones.motivo = true;
              decisiones.evidencia = true;

              isReadyToSave = (hasReasons
                ? (isEmpty(hasReasons) === false)
                : false)
                  && uploadDocument.name !== '';
              break;
            case '3':
            // REJECTED
              decisiones.motivo = true;
              decisiones.evidencia = true;

              isReadyToSave = (hasReasons
                ? (isEmpty(hasReasons) === false)
                : false)
                  && uploadDocument.name !== '';
              break;
            default:
              isReadyToSave = true;
              break;
          }
          break;
        } else {
          isReadyToSave = true;
        }
        break;
      case 'REJECTED':
        if (sunatData.pending === false) {
          isReadyToSave = true;
        }
        break;
      default:
        isReadyToSave = true;
        break;
    }
  } else {
    switch (financialAdviceDetailLastState.state) {
      case 'IN_PROCESS':
        if (sunatData.pending) {
          decisiones.decisiones = true;
          showSaveButtons = true;
          switch (decisionSelect) {
            case '5':
              // IN PROGRESS
              decisiones.motivo = true;

              isReadyToSave = (hasReasons
                ? (isEmpty(hasReasons) === false)
                : false);
              break;
            case '3':
              // REJECTED
              decisiones.motivo = true;

              isReadyToSave = (hasReasons
                ? (isEmpty(hasReasons) === false)
                : false);
              break;
            case '4':
              // OBSERVED
              decisiones.motivo = true;
              decisiones.evidencia = true;
              isReadyToSave = (hasReasons
                ? (isEmpty(hasReasons) === false)
                : false)
                  && uploadDocument.name !== '';
              break;
            default:
              isReadyToSave = true;
              break;
          }
          break;
        } else {
          isReadyToSave = true;
        }
        break;
      case 'OBSERVED':
        if (sunatData.pending) {
          decisiones.decisiones = true;
          showSaveButtons = true;
          switch (decisionSelect) {
            case '5':
              // IN PROGRESS
              decisiones.motivo = true;
              decisiones.evidencia = true;

              isReadyToSave = (hasReasons
                ? (isEmpty(hasReasons) === false)
                : false)
                    && uploadDocument.name !== '';
              break;
            case '3':
              // REJECTED
              decisiones.motivo = true;
              decisiones.evidencia = true;

              isReadyToSave = (hasReasons
                ? (isEmpty(hasReasons) === false)
                : false);
              break;
            default:
              isReadyToSave = true;
              break;
          }
        }
        break;
      default:
        isReadyToSave = true;
        break;
    }
  }

  return (
    <div
      id="tramites-details-page"
      className={classNames({
        'is-legal': isReja === false,
        'mas-100': !hasLess100,
      })}
    >
      <div className="head-container">
        <div className="head-item">
          <Header title="Validación del trámite" path={pathList} />
        </div>
        <div className="head-item">
          <div className="tramite-number">
            <p><strong>ID Trámite</strong></p>
            <p>{financialAdviceDetail ? financialAdviceDetail.financialAdviceCode : id}</p>
          </div>
        </div>
      </div>
      <CardCollapsible
        title="Datos del afiliado"
        whiteTheme
        open
      >
        <DatosAfiliado
          cuspp={cuspp}
          afiliado={afiliadoInformacion}
          isLoading={afiliadoInformacionLoading}
          isError={afiliadoInformacionError}
          acceso={financialAdviceDetail ? financialAdviceDetail.regimeName : ''}
        />
      </CardCollapsible>
      <CardCollapsible
        title="Historial del Trámite"
        whiteTheme
        open
      >
        <BoxHistory
          history={
            !isEmpty(financialAdviceDetail) && !isNil(financialAdviceDetail)
              ? financialAdviceDetail.states
              : []
            }
          loading={loadingFinanciaAdvice}
        />
      </CardCollapsible>
      {isReja === false && !hasLess100 && (
        <CardCollapsible
          title="Validaciones del Trámite"
          whiteTheme
          className="validaciones-tramite"
          open
        >
          {isEmpty(advisor) && <img src={loading} alt="Loading" />}
          {advisor
          && (
          <ValidacionAsesoria
            number={1}
            asesor={advisor}
            limitDate={financialAdviceDetail.limitDate}
          />
          )}
          {isReja
          && (
          <ValidacionDocumentos
            state={financialAdviceDetailLastState}
            document={documentData}
          />
          )}
        </CardCollapsible>
      )}
      {isReja && (
        <CardCollapsible
          title="Validaciones del Trámite"
          whiteTheme
          className="validaciones-tramite"
          open
        >
          <ValidacionDocumentos
            state={financialAdviceDetailLastState}
            document={documentData}
          />
          <TableDocumentos
            documents={documents}
            documentData={documentData}
            cuspp={cuspp}
            showTitle={false}
            isReja={isReja}
          />
          {!hasLess100 && advisor && (
          <ValidacionAsesoria
            number={2}
            asesor={advisor}
            limitDate={financialAdviceDetail.limitDate}
          />
          )}
        </CardCollapsible>
      )}
      {isReja === false && (
        <CardCollapsible
          title="Documentación del Trámite"
          whiteTheme
          className="doumentacion-tramite"
          open
        >
          <TableDocumentos
            documents={documents}
            documentData={documentData}
            cuspp={cuspp}
            showTitle={false}
            isReja={isReja}
          />
          {showAsesoria2 && (
          <ValidacionAsesoria
            number={2}
            advisor={advisor}
            limitDate={financialAdviceDetail.limitDate}
          />
          )}
        </CardCollapsible>
      )}
      {isReja
      && decisiones.decisiones
            && (
            <Card title="Decisiones" whiteTheme className="decisiones">
              <div className="left">
                <Select
                  onChange={(e) => onSelectDecision(e)}
                  options={decisionsOptions}
                  placeholder="Seleccione estado"
                  name="decision-select"
                  value={decisionSelect}
                  disabled={!can(takeDesicion)}
                />
              </div>
              <div className="right">
                {decisiones.motivo
                && (
                <div className="table-new table-decisiones">
                  <div className="table-header">
                    <div className="table-header-items">
                      <div className="table-item column1">
                        &nbsp;
                      </div>
                      <div className="table-item column2">
                        Motivo de estado
                      </div>
                    </div>
                  </div>
                  {Object.keys(reasons).map((key) => (
                    <div className="table-body" key={Math.random()}>
                      <div className="table-item column1">
                        <CheckBox
                          name={key}
                          onChange={() => checkReason(key)}
                          checked={reasons[key].checked}
                        />
                      </div>
                      <div className="table-item column2">
                        {reasons[key].reason}
                      </div>
                      <div className="table-item column3">
                        {reasons[key].fileName && (
                        <>
                          <span
                            className="file"
                          >
                            {reasons[key].fileName}
                          </span>
                          <span
                            className="deleteIcon"
                            onClick={() => deleteFile()}
                          >
                            <img src={trashIcon} alt="delete" />
                          </span>
                        </>
                        ) }
                      </div>
                    </div>
                  ))}
                </div>
                )}
                {decisiones.evidencia
                && (
                <div className="table-new  table-decisiones uploadfile">
                  <div className="table-header">
                    <div className="table-header-items">
                      <div className="table-item column1">
                        Evidencias
                      </div>
                      <div className="table-item column2">
                        &nbsp;
                      </div>
                    </div>
                  </div>
                  <div className="table-body">
                    <div className="table-item column1">
                      <Select
                        onChange={(e) => onSelectFileType(e)}
                        options={documentTypeOptions}
                        placeholder="Seleccione documento"
                        name="document-type"
                        value={documentTypeSelect}
                        disabled={uploadDocument.name !== ''}
                      />
                    </div>
                    <div className="table-item column2">
                      {uploadDocument.name
                        && (
                        <>
                          <span
                            className="file"
                          >
                            {uploadDocument.name}
                          </span>
                          <span
                            className="deleteIcon"
                            onClick={() => deleteFile()}
                          >
                            <img src={trashIcon} alt="delete" />
                          </span>
                        </>
                        )}
                      <div className={classNames({ hidden: uploadDocument.name !== '' })}>
                        <UploadFileIcon
                          icon={addFile}
                          handleFile={(file) => addReasonFile(file)}
                          accept="image/jpeg,image/jpg,image/png,application/pdf"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </Card>
            )}

      <TabFooterSlots
        showSaveButton={false}
        nextButtonText="Finalizar Asesoría"
        nextButtonSize={25}
      >
        <TabFooterSlots.LeftSide>
          <Button
            className="white"
            onClick={() => {
              window.history.back();
            }}
          >
            Regresar
          </Button>
        </TabFooterSlots.LeftSide>
        <TabFooterSlots.RightSide>
          {isReja && showSaveButtons && (
            <>
              <Button
                className="action"
                onClick={() => history.push('/proceso95-5/tramites')}
                disabled={!isReadyToSave}
              >
                Cancelar
              </Button>
              <Button
                disabled={!isReadyToSave}
                onClick={() => setShowSaveModal(true)}
              >
                Guardar
              </Button>
            </>
          )}
        </TabFooterSlots.RightSide>
      </TabFooterSlots>
      <Modal
        show={showSaveModal}
        hideFooter
        onClose={() => setShowSaveModal(false)}
        width="564px"
        padding="30px"
        className="modal-tramite-detail-save"
      >
        <p>¿Estás seguro de aprobar los cambios realizados?</p>
        <div className="buttons">
          {isSaving && <img src={loading} alt="Loading" />}
          {isSaving === false
          && (
          <>
            <Button
              className="action small"
              onClick={() => {
                setShowSaveModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="small"
              onClick={() => {
                save();
              }}
            >
              Aceptar
            </Button>
          </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Details;
