import { ErrorMessages } from '../../../shared/constant/ConstantErrors';

const detectNumbers =  /^[0-9\b]+$/;
const detectSpaces = /\s/;
const detectAlphanumericString = /^[0-9a-zA-Z]+$/;
const detectNumbersInString = /\d/;
const detectLettersInString = /[A-Za-z]/;
const sigleSpaceBetweenWords = /^([ña-Ña-zA-ZÀ-ÿ-Z0-9]+\s)*[ña-Ña-zA-ZÀ-ÿ-Z0-9]+$/;
const lettersUmlautApostrophe = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
const detectValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const hasItSpaces = value => detectSpaces.test(value);

const areTheyNotNumbers = value => !detectNumbers.test(Number(value));

const isItNotAlphanumeric = value => !detectAlphanumericString.test(value);

const exceedsMaximumNumberOf = (value = '', stringToSearch = '0', maximumNumber = 7) => {
    return value.split(stringToSearch).length - 1 > maximumNumber;
}

const getStringLengthPart = value => {
    return value.startsWith('N-') ? 2 : value.startsWith('N') ? 1 : 0;
}

export const dniValidation = (value = '') => {
    const generalErrorMessage = ErrorMessages.verifyYourDocument;
    if (areTheyNotNumbers(value)) return generalErrorMessage;
    if (hasItSpaces(value)) return generalErrorMessage;
    if (value.length !== 8) return ErrorMessages.fixedSize8Characters;
    if (exceedsMaximumNumberOf(value)) return generalErrorMessage;
    return true;
}

export const inmigrationCard = (value = '') => {
    const generalErrorMessage = ErrorMessages.verifyYourDocument;
    if (hasItSpaces(value)) return generalErrorMessage;
    let capitalizedText = value.toUpperCase();
    const numberOfCharacters = getStringLengthPart(capitalizedText);
    if (numberOfCharacters) {
      const stringArray = capitalizedText.split('');
      stringArray.splice(0, numberOfCharacters);
      capitalizedText = stringArray.join('');
    }
    if (areTheyNotNumbers(capitalizedText)) return generalErrorMessage;
    if (capitalizedText.length < 5) return ErrorMessages.minSize5Characters;
    return true;
}

export const militaryCard = (value = '') => {
    const generalErrorMessage = ErrorMessages.verifyYourDocument;
    if (hasItSpaces(value)) return generalErrorMessage;
    if (value.length !== 8) return ErrorMessages.fixedSize8Characters;
    return true;
}

export const workingTeenCard = (value = '') => {
    const generalErrorMessage = ErrorMessages.verifyYourDocument;
    if (hasItSpaces(value)) return generalErrorMessage;
    if (value.length > 12) return ErrorMessages.maxSize12Characters;
    if (value.length < 5) return ErrorMessages.minSize5Characters;
    return true;
  }

export const passport = (value = '') => {
    if (hasItSpaces(value)) return ErrorMessages.verifyYourDocument;
    if (value.length > 12) return ErrorMessages.maxSize12Characters;
    if (isItNotAlphanumeric(value)) return ErrorMessages.onlyAlphanumericCharacters;
    return true;
}

export const passwordValidation = (value = '') => {
  if (isItNotAlphanumeric(value)) return ErrorMessages.onlyAlphanumericCharacters;
  if (!detectNumbersInString.test(value)) return ErrorMessages.includeNumberInPass;
  if (!detectLettersInString.test(value)) return ErrorMessages.includeLettersInPass;
  return true;
}

export const fatherSurnameValidation = (value = '') => {
  if (!sigleSpaceBetweenWords.test(value)) return ErrorMessages.verifyYourFatherSurname;
  if (detectNumbersInString.test(value)) return ErrorMessages.verifyYourFatherSurname;
  return true;
}

export const motherSurnameValidation = (value = '') => {
  if (!sigleSpaceBetweenWords.test(value)) return ErrorMessages.verifyYourMotherSurname;
  if (detectNumbersInString.test(value)) return ErrorMessages.verifyYourMotherSurname;
  return true;
}

export const firstNameValidation = (value = '') => {
  if (!sigleSpaceBetweenWords.test(value)) return ErrorMessages.verifyYourFirstName;
  if (detectNumbersInString.test(value)) return ErrorMessages.verifyYourFirstName;
  return true;
}

export const secondNameValidation = (value = '') => {
  if (!value.length) return true;
  if (!sigleSpaceBetweenWords.test(value)) return ErrorMessages.verifyYourSecondName;
  if (detectNumbersInString.test(value)) return ErrorMessages.verifyYourSecondName;
  return true;
}

