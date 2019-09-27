import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ManagerBudget} from '../classes/manager-budget-class';


@Injectable({
  providedIn: 'root'
})
export class ManagerBudgetServiceService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:9200/api/budget';
  }

  public findAll(): Observable<ManagerBudget[]> {
    return this.httpClient.get<ManagerBudget[]>(this.url + '/get-all-budgets');
  }

  public save(budget: ManagerBudget) {
    return this.httpClient.post<ManagerBudget[]>(this.url + '/insert-budget', budget);
  }

}
