import {PurchaseOrder} from '../purchase-order';
import {Item} from './item';
import {Supplier} from './supplier';

export class Notification {
  id: string;
  notificationId: number;
  message: string;
  purchaseOrder: PurchaseOrder;
  items: Array<Item>;
  supplier: Supplier;
  read: boolean;
  sender: string;
  receiverType: string;
  publishedDate: Date;
  readDate: Date;

}
