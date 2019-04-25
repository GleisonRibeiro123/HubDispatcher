import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationBarComponent } from './notification-bar.component';
import { NotificationBarRoutingModule } from './notification-bar-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NotificationBarRoutingModule,
    BsDropdownModule.forRoot(),
  ],
  declarations: [
    // NotificationBarComponent
  ]
})
export class NotificationBarModule { }
