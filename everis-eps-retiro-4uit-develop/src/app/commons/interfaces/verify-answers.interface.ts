export  interface IVerifyAnswersRequest {
  documentType: string;
  documentNumber: string;
  birthdate: string;
  // answers: IAnswerOption[];
  answer1: string;
  answer2: string;
  answer3: string;
}

export interface IAnswerOption {
  code: string;
  answer: string;
}
