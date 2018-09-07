import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-article-parent',
  templateUrl: './article-parent.component.html',
  styleUrls: ['./article-parent.component.css']
})
export class ArticleParentComponent implements OnInit {

  // mode
  @Input() mode: string;
  // article data
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log('Current mode is: ' + this.mode);
  }

}
