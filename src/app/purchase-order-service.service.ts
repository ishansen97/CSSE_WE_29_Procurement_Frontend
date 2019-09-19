import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PurchaseOrder } from './purchase-order';
import { Observable } from 'rxjs';
import {PurchaseOrderResponse} from './models/purchase-order-response';
import {UpdatePurchaseOrderRequest} from './models/update-purchase-order-request';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private url: String;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:9200/api/purchase';
  }

  public findAll(): Observable<PurchaseOrderResponse[]> {
    return this.httpClient.get<PurchaseOrderResponse[]>(this.url + '/get-all-purchase-orders');
  }

  public save(purchaseOrder: PurchaseOrder) {
    return this.httpClient.post<PurchaseOrder[]>(this.url + '/insert-purchase-order', purchaseOrder);
  }

  public update(purchaseOrder: UpdatePurchaseOrderRequest) {
    return this.httpClient.put<UpdatePurchaseOrderRequest>(this.url + '/update-purchase-order', purchaseOrder);
  }
}
