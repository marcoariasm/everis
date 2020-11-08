import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import validado from "shared/images/validado.svg";

import AlertCard from "global/components/v2/Cards/AlertCard";
import DropdownInput from "global/components/v2/DropdownInput";
import Loading from "modules/shared/components/Loading";
import MainTitle from "global/components/v2/Titles/MainTitle";
import MaterialDateInput from "global/components/v2/MaterialDateInput";
import ValidationModal from "global/components/v2/Modals/ValidationModal";
import WhiteCard from "global/components/v2/Cards/WhiteCard";

import { idDocumentOptions } from "modules/shared/constant/ConstantMaterialSelect";
import { Title, GreenTitle, Grid2Col } from "./styles";

import { DashboardService } from "../../services/DashboardService";
import { validateAffiliate } from "modules/Dashboard/services/useValidateAffiliate";

function ValidateAffiliate() {
  const history = useHistory();

  const [formIsValid, setFormValidity] = useState(false);
  const [idDocument, setIdDocument] = useState({});
  const [birthdate, setBirthdate] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [validAffiliate, setValidAffiliate] = useState({ data: {} });
  const [showModal, setShowModal] = useState(false);

  const handleBtnModal = () => {
    history.push("/inicio/nueva-solicitud/afiliado");
  };

  useEffect(() => {
    validateForm();
  }, [idDocument, birthdate]);

  const dashboardService = new DashboardService();
  let fecha = "1965-05-31";
  let doc = "79385432"
  validateAffiliate(fecha, doc);

  const validateForm = async () => {
    if (birthdate.length == 10 && idDocument.inputValue.length >= 8) {
      if (birthdate == "29/05/1973" && idDocument.inputValue == "66666666") {
        //console.log('datos correctos');
        const response = await dashboardService.validateAffiliate();
        setValidAffiliate({ data: response });
        setShowAlert(false);

        setFormValidity(true);
        setTimeout(() => {
          // window.location = '/inicio-cliente';
          setShowModal(true);
        }, 2000);
        return setFormValidity(true);
      } else {
        setShowAlert(true);
      }
    } else {
      setShowAlert(false);
      // console.log("error datos");
      //mostrar card alerta
    }
    setFormValidity(false);
  };

  console.log(validAffiliate);

  // const validateForm = () => {
  //   if (birthdate.length == 10 && idDocument.inputValue.length >= 8) {

  //     if (birthdate == '18/08/1991' && idDocument.inputValue == '12345678'){
  //       //console.log('datos correctos');
  //       setShowAlert(false);
  //       setFormValidity(true);
  //       setTimeout(() =>{
  //         // window.location = '/inicio-cliente';
  //         setShowModal(true);
  //       },2000);
  //       return setFormValidity(true);

  //     } else {
  //       setShowAlert(true);
  //     }

  //   } else {
  //     setShowAlert(false);
  //     // console.log("error datos");
  //     //mostrar card alerta
  //   }
  //   setFormValidity(false);
  // }

  return (
    <>
      <WhiteCard>
        <Title>{"Nueva solicitud de trámite"}</Title>

        <MainTitle title={"Datos del Afiliado"} />

        <GreenTitle>
          {"Indícanos los datos del afiliado para validarlos"}
        </GreenTitle>

        {/* <form> */}
        <Grid2Col>
          <DropdownInput
            onChange={setIdDocument}
            selectOptions={idDocumentOptions}
            placeholder={"Número de documento"}
          />
          <MaterialDateInput
            className="input-date"
            onChange={setBirthdate}
            name={"birthdate"}
            placeholder={"Fecha de nacimiento"}
          />
        </Grid2Col>
        {/* </form> */}

        <Loading text={"Validando..."} hidden={!formIsValid} />

        <AlertCard hidden={!showAlert} />
      </WhiteCard>

      <ValidationModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        affiliate={`${validAffiliate.data.firstName} ${validAffiliate.data.secondName} ${validAffiliate.data.surname} ${validAffiliate.data.motherSurname}`}
        icon={validado}
        handleBtnModal={handleBtnModal}
      />
    </>
  );
}

export default ValidateAffiliate;
