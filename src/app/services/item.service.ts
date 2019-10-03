import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../classes/item';
import {Constants} from '../classes/constants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url: string;

  constructor(private httpClient: HttpClient, private constants: Constants) {
    this.url = constants.URL;
  }

  public findAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url + 'item/get-all-items');
  }

  public save(item: Item) {
    return this.httpClient.post<Item[]>(this.url + 'item/insert-item', item);
  }
}
