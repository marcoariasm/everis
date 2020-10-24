import React, { useState, useEffect } from "react";
//swr
import useDocumentType from "modules/Retirement955/api/Login/useDocumentType";

//Components
import { Alert } from "global/components";

//redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "redux/actions/User/user.actions";
import { UI_ClearError, UI_SetError, UI_StartLoading, UI_StopLoading } from "redux/actions/UI";

//images
import loading from "shared/images/spinnerLoading.svg";

import { userService } from "redux/services/user.service";
import MediaQuery from "react-responsive";
import { isEmpty, prop, map, applySpec, head } from "ramda";
import { textLogin } from "shared/constant/ConstLogin";
import Input from "global/components/InputV2";
import DropdownInput from "global/components/DropdownInput";
import Button from "global/components/Button/ButtonNormal/Button";

import LogoWhite from "shared/images/logoprima.svg";
import Slogan from "shared/images/slogan.svg";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  AffiliateForm,
  ContentDataForm,
  ContentForm,
  ContentTitle,
  ContentSubTitle,
  FormContainer,
  Line,
  LogoContainer,
  RecoverAccountSection,
  ButtonContainer,
  UrlStyles,
  SPAN1,
  SPANTITLE,
} from "./styles";
import { AUTH_Success } from "redux/actions/User";

const Login = () => {
  //redux
  const dispatch = useDispatch();
  const storeAuth = useSelector(state=>state.auth);
  const storeUI = useSelector(state=>state.ui);

  //swr
  const {documentType} = useDocumentType({
    authenticated: false,
  });
 

  //custom hooks
  const { executeRecaptcha } = useGoogleReCaptcha();

  //states
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  const [documentTypeSelected, setDocumentTypeSelected] = useState(null);
  const [formError, setFormError] = useState({
    password: false,
    enrollment: false,
  });
  const [selectOptions, setSelectOptions] = useState([
    { name: '', value: '', shortName: '' },
  ]);

  //use effects
  useEffect(() => {
    if(documentType.data){
      const options = documentType.data.map((res)=>{
        return {
          name: res.type,
          value: res.description,
          shortName: res.shortName
        }
      });
      setSelectOptions(options);
    }
  }, [documentType.data]);

  //custom methods
  const handleAuth = async () => {
    //reset error handler
    setFormError({ password: false, enrollment: false });
    const token = await executeRecaptcha("login");

    if (!password || !document) {
      setFormError({ password: true, enrollment: true });
    } else {
      dispatchAuth(
        token,
        documentTypeSelected,
        document,
        password
      );
/*       dispatch(userActions.login(
        token,
        documentTypeSelected,
        document,
        password
      )); */
    }
  };

  const dispatchAuth = async (token, documentTypeSelected, document, password) => {
    dispatch(UI_StartLoading())
    try {
      const user = await userService.login(token, documentTypeSelected.name, document, password);
      dispatch(UI_StopLoading());
      if (user) {
        if(user.errorCode){
          let error = '';
          if(user.errorMessage === "Lo sentimos. Ha ocurrido un error."){
            error = `El número de tu documento de identidad y/o clave web es incorrecto. Por favor, intenta nuevamente`;
          }else{
            error = user.errorMessage;
          }
          dispatch(UI_SetError(error));
        }else{
          dispatch(AUTH_Success(user));
          dispatch(UI_ClearError());
        }
      }
    } catch (error) {
      throw new Error(error);
    }



  }

  const documentNumberhandleChange = (e) => {
    setDocument(e.target.value);
  }
  const documentTypeHandleChange = (e) => {
    setDocumentTypeSelected(e);
  }

  return (
    <>
      <FormContainer>
        <LogoContainer>
          <div>
            <img src={LogoWhite} alt="logo" />
          </div>
          <MediaQuery minDeviceWidth={767}>
            <div style={{ justifySelf: "flex-end" }}>
              <img src={Slogan} alt="slogan" />
            </div>
          </MediaQuery>
        </LogoContainer>
        <ContentForm>
          <ContentDataForm>
            <ContentSubTitle>
              <SPAN1 className="bodyText">{textLogin.subtitle}</SPAN1>
            </ContentSubTitle>
            <ContentTitle>
              <SPANTITLE className="titleOrange">{textLogin.title}</SPANTITLE>
            </ContentTitle>
            <Line />
            <AffiliateForm>
              <DropdownInput
                onChangeInput={documentNumberhandleChange}
                onChangeSelect={documentTypeHandleChange}
                disabledInput={storeUI.loading}
                defaultSelectValue={documentTypeSelected}
                inputValue={document}
                selectOptions={selectOptions}
                placeholder={textLogin.dropdownPlaceholder}
                textError="Ingresa tu número de documento"
                error={formError.enrollment}
              />

              <Input
                label="Contraseña (Clave web)"
                type="password"
                id="pass"
                placeholder={textLogin.passwordPlaceholder}
                name="password"
                theme2={true}
                error={formError.password}
                textError="Ingresa tu contraseña"
                value={password}
                disabled={storeUI.loading}
                onChange={(e) => setPassword(e.target.value)}
              />

              {
                (!storeUI.loading && storeUI?.error) && <Alert type="error" message={storeUI.error} />
              }

              {storeUI.loading ? 
                <img
                  src={loading}
                  alt="Loading"
                  style={{ height:"7rem",margin: " 0 auto", display: "block" }}
                /> :
                <RecoverAccountSection>
                  <div>
                    <UrlStyles
                      className="informationFooterText link"
                      href={textLogin.link1}
                      target="_blank"
                    >
                      {textLogin.forgotPassword}
                    </UrlStyles>
                  </div>
                </RecoverAccountSection>
              }
              
              <ButtonContainer>
                <Button
                  classButton="btn-pagina-principal"
                  widthB="100%"
                  heightB="45px"
                  onClick={handleAuth}
                  disabled={isEmpty(document) || isEmpty(password) || storeUI.loading}
                >
                  Ingresar
                </Button>
              </ButtonContainer>
            </AffiliateForm>
          </ContentDataForm>
        </ContentForm>
      </FormContainer>
    </>
  );
};

export default Login;
