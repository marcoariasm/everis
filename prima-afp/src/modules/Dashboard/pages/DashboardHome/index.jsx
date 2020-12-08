import React, { useContext } from "react";
import { propOr } from "ramda";

import iliustracion from "shared/images/iliustracion.svg";
import { PortraitImage, TitleOrange } from "./styles";

import TitleGray from "global/components/v2/Titles/TitleGray";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import { UserContext } from "modules/App/pages/MainDashboardLayout";
import { toCamelCase } from "modules/shared/helpers/HelperForm";
import AffiliateOptions from "modules/Dashboard/components/AffiliateOptions";
import ApplicantOptions from "modules/Dashboard/components/ApplicantOptions";

const textDashboardAffiliate = {
  greeting: "Hola ",
  contentGreeting:
    "Realiza tus trámites desde la comodidad de tu casa de forma ",
  hightlighGreeting: "rápida y fácil",
  responsiveGreeting: "¿En qué podemos ayudarte?",
};

const DashboardHome = () => {
  const user = useContext(UserContext);
  const getFromUser = (field) => propOr("", field, user);

  const name = toCamelCase(getFromUser("firstName"));
  const usertype = getFromUser("usertype");

  return (
    <WhiteCard>
      <PortraitImage>
        <img src={iliustracion}></img>
      </PortraitImage>

      <TitleGray
        user={name}
        text={textDashboardAffiliate.contentGreeting}
        text2={textDashboardAffiliate.hightlighGreeting}
        hideOnMobile={true}
      />

      <TitleOrange>
        <span className="responsiveUser">¡Hola {name}!</span>
        <span className="responsiveGreeting">
          {textDashboardAffiliate.responsiveGreeting}
        </span>
      </TitleOrange>

      {usertype && usertype === "affiliate" ? (
        <AffiliateOptions />
      ) : (
        <ApplicantOptions />
      )}
    </WhiteCard>
  );
};

export default DashboardHome;
