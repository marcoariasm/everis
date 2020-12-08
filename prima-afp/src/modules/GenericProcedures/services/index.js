
import {
    documentOptions,
    conditionOptions,
    genderOptions,
    relationshipOptions
} from 'modules/shared/constant/ConstantMaterialSelect';
import SharedModule from 'modules/shared/index';

const {
  libs: { AppSession, ServiceFetcher },
} = SharedModule;


const genericFormError = {
  beneficiary: 'Disculpe el inconveniente. Hubo un problema al intentar agregar un nuevo beneficiario, intente nuevamente.'
}

export const selectType = {
    documentOptions: 1,
    relationshipOptions: 3,
    conditionOptions: 5,
    genderOptions: 4
}

export const defaultSelects = {
    1: documentOptions,
    2: relationshipOptions,
    5: conditionOptions,
    4: genderOptions
}

export const manageError = (response, defaultMessage = '') => {
    if (response && !response.errorMessage) return response;
    return { errorMessage: defaultMessage };
}


export const manageBeneficiaryError = (response, defaultMessage = '') => {
    if (response && response.beneficiaryId) return response;
    if (response && response.errorMessage) return { 
        errorMessage: `${response.errorMessage}`
    };
    return { errorMessage: defaultMessage };
}

const parseOptions = (options, id) => {
    if (id === 4) return options.map(option => ({ label: option.value, value: option.id }));
    if (id === 1) {
      return options.map(option => {
        return { textContent: option.value, value: option.id, shortContent: option.abbreviature }
    });
  }
  return options.map(option => ({ textContent: option.value, value: option.id }));
  
}

export const getSelectOptions = async (selectId) => {
    try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/parameter/v1?idTypeParameter=${selectId}`;
        const user = AppSession.get();
        const bearer = 'Bearer ' + user.accessToken;
        const options = {
            headers: { 'Content-Type': 'application/json' , 'Authorization': bearer },
            method: 'GET'
        };
        const response = await fetch(api, options);
        const optionsResponse = await response.json();
        return parseOptions(optionsResponse, selectId);
    } catch (error) {
        console.trace(error);
        return parseOptions(defaultSelects[selectId], selectId);
    }
  }

  export const addBeneficiary = async(payload) => {
  try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/affiliate/v1/beneficiary`;
        const user = AppSession.get();
        const bearer = 'Bearer ' + user.accessToken;
        const options = {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': bearer
            },
            method: 'POST',
            body: JSON.stringify(payload)
        };
        const response = await fetch(api, options);
        const beneficiaryResponse = await response.json();
        return manageBeneficiaryError(beneficiaryResponse, genericFormError.beneficiary);
    } catch (error) {
        console.trace(error);
        return manageBeneficiaryError(null, genericFormError.beneficiary);
    }
// return manageError(null, genericFormError.beneficiary);
}

// export const activateAccount = async (token) => {
//     try {
//         const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/activate`;
//         const bearer = 'Bearer ' + token;
//         const options = {
//             headers: { 'Content-Type': 'application/json'},
//             method: 'POST',
//             body: JSON.stringify({ token })
//         };
//         const response = await fetch(api, options);
//         const activateAccountResponse = await response.json();
//         return manageError(activateAccountResponse, genericErrors.accountActivation);
//     } catch (error) {
//         console.trace(error);
//         return manageError(null, genericErrors.accountActivation);
//     }
//   }

//   export const recoverAccountRequest = async (payload) => {
//     try {
//         const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/password/recover/`;
//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload)
//         };
//         const response = await fetch(api, options);
//         const recoverAccountResponse = await response.json();
//         return manageError(recoverAccountResponse, genericErrors.recoverAccount);
//     } catch (error) {
//         console.trace(error);
//         return manageError(null, genericErrors.recoverAccount);
//     }
//   }

//   export const getDocumentList = async() => {
//     try {
//         const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/document/v1`;
//         const completeRegistryService = await fetch(api);
//         const response = await completeRegistryService.json();
//         return response.map(item => (
//         { 
//             ...item,
//             textContent: item.value,
//             value: item.id,
//             shortContent: item.abbreviature
//         }
//             ));
//     } catch (error) {
//         console.trace(error);
//         return idDocumentOptions;
//     }
// }

//   export const getUser = async (session) => {
//       try {
//         const api = `${process.env.REACT_APP_APPLICANT_API}/v1/me`;
//         const bearer = 'Bearer ' + session.accessToken;
//         const options = {
//             headers: { 'Content-Type': 'application/json' , 'Authorization': bearer },
//             method: 'GET'
//         };
//         const userResponse = await fetch(api, options);
//         const user = await userResponse.json();
//         return manageError(user, genericErrors.login);
//     } catch (error) {
//         console.trace(error);
//         return manageError(null, genericErrors.login);
//     }
//   }


// export const completeRegistration = async(payload, idApplicant, accessToken) => {
//     try {
//         const bearer = 'Bearer ' + accessToken;
//         const options = {
//             headers: { 'Content-Type': 'application/json' , 'Authorization': bearer },
//             method: 'PUT',
//             body: JSON.stringify({ ...payload, idApplicant })
//         };
//         const api = `${process.env.REACT_APP_APPLICANT_API}/applicant/v1/${idApplicant}`;
//         const registryService = await fetch(api, options);
//         const response = await registryService.json();
//         return manageError(response, genericErrors.completeRegistration);
//     } catch (error) {
//         console.trace(error);
//         return manageError(null, genericErrors.completeRegistration);
//     }
// }

// export const updatePassword = async(updateToken, payload) => {
//     try {
//         const options = {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             method: 'PUT',
//             body: JSON.stringify({ token: updateToken, ...payload })
//         };
//         const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/password/change/`;
//         const updatePasswordService = await fetch(api, options);
//         const response = await updatePasswordService.json();
//         return manageError(response, genericErrors.updatePassword);
//     } catch (error) {
//         console.trace(error);
//         return manageError(null, genericErrors.updatePassword);
//     }
// }


// export const resendVerification = async(payload, idApplicant) => {
//     try {
//         const api = `${process.env.REACT_APP_APPLICANT_API}/excluded/applicant/v1/${idApplicant}/email/`;
//         const options = {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             body: JSON.stringify(payload)
//         };
//         const resendVerifyResponse = await fetch(api, options);
//         const response = await resendVerifyResponse.json();
//         return manageError(response, genericErrors.resendVerify);
//     } catch (error) {
//         console.trace(error);
//         return manageError(null, genericErrors.resendVerify);
//     }
// }

// export const userService = {
//     login
// }
