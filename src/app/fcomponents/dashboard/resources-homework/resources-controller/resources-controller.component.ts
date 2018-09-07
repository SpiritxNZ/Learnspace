<<<<<<< HEAD

// The entry point of all resources related components

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7

@Component({
  selector: 'app-resources-controller',
  templateUrl: './resources-controller.component.html',
  styleUrls: ['./resources-controller.component.css']
})
export class ResourcesControllerComponent implements OnInit {

<<<<<<< HEAD
  // current route url
  currentRoute: string;
  // current operation, create -> 0, edit -> 1, view -> 2
  currentOperation: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
    if(this.currentRoute.indexOf('create') != -1) {
      this.currentOperation = 0;
    } else if(this.currentRoute.indexOf('edit') != -1) {
      this.currentOperation = 1;
    } else if(this.currentRoute.indexOf('view') != -1) {
      this.currentOperation = 2;
    }
  }

  // navigate to target component
  gotoComponent() {
    switch(this.currentOperation) {
      case 0:
        console.log("Create post...");
        break;
      case 1:
        console.log("Edit component");
      case 2:
        console.log("View component");
    }
=======
  constructor() { }

  ngOnInit() {
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
  }

}
