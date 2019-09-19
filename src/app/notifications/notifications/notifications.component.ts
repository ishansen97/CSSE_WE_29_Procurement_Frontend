import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../classes/notification';

declare var $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[];
  selectedNotification: Notification;
  newNotificationCount: Number;

  constructor(private notificationService: NotificationService) {
    this.selectedNotification = <Notification>{};
    this.newNotificationCount = 0;
  }

  ngOnInit() {
    this.getAllNotifications();
  }

  getAllNotifications() {
    this.notificationService.findAll().subscribe(notification => {
      this.notifications = notification;
      this.notifications.forEach(notification => {
        if (!notification.read) {
          this.newNotificationCount = Number(this.newNotificationCount) + 1;
        }
      });
    });
  }

  showModal(notification: Notification) {
    $('#showNotification').modal('show');
    this.selectedNotification = notification;
  }

  readNotification() {
    console.log('_id: ' + this.selectedNotification._id);
    console.log('not_id: ' + this.selectedNotification.notificationId);
    console.log('message: ' + this.selectedNotification.message);
    console.log('read: ' + this.selectedNotification.read);

    this.selectedNotification.read = true;

    this.notificationService.readNotification(this.selectedNotification).subscribe(result => {
      if (result) {
        setTimeout(() => {
          $('#showNotification').modal('hide');
        }, 1000);
        document.location.reload();
      }
    });
  }

}
