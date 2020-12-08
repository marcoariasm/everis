import loginResponse from './jsons/res-login.json';
import updateEmailResponse from './jsons/res-update-email.json';
import updatePasswordResponse from './jsons/res-update-password.json';
import updateUserResponse from './jsons/res-update.json';
import registerResponse from './jsons/res-register.json';
import recoverAccountResponse from './jsons/res-recover-account.json';
import Persistence from './persistence';
import { idDocumentOptions } from 'modules/shared/constant/ConstantMaterialSelect';
import SharedModule from 'modules/shared/index';

const {
  libs: { AppSession, ServiceFetcher },
} = SharedModule;


export const genericErrors = {
  login: 'Disculpe el inconveniente. Hubo un error al iniciar sesion, intente nuevamente.',
  signup: 'Disculpe el inconveniente. Hubo un error al crear su cuenta, intente nuevamente.',
  accountActivation: 'Disculpe el inconveniente. Hubo un error al activar la cuenta, intente nuevamente.',
  recoverAccount: 'Disculpe el inconveniente. Hubo un error al enviar sus datos, intente nuevamente.',
  completeRegistration: 'Disculpe el inconveniente. Hubo un error al enviar sus datos, intente nuevamente.',
  updatePassword: 'Disculpe el inconveniente. Hubo un problema al intentar actualizar su contraseña, intente nuevamente.',
  resendVerify: 'Disculpe el inconveniente. No se pudo reenviar el correo de verificación, intente nuevamente.',
  incorrectUser: 'El número de tu documento de identidad y/o clave web es incorrecto. Por favor, intenta nuevamente.',
  alreadyRegistered: 'Este usuario ya esta registrado. Para acceder a su cuenta inicie sesión.',
  invalidToken: 'Token inválido',
  invalidTimeToken: 'Token vencido',
  errorValidatingToken: 'Lo sentimos, estámos trabajando para solucionar el inconveniente.'
}

export const manageError = (response, defaultMessage = '') => {
    if (response && !response.errorMessage) return response;
    if (response.errorMessage === 'Applicant not found') return { errorMessage: genericErrors.incorrectUser };
    if (response.errorMessage === "THE APPLICANT'S DNI ALREADY REGISTERD.") return { errorMessage: genericErrors.alreadyRegistered };
    if (response.errorMessage === 'INVALID TIME TOKEN.') return { errorMessage: genericErrors.invalidTimeToken };
    if (response.errorMessage === 'INVALID TOKEN.') return { errorMessage: genericErrors.invalidToken };
    if (response.errorMessage === genericErrors.errorValidatingToken) return { errorMessage: genericErrors.errorValidatingToken };
    return { errorMessage: defaultMessage };
}

export const login = async (payload) => {
    try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/auth/login`;
        const options = {
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({...payload })
        };
        const response = await fetch(api, options);
        const loginResponse = await response.json();
        return manageError(loginResponse, genericErrors.login);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.login);
    }
  }

  export const createAccount = async(payload) => {
  try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/register`;
        const options = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        };
        const response = await fetch(api, options);
        const signupResponse = await response.json();
        return manageError(signupResponse, genericErrors.signup);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.signup);
    }
}

export const activateAccount = async (token) => {
    try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/activate`;
        const bearer = 'Bearer ' + token;
        const options = {
            headers: { 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({ token })
        };
        const response = await fetch(api, options);
        const activateAccountResponse = await response.json();
        return manageError(activateAccountResponse, genericErrors.accountActivation);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.accountActivation);
    }
  }

  export const recoverAccountRequest = async (payload) => {
    try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/password/recover/`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const response = await fetch(api, options);
        const recoverAccountResponse = await response.json();
        return manageError(recoverAccountResponse, genericErrors.recoverAccount);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.recoverAccount);
    }
  }

  export const getDocumentList = async() => {
    try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/document/v1`;
        const completeRegistryService = await fetch(api);
        const response = await completeRegistryService.json();
        return response.map(item => (
        { 
            ...item,
            textContent: item.value,
            value: item.id,
            shortContent: item.abbreviature
        }
            ));
    } catch (error) {
        console.trace(error);
        return idDocumentOptions;
    }
}

  export const getUser = async (session) => {
      try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/v1/me`;
        const bearer = 'Bearer ' + session.accessToken;
        const options = {
            headers: { 'Content-Type': 'application/json' , 'Authorization': bearer },
            method: 'GET'
        };
        const userResponse = await fetch(api, options);
        const user = await userResponse.json();
        return manageError(user, genericErrors.login);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.login);
    }
  }


export const completeRegistration = async(payload, idApplicant, accessToken) => {
    try {
        const bearer = 'Bearer ' + accessToken;
        const options = {
            headers: { 'Content-Type': 'application/json' , 'Authorization': bearer },
            method: 'PUT',
            body: JSON.stringify({ ...payload, idApplicant })
        };
        const api = `${process.env.REACT_APP_APPLICANT_API}/applicant/v1/${idApplicant}`;
        const registryService = await fetch(api, options);
        const response = await registryService.json();
        return manageError(response, genericErrors.completeRegistration);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.completeRegistration);
    }
}

export const updatePassword = async(updateToken, payload) => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ token: updateToken, ...payload })
        };
        const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/password/change/`;
        const updatePasswordService = await fetch(api, options);
        const response = await updatePasswordService.json();
        return manageError(response, genericErrors.updatePassword);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.updatePassword);
    }
}


export const resendVerification = async(payload, idApplicant) => {
    try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/${idApplicant}/email/`;
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        };
        const resendVerifyResponse = await fetch(api, options);
        const response = await resendVerifyResponse.json();
        return manageError(response, genericErrors.resendVerify);
    } catch (error) {
        console.trace(error);
        return manageError(null, genericErrors.resendVerify);
    }
}

export const userService = {
    login
}
