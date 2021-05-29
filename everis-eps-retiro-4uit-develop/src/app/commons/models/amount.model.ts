import { IAmount } from '../interfaces/amount.interface';

export class RequestAmountModel {
  amountAvailable: string;

  constructor(data?: IAmount) {
    if (data) {
      Object.assign(this, data);
    } else {
      Object.assign(this, {});
    }
  }
}
