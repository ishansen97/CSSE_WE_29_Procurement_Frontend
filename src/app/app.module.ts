import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {ProcurementComponent} from '../pages/procurement/procurement';
import { MainComponent } from './main/main.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';


// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import {HeaderManagerComponent} from './header_Manager/headerManager.component';
import { ManagerReportsComponent } from './manager-reports/manager-reports.component';
import { ManagerSiteBudgetComponent } from './manager-site-budget/manager-site-budget.component';
import { ManagerApprovalsComponent } from './manager-approvals/manager-approvals.component';
import { ViewBudgetComponent } from './manager-site-budget/view-budget/view-budget.component';



import { DisplayReportsComponent } from './manager-reports/display-reports/display-reports.component';
// import { ManagerMassageReportComponent } from './manager-massage-report/manager-massage-report.component';
import { ManagerMessageReportComponent } from './manager-message-report/manager-message-report.component';
import { ManagerNotificationComponent } from './manager-notification/manager-notification.component';
import {Constants} from './classes/constants';



@NgModule({
  declarations: [
    AppComponent,
    ProcurementComponent,
    MainComponent,
    ViewOrdersComponent,
    NotificationsComponent,
    LoginCredentialsComponent,
    HeaderManagerComponent,
    ManagerReportsComponent,
    ManagerSiteBudgetComponent,
    ManagerApprovalsComponent,
    ViewBudgetComponent,
    DisplayReportsComponent,
    ManagerMessageReportComponent,
    ManagerNotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Constants
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
