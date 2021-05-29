import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpInternalCommunication {
  // ENDPOINTS
  private url = `${environment.url}/backoffice-request/v1/backoffice-request`;
  private user = JSON.parse(sessionStorage.getItem('currentUser'))
  constructor(private http: HttpClient) {}

  sendMessage(params): Observable<any> {

    return this.http.put<any>(this.url, params,{
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
