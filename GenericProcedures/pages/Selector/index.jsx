import React from "react"

import WhiteCard from "../../components/Cards/WhiteCard"
import MainTitle from "../../components/Titles/MainTitle"
import ContentButton from '../../components/Buttons/ContentButton'

import {
  GridButtons,
} from "./styles"

const textSelector = {
  title: "Trámites Genéricos",
  textButton1: "Con beneficiarios",
  textButton2: "Sin beneficiarios",
}

const linkSelector = {
  linkButton1: "/generic-procedures/list",
  linkButton2: "/generic-procedures/without-beneficiaries",
}

const Selector = () => {
  return (
    <>
      <WhiteCard>
        <MainTitle title={textSelector.title} />

        <GridButtons>

          <ContentButton 
            text={textSelector.textButton1}
            classButton={"btn-actualizar"}
            link={linkSelector.linkButton1} />

          <ContentButton 
            text={textSelector.textButton2}
            classButton={"btn-actualizar"}
            link={linkSelector.linkButton2} />

        </GridButtons>
        
      </WhiteCard>
    </>
  );
}

export default Selector