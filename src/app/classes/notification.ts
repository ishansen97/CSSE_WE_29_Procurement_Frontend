import {PurchaseOrder} from '../purchase-order';
import {Item} from './item';
import {Supplier} from './supplier';

export class Notification {
  _id: String;
  notificationId: Number;
  message: String;
  purchaseOrder: PurchaseOrder;
  items: Array<Item>;
  supplier: Supplier;
  read: boolean;
  sender: string;
  receiverType: string;
  publishedDate: Date;
  readDate: Date;
}
