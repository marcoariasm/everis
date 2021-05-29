import { TypeAccesCode } from '../models/modal-reject.model';
import { IQuestions } from '../interfaces/questions.interface';

export interface IAffiliate {
  documentType?: string;
  documentNumber?: string;
  digit?: string;
  names?: string;
  lastNames?: string;
  birthdate?: string;
  afp?: string;
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
  maxAmount?: number;
  questions?: IQuestions;
  amountAvailable?: string;
  amountWithdraw?: string;
  flow?: string;
  subflow?: string;
}
