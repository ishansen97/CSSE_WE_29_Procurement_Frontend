import {Item} from '../classes/item';

export class UpdatePurchaseOrderRequest {
  _id: String;
  ordId: String;
  ordType: String;
  ordStatus: String;
  companyName: String;
  deliveryAddress: String;
  ordDate: Date;
  deliveryDate: Date;
  itemIdList: Array<Item>;
  quantity: Number;
  cost: Number;
  supplierId: String;
}
