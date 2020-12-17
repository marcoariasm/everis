import React, { useContext, useEffect, useState } from "react";
import AccordionContainer, {
  DoubleLabel,
} from "global/components/v2/Accordion";
import ButtonCard from "global/components/v2/Cards/ButtonCard";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import MainTitle from "global/components/v2/Titles/MainTitle";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import useCategories from "modules/Dashboard/services/useCategories";
import { persons } from "modules/GenericProcedures/core/MockServer/data.json";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../App/pages/MainDashboardLayout";
import SearchBox from "../../components/SearchBox"; // replace
import { DashboardService } from "./../../services/DashboardService";
import {
  CardList,
  ListItem,
  Text,
  textTramitesPersonalesAffiliate,
  textTramitesPersonalesApplicant,
} from "./styles";

const linkTramitesPersonales = {
  link1: "/proceso95-5",
  link2: "/proceso95-5",
  link3: "#",
};

const TramitesPersonales = () => {
  const userContext = useContext(UserContext);
  const tramitesDestacados =
    userContext.usertype === "affiliate"
      ? textTramitesPersonalesAffiliate
      : textTramitesPersonalesApplicant;
  let history = useHistory();
  const [list, setList] = useState({ list: [] });
  const { data: categories } = useCategories();

  const user = persons && persons[0].personalData;

  const toggleProcedure = (idTypeRequest) => {
    history.push(`/nueva-solicitud/tramite/${idTypeRequest}`);
  };

  const dashboardService = new DashboardService();

  const getListProcedures = async () => {
    const response = await dashboardService.getListCategories();
    setList({ list: response });
  };

  const dashboardService2 = new DashboardService();

  const LoginApplicant = async () => {
    const response = await dashboardService2.loginApplicant();
    // setToken({token: response});
  };

  const a = "dummy";

  // console.log(token);

  useEffect(() => {
    // LoginApplicant();
    // setToken({token: dashboardService2.getTokenFromSessionStorage()});
    // getListProcedures();
  }, [a]);

  // console.log(list);

  return (
    <>
      <WhiteCard>
        <Text>
          <span>{tramitesDestacados.content}</span>
        </Text>
        <MainTitle title={tramitesDestacados.title} />

        <TitleGreen text={tramitesDestacados.subtitle1} />
        <Text>
          <span>{tramitesDestacados.content1}</span>
        </Text>

        <CardList>
          <ButtonCard
            link={linkTramitesPersonales.link1}
            imgSrc={tramitesDestacados.src1}
            title={tramitesDestacados.title1}
            text={tramitesDestacados.text1}
            description={tramitesDestacados.description1}
          />
          <ButtonCard
            link={linkTramitesPersonales.link2}
            imgSrc={tramitesDestacados.src2}
            title={tramitesDestacados.title2}
            text={tramitesDestacados.text2}
            description={tramitesDestacados.description2}
          />
          <ButtonCard
            link={linkTramitesPersonales.link3}
            onClick={() => toggleProcedure(35)}
            imgSrc={tramitesDestacados.src3}
            title={tramitesDestacados.title3}
            text={tramitesDestacados.text3}
            description={tramitesDestacados.description3}
          />
        </CardList>

        <TitleGreen text={tramitesDestacados.subtitle2} />
        <Text>
          <span>{tramitesDestacados.content2}</span>
        </Text>

        <SearchBox
          children={
            <React.Fragment>
              {/* inicio de children */}
              {categories &&
                categories
                  .filter((category) => category.typeRequests.length > 0)
                  .map((group, index) => {
                    return (
                      <AccordionContainer
                        key={index}
                        labelComponent={
                          <DoubleLabel
                            title={group.name}
                            subtitle={group.descrption}
                          />
                        }
                      >
                        <ListItem>
                          {group.typeRequests.map((item) => {
                            return (
                              <React.Fragment key={item.idTypeRequest}>
                                <DoubleLabel
                                  title={item.name}
                                  subtitle={
                                    item.description ? item.description : ""
                                  }
                                  selectItem={() =>
                                    history.push(
                                      `/nueva-solicitud/tramite/${item.idTypeRequest}`
                                    )
                                  }
                                />
                                <br />
                              </React.Fragment>
                            );
                          })}
                        </ListItem>
                      </AccordionContainer>
                    );
                  })}
              {/* fin de children */}
            </React.Fragment>
          }
        />
      </WhiteCard>
    </>
  );
};

export default TramitesPersonales;
