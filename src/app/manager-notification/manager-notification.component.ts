// import { Component, OnInit } from '@angular/core';
//
// @Component({
//   selector: 'app-manager-notification',
//   templateUrl: './manager-notification.component.html',
//   styleUrls: ['./manager-notification.component.css']
// })
// export class ManagerNotificationComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {Notification} from '../classes/notification';
import {PurchaseOrder} from '../purchase-order';

import {Supplier} from '../classes/supplier';
import {Item} from '../classes/item';
import {PurchaseOrderService} from '../purchase-order-service.service';

declare var $: any;

@Component({
  selector: 'app-manager-notification',
  templateUrl: './manager-notification.component.html',
  styleUrls: ['./manager-notification.component.css']
})
export class ManagerNotificationComponent implements OnInit {
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
  sendNotification: Notification;



  constructor(private notificationService: NotificationService, private purchaseOrderService: PurchaseOrderService) {
    this.selectedNotification = <Notification>{};
    this.newNotificationCount = 0;
  }

  ngOnInit() {
    this.getAllNotifications();
    this.username = sessionStorage.getItem('username');
    this.userType = sessionStorage.getItem('userType');
    this.sendNotification = <Notification>{};
    this.selectedNotification.purchaseOrder = <PurchaseOrder>{};
    this.sendNotification.purchaseOrder = <PurchaseOrder>{};

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
        parts = date.split('T');
        this.publishedDate = parts[0] + ' ' + parts[1].split('.')[0];
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
    $('#viewOrderDetails').modal('show');

  }

  approve(notification: Notification) {
    let response = confirm('Are you sure you want approve this order? ');
    this.selectedNotification = notification;


    if (response) {
      this.createNotification(notification, 'Procurement');
      this.sendNotificationForProcurement('Approved');
    }
  }

  reject(notification: Notification) {
    let response = confirm('Are you sure you want reject this order? ');
    this.selectedNotification = notification;

    if (response) {
      this.createNotification(notification, 'Procurement');
      this.sendNotificationForProcurement('Rejected');
    }
  }

  createNotification(notification: Notification, type: string) {
    this.sendNotification.purchaseOrder = notification.purchaseOrder;
    this.sendNotification.items = notification.items;
    this.sendNotification.supplier = notification.supplier;
    this.sendNotification.receiverType = type;
    this.sendNotification.read = false;
  }

  sendNotificationForProcurement(status: string) {
    let message = '';

    if (status === 'Approved') {
      message = 'Purchase Order ' + this.sendNotification.purchaseOrder.ordId + ' has been Approved by the Manager';
    }
    else if (status === 'Rejected') {
      message = 'Purchase Order ' + this.sendNotification.purchaseOrder.ordId + ' has been Rejected by the Manager';
    }
    this.sendNotification.sender = 'Manager';
    this.sendNotification.message = message;
    this.sendNotification.purchaseOrder.ordStatus = status;
    this.sendNotification.publishedDate = new Date();
    this.sendNotification.readDate = null;
    this.notificationService.save(this.sendNotification).subscribe(success => {
      if (success) {
        this.purchaseOrderService.update(this.sendNotification.purchaseOrder).subscribe(data => {
          if (data) {
            alert('Notification was sent successfully');
            this.readNotification();
            this.getAllNotifications();
          }
        }, fail => {
          alert('purchase order update failed.');
        });
      }
    }, error => {
      alert('notification error: ');
    });
  }


}



