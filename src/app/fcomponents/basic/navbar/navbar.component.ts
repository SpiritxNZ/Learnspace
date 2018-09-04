import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit , Inject, Input} from '@angular/core';
import { NewUserComponent } from '../newuser/newuser.component';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/security/auth.service';
import { CommonSupportService } from '../../../services/support/common-support.service';
import { Location } from '@angular/common';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  rolePosition: number;
  Location: Location;
  dialogRef: MatDialogRef<NewUserComponent, LoginComponent>;
  loggedIn=<boolean>false
  loggedInUserName: string;
  navStatus = false;
  userImg: string;
  baseImgUrl = environment.baseUserImgUrl;


  @Input() onwhichpage: string = "home";

  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    public dialog: MatDialog,
    private authService:AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private commonSupport: CommonSupportService
  ) {
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        console.log(val.url)
        if(val.url.indexOf("dashboard") != -1){
          this.onwhichpage = "dashboard";
          console.log(this.onwhichpage)
        }else{
          this.onwhichpage = "home";
          console.log(this.onwhichpage)
        }
      }
    })
   }

  ngOnInit() {
    
    this.rolePosition = this.authService.getUserRole()

    if(this.authService.getAuth()){
      this.loggedIn = true;
      this.loggedInUserName = this.localStorage.getItem('lsaUserName');
      this.userImg = this.commonSupport.prepareUserImgUrl();// + "?ver=" + this.commonSupport.getTime();
      console.log(this.userImg)
    }
    
    else {
      this.loggedIn = false
    }

    $(window).scroll(() => {
      if ($(window).scrollTop() >= 60) { this.navStatus = true }
      else { this.navStatus = false }
    });
  }

  newUser($event){
    let dialogRef = this.dialog.open(NewUserComponent,
      {panelClass: 'dialog1'});
  }

  loginUser($event){
    let dialogRef = this.dialog.open(LoginComponent,
      {panelClass: 'dialog1'});
  }

  onLogoutClick(){
    this.authService.loggingOut();
  }
}
