import { Component, OnInit } from '@angular/core';
import {ManagerBudgetServiceService} from '../services/manager-budget-service.service';
import {ManagerBudget} from '../classes/manager-budget-class';
import {Site} from '../classes/site';
import {SiteService} from '../services/site.service';

@Component({
  selector: 'app-manager-site-budget',
  templateUrl: './manager-site-budget.component.html',
  styleUrls: ['./manager-site-budget.component.css']
})
export class ManagerSiteBudgetComponent implements OnInit {
  siteName: string;
  budget: number;
  budgetList: Array<ManagerBudget>;
  assignBudget: ManagerBudget;
  sites: Array<Site>;
  isAssignable: boolean;
  // budget: number;

  constructor(public budgetService: ManagerBudgetServiceService, public siteService: SiteService) {
    this.getAllSites();
    this.getAllBudgets();
  }

  ngOnInit() {
    this.siteName = '';
    this.budget = 0;
    this.assignBudget = {
      budgetId: 0,
      id: '',
      siteId: '',
      siteBudget: 0
    };
    this.sites = [];
    this.budgetList = [];
    this.budget = 0;
    this.isAssignable = true;

  }
  getAllSites() {
    this.siteService.findAll().subscribe(data => {
      this.sites = data;
    });
  }

  getAllBudgets() {
    this.budgetService.findAll().subscribe(budgets => {
      this.budgetList = budgets;
    });
  }

  checkAvailability(id: string) {
    let isFound = false;
    this.budgetList.forEach(budget => {
      if (budget.siteId === id) {
        isFound = true;
      }
    });

    return isFound;
  }

  createUpdateRequest(id: string) {
    this.budgetList.forEach(budget => {
      if (budget.siteId === id) {
        this.assignBudget = budget;
      }
    });
  }

  createBudget() {
    let validSite = this.assignBudget.siteId === '' ? false : true;
    let validBudget = this.budget === 0 ? false : true;

    if (validSite && validBudget) {
      // this.budgetList.forEach(budgets => {
      //   if (this.assignBudget.siteId === budgets.siteId) {
      //     this.assignBudget = budgets;
      //     this.assignBudget.siteBudget = this.budget;
      //
      //     this.budgetService.update(this.assignBudget).subscribe(data => {
      //       if (data) {
      //         alert('updated');
      //       }
      //     });
      //   }
      // });
      // this.sites.forEach(site => {
      //   if (this.assignBudget.siteId === site.siteId) {
      //     alert('site Id: ' + site.siteId + ' is found');
      //   }
      // });

      let isFound = this.checkAvailability(this.assignBudget.siteId);

      if (isFound) {
        this.createUpdateRequest(this.assignBudget.siteId);
        this.assignBudget.siteBudget = this.budget;
        this.budgetService.update(this.assignBudget).subscribe(data => {
          if (data) {
            alert('updated');
            document.location.reload();
          }
        });
      }
      else {
        this.assignBudget.siteBudget = this.budget;
        this.budgetService.save(this.assignBudget).subscribe(data => {
          if (data) {
            alert('created');
            document.location.reload();
          }
        });
      }
    }

    else {
      alert('Please provide correct data');
    }

  }
}