export const movilePhoneValidation = (value = '') => {
  if (hasItSpaces(value)) return ErrorMessages.verifyYourMovilPhone;
  if (areTheyNotNumbers(value)) return ErrorMessages.verifyYourMovilPhone;
  if (value.length < 9) return ErrorMessages.movilPhoneFixedSize;
  if (value.length > 9) return ErrorMessages.movilPhoneExceededSize;
  if (value.indexOf(9) !== 0) return ErrorMessages.verifyYourMovilPhone;
  return true;
}

export const telephoneValidation = (value = '') => {
  if (hasItSpaces(value)) return ErrorMessages.verifyYourTelephone;
  if (areTheyNotNumbers(value)) return ErrorMessages.verifyYourTelephone;
  if (value.length < 6) return ErrorMessages.telephoneFixedSize;
  if (value.length > 11) return ErrorMessages.telephoneExceededSize;
  return true;
}

export const emailValidationFunction = (value = '') => {
  const arrobaPosition = value.indexOf('@');
  const validateAt = detectAlphanumericString.test(value[arrobaPosition - 1]) || value[arrobaPosition - 1] === '_';
  if (arrobaPosition !== -1 && !validateAt) return ErrorMessages.verifyYourEmail;
  if (arrobaPosition !== -1 && !detectAlphanumericString.test(value[arrobaPosition + 1])) return ErrorMessages.verifyYourEmail;;
  if (arrobaPosition === -1) return ErrorMessages.includeCharacterOnEmail;
  if (value.indexOf('Ñ') > -1) return ErrorMessages.verifyYourEmail;
  if (!detectAlphanumericString.test(value[0]) || !detectAlphanumericString.test(value[value.length - 1])) return ErrorMessages.verifyYourEmail;
  if(value.indexOf('.') === -1) return ErrorMessages.addPointToEmail;
  if (!detectValidEmail.test(value)) return ErrorMessages.verifyYourEmail;
  return true;
}

export const manageDateValidity = (date = '//') => {
  const arrayDate = date.split('/');
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentDayOfTheMonth = new Date().getDate();

  const getMonthToValidate = () => {
    if (Number(arrayDate[2] )=== currentYear) return currentMonth;
    return 12;
  }

  const getDayToValidate = () => {
    if (Number(arrayDate[2]) === currentYear && Number(arrayDate[1]) === currentMonth) return currentDayOfTheMonth;
    return 31;
  }

   if (Number(arrayDate[2]) > currentYear) return ErrorMessages.invalidDate;
   if (Number(arrayDate[1]) > getMonthToValidate()) return ErrorMessages.invalidDate;
   if (Number(arrayDate[0]) > getDayToValidate()) return ErrorMessages.invalidDate;
   return null;
}

const validationsBankAndAccountType = {
  "7": { AHO: 20, CHK: 20, CMA: 20 },
  "10": { AHO: 14, CHK: 13, CMA: 13 },
  "15": { AHO: 13, CHK: 13, CMA: 13 },
  "79": { AHO: 10, CHK: 10, CMA: 10 },
};

export const accountNumberValidation = (value = "", formPaymentMethod) => {
  const bank = formPaymentMethod.bank;
  const accountType = formPaymentMethod.accountType;
  const validationsForBank = validationsBankAndAccountType[bank];
  const lengthForCurrentBank = validationsForBank[accountType];

  if (hasItSpaces(value)) return ErrorMessages.verifyYourAccountNumber;
  if (areTheyNotNumbers(value)) return ErrorMessages.verifyYourAccountNumber;
  if (value.length < lengthForCurrentBank)
    return ErrorMessages.accountNumberFixedSize;
  if (value.length > lengthForCurrentBank)
    return ErrorMessages.verifyYourAccountNumber;
};

export const interbankAccountValidations = (value = "", isDiferentBank) => {
  if (isDiferentBank && value.length < 20)
    return ErrorMessages.enterYourInterbankAccountNumberMinSize;
  if (value.length > 20) return ErrorMessages.verifyYourInterbankAccountNumber;
};

export const documentNumberValidations = {
  1: dniValidation,
  2: inmigrationCard,
  // 3: militaryCard,
  // 3: workingTeenCard,
  4: passport
}

export const docNumberValidationsAuth = {
  '00': dniValidation,
  '01': inmigrationCard,
  // 3: militaryCard,
  // 3: workingTeenCard,
  '04': passport
}

export const docNumberValidationsBeneficiary = {
  1: dniValidation,
  2: inmigrationCard,
  // 3: militaryCard,
  // 3: workingTeenCard,
  4: passport
}