import {PurchaseOrder} from '../purchase-order';

export class Notification {
  _id: String;
  notificationId: Number;
  message: String;
  purchaseOrder: PurchaseOrder;
  read: boolean;
  receiverType: string;
  publishedDate: Date;
  readDate: Date;
}
