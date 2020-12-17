import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import $ from 'global/styles';

import { TableExecutiveList, Pagination } from 'modules/procedures/pages/executive-list/components/index';
import { Filter, MaterialInput } from 'modules/procedures/shared/components/index';

import useExecutive from 'modules/procedures/pages/executive-list/services/useExecutive';

import './executiveList.scss';

const ExecutiveList = () => {
  const { register } = useForm();
  const [filterData, setFilterData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [pageOfItemsInProcess, setPageOfItemsInProcess] = useState([]);

  const {executives, isLoadingExecutives} = useExecutive();

  useEffect(() => {
    if (executives && Object.values(executives) && dataTable.length === 0) {
      const data = executives.map(item => {
        return item
      })
      setDataTable(data)
      setFilterData(data)
      setPageOfItemsInProcess(data.slice(0, 10));
    }
  }, [executives, dataTable])

  const searchExecutive = (value) => {
    const updateList = dataTable.filter(item => {
      const name = `${item.names} ${item.lastNames}`;
      return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().search(
        value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
      ) !== -1;
    });
    setPageOfItemsInProcess(updateList)
  }

  const onChangePageInTable = (pageOfItems) => {
    setPageOfItemsInProcess(pageOfItems);
  };

  return (
    <div className="card-body">
      <Title>Gestor de ejecutivos</Title>
      <Filter
        hideFooter={true}
        heightOnShow={'190'}
      >
        <Column width="50" mRight="14" className="m-left">
          <MaterialInput
            register={register}
            className="inputRegularResponsiveM"
            name="executiveSearch"
            placeholder="Buscar ejecutivo(a)"
            onChange={searchExecutive}
          />

        </Column>
      </Filter>

      <div className="flex menu-buttons">
        <Column width="100">
          <Pagination
            items={dataTable}
            onChangePage={onChangePageInTable}
          />
        </Column>
      </div>
      <TableExecutiveList
        isEmpty={filterData.length === 0 && !isLoadingExecutives}
        filterData={pageOfItemsInProcess}
      />

      <div className="flex menu-buttons">
        <Column width="100">
          <Pagination
            items={dataTable}
            onChangePage={onChangePageInTable}
          />
        </Column>
      </div>
    </div>
  )
}

export default ExecutiveList;

const Column = styled.div`
  width: ${({width}) => `${width}%`};
  margin-right: ${({mRight}) => `${mRight || 0}px`};
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: ${$.mainColor2};
  margin-top: 15px;
`;

