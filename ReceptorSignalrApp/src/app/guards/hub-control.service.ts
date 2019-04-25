import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ChartComponent } from '../chart/chart.component';

@Injectable(
//   {
//   // providedIn: 'root'
// }
)
export class HubControlService implements CanDeactivate<ChartComponent> {

  constructor() { }

  canDeactivate(
    component: ChartComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ): boolean {


    return false;
  }


}



