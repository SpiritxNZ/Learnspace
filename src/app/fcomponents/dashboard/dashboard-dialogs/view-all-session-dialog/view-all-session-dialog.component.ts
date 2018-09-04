import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { TutorService } from '../../../../services/servercalls/tutor.service';
import * as moment from 'moment';


@Component({
  selector: 'app-view-all-session-dialog',
  templateUrl: './view-all-session-dialog.component.html',
  styleUrls: ['./view-all-session-dialog.component.css']
})
export class ViewAllSessionDialogComponent implements OnInit {

  name: any;

  sessions: any;

  errorMessage: string;

  selectStatus: any;

  status : string = "all";


  constructor(
    private tutorService: TutorService,
    private dialogRef: MatDialogRef<ViewAllSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log('report data', this.data);
    this.name = this.data.student_name;
    this.showAllSessions(this.data.student_id);
  }


  showAllSessions(studentId) {
    this.tutorService.showTutorStudent(studentId).subscribe(
      (res) => {
        console.log(res);


        this.sessions = this.getAllSessions(res);
        this.sessions = this.sessions.filter(x => !!x);

        console.log("The following will show all sessions:");
        console.log(this.sessions);
      },
      (err) => { console.log(err), this.errorMessage = "Sorry, but something went wrong." }
    )

  }

  getAllSessions(sessionsList: any) {
    let sessionList = sessionsList.map(e => {
      let newObj = {};
      let sessionId = e.session_id;
      let studentName = e.learner_name;

      let status = "";
      if (e.session_status == "canceled") {
        return null;
      } else {
        status = e.session_status;
      }

      let date = this.changeToMoment(e.session_date)
      let newDate = date.format("LL");
      let starttime = date.format('LT');
      let endTime = date.add(e.session_duration, 'hours').format('LT');

      let location = e.session_location;
      let subject = e.session_subject;



      newObj = {
        session_id: sessionId,
        student_name: studentName,
        session_status: status,
        session_date: newDate,
        session_startTime: starttime,
        session_endTime: endTime,
        session_location: location,
        session_subject: subject,
        session_requirement: "no requirements",
        session_report: "no report",


      }
      return newObj;

    })
    return sessionList;
  }

  // change time to moment object format
  changeToMoment(time: any): any {
    let sessionDate = time.slice(0, 10);
    let sessionTime = time.slice(11);
    let date = sessionDate + 'T' + sessionTime;
    return moment(date);
  }

  statusChanged(option) {
    this.status = option;
  }

}
