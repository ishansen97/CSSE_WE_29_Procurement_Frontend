import {Item} from './classes/item';

export class PurchaseOrder {
  _id: string;
  ordId: string;
  ordType: string;
  ordStatus: string;
  companyName: string;
  deliveryAddress: string;
  ordDate: Date;
  itemIdList: Array<Item>;
  deliveryDate: Date;
  quantity: number;
  cost: number;
  supplierId: string;
  siteId: string;
}
