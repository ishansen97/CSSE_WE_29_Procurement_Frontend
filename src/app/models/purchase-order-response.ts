import {PurchaseOrder} from '../purchase-order';
import {Item} from '../classes/item';
import {Supplier} from '../classes/supplier';

export class PurchaseOrderResponse {
  purchaseOrder: PurchaseOrder;
  itemDetails: Array<Item>;
  supplierDetails: Supplier;
}
