import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ProcurementComponent} from '../pages/procurement/procurement';
import {TestComponent} from '../pages/test/test';
import {MainComponent} from './main/main.component';
import {ViewOrdersComponent} from './view-orders/view-orders.component';
import {NotificationsComponent} from './notifications/notifications/notifications.component';
import {LoginCredentialsComponent} from './login-credentials/login-credentials.component';




import {ManagerSiteBudgetComponent} from './manager-site-budget/manager-site-budget.component';
import {ManagerReportsComponent} from './manager-reports/manager-reports.component';
import {ManagerApprovalsComponent} from './manager-approvals/manager-approvals.component';
import {ManagerMessageReportComponent} from './manager-message-report/manager-message-report.component';
import {ManagerNotificationComponent} from './manager-notification/manager-notification.component';

const routes: Routes = [
  { path: 'login', component: LoginCredentialsComponent},
  { path: 'main', component: MainComponent},
  { path: 'procurement', component: ProcurementComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'view-orders', component: ViewOrdersComponent},
  { path: 'notifications', component: NotificationsComponent},



  {path: 'manage-budget', component: ManagerSiteBudgetComponent},
  {path: 'manager-reports', component: ManagerReportsComponent},
  {path: 'manager-approvals', component: ManagerApprovalsComponent},
  {path: 'manager-notifications', component: ManagerNotificationComponent}


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
