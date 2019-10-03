import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ManagerBudget} from '../classes/manager-budget-class';
import {Constants} from '../classes/constants';


@Injectable({
  providedIn: 'root'
})
export class ManagerBudgetServiceService {
  private url: string;

  constructor(private httpClient: HttpClient, private constants: Constants) {
    this.url = constants.URL;
    // this.url = 'http://localhost:9200/api/budget';
  }

  public findAll(): Observable<ManagerBudget[]> {
    // @ts-ignore
    return this.httpClient.get<ManagerBudget[]>(this.url + 'budget/get-all-budgets');
  }

  public save(budget: ManagerBudget) {
    return this.httpClient.post<ManagerBudget>(this.url + 'budget//insert-budget', budget);
  }

  public update(budget: ManagerBudget) {
    return this.httpClient.put<ManagerBudget[]>(this.url + 'budget/update-budget', budget);
  }

}
