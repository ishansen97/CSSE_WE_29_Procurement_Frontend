import {Item} from './item';

export class Supplier {
  Id: String;
  supplierId: String;
  supplierName: String;
  supplierLocation: String;
  itemList: Array<Item>;
}
