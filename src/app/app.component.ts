import {Component, OnInit} from '@angular/core';
import {Notification} from './classes/notification';
import {NotificationService} from './services/notification.service';
import {LoginCredentials} from './classes/login-credentials';
import {LoginCredentialsService} from './services/login-credentials.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'csse-we29-frontend';
  notifications: Array<Notification>;
  newNotificationCount: Number;
  loginCredentials: LoginCredentials;
  password: string;
  isUserType: boolean;
  isUsername: boolean;
  isPassword: boolean;
  isLoggedIn: boolean;
  username: string;
  userType: string;

  constructor(private notificationService: NotificationService, public loginService: LoginCredentialsService, public router: Router) {
    this.newNotificationCount = 0;
    this.notifications = [];
    this.isUsername = false;
    this.isUserType = false;
    this.isPassword = false;
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.getAllNotifications();
    this.loginCredentials = <LoginCredentials>{};
    this.username = sessionStorage.getItem('username');
    this.userType = sessionStorage.getItem('userType');
    this.isLoggedIn = this.username !== null;

  }

  getAllNotifications() {
    this.notificationService.findAll().subscribe(notification => {
      this.notifications = notification;
      this.notifications.forEach(notification => {
        if (!notification.read && (notification.receiverType === this.userType)) {
          this.newNotificationCount = Number(this.newNotificationCount) + 1;
        }
      });
    });

  }

  /*login() {
    this.isUserType = this.loginCredentials.userType !== undefined;
    this.isUsername = this.loginCredentials.username !== undefined;
    this.isPassword = this.password !== undefined;

    if (this.isUserType && this.isUsername && this.isPassword) {
      this.loginCredentials.password = "Basic=" + window.btoa(this.password);
      this.loginService.verifyUser(this.loginCredentials).subscribe(data => {
        if (data) {
          this.isLoggedIn = true;
          this.router.navigate(['view-orders']);
        } else if (!data) {
          alert('you are not a user');
        }
      });
    }
  }*/

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
