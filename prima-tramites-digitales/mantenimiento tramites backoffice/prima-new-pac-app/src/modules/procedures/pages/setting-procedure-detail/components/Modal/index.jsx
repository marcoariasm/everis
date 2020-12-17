import React from "react";
import styled from "styled-components";
import $ from "global/styles";

import Button from "global/components/v1/Button/Button";
import { ModalBase } from "modules/procedures/shared/components/index";

const ModalReassignment = ({ show, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const messages = [
    "Se ha creado correctamente el tramite",
    "Tramite actualizado correctamente",
    "Se produjo un error al actualizar el tramite, verifique los campos",
  ];
  return (
    <ModalBase show={show} onClose={onClose} width="650px">
      <>
        <Title className="modal-title">{}</Title>
        <ContentModal>
          <Column width="100">
            <div className="text-modal">{}</div>
          </Column>
          <Column width="80 flex">
            <div className="flex sa mr-top">
              <Button onClick={handleClose}>Aceptar</Button>
            </div>
          </Column>
        </ContentModal>
      </>
    </ModalBase>
  );
};

export default ModalReassignment;
