import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartRoutingModule } from './chart-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChartRoutingModule,
  ],
  declarations: [ChartComponent]
})
export class ChartModule { }
