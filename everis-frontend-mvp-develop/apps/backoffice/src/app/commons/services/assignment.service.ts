import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpAssignmentService {
  // ENDPOINTS
  private url = `${environment.url}/backoffice-request-assignment/v1/assignment`;
  private user = JSON.parse(sessionStorage.getItem('currentUser'))
  constructor(private http: HttpClient) {}

  assign(params): Observable<any> {

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
