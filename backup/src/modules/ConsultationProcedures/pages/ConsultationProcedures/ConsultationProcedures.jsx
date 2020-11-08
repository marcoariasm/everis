import React, { useEffect, useState, useContext } from "react";
import {
  getProcedureListAffiliate,
  getProcedureListApplicant,
  getProcedureListRepresentative,
} from "../../services";
import Tabs from "global/components/v2/Tabs/Tabs";
import Header from "modules/shared/components/Header";
import WhiteCard from "modules/shared/components/WhiteCard";
import CardProcedure from "../../components/CardProcedure/CardProcedure";
import Pagination from "../../components/Pagination/Pagination";
import EmptySection from "../../components/EmptySection/EmptySection";
import { Link, useRouteMatch } from "react-router-dom";
import { Title } from "./styles";
import { UserContext } from "../../../App/pages/MainDashboardLayout";

function ConsultationProcedures() {
  const user = useContext(UserContext);
  const { url } = useRouteMatch();
  const [itemsInProcess, setItemInProcess] = useState([]);
  const [itemFinished, setItemFinished] = useState([]);
  const [pageOfItemsInProcess, setPageOfItemsInProcess] = useState([]);
  const [pageOfItemsFinished, setPageOfItemsFinished] = useState([]);

  const setListOfRequests = (response) => {
    setItemInProcess(
      response
        .reverse()
        .filter(
          (procedure) =>
            procedure.status !== "REJECTED" && procedure.status !== "FINISHED"
        )
    );
    setItemFinished(
      response
        .reverse()
        .filter(
          (procedure) =>
            procedure.status === "REJECTED" || procedure.status === "FINISHED"
        )
    );
  };

  const getRequetsList = (usertype) => {
    // let getListPorceduresEvent;
    // if (usertype === "applicant") {
    //   getListPorceduresEvent = getProcedureListApplicant;
    // } else {
    // getListPorceduresEvent = url.includes("apoderados")
    //   ? getProcedureListRepresentative
    //   : getProcedureListAffiliate;
    // }
    // getListPorceduresEvent()  descomentar estas lineas cuando haya data en las otras listas
    getProcedureListApplicant()  //eliminar esta linea cuado haya data en las otras lsitas
      .then((response) => setListOfRequests(response))
      .catch((error) => {
        console.log(error)
        alert(error);
      });
  };

  useEffect(() => {
    if (Object.values(user).length > 0) {
      getRequetsList(user.usertype);
    }
  }, []);

  useEffect(() => {
    if (itemsInProcess.length > 0) {
      setPageOfItemsInProcess(itemsInProcess.slice(0, 5));
    }

    if (itemFinished.length > 0) {
      setPageOfItemsFinished(itemFinished.slice(0, 5));
    }
  }, [itemsInProcess, itemFinished]);

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
        <Title className="headerTitleHighligh">
          {" "}
          {url.includes("apoderados")
            ? "Trámites realizados por apoderados"
            : "Estado de mis trámites"}
        </Title>
        <Tabs>
          <div label="En curso" src="">
            {pageOfItemsInProcess.length > 0 ? (
              <Pagination
                items={itemsInProcess}
                onChangePage={onChangePageInprocess}
              >
                {pageOfItemsInProcess.map((item, i) => (
                  <Link key={i} to={`${url}/tramite/${item.idRequest}`}>
                    <CardProcedure
                      registrationDay={item.dateRegister}
                      procedureName={item.nameTypeRequest}
                      afiliateName={
                        url.includes("apoderados")
                          ? item.applicant
                          : item.affiliate
                      }
                      procedureState={item.status}
                    />
                  </Link>
                ))}
              </Pagination>
            ) : (
              <EmptySection />
            )}
          </div>
          <div label="finalizados" src="">
            {pageOfItemsFinished.length > 0 ? (
              <Pagination
                isFinished={true}
                items={itemFinished}
                onChangePage={onChangePageFinished}
              >
                {pageOfItemsFinished.map((item, i) => (
                  <Link key={i} to={`${url}/tramite/${item.idRequest}`}>
                    <CardProcedure
                      registrationDay={item.dateRegister}
                      procedureName={item.nameTypeRequest}
                      afiliateName={
                        url.includes("apoderados")
                          ? item.applicant
                          : item.affiliate
                      }
                      procedureState={item.status}
                    />
                  </Link>
                ))}
              </Pagination>
            ) : (
              <EmptySection isFinished={true} />
            )}
          </div>
        </Tabs>
      </WhiteCard>
    </>
  );
}

export default ConsultationProcedures;
