import { environment } from '@aafp/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SasGeneratorService {
  constructor(private http: HttpClient, private storage: SessionStorage) {}
  getSasToken(format, afp, document, type): Observable<any> {
    // const url = `https://apim-retiroaafp-dev2.azure-api.net/retiro4uitprod/v1/register4uit/upload-token?format=${format}`;
    const api = `/retiro4uitprod/v1/register4uit/upload-token?format=${format}&afp=${afp}&documentNumber=${document}&documentType=${type}`;
    const url = `${environment.url}${api}`;
    const token = this.storage.get('signature');

    return this.http
      .post<any>(
        url,
        {},
        {
          headers: {
            'x-afp-signature': token,
            Accept: 'text/html, application/xhtml+xml, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          responseType: 'text' as 'json',
        }
      )
      .pipe(map((res) => res));
  }
}
