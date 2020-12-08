import React, { useEffect, useState, useContext } from "react";
import {
  getProcedureListAffiliate,
  getProcedureListApplicant,
  getProcedureListRepresentative,
  getStatesForTypeProcedure,
} from "../../services";
import Tabs from "global/components/v2/Tabs/Tabs";
import Header from "modules/shared/components/Header";
import WhiteCard from "modules/shared/components/WhiteCard";
import CardProcedure from "../../components/CardProcedure/CardProcedure";
import Pagination from "../../components/Pagination/Pagination";
import EmptySection from "../../components/EmptySection/EmptySection";
import { Link, useRouteMatch } from "react-router-dom";
import { Title } from "./styles";
import { ProcedureDetailContext } from "modules/ConsultationProcedures/routes/UserProcedureDetailContext";
import { UserContext } from "../../../App/pages/MainDashboardLayout";

function ConsultationProcedures() {
  const user = useContext(UserContext);
  const { url } = useRouteMatch();
  const [itemsInProcess, setItemInProcess] = useState(null);
  const [itemFinished, setItemFinished] = useState(null);
  const [pageOfItemsInProcess, setPageOfItemsInProcess] = useState([]);
  const [pageOfItemsFinished, setPageOfItemsFinished] = useState([]);
  const { setProcedureDetail, statesTypes, setStatesTypes } = useContext(
    ProcedureDetailContext
  );

  const setListOfRequests = (response) => {
    setItemInProcess(
      response
        .reverse()
        .filter(
          (procedure) =>
            procedure.status !== "Rechazado" &&
            procedure.status !== "Finalizado"
        )
    );
    setItemFinished(
      response
        .reverse()
        .filter(
          (procedure) =>
            procedure.status === "Rechazado" ||
            procedure.status === "Finalizado"
        )
    );
  };

  const getRequetsList = (usertype) => {
    let getListPorceduresEvent;
    let id;
    if (usertype === "applicant") {
      id = user.idApplicant;
      getListPorceduresEvent = getProcedureListApplicant;
    } else {
      id = user.idAffiliate;
      getListPorceduresEvent = url.includes("apoderados")
        ? getProcedureListRepresentative
        : getProcedureListAffiliate;
    }
    getListPorceduresEvent(id)
      .then((response) => setListOfRequests(response))
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  useEffect(() => {
    if (statesTypes.length === 0) {
      getStatesForTypeProcedure().then((response) => {
        setStatesTypes(response);
      });
    }

    if (Object.values(user).length > 0 && !itemsInProcess && !itemFinished) {
      setProcedureDetail({});
      getRequetsList(user.usertype);
    }
  }, []);

  useEffect(() => {
    if (!!itemsInProcess && itemsInProcess.length > 0) {
      setPageOfItemsInProcess(itemsInProcess.slice(0, 5));
    }

    if (!!itemFinished && itemFinished.length > 0) {
      setPageOfItemsFinished(itemFinished.slice(0, 5));
    }
  }, [itemsInProcess, itemFinished]);

  const onChangePageInprocess = (pageOfItems) => {
    setPageOfItemsInProcess(pageOfItems);
  };

  const onChangePageFinished = (pageOfItems) => {
    setPageOfItemsFinished(pageOfItems);
  };

  const CardProcedureComponent = (procedure, index) => {
    const urlRedirect =
      procedure.idTypeRequest === 59
        ? "proceso95-5/validation-prerequisites"
        : `${url}/tramite/${procedure.idRequest}`;

    return (
      <Link key={index} to={urlRedirect}>
        <CardProcedure
          statesTypes={statesTypes}
          userType={user.usertype}
          procedure={procedure}
        />
      </Link>
    );
  };

  return (
    <>
      <Header title="" text="" />
      <WhiteCard>
        <Title className="headerTitleHighligh">
          {url.includes("apoderados")
            ? "Trámites realizados por apoderados"
            : "Estado de mis trámites"}
        </Title>
        {statesTypes.length > 0 && (
          <Tabs>
            <div label="En curso" src="">
              {pageOfItemsInProcess.length > 0 ? (
                <Pagination
                  items={itemsInProcess}
                  onChangePage={onChangePageInprocess}
                >
                  {pageOfItemsInProcess.map((item, i) =>
                    CardProcedureComponent(item, i)
                  )}
                </Pagination>
              ) : (
                <EmptySection />
              )}
            </div>
            <div label="Finalizados" src="">
              {pageOfItemsFinished.length > 0 ? (
                <Pagination
                  isFinished={true}
                  items={itemFinished}
                  onChangePage={onChangePageFinished}
                >
                  {pageOfItemsFinished.map((item, i) =>
                    CardProcedureComponent(item, i)
                  )}
                </Pagination>
              ) : (
                <EmptySection isFinished={true} />
              )}
            </div>
          </Tabs>
        )}
      </WhiteCard>
    </>
  );
}

export default ConsultationProcedures;
