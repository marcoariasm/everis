import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpProcedureDetails {
  // ENDPOINTS
  private url = `${environment.url}/backoffice-request-query/v1/backoffice-query`;
  private user = JSON.parse(sessionStorage.getItem('currentUser'))
  constructor(private http: HttpClient) {

  }

  getProcedure(params): Observable<any> {

    return this.http.post<any>(this.url, params,{
      headers: {
        'x-prima-signature': this.user.signature
      }
    })
    .pipe(
      map((response) => {
          return response;
      })
    );
  }
}
