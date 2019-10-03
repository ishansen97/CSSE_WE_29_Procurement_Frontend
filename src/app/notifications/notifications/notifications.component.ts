import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../classes/notification';
import {PurchaseOrder} from '../../purchase-order';

import {Supplier} from '../../classes/supplier';
import {Item} from '../../classes/item';

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

  id: string;
  notificationId: number;
  message: string;
  purchaseOrder: PurchaseOrder;
  items: Array<Item>;
  supplier: Supplier;
  read: boolean;
  receiverType: string;
  // publishedDate: Date;
  readDate: Date;



  constructor(private notificationService: NotificationService) {
    this.selectedNotification = <Notification>{};
    this.newNotificationCount = 0;
  }

  ngOnInit() {
    this.getAllNotifications();
    this.username = sessionStorage.getItem('username');
    this.userType = sessionStorage.getItem('userType');
    this.selectedNotification.purchaseOrder = <PurchaseOrder>{};

  }

  getAllNotifications() {
    this.notificationService.findAll().subscribe(notification => {
      this.notifications = notification;
      this.notifications.forEach(notification => {
        let parts = [];
        if (!notification.read && (notification.receiverType === this.userType)) {
          this.newNotificationCount = Number(this.newNotificationCount) + 1;
        }

        let date = notification.publishedDate.toString();
        parts = date.split("T");
        this.publishedDate = parts[0] + " " + parts[1].split(".")[0];
      });
    });

  }

  showModal(notification: Notification) {
    $('#showNotification').modal('show');
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
    $("#viewOrderDetails").modal("show");

  }

}
