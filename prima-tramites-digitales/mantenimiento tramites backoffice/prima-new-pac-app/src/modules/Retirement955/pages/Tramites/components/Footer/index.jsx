import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import ExportExcel from 'modules/shared/utils/ExportExcel';
import Button from 'global/components/v1/Button/Button';

import Export from 'shared/images/iconos/export.svg';

const { ExcelFile } = ExportExcel;
const { ExcelSheet } = ExportExcel;
const { ExcelColumn } = ExportExcel;

const index = ({ filterData, name, disabledButtons }) => {
  const dataTransform = () => {
    const data = filterData.map((item) => {
      item.registrationDate = moment(item.registrationDate, 'YYYY-MM-DD')
        .format('DD-MM-YYYY');
      return item;
    });
    return data;
  };

  return (
    <div className="flex sb" style={{ height: '45px', margin: '30px 0 64px' }}>
      <div className="flex sb">
        <img src={Export} alt="export " style={{ marginRight: '11px' }} />
        <ExcelFile
          element={(
            <span
              className="label"
              style={{
                fontSize: '16px',
                textDecorationLine: 'underline',
                cursor: 'pointer',
              }}
            >
              Exportar Excel
            </span>
            )}
          filename={name() || 'report_procedures'}
        >
          <ExcelSheet data={dataTransform} name="report_procedures">
            <ExcelColumn label="ID trámite" value="financialAdviceCode" />
            <ExcelColumn label="Fecha de solicitud" value="registrationDate" />
            <ExcelColumn label="CUSPP" value="affiliateId" />
            <ExcelColumn label="Apellidos y nombres" value="affiliate" />
            <ExcelColumn label="Estado del trámite" value="statusName" />
            <ExcelColumn label="Canal de atención" value="channel" />
          </ExcelSheet>
        </ExcelFile>
      </div>
      <Buttons>
        <Button
          className="action"
          disabled={disabledButtons}
        >
          Rechazar
        </Button>
        <Button
          disabled={disabledButtons}
        >
          Aprobar
        </Button>
      </Buttons>
    </div>
  );
};

export default index;

const Buttons = styled.div`
  display: flex;
  & > button:last-child {
    margin-left: 40px;
  }
`;
