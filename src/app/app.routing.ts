import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {ProcurementComponent} from '../pages/procurement/procurement';
import {TestComponent} from '../pages/test/test';
import {MainComponent} from './main/main.component';
import {ViewOrdersComponent} from './view-orders/view-orders.component';
import {NotificationsComponent} from './notifications/notifications/notifications.component';
import {LoginCredentialsComponent} from './login-credentials/login-credentials.component';

const routes: Routes = [
  { path: 'login', component: LoginCredentialsComponent},
  { path: 'main', component: MainComponent},
  { path: 'procurement', component: ProcurementComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'view-orders', component: ViewOrdersComponent},
  { path: 'notifications', component: NotificationsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
