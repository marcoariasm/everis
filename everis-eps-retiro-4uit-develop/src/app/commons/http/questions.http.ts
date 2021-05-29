import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RequestModel, RequestQuestionsModel } from '@aafp/commons/models';
import { IQuestions } from '@aafp/commons/interfaces';
import { environment } from '@aafp/env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiQuestions {
  constructor(private http: HttpClient) { }

  requestQuestions(data: RequestModel, signature: string = '') {
    const api = `/retiro4uitprod/v1/verify-identity/questions`;
    const url = `${environment.url}${api}`;

    const { documentNumber = '', documentType = '', birthdate = '' } = data || {};
    const params = new HttpParams()
      .set('documentNumber', documentNumber)
      .set('documentType', documentType)
      .set('birthdate', birthdate);

    return this.http.get(url, {
      observe: 'body',
      headers: {
        'x-afp-signature': signature,
        'Ocp-Apim-Subscription-Key': environment.apiSubscriptionKey
      },
      params
    })
    .pipe(
      map((response: IQuestions) => {

        return new RequestQuestionsModel(response);
      })
    );
  }

}
