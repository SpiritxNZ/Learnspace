import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  PostBasicInfo
} from '../../../../../models/HomeworkResourceModel';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css']
})
export class ResourceEditComponent implements OnInit {

  // create mode or edit mode
  mode: string = '';
  // post tags
  postTags: string[] = [];
  // basic information
  basicPostInfo: PostBasicInfo;

  // basic form
  basicPostInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    $(function() {
      var currentStep = 1;
      // function for next button with animation
      $('.nextBtn').click(function() {
        $('#ac-item-bd-' + currentStep).slideUp(200, function() {
          $('#ac-item-bd-' + currentStep).parent().removeClass('on');
          $('#ac-item-bd-' + (currentStep + 1)).slideDown(200);
          $('#ac-item-bd-' + (currentStep + 1)).parent().addClass('on');
          currentStep += 1;
        });
      });
      // function for previous button with animation
      $('.prevBtn').click(function() {
        $('#ac-item-bd-' + currentStep).slideUp(200, function() {
          $('#ac-item-bd-' + currentStep).parent().removeClass('on');
          $('#ac-item-bd-' + (currentStep - 1)).slideDown(200);
          $('#ac-item-bd-' + (currentStep - 1)).parent().addClass('on');
          currentStep -= 1;
        });
      });
      // function for save button
      $('#btnSave').click(function() {
        alert("you are saved...");
        //server code here...
      });

      // function for header clicked event and animation
      $('.ac-item-hd').on('click', function(e) {
        if ($(this).siblings('.ac-item-bd').attr('id') == 'ac-item-bd-1') {
          currentStep = 1;
        } else if ($(this).siblings('.ac-item-bd').attr('id') == 'ac-item-bd-2') {
          currentStep = 2;
        } else if ($(this).siblings('.ac-item-bd').attr('id') == 'ac-item-bd-3') {
          currentStep = 3;
        }
        console.log(currentStep);
        console.log($(this));
        $(this).parent().siblings('.on').children('.ac-item-bd').slideUp(500, function() {
          $('#ac-item-bd-' + currentStep).slideDown(200);
          $('#ac-item-bd-' + currentStep).parent().addClass('on');
        });
        $(this).parent().siblings('.on').removeClass('on');
      });
    });
  }

  // create form for post's basic info
  createBasicForm() {
    this.basicPostInfoForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      grade: ['', Validators.required],
      privacy: ['', Validators.required],
      tags: [''],
      description: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(120)])],
    });
    if(this.mode == 'create') {
      console.log('Creating resource...');
    } else if(this.mode == 'edit') {
      console.log('Editing resource...');
    }
  }

  // push tags
  pushTags(tagInfo: string) {
    console.log('Pushing tag info....');
    this.postTags.push(tagInfo);
  }
}
