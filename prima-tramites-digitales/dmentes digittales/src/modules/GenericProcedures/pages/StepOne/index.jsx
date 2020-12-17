import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "modules/App/pages/MainDashboardLayout";
import { setComment } from "modules/GenericProcedures/redux/actions/Procedure";
import { setCellphone } from "modules/GenericProcedures/redux/actions/Procedure"

import { Text, ContainerStepper, Email, NormalText } from "./styles.jsx";

import Button from "global/components/v2/Button";
import MainTitle from "global/components/v2/Titles/MainTitle";
import MaterialInput from "global/components/v2/MaterialInput";
import Stepper from "global/components/v2/Stepper";
import TextArea from "global/components/v2/TextArea/TextArea";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import { TwoColumnsContainer } from "global/components/v2/UtilityComponents";

const stepsSimpleProcedure = [
  {
    label: "Detalle del trámite",
    status: "active",
  },
  {
    label: "Adjunta documentos",
    status: "",
  },
];

const stepsProcedureWithBeneficiaries = [
  {
    label: "Detalle del trámite",
    status: "active",
  },
  {
    label: "Beneficiarios",
    status: "",
  },
  {
    label: "Adjunta documentos",
    status: "",
  },
];

const StepOne = () => {
  const user = React.useContext(UserContext);
  let dispatch = useDispatch();
  let comment = useSelector((state) => state.procedure.comment);
  let configuration = useSelector((state) => state.procedure.configuration);

  const history = useHistory();
  const [textAreaValue, setTextAreaValue] = useState(false);
  const [cell, setCell] = useState("");

  const { id } = useParams();
  // console.log(`tramite id es: ${id}`);

  const saveDetailSimple = () => {
    dispatch(setCellphone(cell));
    dispatch(setComment(`${textAreaValue}`));
    history.push(`/nueva-solicitud/tramite/${id}/paso-dos`);
  };

  const saveDetailBeneficiary = () => {
    dispatch(setCellphone(cell));
    dispatch(setComment(`${textAreaValue}`));
    history.push(`/nueva-solicitud/tramite/${id}/registrar-beneficiarios`);
  };


  return (
    <WhiteCard>
      <Text>
        <span>{"Nueva solicitud de trámite"}</span>
      </Text>
      <MainTitle title={configuration.name} />

      <ContainerStepper>
        <Stepper
          stepList={
            configuration.inBeneficiary == "1"
              ? stepsProcedureWithBeneficiaries
              : stepsSimpleProcedure
          }
        />
      </ContainerStepper>

      <TitleGreen text={"Confirma tus datos de contacto"} />
      <TwoColumnsContainer paddingBottom={"2em"} paddingTop={"1.5em"}>
        {user.email ? (
          <Email>{user.email}</Email>
        ) : (
          <Email>correo@correo.com</Email>
        )}
        <MaterialInput
          capitalizeInput={false}
          onChange={setCell}
          // register={register({ required: true })}
          name={"cellphone"}
          placeholder={"Teléfono móvil"}
          // reset={resetInputs}
          value={user.cellphone}
        />
      </TwoColumnsContainer>

      <TitleGreen
        text={"Queremos brindarte una respuesta rápida a tu solicitud"}
      />
      <NormalText>
        <span>
          {
            "Por ello es importante que nos comentes toda la información que consideres que podría agilizar el proceso."
          }
        </span>
      </NormalText>

      <TextArea
        onChange={setTextAreaValue}
        label={"Detalle del trámite"}
        value={textAreaValue}
      />

      <div className="alignCenterVertically">
        {configuration.inBeneficiary == "1" ? (
          <Button
            onClick={saveDetailBeneficiary}
            className="buttonRegularResponsive primary-btn"
            disabled={!textAreaValue}
          >
            Continuar
          </Button>
        ) : (
          <Button
            onClick={saveDetailSimple}
            className="buttonRegularResponsive primary-btn"
            disabled={!textAreaValue}
          >
            Continuar
          </Button>
        )}
      </div>
    </WhiteCard>
  );
};

export default StepOne;
