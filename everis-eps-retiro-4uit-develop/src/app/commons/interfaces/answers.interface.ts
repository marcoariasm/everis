export  interface IAnswers {
  flag: string;
  amountAvailable?: string;
}

export  interface IAnswersRequest {
  operationId: string;
  birthdate?: string;
  questions: IAnswerOption[];
}

export interface IAnswerOption {
  category: string;
  optionId: string;
  id: string;
  answered?: boolean;
}
