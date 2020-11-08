import React from "react";
import { Link } from "react-router-dom";

import WhiteCard from "global/components/v2/Cards/WhiteCard";
import MainTitle from "global/components/v2/Titles/MainTitle"
import newApplication2 from "shared/images/newApplication2.svg";
import newApplication1 from "shared/images/newApplication1.svg";

import {
  GridButtons,
  ContentImageCard,
  ImageData,
  ContentData,
} from "./styles";

const textMenu = {
  title: "¿Qué tipo de trámite quisieras realizar?",
  content1: "Trámites personales",
  content2: "Soy el beneficiario o representante / apoderado de un afiliado",
};

const linkMenu = {
  linkButton1: "/inicio/nueva-solicitud/afiliado/",
  linkButton2: "/inicio/validar-afiliado",
};

const Menu = () => {
  return (
    <>
      <WhiteCard>
        <MainTitle title={textMenu.title} />

        <GridButtons>
          <Link to={linkMenu.linkButton1}>
            <ContentImageCard>
              <ImageData>
                <img src={newApplication2} alt={textMenu.content1} />
              </ImageData>
              <ContentData>{textMenu.content1}</ContentData>
            </ContentImageCard>
          </Link>

          <Link to={linkMenu.linkButton2}>
            <ContentImageCard>
              <ImageData>
                <img src={newApplication1} alt={textMenu.content2} />
              </ImageData>
              <ContentData>{textMenu.content2}</ContentData>
            </ContentImageCard>
          </Link>
        </GridButtons>
        
      </WhiteCard>
    </>
  );
};

export default Menu