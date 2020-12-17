import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import orderItems from "modules/procedures/constants/orderItems";
import { getProcedureTypeList } from "modules/procedures/pages/procedure-list/services/settingsFilterService";
import TableListProcedures from "modules/procedures/pages/setting-procedure-list/components/Table/index";
import Pagination from "modules/procedures/pages/setting-procedure-list/components/Pagination/index";
import {
  Filter,
  MaterialInput,
} from "modules/procedures/shared/components/index";
import Button from "global/components/v1/Button/Button";
import "./settingsProcedureList.scss";

const SettingProcedureList = () => {
  const { register } = useForm();
  const history = useHistory();
  const [filterData, setFilterData] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [pageOfItemsInProcess, setPageOfItemsInProcess] = useState([]);

  useEffect(() => {
    getProcedureTypeList()
      .then((response) => {
        const procedures = orderItems(response, "name");
        setFilterData(procedures);
        setDataTable(procedures);
        setPageOfItemsInProcess(procedures.slice(0, 10));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchProcedure = (value) => {
    const updateList = dataTable.filter((item) => {
      const { name } = item;
      return (
        name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .search(
            value
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          ) !== -1
      );
    });
    setPageOfItemsInProcess(updateList);
  };

  const onChangePageInTable = (pageOfItems) => {
    setPageOfItemsInProcess(pageOfItems);
  };

  const handleAddNewProcedure = () => {
    history.push("/tramites/tramites-setting/0");
  };

  return (
    <div>
      <Filter hideFooter heightOnShow="190">
        <Column width="100">
          <MaterialInput
            register={register}
            className="inputSearch"
            name="procedureSearch"
            placeholder="Buscar trámite"
            onChange={searchProcedure}
            type="text"
          />
        </Column>
      </Filter>
      <div className="flex menu-buttons">
        <Column width="40">
          <div className="flex sb">
            <Button
              className="list-procedure-button"
              onClick={handleAddNewProcedure}
            >
              + Añadir trámite
            </Button>
          </div>
        </Column>
        <Column width="60">
          <Pagination items={dataTable} onChangePage={onChangePageInTable} />
        </Column>
      </div>
      <TableListProcedures
        isEmpty={filterData.length === 0}
        filterData={pageOfItemsInProcess}
        dataTable={dataTable}
        setDataTable={setDataTable}
        setPageOfItemsInProcess={setPageOfItemsInProcess}
      />
    </div>
  );
};

export default SettingProcedureList;

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;
