export const ErrorMessages = {
  verifyYourDocument: "Verifica tu documento o nº de documento",
  verifyYourEmail: "Verifica tu correo electrónico",
  minSize5Characters:
    "Recuerda, tu número de documento debe tener mínimo 5 carácteres",
  maxSize12Characters:
    "Recuerda, tu número de documento debe tener máximo 12 carácteres",
  onlyAlphanumericCharacters: "Sólo se aceptan valores alfanuméricos",
  fixedSize8Characters:
    "Recuerda, tu número de documento debe tener 8 carácteres.",
  includeNumberInPass: "Por favor, incluye números en tu contraseña",
  includeLettersInPass: "Por favor, incluye letras en tu contraseña",
  enterYourDocumentNumber: "Por favor, ingresa tu Nº de documento",
  createPassword: "Por favor, crea una contraseña",
  passwordMaxSize: "Recuerda que tu contraseña debe tener máximo 20 carácteres",
  passwordMinSize:
    "A tu contraseña le hacen falta carácteres, recuerda que debe tener al menos 8.",
  enterYourEmail: "Por favor, ingresa tu correo electrónico",
  emailMaxSize: "Recuerda, tu email debe tener máximo 50 carácteres.",
  includeCharacterOnEmail: "Por favor, incluye un “@“ en el correo electrónico",
  fatherLastnameRequired: "Por favor, ingresa tu apellido paterno",
  motherLastnameRequired: "Por favor, ingresa tu apellido materno",
  firstNameRequired: "Por favor, ingresa tu apellido materno",
  fatherMaxSize:
    "Recuerda, tu apellido paterno debe tener máximo 25 carácteres",
  motherMaxSize:
    "Recuerda, tu apellido materno debe tener máximo 25 carácteres",
  firstNameMaxSize:
    "Recuerda, tu primer nombre debe tener máximo 25 carácteres",
  secondNameMaxSize:
    "Recuerda, tu segundo nombre debe tener máximo 25 carácteres",
  verifyYourFatherSurname: "Verifica tu apellido paterno",
  verifyYourMotherSurname: "Verifica tu apellido materno",
  verifyYourFirstName: "Verifica tu primer nombre",
  verifyYourSecondName: "Verifica tu segundo nombre",
  birthdateRequired: "Por favor, ingresa tu fecha de nacimiento",
  verifyYourMovilPhone: "Verifica tu número de teléfono movil",
  birthdateFixedSize:
    "Recuerda, tu fecha de nacimiento debe tener el siguiente formato dd/mm/yyyy.",
  movilPhoneRequired: "Por favor, ingresa tu número de teléfono móvil",
  movilPhoneFixedSize: "Por favor, completa tu número de teléfono móvil",
};

const detectNumbers = /^[0-9\b]+$/;
const detectSpaces = /\s/;
const detectAlphanumericString = /^[0-9a-zA-Z]+$/;
const detectNumbersInString = /\d/;
const detectLettersInString = /[a-zA-Z]/g;
const sigleSpaceBetweenWords = /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/;
const lettersUmlautApostrophe = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
const detectValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const hasItSpaces = (value) => detectSpaces.test(value);

const areTheyNotNumbers = (value) => !detectNumbers.test(Number(value));

const isItNotAlphanumeric = (value) => !detectAlphanumericString.test(value);

const exceedsMaximumNumberOf = (
  value = "",
  stringToSearch = "0",
  maximumNumber = 7
) => {
  return value.split(stringToSearch).length - 1 > maximumNumber;
};

const getStringLengthPart = (value) => {
  return value.startsWith("N-") ? 2 : value.startsWith("N") ? 1 : 0;
};

export const dniValidation = (value = "") => {
  const generalErrorMessage = ErrorMessages.verifyYourDocument;
  if (areTheyNotNumbers(value)) return generalErrorMessage;
  if (hasItSpaces(value)) return generalErrorMessage;
  if (value.length !== 8) return ErrorMessages.fixedSize8Characters;
  if (exceedsMaximumNumberOf(value)) return generalErrorMessage;
  return true;
};

