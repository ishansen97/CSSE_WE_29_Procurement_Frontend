import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../classes/notification';
import {PurchaseOrder} from '../../purchase-order';
import {Item} from '../../classes/item';
import {Supplier} from '../../classes/supplier';
import {Router} from '@angular/router';

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
  username: string;
  userType: string;
  publishedDate: string;

  constructor(private notificationService: NotificationService, private router: Router) {
    this.selectedNotification = <Notification>{};
    this.newNotificationCount = 0;
  }

  ngOnInit() {
    this.getAllNotifications();
    this.username = sessionStorage.getItem('username');
    this.userType = sessionStorage.getItem('userType');
    this.selectedNotification.purchaseOrder = <PurchaseOrder>{};
    this.selectedNotification.items = [];
    this.selectedNotification.supplier = <Supplier>{};

    if (this.username === null) {
      this.router.navigate(['login']);
    }

  }

  getAllNotifications() {
    this.notificationService.findAll().subscribe(notification => {
      this.notifications = notification;
      this.notifications.forEach(notification => {
        let parts = [];
        let ordDateParts = [];
        if (!notification.read && (notification.receiverType === this.userType)) {
          this.newNotificationCount = Number(this.newNotificationCount) + 1;
        }

        let date = notification.publishedDate.toString();
        parts = date.split("T");
        this.publishedDate = parts[0] + " " + parts[1].split(".")[0];

        let ordDate = notification.purchaseOrder.ordDate.toString();
        ordDateParts = ordDate.split('T');
        notification.purchaseOrder.ordDate = ordDateParts[0];
      });
    });

  }

  showModal(notification: Notification) {
    $('#showNotification').modal({backdrop: 'static', keyboard: false, show: true});
    this.selectedNotification = notification;
  }

  readNotification() {

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

  validNotification(notification: Notification): boolean {
    return (!notification.read && (notification.receiverType === this.userType));
  }

  viewOrderDetails() {
    $("#viewOrderDetails").modal({backdrop: 'static', keyboard: false, show: true});

  }

}
