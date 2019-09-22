import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../classes/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url: String;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:9200/api/notification';
  }

  public findAll(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(this.url + '/get-all-notifications');
  }

  public save(notification: Notification) {
    return this.httpClient.post<Notification>(this.url + '/insert-notification', notification);
  }

  public readNotification(notification: Notification) {
    return this.httpClient.put<Notification>(this.url + '/read-notification', notification);
  }
}
