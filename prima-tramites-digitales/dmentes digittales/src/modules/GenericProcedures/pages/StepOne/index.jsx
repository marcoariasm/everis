import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "modules/App/pages/MainDashboardLayout";
import { setCellphone, setEmail, setComment } from "modules/GenericProcedures/redux/actions/Procedure";

import { Text, ContainerStepper, Email, NormalText } from "./styles.jsx";

import Button from "global/components/v2/Button";
import MainTitle from "global/components/v2/Titles/MainTitle";
import MaterialInput from "global/components/v2/MaterialInput";
import ErrorHandler from "global/components/v2/ErrorHandler";
import Stepper from "global/components/v2/Stepper";
import TextArea from "global/components/v2/TextArea/TextArea";
import TitleGreen from "global/components/v2/Titles/TitleGreen";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import { TwoColumnsContainer } from "global/components/v2/UtilityComponents";
import useProcedureInformation from "modules/GenericProcedures/services/useProcedureInformation.js";
import { useForm } from 'react-hook-form';
import { emailValidations, telephoneValidations } from 'modules/shared/constant/ConstantValidations';

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
  const mainRoute = `/nueva-solicitud/tramite/`;
  const history = useHistory();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [cell, setCell] = useState("");
  const [email, setEmailUser] = useState("");

  const { id } = useParams();
  const { data: configuration } = useProcedureInformation(id);

  const { register, handleSubmit, formState, control, errors } = useForm({
      mode: "onChange",
      defaultValues: { cellphone: user.cellphone, email: user.email }
    });

    const { isValid, touched } = formState;

  const submitForm = (formData) => {
    const nextRoute = configuration.inBeneficiary == "1" ? `${id}/registrar-beneficiarios` : `${id}/paso-dos`;
    dispatch(setCellphone(formData.cellphone));
    dispatch(setEmail(formData.email));
    dispatch(setComment(textAreaValue));
    history.push(`${mainRoute}${nextRoute}`);
  }

  const CellValidAff = useSelector((state) =>
    state.affiliate.affiliate ? state.affiliate.affiliate.cellphone : null
  );

  const EmailValidAff = useSelector((state) =>
    state.procedure.email ? state.procedure.email : null
  );

  const inAffiliate = user.affiliateId?true:false;

  const GetCellFromDB = () =>{
    if (inAffiliate){
      if (CellValidAff === null || EmailValidAff === null){
        setCell(user.cellphone);
        setEmailUser(user.email);
      }
      else {
        setCell(CellValidAff);
        setEmailUser(EmailValidAff);
      }
    }
    else{
      setCell(CellValidAff);
      setEmailUser(EmailValidAff);
    }
  }

  const isValidForm = () => {
    return isValid && textAreaValue && textAreaValue.length;
  }

  useEffect(()=>{
    GetCellFromDB();
  },[cell, email])

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
        <MaterialInput
          name={'email'}
          register={register(emailValidations)}
          placeholder={"Correo"}
          staticError={false}
          type="email"
          error={
            <ErrorHandler
              noMargin={true}
              isTouched={touched['Correo']}
              errors={errors}
              name={'email'}
            />
          }
        />
        <MaterialInput
          name={'cellphone'}
          register={register(telephoneValidations)}
          placeholder={"Teléfono móvil"}
          staticError={false}
          type="number"
          error={
            <ErrorHandler
              noMargin={true}
              isTouched={touched['cellphone']}
              errors={errors}
              name={'cellphone'}
            />
          }
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
          <Button
            onClick={handleSubmit(submitForm)}
            className="buttonRegularResponsive primary-btn"
            disabled={!isValidForm()}
          >
            Continuar
          </Button>
      </div>
    </WhiteCard>
  );
};

export default StepOne;
