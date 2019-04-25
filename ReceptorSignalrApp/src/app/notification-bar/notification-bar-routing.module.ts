import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationBarComponent } from './notification-bar.component';

const notificationBarRoutes: Routes = [
  { path: '', component: NotificationBarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(notificationBarRoutes)],
  exports: [RouterModule]
})
export class NotificationBarRoutingModule { }
