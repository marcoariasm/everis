import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@affiliates/env/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpProcedure {
  // ENDPOINTS
  private url = `${environment.url}/prima-query/v1/query`;

  constructor(private http: HttpClient) { }

  getProcedure(params, recaptcha: string, signature: string): Observable<any> {

    return this.http.get<any>(this.url, {
      params,
      headers: {
        'x-prima-signature': signature// ,
        // 'g-recaptcha-response': recaptcha,
        // 'Ocp-Apim-Subscription-Key': 'a955a714151d46c5aa60c4b383b9454f'
      }
    })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
