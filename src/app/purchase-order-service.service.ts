import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseOrder } from './purchase-order';
import { Observable } from 'rxjs';
import {PurchaseOrderResponse} from './models/purchase-order-response';
import {UpdatePurchaseOrderRequest} from './models/update-purchase-order-request';
import {Constants} from './classes/constants';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private url: String;

  constructor(private httpClient: HttpClient, private constants: Constants) {
    this.url = constants.URL;
  }

  public findAll(): Observable<PurchaseOrderResponse[]> {
    return this.httpClient.get<PurchaseOrderResponse[]>(this.url + 'purchase/get-all-purchase-orders');
  }

  public save(purchaseOrder: PurchaseOrder) {
    return this.httpClient.post<PurchaseOrder[]>(this.url + 'purchase/insert-purchase-order', purchaseOrder);
  }

  public update(purchaseOrder: UpdatePurchaseOrderRequest) {
    return this.httpClient.put<UpdatePurchaseOrderRequest>(this.url + 'purchase/update-purchase-order', purchaseOrder);
  }
}
