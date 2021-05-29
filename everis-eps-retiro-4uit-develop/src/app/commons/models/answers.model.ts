import { IAnswers } from '@aafp/commons/interfaces';

export class RequestAnswersModel {
  flag: string;
  amountAvailable: string;

  constructor(data?: IAnswers) {
    if (data) {
      Object.assign(this, data);
    } else {
      Object.assign(this, {});
    }
  }
}