export const inmigrationCard = (value = "") => {
  const generalErrorMessage = ErrorMessages.verifyYourDocument;
  if (hasItSpaces(value)) return generalErrorMessage;
  let capitalizedText = value.toUpperCase();
  const numberOfCharacters = getStringLengthPart(capitalizedText);
  if (numberOfCharacters) {
    const stringArray = capitalizedText.split("");
    stringArray.splice(0, numberOfCharacters);
    capitalizedText = stringArray.join("");
  }
  if (areTheyNotNumbers(capitalizedText)) return generalErrorMessage;
  if (capitalizedText.length < 5) return ErrorMessages.minSize5Characters;
  return true;
};

export const militaryCard = (value = "") => {
  const generalErrorMessage = ErrorMessages.verifyYourDocument;
  if (hasItSpaces(value)) return generalErrorMessage;
  if (value.length !== 8) return ErrorMessages.fixedSize8Characters;
  return true;
};

export const workingTeenCard = (value = "") => {
  const generalErrorMessage = ErrorMessages.verifyYourDocument;
  if (hasItSpaces(value)) return generalErrorMessage;
  if (value.length > 12) return ErrorMessages.maxSize12Characters;
  if (value.length < 5) return ErrorMessages.minSize5Characters;
  return true;
};

export const passport = (value = "") => {
  if (hasItSpaces(value)) return ErrorMessages.verifyYourDocument;
  if (value.length > 12) return ErrorMessages.maxSize12Characters;
  if (isItNotAlphanumeric(value))
    return ErrorMessages.onlyAlphanumericCharacters;
  return true;
};

export const passwordValidation = (value = "") => {
  if (!detectNumbersInString.test(value))
    return ErrorMessages.includeNumberInPass;
  if (!detectLettersInString.test(value))
    return ErrorMessages.includeLettersInPass;
  if (isItNotAlphanumeric(value))
    return ErrorMessages.onlyAlphanumericCharacters;
  return true;
};

export const fatherSurnameValidation = (value = "") => {
  if (!sigleSpaceBetweenWords.test(value))
    return ErrorMessages.verifyYourFatherSurname;
  if (detectNumbersInString.test(value))
    return ErrorMessages.verifyYourFatherSurname;
  return true;
};

export const motherSurnameValidation = (value = "") => {
  if (!sigleSpaceBetweenWords.test(value))
    return ErrorMessages.verifyYourMotherSurname;
  if (detectNumbersInString.test(value))
    return ErrorMessages.verifyYourMotherSurname;
  return true;
};

export const firstNameValidation = (value = "") => {
  if (!sigleSpaceBetweenWords.test(value))
    return ErrorMessages.verifyYourFirstName;
  if (detectNumbersInString.test(value))
    return ErrorMessages.verifyYourFirstName;
  return true;
};

export const secondNameValidation = (value = "") => {
  if (!value.length) return true;
  if (!sigleSpaceBetweenWords.test(value))
    return ErrorMessages.verifyYourSecondName;
  if (detectNumbersInString.test(value))
    return ErrorMessages.verifyYourSecondName;
  return true;
};

export const movilePhoneValidation = (value = "") => {
  if (hasItSpaces(value)) return ErrorMessages.verifyYourMovilPhone;
  if (areTheyNotNumbers(value)) return ErrorMessages.verifyYourMovilPhone;
  if (value.length !== 9) return ErrorMessages.movilPhoneFixedSize;
  return true;
};

export const emailValidationFunction = (value = "") => {
  const arrobaPosition = value.indexOf("@");
  const validateAt =
    detectAlphanumericString.test(value[arrobaPosition - 1]) ||
    value[arrobaPosition - 1] === "_";
  if (arrobaPosition !== -1 && !validateAt)
    return ErrorMessages.verifyYourEmail;
  if (
    arrobaPosition !== -1 &&
    !detectAlphanumericString.test(value[arrobaPosition + 1])
  )
    return ErrorMessages.verifyYourEmail;
  if (arrobaPosition === -1) return ErrorMessages.includeCharacterOnEmail;
  if (value.indexOf("Ñ") > -1) return ErrorMessages.verifyYourEmail;
  if (
    !detectAlphanumericString.test(value[0]) ||
    !detectAlphanumericString.test(value[value.length - 1])
  )
    return ErrorMessages.verifyYourEmail;
  if (!detectValidEmail.test(value)) return ErrorMessages.verifyYourEmail;
  return true;
};

export const documentNumberValidations = {
  "00": dniValidation,
  "01": inmigrationCard,
  "02": militaryCard,
  "03": workingTeenCard,
  "04": passport,
};
