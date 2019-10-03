import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginCredentials} from '../classes/login-credentials';
import {Constants} from '../classes/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginCredentialsService {
  private url: String;

  constructor(public httpClient: HttpClient, private constants: Constants ) {
    this.url = constants.URL;
  }

  public verifyUser(credentials: LoginCredentials) {
    return this.httpClient.post<LoginCredentials>(this.url + 'login/verify-user', credentials);
  }
}
