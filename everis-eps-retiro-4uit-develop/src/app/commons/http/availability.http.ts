import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestModel } from '../models/request.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Injectable({
  providedIn: 'root'
})
export class Availability {
  private url = `${environment.url}/retiro4uitprod/v2/query4uit/availability4UIT`;

  constructor(private http: HttpClient, private storage: SessionStorage) {}

  query(params, recaptcha): Observable<RequestModel> {
    return this.http.get<RequestModel>(this.url, {
      params,
      headers: {
        'g-recaptcha-response': recaptcha,
        'Ocp-Apim-Subscription-Key': environment.apiSubscriptionKey
      }
    })
      .pipe(
        tap(response => {
          this.storage.clear();
          this.storage.set('signature', response.signature);
          this.storage.set('cuspp', response.cuspp || '');
          this.storage.set('firstName', response.firstName);
          this.storage.set('amountAvailable', response.amountAvailable.toString());
          this.storage.set('retentionFlag', response.retentionFlag);
        }),
        map((response) => {
          return new RequestModel(response);
        })
      );
  }
}
