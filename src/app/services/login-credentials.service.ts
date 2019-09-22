import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginCredentials} from '../classes/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginCredentialsService {
  private url: String;

  constructor(public httpClient: HttpClient) {
    this.url = 'http://localhost:9200/api/login';
  }

  public verifyUser(credentials: LoginCredentials) {
    return this.httpClient.post<LoginCredentials>(this.url + '/verify-user', credentials);
  }
}
