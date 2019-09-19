import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../classes/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url: String;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:9200/api/item';
  }

  public findAll(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.url + '/get-all-items');
  }

  public save(item: Item) {
    return this.httpClient.post<Item[]>(this.url + '/insert-item', item);
  }
}
