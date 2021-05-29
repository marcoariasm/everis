import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { throwError as _throw } from 'rxjs';
import { IVerifyAnswersRequest } from '../interfaces/verify-answers.interface';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

export interface IError {
  status: number;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiAnswers {

  constructor(
    private http: HttpClient,
    private storage: SessionStorage,
  ) { }

  public sendAnswers(data: IVerifyAnswersRequest) {
    const apiPath = `/retiro4uitprod/v1/verify-identity-answer/answers`;
    const endpoint = `${environment.url}${apiPath}`;
    const answers = [
      { code: 'dateIssue', answer: data.answer1.split('-').reverse().join('/')},
      { code: 'dateExpiration', answer: data.answer2.split('-').reverse().join('/') },
      { code: 'votingGroup', answer: data.answer3 }
    ];

    return this.http.post(endpoint,
      { answers, documentType: data.documentType, documentNumber: data.documentNumber, birthdate: data.birthdate },
      {
      headers: {
        'Ocp-Apim-Subscription-Key': environment.apiSubscriptionKey
      }
    }).pipe(
        map((response: any) => {

          this.storage.clear();
          this.storage.set('signature', response.signature);
          this.storage.set('cuspp', response.cuspp || '');
          this.storage.set('firstName', response.firstName);
          this.storage.set('amountAvailable', response.amountAvailable.toString());
          this.storage.set('retentionFlag', response.retentionFlag);
          return response;
        })
      );
  }

}
