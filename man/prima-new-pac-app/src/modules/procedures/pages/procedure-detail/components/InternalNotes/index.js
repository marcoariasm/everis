import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import allColors from "global/styles";
import Button from "global/components/v1/Button/Button";
import { ProcedureDetailContext } from "../../../../routes/UserProcedureDetailContext";

import { changeInternalComment, getProcedureDetail } from "../../services";

export const SubTittle = styled.span`
  color: ${allColors.colorOrangeMainActive};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
  display: block;
`;

const TextareaResponse = styled.textarea`
  margin-top: 0.5em;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  width: 100%;
  height: 77px;
  outline: none;
  resize: none;
  color: #696158;
  font-size: 16px;
  font-family: Calibri;
  padding: 7px 2em;
  overflow: auto;
  &::-webkit-input-placeholder {
    color: ${allColors.colorGrayText};
  }
`;
const ContainerButton = styled.div`
  margin-top: 1em;
  > button {
    margin-left: auto;
    width: 136px;
    height: 32px;
    font-family: Calibri;
    font-size: 14px;
    font-weight: bold;
  }
`;
const LabelConfirmation=styled.p`
  font-family: Calibri;
  color:#ff4f00;
  font-size: 14px;
  font-weight: bold;
  align-content:center;
`;


const InternalNotes = ({ idExecutive }) => {
  const [currenNote, setcurrenNote] = useState("");
  const { procedureDetail, setProcedureDetail } = useContext(
    ProcedureDetailContext
  );
  const [status,setStatus]=useState(false);

  const getDetailProcedure = () => {
    getProcedureDetail(procedureDetail.idRequest)
      .then((response) => setProcedureDetail(response))
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  useEffect(() => {
    if (procedureDetail && Object.values(procedureDetail).length > 0) {
      !!procedureDetail.commentInternal &&
        setcurrenNote(procedureDetail.commentInternal);
    }
  }, [procedureDetail]);

  const changeInternalNotes = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (!!currenNote) {
      const payload = {
        commentInternal: currenNote,
      };

      changeInternalComment(procedureDetail.idRequest, payload)
        .then((response) => {
          setStatus(true);
          getDetailProcedure();
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  };

  const handleNotesChange = (e) => {
    setStatus(false);
    e.preventDefault();
    setcurrenNote(e.target.value.trimStart());
  };

  return (
    <>
      <SubTittle>Nota interna</SubTittle>
      <TextareaResponse
        onChange={handleNotesChange}
        placeholder="Escriba una nota"
        value={currenNote}
      ></TextareaResponse>
      {status&&<LabelConfirmation>Se actualizó la nota correctamente.</LabelConfirmation>}
      {
        <ContainerButton>
          <Button
            disabled={
              procedureDetail.status === "Finalizado" ||
              procedureDetail.status === "Rechazado" ||
              !procedureDetail.executive ||
              status ||
              idExecutive !== procedureDetail.executive.idExecutive
            }
            onClick={(event) => changeInternalNotes(event)}
          >
            Guardar
          </Button>
        </ContainerButton>
      }
    </>
  );
};

export default InternalNotes;
