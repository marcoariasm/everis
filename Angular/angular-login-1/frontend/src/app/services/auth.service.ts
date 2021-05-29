import { Injectable } from '@angular/core';
import { IUser } from '../auth/models/user';
import { IJwtResponse } from '../auth/models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string = '';
  constructor(private httpClient: HttpClient) {
  }

  register(user: IUser): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: IJwtResponse) => {
          // guardar token
          console.log('register res ->', res);
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        }
      ))
  }

  login(user: IUser): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: IJwtResponse) => {
          // guardar token
          console.log('login res ->', res);
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        }
      ))
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPRIE_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPRIE_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")!;
    }
    return this.token;
  }

}
