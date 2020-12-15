import $ from "global/styles";
import SharedModule from 'modules/shared';
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ProcedureDetailContext } from "../../routes/UserProcedureDetailContext";
import Mesagges from "./components/Messages/Messages";
import { getProcedureDetail } from "./services";
import ProcedureSteps from "./components/ProcedureStep/ProcedureSteps";
import SectionLeft from "./components/SectionLeft/SectionLeft";
import HedaerProcedure from "./components/Header/index";
import InternalNotes from "./components/InternalNotes";
const {useMe} =SharedModule.hooks;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div {
    max-width: 450px;
  }
`;

const Card = styled.div`
  position: relative;
  background: ${$.blanco};
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 100%;
  margin-top: 22px;
  padding: 33px 24px 34px 26px;
`;

const StepsAndInformation = styled.div`
  display: grid;
  column-gap: 3%;
  grid-template-columns: 1fr 1fr;
`;

export const SubTittle = styled.span`
  color: ${$.colorOrangeMainActive};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
  display: block;
`;

const DetailProcedure = ({}) => {
  const { advisor } = useMe();
  let { id } = useParams();
  const { procedureDetail, setProcedureDetail } = useContext(
    ProcedureDetailContext
  );

  useEffect(() => {
    getProcedureDetail(id)
      .then((response) => {
        if (!response.errorCode) {
          setProcedureDetail(response);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    return () => {
      setProcedureDetail({});
    };
  }, []);

  return (
    <>
      <Card>
        <Header>
          <div>
            <span className="label">Datos de tramite</span>
            {procedureDetail && Object.values(procedureDetail).length > 0 && (
              <h2 className="orange">{procedureDetail.typeRequest}</h2>
            )}
          </div>
          {procedureDetail && Object.values(procedureDetail).length > 0 && (
            <HedaerProcedure procedureDetail={procedureDetail} />
          )}
        </Header>
      </Card>
      <StepsAndInformation>
        {procedureDetail && Object.values(procedureDetail).length > 0 && (
          <SectionLeft procedure={procedureDetail} />
        )}
        <div>
          <Card>
            <SubTittle>Estado del trámite</SubTittle>
            {procedureDetail && Object.values(procedureDetail).length > 0 &&  (
              <ProcedureSteps idExecutive={advisor.idExecutive}/>
            )}
          </Card>
          <Card>
            <Mesagges idExecutive={advisor.idExecutive}/>
          </Card>
          <Card>
            <InternalNotes idExecutive={advisor.idExecutive}/>
          </Card>
        </div>
      </StepsAndInformation>
    </>
  );
};

export default DetailProcedure;
