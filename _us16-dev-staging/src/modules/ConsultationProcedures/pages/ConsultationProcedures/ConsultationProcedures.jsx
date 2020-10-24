import React, { useEffect, useState } from "react";
import useProcedureDetailList from "../../services/useProcedureDetailList";
import Tabs from "global/components/Tabs/Tabs";
import Header from "shared/components/Header";
import WhiteCard from "shared/components/WhiteCard";
import CardProcedure from "../../components/CardProcedure/CardProcedure";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";

import { Title } from "./styles";

function ConsultationProcedures() {
  const { isLoading, data } = useProcedureDetailList();
  const procedureList = data ? data : [];

  const [pageOfItemsInProcess, setPageOfItemsInProcess] = useState([]);
  const [pageOfItemsFinished, setPageOfItemsFinished] = useState([]);

  const itemsInProcess = procedureList.filter(
    (procedure) =>
      procedure.status === "IN_PROCESS" || procedure.status === "REGISTERED"
  );

  const itemFinished = procedureList.filter(
    (procedure) =>
      procedure.status === "REJECTED" || procedure.status === "ACCEPTED"
  );

  useEffect(() => {
    if (data && Object.values(data)) {
      setPageOfItemsInProcess(itemsInProcess.slice(0, 5));
      setPageOfItemsFinished(itemFinished.slice(0, 5));
    }
  },[data]);

  const onChangePageInprocess = (pageOfItems) => {
    setPageOfItemsInProcess(pageOfItems);
  };

  const onChangePageFinished = (pageOfItems) => {
    setPageOfItemsFinished(pageOfItems);
  };

  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        <Title className="headerTitleHighligh">Estado de mis trámites</Title>
        <Tabs>
          <div label="En curso" src="">
            {isLoading ? (
              <></>
            ) : (
              <Pagination
                items={itemsInProcess}
                onChangePage={onChangePageInprocess}
                currentPage={1}
              >
                {pageOfItemsInProcess.map((item, i) => (
                  <Link
                    key={i}
                    to={`/tramites-detalle/tramite/${item.idRequest}`}
                  >
                    <CardProcedure
                      registrationDay={item.dateRegister}
                      procedureName={item.nameTypeRequest}
                      afiliateName="ana"
                      procedureState={item.status}
                    />
                  </Link>
                ))}
              </Pagination>
            )}
          </div>
          <div label="finalizados" src="">
            {isLoading ? (
              <></>
            ) : (
              <Pagination
                items={itemFinished}
                onChangePage={onChangePageFinished}
              >
                {pageOfItemsFinished.map((item, i) => (
                  <Link
                    key={i}
                    to={`/tramites-detalle/tramite/${item.idRequest}`}
                  >
                    <CardProcedure
                      registrationDay={item.dateRegister}
                      procedureName={item.nameTypeRequest}
                      afiliateName="ana"
                      procedureState={item.status}
                    />
                  </Link>
                ))}
              </Pagination>
            )}
          </div>
        </Tabs>
      </WhiteCard>
    </>
  );
}

export default ConsultationProcedures;
