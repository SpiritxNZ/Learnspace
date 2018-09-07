import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Observable, BehaviorSubject } from 'rxjs';

import { BasicOpProperty } from '../../models/HomeworkResourceModel';
=======
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7

@Injectable({
  providedIn: 'root'
})
export class ResourceSupportService {

  constructor() { }
<<<<<<< HEAD

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
=======
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
}
