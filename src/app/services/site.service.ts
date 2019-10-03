import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../classes/notification';
import {Site} from '../classes/site';
import {Constants} from '../classes/constants';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  public url: string;
  constructor(public httpClient: HttpClient, private constants: Constants) {
    this.url = constants.URL;
    // this.url = 'http://localhost:9200/api/site';
  }

  public findAll(): Observable<Site[]> {
    return this.httpClient.get<Site[]>(this.url + 'site/get-all-sites');
  }

  public save(site: Site) {
    return this.httpClient.post<Site>(this.url + 'site/insert-site', site);
  }
}
