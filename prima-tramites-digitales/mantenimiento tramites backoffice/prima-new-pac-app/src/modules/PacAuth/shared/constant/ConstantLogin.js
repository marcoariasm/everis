import { passwordValidation } from "../../core/FormValidations/index";

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
  },
};
