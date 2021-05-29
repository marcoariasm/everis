import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {tap} from 'rxjs/operators';
import {ITracingDetail} from '@aafp/commons/interfaces/tracing.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiSeguimiento {
  tracingDetail: ITracingDetail = null;
  constructor(private http: HttpClient) {}

  seguimiento(data: any, recaptcha: any) {

    const api = `/retiro4uitprod/v1/tracing4uit/tracing4Uit`;
    const url = `${environment.url}${api}`;

    return this.http.post<any>(url, data, {
      observe: 'body',
      headers: {
        'g-recaptcha-response': recaptcha,
      }
    })
    .pipe(
      tap(response => {
        this.tracingDetail = response;

        return response;
      })
    );
  }
}
