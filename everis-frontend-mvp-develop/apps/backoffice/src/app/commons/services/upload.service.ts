import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpFileUploadService {
  // ENDPOINTS
  private url = `${environment.url}/affiliate-request-file/v1/upload`;
  private user = JSON.parse(sessionStorage.getItem('currentUser'));
  constructor(private http: HttpClient) {}

  sendFile(params, signature): Observable<any> {
    return this.http
      .post<any>(this.url, params, {
        headers: {
          'x-prima-signature': this.user.signature,
        },
      })
      .pipe(
        map((response) => {
          return response
        })
      );
  }
}
