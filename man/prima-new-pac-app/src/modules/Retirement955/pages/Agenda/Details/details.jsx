import React from 'react';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import Header from 'modules/Retirement955/components/Header/Header';
import Card from 'global/components/v1/Card/Card';

import '../detalle.sass';
import TabFooterSlots
  from 'modules/Retirement955/components/TabFooter/TabFooterSlots';
import Button from 'global/components/v1/Button/Button';

import moment from 'moment';
import Modules from 'modules/shared';

import DatosAfiliado from './Components/DatosAfiliado';
import DatosTramite from './Components/DatosTramite';
import ValidacionSunat from './Components/ValidacionSunat';
import ValidacionAsesoria from './Components/ValidacionAsesoria';
import TableDocumentos from '../../../components/Details/TableDocumentos';
import '../../../components/Details/TableDocumentos.sass';

import useFinancialAdviceDetail from '../../../api/useFinancialAdviceDetail';
import loading from '../../../../../shared/images/loading.svg';

const { can } = Modules.libs.Roles;

const startAsesory = 'queryFront.table.detailProcedure.startAsesory';

const Details = () => {
  const { id, cuspp } = useParams();
  const history = useHistory();
  const validations = {
    sunat: {
      status: 'Pendiente',
    },
    asesoria: {
      status: 'Pendiente',
    },
  };
  let financialAdviceDetailState = {};

  const {
    financialAdviceDetail,
    isLoading: financialAdviceDetailLoading,
  } = useFinancialAdviceDetail(id);

  if (financialAdviceDetail) {
    const tmpSUNAT = financialAdviceDetail.validations.find(
      (x) => x.validation === 'SUNAT',
    );
    const tmpContacto = financialAdviceDetail.validations.find(
      (x) => x.validation === 'CONTACTO',
    );
    const tmpDocumento = financialAdviceDetail.validations.find(
      (x) => x.validation === 'DOCUMENTO',
    );

    const legalValue = financialAdviceDetail.statements.find(
      (x) => x.statement === 'LEGAL_PERSON_DECLARATION',
    );

    financialAdviceDetailState = financialAdviceDetail.states.find(
      (x) => x.state === 'IN_PROCESS',
    );

    if (tmpSUNAT && legalValue.accepted) {
      if (tmpSUNAT) {
        validations.sunat = {
          title: 'SUNAT',
          state: tmpSUNAT.pending ? 'Pendiente' : 'Comprobado',
          fecVal: tmpSUNAT.validationDate
            ? moment(tmpSUNAT.validationDate).format('DD/MM/yyyy')
            : null,
        };
      }
    }

    if (tmpDocumento && legalValue.accepted === false) {
      validations.sunat = {
        title: 'Documento',
        state: tmpDocumento.pending ? 'Pendiente' : 'Comprobado',
        fecVal: tmpDocumento.validationDate
          ? moment(tmpDocumento.validationDate).format('DD/MM/yyyy')
          : null,
      };
    }

    if (tmpContacto && financialAdviceDetailState) {
      validations.asesoria = {
        status: tmpContacto.pending === false
          ? 'Aceptado'
          : 'Pendiente',
        fecVal: tmpContacto.validationDate
          ? moment(tmpContacto.validationDate).format('DD/MM/YYYY')
          : '- -',
        advisorId: financialAdviceDetailState ? financialAdviceDetailState.advisorId : null,
        validatorId: tmpContacto.pending === false ? tmpContacto.advisorId : null,
      };
    }

    if (tmpDocumento) {
      validations.documents = {
        noDocumentValidationDate: financialAdviceDetailState
          ? moment(financialAdviceDetailState.date).format('DD/MM/yyyy')
          : '- -',
        validationDate: tmpDocumento.validationDate
          ? moment(tmpDocumento.validationDate).format('DD/MM/yyyy')
          : '- -',
        pending: tmpDocumento.pending === false
          ? 'Comprobado'
          : 'Pendiente',
      };
    }
  }
  const pathList = [
    'Jubilación y/o retiro de hasta el 95.5%', 'Etapa 1 - Asesoria',
  ];

  const isReja = financialAdviceDetail
      && financialAdviceDetail.regime === 'REJA_APPLICABLE';

  const isLegal = financialAdviceDetail
      && financialAdviceDetail.regime === 'LEGAL_AGE';

  const hasLess100 = financialAdviceDetail
      && (financialAdviceDetail.accumulatedFund < 100000);

  return (
    <div
      id="status-page"
      className={classNames({
        'less-100': hasLess100,
        legal: isReja === false,
      })}
    >
      <div className="head-container">
        <div className="head-item">
          <Header title="Detalles del trámite" path={pathList} />
        </div>

        <div className="head-item">
          <div className="tramite-number">
            <p><strong>ID Trámite</strong></p>
            <p>{financialAdviceDetail ? financialAdviceDetail.financialAdviceCode : id}</p>
          </div>
        </div>
      </div>

      <Card>
        <DatosAfiliado
          cuspp={cuspp}
          FAD={financialAdviceDetail}
          FADLoading={financialAdviceDetailLoading}
        />
        <DatosTramite
          FAD={financialAdviceDetail}
          FADLoading={financialAdviceDetailLoading}
          isLegal={isLegal}
        />
        <div className={classNames('bottom', {
          observed: validations.sunat.status === 'Observado'
                || validations.sunat.status === 'Rechazado',
          disabled: hasLess100 && isReja === false,
        })}
        >
          <div className="left">
            <ValidacionSunat validationData={validations.sunat} />
          </div>
          <div className="right">
            <ValidacionAsesoria
              asesoria={validations.asesoria}
              isReja={isReja}
              hasLess100={hasLess100}
              limitDate={financialAdviceDetail ? financialAdviceDetail.limitDate : null}
            />
          </div>
        </div>
        <div className="table-documentos">
          {financialAdviceDetailLoading
            ? <img src={loading} alt="Loading" />
            : (
              <TableDocumentos
                documents={financialAdviceDetail.attachments}
                documentData={validations.documents}
                cuspp={cuspp}
                isReja={isReja}
              />
            )}
        </div>
      </Card>
      <TabFooterSlots
        showSaveButton={false}
      >
        <TabFooterSlots.LeftSide>
          <Button
            className="white"
            onClick={() => {
              let routeReturn = '/proceso95-5/agenda';
              if (cuspp) routeReturn = '/proceso95-5/consulta';
              history.push(routeReturn);
            }}
          >
            Regresar
          </Button>
        </TabFooterSlots.LeftSide>
        <TabFooterSlots.RightSide>
          {(hasLess100 === false && validations.asesoria.status === 'Pendiente') && (
          <Button
            onClick={() => {
              history.push(`/proceso95-5/asesoria/${id}`);
            }}
            disabled={!can(startAsesory)}
          >
            Iniciar asesoria
          </Button>
          )}
        </TabFooterSlots.RightSide>
      </TabFooterSlots>
    </div>
  );
};

export default withRouter(Details);
