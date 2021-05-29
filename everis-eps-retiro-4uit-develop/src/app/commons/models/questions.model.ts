import { IQuestions } from '../interfaces/questions.interface';

export class RequestQuestionsModel {
  operationId: string;
  reject: string;
  unanswered: string;
  disapproved: string;
  questions: [];

  constructor(data?: IQuestions) {
    if (data) {
      Object.assign(this, data);
    } else {
      Object.assign(this, {});
    }
  }
}
