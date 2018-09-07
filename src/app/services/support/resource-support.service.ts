import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { BasicOpProperty } from '../../models/HomeworkResourceModel';

@Injectable({
  providedIn: 'root'
})
export class ResourceSupportService {

  constructor() { }

  // basic resource property subject
  private basicOpSubject = new BehaviorSubject({});
  basicOpProperty = this.basicOpSubject.asObservable();

  // ***************************************************
  // ************ Resources Related Services ************
  // ***************************************************
  sendBasicOpProperty(user: string, mode: string, resType: number) {
    console.log("Sending basic resource operation property....");
    let basicOp = new BasicOpProperty(user, mode, resType);
    this.basicOpSubject.next(basicOp);
  }

   // ************* clear subscription ******************
   clearBasicOpProperty() {
    this.basicOpSubject.next({});
   }
}
