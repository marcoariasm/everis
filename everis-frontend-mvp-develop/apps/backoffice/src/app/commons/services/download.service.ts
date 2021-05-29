import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpFileDownload {
  // ENDPOINTS
  private url = `${environment.url}/backoffice-request-file/v1/backoffice-download`;
  private user = JSON.parse(sessionStorage.getItem('currentUser'));
  constructor(private http: HttpClient) {}

  getFile(params): Observable<any> {
    return this.http
      .post<any>(this.url, params, {
        headers: {
          'x-prima-signature': this.user.signature,
          Accept: 'application/octet-stream'
        },
        responseType: 'blob' as 'json',
      })
      .pipe(
        map((response) => {
          return response
        })
      );
  }
}
