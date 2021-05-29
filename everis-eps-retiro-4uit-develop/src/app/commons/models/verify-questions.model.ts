export interface IQuestion {
  code: string;
  description: string;
}

export class VerifyQuestionsModel {
  questions: [];

  constructor(data?: IQuestion[]) {
    if (data) {
      Object.assign(this, data);
    } else {
      Object.assign(this, {});
    }
  }
}
