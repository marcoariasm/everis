
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
    genderOptions: 4,
    paymentMethod: 7,
    counterBank: 8,
    banks: 9,
    accountTypes: 10,
    currencyType: 11,
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
    if (id === 4 || id === 7) return options.map(option => ({ label: option.value, value: option.id }));
    if (id === 1) {
      return options.map(option => {
        return { textContent: option.value, value: option.id, shortContent: option.abbreviature }
    });
  }
  if(id===10){
    return options.map(option => ({ ...option, textContent: option.value , value: option.abbreviature}));
  }
  if(id===9){
    return options.map(option => ({ ...option, textContent: option.value , value: option.code}));
  }
  if(id===8 || id === 11){
      return options.map(option => ({ ...option, textContent: option.value }));
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
}

export const getBeneficiariesFromUser = async (affiliateId) => {
    try {
        const api = `${process.env.REACT_APP_APPLICANT_API}/affiliate/v1/beneficiary/${affiliateId}`;
        const user = AppSession.get();
        const bearer = 'Bearer ' + user.accessToken;
        const options = {
            headers: { 'Content-Type': 'application/json' , 'Authorization': bearer },
            method: 'GET'
        };
        const response = await fetch(api, options);
        return await response.json();
    } catch (error) {
        console.trace(error);
        return [];
    }
  }