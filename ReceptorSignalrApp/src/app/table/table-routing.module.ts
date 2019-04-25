import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './table.component';

const tableRoutes: Routes = [
  { path: '', component: TableComponent},
];

@NgModule({
  imports: [RouterModule.forChild(tableRoutes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
