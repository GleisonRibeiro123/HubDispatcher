import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'notify',
    loadChildren: './components/notification-bar/notification-bar.module#NotificationBarModule',
  },
  {
    path: 'chart',
    loadChildren: './components/chart/chart.module#ChartModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
