import { TypeAccesCode } from './modal-reject.model';
import { IAffiliate } from '../interfaces/affiliate.interface';
import { IQuestions } from '../interfaces/questions.interface';
import { IAmount } from '../interfaces/amount.interface';

export class RequestModel {
  documentType?: string;
  documentNumber?: string;
  digit?: string;
  names?: string;
  firstName?: string;
  lastNames?: string;
  secondName?: string;
  birthdate?: string;
  afp?: string;
  accessFlag4Uit?: string;
  cuspp?: string;
  access?: TypeAccesCode;
  signature?: string;
  email?: string;
  mobilePhone?: string;
  bank?: string;
  accountNumber?: string;
  paymentType?: string;
  ubigeo?: string;
  address?: string;
  group?: string;
  positiveBalance?: boolean;
  questions?: IQuestions;
  amountAvailable?: string;
  fundType?: string;
  personId?: string;
  firstLastName?: string;
  secondLastName?: string;
  retentionFlag?: string;
  age?: number;
  filename?: string;
  requestSuccess?: any;
  accountStatusFlag?: string;
  constructor(data?: IAffiliate | IQuestions) {

    if (data) {
      Object.assign(this, data);
      this.setSecondName();
    } else {
      Object.assign(this, {});
    }
  }

  private setSecondName() {
    this.secondName = !this.secondName || this.secondName === '' ? null : this.secondName;
  }
}
