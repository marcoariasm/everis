import Tabs from "global/components/Tabs/Tabs";
import React, { useState } from "react";
import Header from "shared/components/Header";
import WhiteCard from "shared/components/WhiteCard";
import ProcedureData from "shared/constant/ProcedureData";
import { size } from "shared/styles/Responsive";
import styled from "styled-components";
import CardProcedure from "./components/CardProcedure/CardProcedure";
import Pagination from "./components/Pagination/Pagination";
import ProcedureDetail from "./components/ProcedureDetail/ProcedureDetail";

export const Title = styled.h1`
  margin-top: 15px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    text-align: center;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

function ConsultationProcedures() {
  const itemsInProcess = ProcedureData;
  const itemFinished = ProcedureData;

  const [pageIsList, setPageIsList] = useState(true);
  const [currentProcedureName, setCurrentProcedureName] = useState("");
  const [pageOfItemsInProcess, setPageOfItemsInProcess] = useState(
    itemsInProcess.slice(0, 5)
  );
  const [pageOfItemsFinished, setPageOfItemsFinished] = useState(
    itemFinished.slice(0, 5)
  );

  const onChangePageInprocess = (pageOfItems) => {
    setPageOfItemsInProcess(pageOfItems);
  };

  const onChangePageFinished = (pageOfItems) => {
    setPageOfItemsFinished(pageOfItems);
  };

  const selectCardProcedure = (procedureName) => {
    setPageIsList(false);
    setCurrentProcedureName(procedureName);
  };

  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        {pageIsList ? (
          <>
            <Title className="headerTitleHighligh">
              Estado de mis trámites
            </Title>
            <Tabs>
              <div label="En curso" src="">
                <>
                  <Pagination
                    items={itemsInProcess}
                    onChangePage={onChangePageInprocess}
                    currentPage={1}
                  >
                    {pageOfItemsInProcess.map((item, i) => (
                      <CardProcedure
                        key={i}
                        onChange={selectCardProcedure}
                        registrationDay={item.registrationDay}
                        procedureName={item.procedureName}
                        afiliateName={item.afiliateName}
                        procedureState={item.procedureState}
                      />
                    ))}
                  </Pagination>
                </>
              </div>
              <div label="finalizados" src="">
                <>
                  <Pagination
                    items={itemFinished}
                    onChangePage={onChangePageFinished}
                  >
                    {pageOfItemsFinished.map((item, i) => (
                      <CardProcedure
                        key={i}
                        onChange={selectCardProcedure}
                        registrationDay={item.registrationDay}
                        procedureName={item.procedureName}
                        afiliateName={item.afiliateName}
                        procedureState={item.procedureState}
                      />
                    ))}
                  </Pagination>
                </>
              </div>
            </Tabs>
          </>
        ) : (
          <ProcedureDetail procedureName={currentProcedureName} />
        )}
      </WhiteCard>
    </>
  );
}

export default ConsultationProcedures;
