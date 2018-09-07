
// manage all collections of resources: aricles, questions, and files....

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  PostBasicInfo,
  PostDetails,
  PostDetailsInfo,
  ArticleData
} from '../../../../models/HomeworkResourceModel';
import { ResourceSupportService } from '../../../../services/support/resource-support.service';
import { GeneralService } from '../../../../services/servercalls/general.service';

@Component({
  selector: 'app-resources-collection',
  templateUrl: './resources-collection.component.html',
  styleUrls: ['./resources-collection.component.css']
})
export class ResourcesCollectionComponent implements OnInit {

  // create, edit, view
  @Input() mode: string;
  // resource collection info
  @Input() resourceCollectionInfo: object;

  // resource type
  resourceType: number;
  // current route url
  currentRoute: string;
  // user type
  userType: string;

  // returned resource data
  returnedResourceData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private resourceSupportService: ResourceSupportService,
  ) { }

  ngOnInit() {
    this.currentRoute = this.router.url;

    // listen for basic op property
    this.resourceSupportService.basicOpProperty.subscribe(
      msg => {
        if(Object.keys(msg).length != 0) {
          console.log('<ResourceCollection> received basic op property');
          console.log(msg);
          if(msg['user_type'].trim != '') {
            this.userType = msg['user_type'];
          }
          this.mode = msg['mode'];
          this.resourceType = msg['resource_type'];
        }
      }
    );

    if(this.currentRoute.indexOf('community') != -1) {
      this.getPostResource();
    } else {
      // this.resourceType = this.getResourceType();
      this.returnedResourceData = {};
      if(this.mode == 'view') {

      }
    }
    
  }

  // get resource type
  getResourceType(): number {
    if(this.currentRoute.indexOf('article') != -1) {
      return 0;
    } else if(this.currentRoute.indexOf('resource') != -1) {
      return 1;
    } else if(this.currentRoute.indexOf('question') != -1) {
      return 2;
    }
  }

  // retrieve post details
  getPostResource() {
    let urlArray = this.currentRoute.split('/');
    // get resource id from url
    let resId = urlArray[urlArray.length - 1];
    console.log('Specific resource id is: ' + resId);
    this.generalService.showPost(resId).subscribe(
      res => {
        console.log('Received resource data is:');
        console.log(res);
        console.log(res['data']['thisPost']);
        let postInfo = res['data']['thisPost'];
        // this.resourceType = postInfo['post_type'];
        // this.mode = 'view';
        this.returnedResourceData = postInfo;
      }
    );
  }

  // process resource collection
  processCollection() {
    let resType = this.resourceCollectionInfo['post_type'].toString();
    switch(resType) {
      case '0':
        // process article
        this.resourceType = resType;

        break;
      case '1':
        // process reference
        break;
      case '2':
        // process question
        break;
    }
  }

}
