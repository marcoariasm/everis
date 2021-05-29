import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@aafp/env/environment';
import { SessionStorage } from '@ecnf/ng-microkernel/storage';


@Injectable({
  providedIn : 'root'
})
export class OsiptelVerifyService {
  endpoint = `${environment.url}/retiro4uitprod/v1/validation4uit/phone/validate`;

  constructor(private http: HttpClient, private storage: SessionStorage) {}

  verifyPhone(request) {
    const token = this.storage.get('signature');
    return this.http.post(this.endpoint, request, {
      headers: {
        'x-afp-signature': token,
      }
    }).pipe(
      map(res => res)
    );
  }
}
