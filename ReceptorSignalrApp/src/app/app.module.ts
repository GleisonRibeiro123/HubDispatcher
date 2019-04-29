import { CanDeactivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDispatcherService } from './_services/event-dispatcher.service';
import { SignalRService } from './_services/signal-r.service';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // ChartComponent,
    NotificationBarComponent,
    HomeComponent,
    // TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    EventDispatcherService,
    SignalRService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
