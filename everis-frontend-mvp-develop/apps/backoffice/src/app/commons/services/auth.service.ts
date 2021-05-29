import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@backoffice/env/environment';
import { IResponseLogin } from '@everis-afp-prima/data';
import { RequestState } from '@backoffice/commons/state/request.state';
import { IAdminUser } from '@everis-afp-prima/data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.url}/backoffice-login/v1/login`;

  constructor(
    private http: HttpClient,
    private requestState: RequestState
  ) {}

  loginUser(data): Observable<any> {
    return this.http.post<any>(this.url, data, {
      observe: 'body',
      headers: {
      }
    })
    .pipe(
      map((response) => response)
    );
  }

  setUser(user, values) {
    const { login } = values;
    user.login = login;
    const user_string = JSON.stringify(user);
    this.requestState.action({ user });
    sessionStorage.setItem('currentUser', user_string);
  }

  getCurrentUser(): IResponseLogin {
    const user_string = sessionStorage.getItem('currentUser');
    const user = JSON.parse(user_string);

    if (this.isAuthenticated(user)) {
      this.requestState.action({ user });
    } else {
      this.requestState.reset();
    }

    return user;
  }

  logoutUser() {
    this.requestState.reset();

    return sessionStorage.removeItem('currentUser');
  }

  private isAuthenticated(userObject: IResponseLogin) {
    if(userObject.signature) {
      return true;
    } else {
      return false;
    }
  }
}
