import { IValidation } from '../interfaces/validation.interface';

export class ValidationModel {
  id: string;
  firstName: string;
  secondName: string;
  fatherLastname: string;
  motherLastname: string;
  documentType: string;
  documentNumber: string;
  email: string;
  phoneNumber: string;
  cellphone: string;
  signature: string;
  telephone: string;
  birthdate: string;
  genre: string;

  constructor(data?: IValidation) {

    if (data) {
      Object.assign(this, data);
    } else {
      Object.assign(this, {});
    }
  }
}
