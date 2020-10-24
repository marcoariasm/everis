import { AUTH_REQUEST,AUTH_SUCCESS,AUTH_FAILURE,AUTH_LOGOUT,AUTH_LOAD_DOCUMENTS_TYPES } from 'redux/types/Auth'
import {userService} from '../../services/user.service'
export const userActions = {
  login,
  logout,
  loadDocumentsTypes
}

function login(captchaToken, documentTypeSelected, document, password) {
  function request(form) {
    return {type: AUTH_REQUEST, payload:form}
  }

  function success(user) {
    return {type: AUTH_SUCCESS, payload:user}
  }

  function failure(error) {
    return {type: AUTH_FAILURE, payload:error}
  }
  return async (dispatch) => {
    dispatch(request({
      documentTypeSelected,document,password
    }));

    try {
      const user = await userService.login(captchaToken, documentTypeSelected.name, document, password);
      if (user) {
        if(user.errorCode){
          let error = '';
          if(user.errorMessage === "Lo sentimos. Ha ocurrido un error."){
            error = `El número de tu documento de identidad y/o clave web es incorrecto. Por favor, intenta nuevamente`;
          }else{
            error = user.errorMessage;
          }
          dispatch(failure(error));
          return;
        }
        dispatch(success(user));
      }
    } catch (error) {
      dispatch(failure(error.toString()));
      throw new Error(error);
    }
  };
}


function logout() {
  userService.logout()
  return {type: AUTH_LOGOUT}
}

function loadDocumentsTypes(){  
  function setDocumentsTypes(payload){
    return {type:AUTH_LOAD_DOCUMENTS_TYPES, payload};
  }
  return async (dispatch) => {
    const res_documentsTypes = await userService.loadDocumentsTypes();
    dispatch(setDocumentsTypes(res_documentsTypes));
  }
}



