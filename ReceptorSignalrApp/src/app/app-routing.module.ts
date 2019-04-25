import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'notify',
  //   loadChildren: './notification-bar/notification-bar.module#NotificationBarModule',
  // },
  {
    path: 'chart',
    loadChildren: './chart/chart.module#ChartModule'
  },
  {
    path: 'table',
    loadChildren: './table/table.module#TableModule'
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
