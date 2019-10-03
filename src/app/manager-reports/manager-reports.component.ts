import { Component, OnInit } from '@angular/core';
import {ManagerBudgetServiceService} from '../services/manager-budget-service.service';
import {ManagerBudget} from '../classes/manager-budget-class';
import {Site} from '../classes/site';
import {SiteService} from '../services/site.service';

declare var $: any;

@Component({
  selector: 'app-manager-reports',
  templateUrl: './manager-reports.component.html',
  styleUrls: ['./manager-reports.component.css']
})
export class ManagerReportsComponent implements OnInit {
  budgetId: ManagerBudget;
  stateName: ManagerBudget;
  stateBudget: ManagerBudget;
  getBudgetDetails: ManagerBudget;
  budgetList: Array<ManagerBudget>;
  siteList: Array<Site>;
  selectedSite: Site;

  constructor(private budgetService: ManagerBudgetServiceService, private siteService: SiteService) {
    this.getAllBudgets();
    this.getAllSites();

  }

  ngOnInit() {
    // @ts-ignore
   // this.getBudgetReportDetails();
    this.budgetId = '';
    // @ts-ignore
    this.stateName = '';
    // @ts-ignore
    this.stateBudget = 0;
    this.budgetList = [];
    this.siteList = [];
    this.selectedSite = <Site>{};

  }

  getAllBudgets() {
    this.budgetService.findAll().subscribe(budgets => {
      this.budgetList = budgets;
    });
  }

  getAllSites() {
    this.siteService.findAll().subscribe(sites => {
      this.siteList = sites;
    });

  }

  displaySiteDetails(budget: ManagerBudget) {
    $('#site_details').modal({backdrop: 'static', show: true});

    this.siteList.forEach(site => {
      if (site.siteId === budget.siteId) {
        this.selectedSite.siteName = site.siteName;
        this.selectedSite.siteId = site.siteId;
      }
    });
  }




}
