import React, { useContext, useEffect } from "react";
import AccordionContainer, {
  DoubleLabel,
} from "global/components/v2/Accordion";
import ButtonCard2 from "global/components/v2/Cards/ButtonCard2";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import MainTitle from "global/components/v2/Titles/MainTitle";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import useCategories from "modules/Dashboard/services/useCategories";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserContext } from "../../../App/pages/MainDashboardLayout";
import SearchBox from "../../components/SearchBox"; // replace
import {
  CardList,
  ListItem,
  Text,
  textTramitesPersonalesAffiliate,
  textTramitesPersonalesApplicant,
  AffiliateName,
} from "./styles";
import {prepareCategories} from './functions';


const TramitesPersonales = () => {
  const userContext = useContext(UserContext);
  const affiliateStore = useSelector((state) => state.affiliate);
  const { affiliate } = affiliateStore;
  let history = useHistory();

  const inRepresentative = useSelector((state) =>
    state.affiliate.affiliate ? true : false
  );
  const linkTramitesPersonales =
    userContext.usertype === "affiliate"
      ? inRepresentative
        ? {
          link1: "/nueva-solicitud/tramite/72",
          link2: "/nueva-solicitud/tramite/74",
          link3: "/nueva-solicitud/tramite/10",
          }
        : {
          link1: "/nueva-solicitud/tramite/61",
          link2: "/nueva-solicitud/tramite/62",
          link3: "/nueva-solicitud/tramite/10",
          }
      : {
        link1: "/nueva-solicitud/tramite/72",
        link2: "/nueva-solicitud/tramite/74",
        link3: "/nueva-solicitud/tramite/10",
        };
  const tramitesDestacados =
    userContext.usertype === "affiliate"
      ? inRepresentative
        ? textTramitesPersonalesApplicant
        : textTramitesPersonalesAffiliate
      : textTramitesPersonalesApplicant;
  const { data: categories } = useCategories();

  let categoriesOrdered = prepareCategories(
    categories,
    userContext,
    inRepresentative
  );

  return (
    <>
      <WhiteCard>
        <Text>
          <span>{tramitesDestacados.content}</span>
        </Text>
        <MainTitle title={tramitesDestacados.title} />

        {affiliate && (
          <AffiliateName>
            <span>Apellidos y nombres del afiliado</span>
            <span>
              {`${affiliate.surname ? affiliate.surname : ""} ${
                affiliate.motherSurname ? affiliate.motherSurname : ""
              } ${affiliate.firstName ? affiliate.firstName : ""} ${
                affiliate.secondName ? affiliate.secondName : ""
              } `}
            </span>
          </AffiliateName>
        )}

        <TitleGreen text={tramitesDestacados.subtitle1} />
        <Text>
          <span>{tramitesDestacados.content1}</span>
        </Text>

        <CardList>
          <ButtonCard2
            link={linkTramitesPersonales.link1}
            imgSrc={tramitesDestacados.src1}
            title={tramitesDestacados.title1}
            text={tramitesDestacados.text1}
            description={tramitesDestacados.description1}
          />
          <ButtonCard2
            link={linkTramitesPersonales.link2}
            imgSrc={tramitesDestacados.src2}
            title={tramitesDestacados.title2}
            text={tramitesDestacados.text2}
            description={tramitesDestacados.description2}
          />
          <ButtonCard2
            link={linkTramitesPersonales.link3}
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

        <SearchBox categories={categoriesOrdered} />
        <React.Fragment>
          {categoriesOrdered &&
            categoriesOrdered.map((group, index) => {
              return (
                <AccordionContainer
                  key={index}
                  labelComponent={
                    <DoubleLabel
                      title={group.name}
                      subtitle={group.description}
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
                                  `/nueva-solicitud/tramite/${
                                    item.idTypeRequest ? item.idTypeRequest : 0
                                  }`
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
        </React.Fragment>
      </WhiteCard>
    </>
  );
};

export default TramitesPersonales;
