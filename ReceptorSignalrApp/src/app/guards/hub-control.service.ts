import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';

import { componentFactoryName } from '@angular/compiler';

export interface CanComponentDeactivate {
  CanDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable(
//   {
//   // providedIn: 'root'
// }
)
export class HubControlService implements CanDeactivate<CanComponentDeactivate> {

  constructor() { }

  canDeactivate(component: CanComponentDeactivate){
    return component.CanDeactivate ? component.CanDeactivate() : true;
  }


}



