import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartComponent } from './chart.component';

const chartRoutes: Routes = [
  { path: '', component: ChartComponent},
];

@NgModule({
  imports: [RouterModule.forChild(chartRoutes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
