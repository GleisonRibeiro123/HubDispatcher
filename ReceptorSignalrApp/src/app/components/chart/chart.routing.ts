import { NgModule } from '@angular/core';
import { ChartComponent } from './chart.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ChartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ChartRoutingModule { }
