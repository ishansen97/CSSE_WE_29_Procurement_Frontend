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
import {Constants} from './classes/constants';

@NgModule({
  declarations: [
    AppComponent,
    ProcurementComponent,
    MainComponent,
    ViewOrdersComponent,
    NotificationsComponent,
    LoginCredentialsComponent
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
