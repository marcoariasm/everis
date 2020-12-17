import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import NewTable from 'modules/procedures/shared/components/NewTable';
import MaterialCheckbox from 'modules/procedures/shared/components/MaterialCheckbox';
import CheckBoxHeader from 'modules/procedures/pages/procedure-list/components/CheckBoxHeader/CheckBoxHeader';

import IconGreen from 'shared/images/iconos/circleGreen.svg';
import IconYellow from 'shared/images/iconos/circleYellow.svg';
import IconRed from 'shared/images/iconos/circleRed.svg';

import { formatDate } from 'modules/shared/utils';
import './table.scss';
import { ROLE_ADMIN, ROLE_SUPERVISOR } from 'modules/procedures/constants/roles';

let dataSelected = [];
const headersTableProcedure = [
  'Fecha de registro',
  'CUSPP',
  'Etapa de trámite',
  'Trámite',
  'Ejecutivo',
  'Estado',
  'Tiempo de atención'
];

const TableListProcedures = (
  {
    setFilterData,
    table,
    handleClickFilter,
    isEmpty,
    filterData,
    setProcedureSelected,
    isLoading,
    updateList
  }) => {
  const rolesUser = JSON.parse(sessionStorage.getItem('roles')).roles;

  const [checkedAll, setCheckedAll] = useState(false);
  const { register, setValue } = useForm();
  const history = useHistory();

  useEffect(() => {
    setCheckedAll(false);
    const newTable = filterData.map(row => {
      row.selected = false;
      return row
    });

    setFilterData(newTable);
  }, [filterData]);

  useEffect(() => {
    if (updateList) {
      filterData.map(row => {
        if (row.selected) {
          row.selected = false;
          setValue(`tramites${row.idRequest}`, false);
        }
      });
    }
  }, [updateList]);

  const handleRoles = (role) => {
    const isRole = rolesUser.filter((item) => item === role)[0];
    return !!isRole;
  };

  const handleChangeCheckbox = (isChecked, id, selected) => {
    let newTable = filterData;
    if (checkedAll) {
      if (isChecked) {
        dataSelected = dataSelected.filter((item) => item.idRequest !== selected.idRequest);
        setProcedureSelected(dataSelected);
      } else {
        dataSelected.push(selected)
        setProcedureSelected([]);
        setProcedureSelected(dataSelected);
      }
    } else {
      newTable = setValueCheckbox(id, isChecked);
      if (isChecked) {
        dataSelected.push(selected)
        setProcedureSelected([]);
        setProcedureSelected(dataSelected);
      } else {
        dataSelected = dataSelected.filter((item) => item.idRequest !== selected.idRequest);
        setProcedureSelected(dataSelected);
      }
    }

    setFilterData(newTable);
  };

  const setValueCheckbox = (id, isChecked) => {
    return filterData.map(row => {
      if (row.idRequest === id) {
        row.selected = isChecked;
        setValue(`tramites${row.idRequest}`, isChecked);
      }
      return row
    });
  }

  const handleChangeAllCheckbox = (e) => {
    const { checked } = e.target;

    const newTable = filterData.map((row) => {
      row.selected = checked;
      return row;
    });

    if (checked) {
      dataSelected = newTable;
      changeStateCheckbox(checked);
      setCheckedAll(checked);

      const dataChecked = dataSelected.map((row) => {
        if (row.selected) {
          return row;
        }
      });
      setProcedureSelected(dataChecked.filter(((item) => item !== undefined)));
    } else {
      dataSelected = []
      changeStateCheckbox(checked);
      setCheckedAll(checked);
      setProcedureSelected(dataSelected);
    }
    setFilterData(newTable);
    setCheckedAll(checked);
  };

  const changeStateCheckbox = (isChecked) => {
    filterData.map((row) => {
      row.selected = isChecked;
      if (row.status === 'Rechazado' || row.status === 'Finalizado') {
        row.selected = false;
        setValue(`tramites${row.idRequest}`, false);
      } else {
        row.selected = isChecked;
        setValue(`tramites${row.idRequest}`, isChecked);
      }
    });
  }

  const getComponentAttentionTime = (item) => {
    switch (item) {
      case 'green':
        return <Image src={IconGreen} alt="proceso"/>
      case 'yellow':
        return <Image src={IconYellow} alt="observado"/>
      case 'red':
        return <Image src={IconRed} alt="observado"/>
    }
  }

  const handleToDocument = (object) => {
    history.push('/tramites/detalles-tramites/' + object.idRequest)
  }

  const checkBoxHeader = (
    <CheckBoxHeader
      className="jc-center checkbox-header"
      label=" "
      id="procedureHeader"
      onChange={handleChangeAllCheckbox}
      checked={checkedAll}
    />
  );

  return (
    <NewTable
      headers={handleRoles(ROLE_ADMIN) || handleRoles(ROLE_SUPERVISOR)
        ? [...headersTableProcedure, checkBoxHeader] : headersTableProcedure}
      isEmpty={isEmpty}
      frames="1.5fr 2fr 1fr 4fr 2.5fr 1.5fr 1.5fr 1fr"
      loading={isLoading}
    >
      {filterData.map((item) => (
        <Trow className="t-row" key={item.idRequest}>
          <div className="jc-start" onClick={() => handleToDocument(item)}>{formatDate(item.dateRegister)}</div>
          <div className="jc-start" onClick={() => handleToDocument(item)}>{item.cusppAffiliate}</div>
          <div className="jc-start" onClick={() => handleToDocument(item)}>{item.typeTask}</div>
          <div className="jc-start" onClick={() => handleToDocument(item)}>{item.typeRequest}</div>
          <div className="jc-start" onClick={() => handleToDocument(item)}>{item.namesExecutive}</div>
          <div className="jc-start" onClick={() => handleToDocument(item)}>{item.status}</div>
          <div onClick={() => handleToDocument(item)}>{getComponentAttentionTime(item.attentionTime)}</div>
          {
            handleRoles(ROLE_ADMIN) || handleRoles(ROLE_SUPERVISOR) ? (
              <Td>
                <MaterialCheckbox
                  name={`tramites${item.idRequest}`}
                  register={register}
                  onChange={(e) => handleChangeCheckbox(e, item.idRequest, item)}
                  disabled={item.status === 'Rechazado' || item.status === 'Finalizado'}
                />
              </Td>
            ) : <></>
          }
        </Trow>
      ))}
    </NewTable>
  )
}

export default TableListProcedures

const Trow = styled.div`
  transition: .2s;
`;

const Image = styled.img`
  cursor: pointer;
  margin: 0 2px;
  &:nth-child(2) {
    margin: 0 15px;
    @media(max-width : 1366px){
      margin: 0 5px;
    }
  }
`;

const Td = styled.div`
  & > div {
    transform: none!important;
  }
`;
