import {Component, Input, OnInit} from '@angular/core';
import {Router, Routes} from '@angular/router';
import {LoginCredentials} from '../classes/login-credentials';
import {LoginCredentialsService} from '../services/login-credentials.service';
import {AppRoutingModule} from '../app.routing';
import {ProcurementComponent} from '../../pages/procurement/procurement';

@Component({
  selector: 'app-login-credentials',
  templateUrl: './login-credentials.component.html',
  styleUrls: ['./login-credentials.component.css']
})
export class LoginCredentialsComponent implements OnInit {
  loginCredentials: LoginCredentials;
  password: string;
  isUserType: boolean;
  isUsername: boolean;
  isPassword: boolean;
  userPassInvalid: boolean;

  constructor(public loginService: LoginCredentialsService, public router: Router) {
    this.isUsername = false;
    this.isUserType = false;
    this.isPassword = false;
    this.userPassInvalid = false;
  }

  ngOnInit() {
    this.loginCredentials = <LoginCredentials>{};
  }

  login() {
    this.isUserType = this.loginCredentials.userType !== undefined;
    this.isUsername = this.loginCredentials.username !== undefined;
    this.isPassword = this.password !== undefined;

    if (this.isUserType && this.isUsername && this.isPassword) {
      this.loginCredentials.password = "Basic=" + window.btoa(this.password);
      this.loginService.verifyUser(this.loginCredentials).subscribe(data => {
          this.setSessionStorage();
          this.router.navigate(['view-orders']).then(() => {
            document.location.reload();
          });

      }, error => {
        this.userPassInvalid = true;
        this.loginCredentials.userType = '';
        this.loginCredentials.username = '';
        this.password = '';
      });
    }

  }

  setSessionStorage() {
    // alert('inside session');
    sessionStorage.setItem('username', this.loginCredentials.username);
    sessionStorage.setItem('userType', this.loginCredentials.userType);
  }

}
