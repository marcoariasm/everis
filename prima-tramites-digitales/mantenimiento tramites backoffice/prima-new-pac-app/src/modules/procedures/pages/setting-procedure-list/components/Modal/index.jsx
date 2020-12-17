import React from "react";
import styled from "styled-components";
import $ from "global/styles";

import Button from "global/components/v1/Button/Button";
import { ModalBase } from "modules/procedures/shared/components/index";
import "./modal.scss";
import { disabledProcedure } from "./../../services/index";

const ModalReassignment = ({
  show,
  onClose,
  listProcedures,
  setDataTable,
  setPageOfItemsInProcess,
  item,
}) => {
  const handleDeleteItem = () => {
    disabledProcedure(item.idTypeRequest)
      .then((response) => {
        console.log(response);
        const listTemp = listProcedures.filter(
          (element) => element.idTypeRequest !== item.idTypeRequest
        );
        setDataTable(listTemp);
        setPageOfItemsInProcess(listTemp.slice(0, 10));
      })
      .catch((error) => {
        console.log(error);
      });

    onClose();
  };

  return (
    <ModalBase show={show} onClose={onClose} width="650px">
      <>
        <Title className="modal-title">
          ¡Estás a punto de desactivar el trámite!
        </Title>
        <ContentModal>
          <Column width="100">
            <div className="text-modal">
              No se mostrará la información asociada al trámite seleccionado
              ¿Estás seguro que quieres desactivar?
            </div>
          </Column>
          <Column width="80 flex">
            <div className="flex sa mr-top">
              <Button onClick={onClose} className="button-outline">
                Volver
              </Button>
              <Button onClick={handleDeleteItem}>Sí</Button>
            </div>
          </Column>
        </ContentModal>
      </>
    </ModalBase>
  );
};

export default ModalReassignment;

const Title = styled.div`
  color: ${$.verde};
`;

const ContentModal = styled.div`
  padding: 35px 25px;
`;

const Column = styled.div`
  width: ${({ width }) => `${width}%`};
  margin-right: ${({ mRight }) => `${mRight || 0}px`};
`;
