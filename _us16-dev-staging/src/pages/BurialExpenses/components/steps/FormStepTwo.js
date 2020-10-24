import Tabs from "global/components/Tabs/Tabs";
import React from "react";
import { burialExpenses } from "shared/constant/BurialExpenses";
import PersonaJuridica from "shared/images/PersonaJuridica.svg";
import PersonaNatural from "shared/images/PersonaNatural.svg";
import NaturalPerson from "../NaturalPerson/NaturalPerson";
import LegalPerson from "../LegalPerson/LegalPerson";

function FormStepTwo() {
  return (
    <Tabs>
      <div label={burialExpenses.stepTwo.firstTab.title} src={PersonaNatural}>
        <NaturalPerson />
      </div>
      <div label={burialExpenses.stepTwo.secondTab.title} src={PersonaJuridica}>
        <LegalPerson />
      </div>
    </Tabs>
  );
}

export default FormStepTwo;
