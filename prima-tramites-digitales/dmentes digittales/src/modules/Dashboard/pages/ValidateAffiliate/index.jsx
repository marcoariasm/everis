import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "modules/App/pages/MainDashboardLayout";

import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import validado from "shared/images/validado.svg";
import { affiliateActions } from "redux/actions/Affiliate";
import AlertCard2 from "global/components/v2/Cards/AlertCard2";
import AlertCard from "global/components/v2/Cards/AlertCard";
import DropdownInput from "global/components/v2/DropdownInput";
import Loading from "global/components/v2/Loading";
import MainTitle from "global/components/v2/Titles/MainTitle";
import MaterialDateInput from "global/components/v2/MaterialDateInput";
import PaymentMethod from "global/components/v2/PaymentMethod"
import ValidationModal from "global/components/v2/Modals/ValidationModal";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import { Title, GreenTitle, Grid2Col } from "./styles";
import { getDocumentList } from "modules/ApplicantAuth/services/index.service";

function ValidateAffiliate() {
  const history = useHistory();
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const affiliateStore = useSelector((state) => state.affiliate);
  const { error, isLoading } = affiliateStore;
  const [idDocumentOptions, setIdDocumentOptions] = useState([]);
  const [idDocument, setIdDocument] = useState({});
  const [documentTypeSelected, setDocumentTypeSelected] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [validAffiliate, setValidAffiliate] = useState({ data: {} });
  const [showModal, setShowModal] = useState(false);
  const [resetInputs, setResetInputs] = useState(0);
  const [selfAffiliate, setSelfAffiliate] = useState(false);

  useEffect(()=>{
    if (idDocument.length >= 8){
      setSelfAffiliate(idDocument === user.documentNumber)
    }
    else
      setSelfAffiliate(false);
  },[idDocument])  

  const handleBtnModal = () => {
    history.push("/inicio/nueva-solicitud/afiliado");
  };

  useEffect(() => {
    validateForm();
  }, [idDocument, birthdate, documentTypeSelected]);

  useEffect(() => {
    getDocumentList()
      .then((response) => {
        setIdDocumentOptions(response);
        dispatch(affiliateActions.restoreEmptyAffiliate());
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    }
    else setShowAlert(false);
  }, [error]);

  useEffect(() => {
    if (!showModal) setResetInputs(Math.random());
  }, [showModal]);

  useEffect(() => {
    if (isLoading) {
      setShowAlert(false);
    } else {
      if (idDocument && birthdate && documentTypeSelected && !error) {
        const { affiliate } = affiliateStore;
        setValidAffiliate({ data: affiliate });
        setShowModal(true);
      }
    }
  }, [isLoading]);

  const documentTypeHandleChange = (values) => {
    setDocumentTypeSelected(values.selectValue);
    setIdDocument(values.inputValue);
  };

  const onCloseModal = () => {
    setShowModal(false);
    // setResetInputs(Math.random());
  }

  const validateForm = async () => {
    if (
      birthdate.length == 10 &&
      idDocument.length >= 8 &&
      !!documentTypeSelected.code
    ) {
      const newdateBirthdate = birthdate.split("/");
      const newBirthdate =
        newdateBirthdate[2] +
        "-" +
        newdateBirthdate[1] +
        "-" +
        newdateBirthdate[0];
      const payload = {
        documentType: documentTypeSelected.code,
        documentNumber: idDocument,
        birthdate: newBirthdate,
      };
      dispatch(affiliateActions.validateAffiliate(payload));
    }
  };

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
          {idDocumentOptions.length > 0 && (
            <DropdownInput
              onChange={documentTypeHandleChange}
              selectOptions={idDocumentOptions}
              placeholder={"Número de documento"}
              reset={resetInputs}
            />
          )}
          <MaterialDateInput
            className="input-date"
            onChange={setBirthdate}
            name={"birthdate"}
            placeholder={"Fecha de nacimiento"}
            reset={resetInputs}
            disabled={selfAffiliate}
          />
        </Grid2Col>
        {/* </form> */}
        {(isLoading || idDocumentOptions.length === 0) && (
          <Loading text={"Validando..."} />
        )}

        <AlertCard hidden={!showAlert} />
        <AlertCard2
          hidden={!selfAffiliate}
          text1={"No puedes hacer un trámite a nombre de tí mismo"}
          text2={""}
          showLink={false}
        />


      </WhiteCard>

      <ValidationModal
        showModal={showModal}
        onClose={onCloseModal}
        affiliate={`${validAffiliate.data.surname?validAffiliate.data.surname:""} ${validAffiliate.data.motherSurname?validAffiliate.data.motherSurname:""} ${validAffiliate.data.firstName?validAffiliate.data.firstName:""} ${validAffiliate.data.secondName?validAffiliate.data.secondName:""}`}
        icon={validado}
        handleBtnModal={handleBtnModal}
      />
    </>
  );
}

export default ValidateAffiliate;
