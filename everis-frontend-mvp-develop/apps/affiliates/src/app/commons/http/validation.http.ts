import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@affiliates/env/environment';
import { ValidationModel } from '@everis-afp-prima/data';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpValidation {
  // ENDPOINTS
  private urlValidation = `${environment.url}/affiliate-validation/v1/validation`;
  private urlQuery= `${environment.url}/affiliate-request-query/v1/query`;

  constructor(private http: HttpClient) { }

  query(data, recaptcha: string): Observable<ValidationModel> {

    delete data.isAffiliate;

    return this.http.post<ValidationModel>(this.urlValidation, data, {
      observe: 'body',
      headers: {
        'g-recaptcha-response': recaptcha
      }
    })
      .pipe(
        map((response) => {
          return new ValidationModel(response);
        })
      );
  }
  requestProcces(data, recaptcha: string): Observable<ValidationModel>{
    return this.http.post<ValidationModel>(this.urlQuery, data, {
      headers: {
        'g-recaptcha-response': recaptcha
      }
    }).pipe(
      map((response) => {
        return new ValidationModel(response);
      })
    );
  }
}
