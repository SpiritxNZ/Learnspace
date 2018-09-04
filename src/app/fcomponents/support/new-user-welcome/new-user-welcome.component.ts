import { Component, OnInit } from '@angular/core';
import { LearnerService } from '../../../services/servercalls/learner.service';
import { Title } from '@angular/platform-browser';
export interface courseList {
  courseName: string;
  selected: boolean;
}
@Component({
  selector: 'app-new-user-welcome',
  templateUrl: './new-user-welcome.component.html',
  styleUrls: ['./new-user-welcome.component.css']
})
export class NewUserWelcomeComponent implements OnInit {
  selectedCourse=[];
  courses: courseList[] = [
    { courseName: 'Math', selected: false, },
    { courseName: 'English', selected: false,},
    { courseName: 'Science', selected: false, },
    { courseName: 'Calculus', selected: false, },
    { courseName: 'Chemistry', selected: false, },
    { courseName: 'Physics', selected: false, },
    { courseName: 'Biology', selected: false, },
    { courseName: 'Economics', selected: false, },
    { courseName: 'Accounting', selected: false, },
    { courseName: 'German', selected: false, },
    { courseName: 'Chinese', selected: false, },
    { courseName: 'Maori', selected: false, },
    { courseName: 'Spanish', selected: false, },
    { courseName: 'French', selected: false, },
    { courseName: 'Arts', selected: false, },
    { courseName: 'Music', selected: false, },
    { courseName: 'ESOL', selected: false, },
    { courseName: 'Social Studies', selected: false, },
    { courseName: 'Geography', selected: false, },
    { courseName: 'History', selected: false, },
    { courseName: 'ICT', selected: false, },
    { courseName: 'Computer Studies', selected: false, },
    { courseName: 'Media Studies', selected: false, },
    { courseName: 'Graphics', selected: false, },
    { courseName: 'Drama', selected: false, },
    { courseName: 'Design', selected: false, },
    { courseName: 'Japanese', selected: false, },
  ];
  constructor(
    private learnerService: LearnerService,
    private titleService: Title,
  ){
    this.titleService.setTitle('Learnspace | Welcome');
   }

  ngOnInit() {
  }

  addCourse(){
    this.selectedCourse=[];
    for(let course of this.courses){
      if (course.selected == true){
        this.selectedCourse.push(course.courseName);
      }
      if(this.selectedCourse.some(x => x === course.courseName )){
          let index = this.selectedCourse.indexOf(course.courseName)
          this.selectedCourse.slice(index,1);
        }
      };
      let data={
        subject:this.selectedCourse,
      };

    this.learnerService.storeLearnerProfile(data).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
    console.log(this.selectedCourse);
    }
    selected1 ='';
    YearLevel = true;
    CoursePage = false;
    highCourse= true;
    uniCourse= false;
    showCourse(){
      this.YearLevel = false;
      this.CoursePage = true;
    }
    showYearLevel(){
      this.YearLevel = true;
      this.CoursePage = false;
    }
    showHighCourse(){
      this.highCourse = true;
      this.uniCourse= false;
    }
    showUniCourse(){
      this.uniCourse = true;
      this.highCourse = false;
    }

}
