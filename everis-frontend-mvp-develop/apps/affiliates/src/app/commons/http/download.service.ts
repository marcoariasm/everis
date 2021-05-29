import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@affiliates/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpFileDownload {
  // ENDPOINTS
  private url = `${environment.url}/affiliate-request-file/v1/download`;
  constructor(private http: HttpClient) {}

  getFile(params, signature): Observable<any> {
    return this.http
      .post<any>(this.url, params, {
        headers: {
          'x-prima-signature': signature,
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
