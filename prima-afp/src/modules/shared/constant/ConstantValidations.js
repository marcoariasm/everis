import {
  documentNumberValidations,
  docNumberValidationsAuth,
  passwordValidation,
  docNumberValidationsBeneficiary,
  emailValidationFunction,
  fatherSurnameValidation,
  motherSurnameValidation,
  firstNameValidation,
  secondNameValidation,
  movilePhoneValidation
} from '../../ApplicantAuth/core/FormValidations';
import { ErrorMessages } from './ConstantErrors';

export const passwordInputValidations = {
  required: ErrorMessages.createPassword,
  validate: passwordValidation,
  maxLength: {
    value: 20,
    message: ErrorMessages.passwordMaxSize,
  },
  minLength: {
    value: 8,
    message: ErrorMessages.passwordMinSize,
  } 
}

export const documentDropdownValidations = (docType) => ({
  required: ErrorMessages.enterYourDocumentNumber,
  validate: documentNumberValidations[docType]
});

export const docDropdownValidationsAuthApi = (docType) => ({
  required: ErrorMessages.enterYourDocumentNumber,
  validate: docNumberValidationsAuth[docType]
});

export const docDropdownValidationsBenefyApi = (docType) => ({
  required: ErrorMessages.enterYourDocumentNumber,
  validate: docNumberValidationsBeneficiary[docType]
});

export const emailValidations = {
  required: ErrorMessages.enterYourEmail,
  maxLength: {
    value: 50,
    message: ErrorMessages.emailMaxSize,
  },
  validate: emailValidationFunction
};

export const fatherValidations = {
  required: ErrorMessages.fatherLastnameRequired,
  maxLength: {
    value: 25,
    message: ErrorMessages.fatherMaxSize,
  },
  validate: fatherSurnameValidation
}

export const motherValidations = {
  required: ErrorMessages.motherLastnameRequired,
  maxLength: {
    value: 25,
    message: ErrorMessages.motherMaxSize,
  },
  validate: motherSurnameValidation
}

export const firstNameValidations = {
  required: ErrorMessages.firstNameRequired,
  maxLength: {
    value: 25,
    message: ErrorMessages.firstNameMaxSize,
  },
  validate: firstNameValidation
}

export const secondNameValidations = {
  maxLength: {
    value: 25,
    message: ErrorMessages.secondNameMaxSize,
  },
  validate: secondNameValidation
}

export const birthdateValidations = {
  required: ErrorMessages.birthdateRequired,
  length: ErrorMessages.birthdateFixedSize
}

export const movilPhoneValidations = {
  required: ErrorMessages.movilPhoneRequired,
  validate: movilePhoneValidation
}