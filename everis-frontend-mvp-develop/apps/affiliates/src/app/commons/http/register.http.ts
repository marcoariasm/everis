import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@affiliates/env/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class HttpRegister {
  // ENDPOINTS
  private url = `${environment.url}/affiliate-request-register/v1/request`;

  constructor(private http: HttpClient) {}

  register(data, signature: string): Observable<any> {
    return this.http
      .post(this.url, data, {
        observe: 'body',
        headers: {
          'x-prima-signature': signature, //,
          // 'Ocp-Apim-Subscription-Key': 'a955a714151d46c5aa60c4b383b9454f'
        },
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
