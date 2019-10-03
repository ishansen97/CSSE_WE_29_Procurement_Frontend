import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Supplier} from '../classes/supplier';
import {PurchaseOrderResponse} from '../models/purchase-order-response';
import {PurchaseOrder} from '../purchase-order';
import {Constants} from '../classes/constants';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private url: String;

  constructor(private httpClient: HttpClient, private constants: Constants) {
    this.url = constants.URL;
  }

  public findAll(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.url + 'supplier/get-all-suppliers');
  }

  public save(supplier: Supplier) {
    return this.httpClient.post<Supplier[]>(this.url + 'supplier/insert-supplier', supplier);
  }
}
