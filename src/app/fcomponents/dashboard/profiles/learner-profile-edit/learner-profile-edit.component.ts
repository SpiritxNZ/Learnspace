import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators, AbstractControl, NgControl } from '@angular/forms';
import { LearnerService } from '../../../../services/servercalls/learner.service';
import { UserService } from '../../../../services/servercalls/user.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { SideHelperService } from '../../../../services/helpers/side-helper.service';

@Component({
  selector: 'app-learner-profile-edit',
  templateUrl: './learner-profile-edit.component.html',
  styleUrls: ['./learner-profile-edit.component.css']
})

export class LearnerProfileEditComponent implements OnInit {
  learnersForm: FormGroup;
  usersForm: FormGroup;
  submitted = false;
  iAmLearner = true;
  errorMessage: string;
  minDOB = new Date(1929, 0, 1);
  maxDOB = new Date(2020, 0, 1);
  learnerInfo: any;
  curriculum_list: string[] = ['(NCEA) National Certificates of Educational', '(CIE) Cambridge', '(IB) International Baccalaureate'];
  subject_list: string[] = ['Math', 'Physics', 'Chemistry', 'Biology', 'Science', 'Geography', 'Social Studies', 'Information System', 'Accounting', 'Economics', 'Finance', 'English', 'Maori', 'French', 'German', 'Spanish', 'Chinese', 'Japanese'];
  grade_list: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];


  learnerProfile: any;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private learnerService: LearnerService,
    private userService: UserService,
    private SideHelperService: SideHelperService
  ) { }

  onSubmit() {
    /*transfer original date format to database format*/
    // let transferDOB = moment(this.learnersForm.value.learner_DOB).format().substr(0, 10);
    // this.learnersForm.controls['learner_DOB'].setValue(transferDOB);

    if (this.iAmLearner) {
      this.setUserFormValue();
      this.putLearnerInfo(this.learnersForm.value);
      this.putUserInfo(this.usersForm.value);
    }
    this.putLearnerInfo(this.learnersForm.value);
    this.submitted = true;
  }

  ngOnInit() {
    this.getLearnerInfo();
    this.createForm();
    this.createUserForm();
    this.learnerService.indexLearnerProfile().subscribe(
      (res) => {
        console.log(res);

        let profileList = []
        let keys = Object.keys(res['dataCon']);


        for (let learner of res['dataCon']['learnerProfile']) {
          if(learner.learner_first_name != null){
            profileList.push(learner)
          }
        }
        this.learnerProfile = profileList
        console.log(this.learnerProfile)



      },
      (err) => console.log(err)
    )
  }


  /*put learner profile*/
  putLearnerInfo(dataToUpdate) {
    console.log(dataToUpdate);

    // this.learnerService.editLearner(dataToUpdate).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.warn(err)
    // );

    // this.learnerService.updateLearnerProfile(dataToUpdate).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.warn(err)
    // );
  }

  /*put user profile*/
  putUserInfo(dataToUpdate) {
    console.log(dataToUpdate);
    this.userService.updateUserInfo(dataToUpdate).subscribe(

      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  /*create user form*/
  createUserForm() {
    this.usersForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      DOB: ['', [Validators.required, this.dateRange]]
    });
  }

  /*insert value to user form*/
  setUserFormValue() {
    this.usersForm.controls['first_name'].setValue(this.learnersForm.value.learner_first_name);
    this.usersForm.controls['last_name'].setValue(this.learnersForm.value.learner_last_name);
    this.usersForm.controls['DOB'].setValue(this.learnersForm.value.learner_DOB);
  }

  /*get learner profile*/
  getLearnerInfo() {
    // this.learnerService.getLearner().subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.learnerInfo = Object.assign(res['dataCon'].learnerProfile);
    //     this.setFormValuesTo(this.learnerInfo);
    //   },
    //   (error) => {
    //     this.errorMessage = 'Sorry, we can\'t get to your information at this time.';
    //   }
    // );
    this.learnerService.showLearnerProfile().subscribe(
      (res) => {
        console.log(res);
        this.learnerInfo = Object.assign(res['dataCon'].learnerProfile);
        this.setFormValuesTo(this.learnerInfo);
      },
      (error) => {
        this.errorMessage = 'Sorry, we can\'t get to your information at this time.';
      }
    );
  }

  /*create a form*/
  createForm() {
    this.learnersForm = this.fb.group({
      learner_first_name: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z ]*$")]],
      learner_last_name: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z ]*$")]],
      learner_DOB: ['', [this.dateRange]],
      subject: ['', Validators.required],
      grade: ['', Validators.required],
      curriculum: [''],
      aspiration: [''],
      sp_need: [''],
    });
  }

  /*assign value to a form*/
  setFormValuesTo(learnerInfoData) {
    this.learnersForm.controls['learner_first_name'].setValue(learnerInfoData.learner_first_name);
    this.learnersForm.controls['learner_last_name'].setValue(learnerInfoData.learner_last_name);
    this.learnersForm.controls['learner_DOB'].setValue(learnerInfoData.learner_DOB);
    this.learnersForm.controls['subject'].setValue(learnerInfoData.subject);
    this.learnersForm.controls['grade'].setValue(learnerInfoData.grade);
    this.learnersForm.controls['curriculum'].setValue(learnerInfoData.curriculum);
    this.learnersForm.controls['aspiration'].setValue(learnerInfoData.aspiration);
    this.learnersForm.controls['sp_need'].setValue(learnerInfoData.sp_need);
    this.learnersForm.updateValueAndValidity();
  }

  /*check the date range*/
  dateRange(AC: FormControl) {
    if (AC.value) {
      let year = parseInt(moment(AC.value.toString()).format());
      if (year < 1930) {
        return { mindob: {} };
      }
      if (year > 2019) {
        return { maxdob: {} };
      }
      return null;
    }
  }
  mouseEnter(m) {
    this.SideHelperService.sendMessage(m);
  }

}