import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

import NewTable from "modules/procedures/shared/components/NewTable";
import Modal from "modules/procedures/pages/setting-procedure-list/components/Modal/index";
import Trash from "shared/images/trash.svg";
import "./table.scss";

const headersTableProcedure = [
  "Trámite",
  "Actualizado por",
  "Fecha última actualización",
  " ",
];

const TableProcedureList = ({
  isEmpty,
  filterData,
  dataTable,
  setDataTable,
  setPageOfItemsInProcess,
}) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState();

  const handleToDetail = (item) => {
    history.push(`/tramites/tramites-setting/${item}`);
  };

  const handleDelete = (item, i) => {
    setItemSelected(item);
    setShowModal(true);
  };

  return (
    <>
      <NewTable
        headers={[...headersTableProcedure]}
        isEmpty={isEmpty}
        frames="8fr 5fr 5fr 3fr"
      >
        {filterData.map((item, i) => (
          <Trow
            className="t-row"
            key={item.idTypeRequest}
            clicked={item.selected}
          >
            <div
              className="jc-start"
              onClick={() => handleToDetail(item.idTypeRequest)}
            >
              {item.name}
            </div>
            <div
              className="jc-start"
              onClick={() => handleToDetail(item.idTypeRequest)}
            >
              {item.userUpdated}
            </div>
            <div
              className="jc-start"
              onClick={() => handleToDetail(item.idTypeRequest)}
            >
              {item.dateUpdated}
            </div>
            <div className="jc-start" onClick={() => handleDelete(item, i)}>
              <img src={Trash} alt="eliminar" />
            </div>
          </Trow>
        ))}
      </NewTable>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        listProcedures={dataTable}
        setDataTable={setDataTable}
        setPageOfItemsInProcess={setPageOfItemsInProcess}
        item={itemSelected}
      />
    </>
  );
};

export default TableProcedureList;

const Trow = styled.div`
  background: ${({ clicked }) => clicked && "#E3E3E3"};
  transition: 0.2s;
`;
