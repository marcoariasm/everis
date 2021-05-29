import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { VerifyModel } from '../models/verify.model';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Injectable({
  providedIn: 'root',
})
export class verifyHTTP {
  private url = `${environment.url}/retiro4uitprod/v1/verification4uit/verificationAfp4uit`;

  constructor(private http: HttpClient, private storage: SessionStorage) {}

  verify(params: any): Observable<VerifyModel> {
    const validationIdentity = this.storage.get('validationIdentity');
    if (validationIdentity === '3') {
      // tslint:disable-next-line: no-string-literal
      params['allowAnswers'] = true;
    }
    return this.http
      .post<VerifyModel>(this.url, params, {
        headers: {
          'x-afp-signature': 'test',
          'Ocp-Apim-Subscription-Key': environment.apiSubscriptionKey
        },
      })
      .pipe(
        map((response: any) => {
          this.storage.clear();
          this.storage.set('cuspp', response.cuspp || '');
          this.storage.set('firstName', response.firstName);
          this.storage.set('amountAvailable', response.amountAvailable.toString());
          this.storage.set('retentionFlag', response.retentionFlag);
          this.storage.set('signature', response.signature);
          return new VerifyModel(response); //Revisar si es necesario mantener el verify Model
        })
      );
  }
}
