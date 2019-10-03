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
  }

  public findAll(): Observable<ManagerBudget[]> {
    return this.httpClient.get<ManagerBudget[]>(this.url + 'budget/get-all-budgets');
  }

  public save(budget: ManagerBudget) {
    return this.httpClient.post<ManagerBudget[]>(this.url + 'budget/insert-budget', budget);
  }

}
