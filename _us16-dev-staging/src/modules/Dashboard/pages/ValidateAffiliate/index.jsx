import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import validado from '../../components/images/validado.svg';

import AlertCard from '../../components/Cards/AlertCard';
import DropdownInput from "modules/shared/components/DropdownInput";
import Loading from "../../components/Loading";
import MainTitle from "../../components/Titles/MainTitle";
import ValidationModal from '../../components/Modals/ValidationModal';
import WhiteCard from '../../components/Cards/WhiteCard';
import MaterialDateInput from 'modules/shared/components/MaterialDateInput';
import { idDocumentOptions } from 'modules/shared/constant/ConstantMaterialSelect';
import { Title, GreenTitle, Grid2Col } from './styles'

function ValidateAffiliate() {
  
  const history = useHistory();

  const [formIsValid, setFormValidity] = useState(false);
  const [idDocument, setIdDocument] = useState({});
  const [birthdate, setBirthdate] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [validAffiliate, setValidAffiliate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleBtnModal = () => {
    history.push('/inicio/nueva-solicitud/afiliado');
  }
  
  useEffect(() => {
    validateForm();
  }, [idDocument]);

  useEffect(() => {
    validateForm();
  }, [birthdate]);

  const validateForm = () => {
    if (birthdate.length == 10 && idDocument.inputValue.length >= 8) {

      if (birthdate == '18/08/1991' && idDocument.inputValue == '12345678'){
        //console.log('datos correctos');
        setShowAlert(false);
        setFormValidity(true);
        setTimeout(() =>{
          // window.location = '/inicio-cliente';
          setShowModal(true);
        },2000);
        return setFormValidity(true);
        
      } else {
        setShowAlert(true);
      }

    } else {
      setShowAlert(false);
      console.log("error datos");
      //mostrar card alerta
    }
    setFormValidity(false);
  }

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
            className='input-date'
            onChange={setBirthdate}
            name={'birthdate'}
            placeholder={"Fecha de nacimiento"}                
            />

        </Grid2Col>
        {/* </form> */}

        <Loading text={"Validando..."} hidden={!formIsValid} />

        <AlertCard hidden={!showAlert}/>

      </WhiteCard>

      <ValidationModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        affiliate={"Roberto Ramírez Ríos"}
        icon={validado}
        handleBtnModal={handleBtnModal}
      />


    </>
  );
};

export default ValidateAffiliate;
