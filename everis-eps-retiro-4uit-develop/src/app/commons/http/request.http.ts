import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RequestModel } from '@aafp/commons/models';
import { environment } from '@aafp/env/environment';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiRequest {
  constructor(private http: HttpClient, private storage: SessionStorage) { }

  register(data: RequestModel | any) {
    const api = `/retiro4uitprod/v1/register4uit/request-4uit`;
    const url = `${environment.url}${api}`;
    const trampa = { cuspp: this.storage.get('cuspp'), amountAvailable: this.storage.get('amountAvailable') };
    const payload = {...data, ...trampa};
    return this.http.post<any>(url, payload, {
      observe: 'body',
      headers: {
        'x-afp-signature': this.storage.get('signature'),
        'Ocp-Apim-Subscription-Key': environment.apiSubscriptionKey
      }
    })
    .pipe(
      tap(response => {
        this.storage.set('requestNumber', response.requestNumber);
      }),
      map((response) => {
        return new RequestModel(response);
      })
    );
  }

}
