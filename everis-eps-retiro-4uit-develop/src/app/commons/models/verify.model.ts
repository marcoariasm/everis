import { IVerify } from '../interfaces/verify.interface';

export class VerifyModel {
  result?: string;

  constructor(data?: IVerify) {

    if (data) {
      Object.assign(this, data);
    } else {
      Object.assign(this, {});
    }
  }
}
