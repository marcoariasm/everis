import React from 'react';

import ExportExcel from 'modules/shared/utils/ExportExcel';
import ExportIcon from 'shared/images/iconos/export-icon.svg';
import './buttonExport.scss';

const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const index = ({ filterData, name }) => {
  return (
    <div>
      <img src={ExportIcon} alt="export " style={{marginRight: '5px' }} />
      <ExcelFile
        element={(
          <span
            className="export-file"
          >
            Exportar datos
          </span>
        )}
        filename={name() || 'dataExport'}
      >
        <ExcelSheet data={filterData} name="dataExport">
          <ExcelColumn label="CUSPP" value="cusppAffiliate" />
          <ExcelColumn label="Tipo Documento Afiliado" value="documentTypeAffiliate" />
          <ExcelColumn label="N° Doc. Identidad Afiliado" value="documentNumberAffiliate" />
          <ExcelColumn label="Nombre y Apellidos de Afiliado" value="namesAffiliate" />
          <ExcelColumn label="Correo Afiliado" value="emailAffiliate" />
          <ExcelColumn label="Actualizacion Correo en la solicitud" value="emailRequest" />
          <ExcelColumn label="Actualizacion Celular en la solicitud" value="cellphoneRequest" />
          <ExcelColumn label="Tipo Doc. Solicitante" value="documentTypeApplicant" />
          <ExcelColumn label="Número de Doc. Solicitante" value="documentNumberApplicant" />
          <ExcelColumn label="Nombre y Apellidos de Solicitante" value="namesApplicant" />
          <ExcelColumn label="Correo de Solicitante" value="emailApplicant" />
          <ExcelColumn label="Trámite" value="typeRequest" />
          <ExcelColumn label="Fecha de Registro" value="dateRegister" />
          <ExcelColumn label="Estado del trámite" value="status" />
          <ExcelColumn label="Motivo" value="reason" />
          <ExcelColumn label="Nombres y Apellido de ejecutivo(a)" value="namesExecutive" />
          <ExcelColumn label="Fecha de Asignación" value="dateAssignment" />
          <ExcelColumn label="Fecha de Actualizacion" value="dateUpdated" />
        </ExcelSheet>
      </ExcelFile>
    </div>
  )
}

export default index

