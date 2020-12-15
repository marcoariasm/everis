import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import NewTable from 'modules/Retirement955/components/NewTable';
import Tooltip from 'global/components/v1/Tooltip/Tooltip';
import CheckBox from 'global/components/v1/CheckBox/CheckBox';

import Validar from 'shared/images/iconos/copy.svg';
import ValidarGray from 'shared/images/iconos/copyGray.svg';
import Editar from 'shared/images/iconos/edit.svg';
import EditarGray from 'shared/images/iconos/editGray.svg';

import { noRegister } from 'modules/Retirement955/constants';

import { can } from 'modules/shared/libs/Roles';

import './style.sass';

const headersTramite = [
  'ID trámite',
  'Fecha de solicitud',
  'CUSPP',
  'Apellidos y nombres',
  'Estado del trámite',
  'Canal de atención',
  'Acciones',
];

const viewValidationDocument = 'queryBack.table.validateDocument.viewValidateDocument';
const viewExoneration = 'queryBack.table.viewExoneration';

const Table = ({
  setTable, table, isEmpty, handleShowModal, loading,
}) => {
  const [checkedAll, setCheckedAll] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setCheckedAll(false);
  }, [loading]);

  const handleChangeCheckbox = (e, id) => {
    const { checked } = e.target;
    const newTable = table.map((row) => {
      if (row.idDefault === id && row.financialAdviceCode) {
        row.selected = checked;
      }
      return row;
    });

    setTable(newTable);
  };

  const handleChangeAllCheckbox = (e) => {
    const { checked } = e.target;
    const newTable = table.map((row) => {
      if (row.statusId === 2 || !row.financialAdviceCode) {
        return row;
      }
      row.selected = checked;
      return row;
    });
    setCheckedAll(checked);
    setTable(newTable);
  };

  const checkBoxHeader = (
    <CheckBox
      className="tramites-check"
      label=" "
      name="checked-all"
      id="tramit"
      onChange={handleChangeAllCheckbox}
      checked={checkedAll}
      disabled={loading}
    />
  );

  const handleToDocument = (object) => {
    history.push(`/proceso95-5/tramites/${object.financialAdviceId}`);
  };

  const validateAccess = (item) => noRegister(item) && item.financialAdviceCode;

  return (
    <NewTable
      headers={[...headersTramite, checkBoxHeader]}
      isEmpty={isEmpty}
      loading={loading}
      frames="1.2fr 1.5fr 1.6fr 2.5fr 1fr 1fr 1.5fr 0.5fr"
    >
      {table.map((item, i) => (
        <Trow className="t-row" key={i} clicked={item.selected}>
          <div
            className={`key${item.selected ? '2' : ''} notLink`}
          >
            {item.financialAdviceCode}
          </div>
          <div>{moment(item.registrationDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}</div>
          <div>{item.affiliateId}</div>
          <div className="left">{item.affiliate}</div>
          <div>{item.statusName}</div>
          <div className="capitalize">
            <span>{item.channel}</span>
          </div>
          <div>
            <Tooltip tooltip="Validar Documentos">
              <Image
                select={validateAccess(item)}
                src={item.selected ? ValidarGray : Validar}
                alt="copy"
                srcset=""
                onClick={() => {
                  if (can(viewValidationDocument) && validateAccess(item)) {
                    handleToDocument(item);
                  }
                }}
              />
            </Tooltip>
            <div style={{ width: '24px' }} />
            <Tooltip tooltip="Modificar Datos">
              <Image
                select={validateAccess(item)}
                onClick={() => {
                  if (can(viewExoneration) && validateAccess(item)) {
                    handleShowModal(item);
                  }
                }}
                src={item.selected ? EditarGray : Editar}
                alt="edit"
                srcset=""
              />
            </Tooltip>
          </div>
          <Td>
            <CheckBox
              label=" "
              id={`tramites${i}`}
              disabled={item.statusId === 2}
              name="seleccionar-tramite"
              checked={item.selected}
              className={`tramites-check child ${validateAccess(item) ? '' : 'cursorDefault'}`}
              onChange={(e) => handleChangeCheckbox(e, item.idDefault)}
            />
          </Td>
        </Trow>
      ))}
    </NewTable>
  );
};

export default Table;

const Trow = styled.div`
  background: ${({ clicked }) => clicked && '#E3E3E3'};
  transition: .2s;
`;

const Image = styled.img`
  cursor: ${({ select }) => `${select ? 'pointer' : 'default'}`};
  margin: 0 2px;
  &:nth-child(2) {
    margin: 0 15px;
    @media(max-width : 1366px){
      margin: 0 5px;
    }
  }
`;

const Td = styled.td`
  & > div {
    transform: translateY(-4px);
  }
`;
