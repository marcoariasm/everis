import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@affiliates/env/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpFileUploadService {
  // ENDPOINTS
  private url = `${environment.url}/affiliate-request-file/v1/upload`;
  constructor(private http: HttpClient) {}

  sendFile(params, signature): Observable<any> {
    return this.http
      .post<any>(this.url, params, {
        headers: {
          'x-prima-signature': signature,
        },
      })
      .pipe(
        map((response) => {
          return response
        })
      );
  }
}
