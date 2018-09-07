import { LOCAL_STORAGE } from '@ng-toolkit/universal';
<<<<<<< HEAD
import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
=======
import { Component, OnInit , Inject, Input} from '@angular/core';
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
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
<<<<<<< HEAD
  loggedIn = <boolean>false
  loggedInUserName: string;
  navStatus = false;
  userImg: string;
  screenStatus = false;
  collapseStatus = false;
=======
  loggedIn=<boolean>false
  loggedInUserName: string;
  navStatus = false;
  userImg: string;
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
  baseImgUrl = environment.baseUserImgUrl;


  @Input() onwhichpage: string = "home";

  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    public dialog: MatDialog,
<<<<<<< HEAD
    private authService: AuthService,
    private elem: ElementRef,
=======
    private authService:AuthService,
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
    public router: Router,
    public route: ActivatedRoute,
    private commonSupport: CommonSupportService
  ) {
<<<<<<< HEAD
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val.url)
        if (val.url.indexOf("app") != -1) {
          this.onwhichpage = "dashboard";
          console.log(this.onwhichpage)
        } else {
=======
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        console.log(val.url)
        if(val.url.indexOf("dashboard") != -1){
          this.onwhichpage = "dashboard";
          console.log(this.onwhichpage)
        }else{
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
          this.onwhichpage = "home";
          console.log(this.onwhichpage)
        }
      }
    })
<<<<<<< HEAD
  }

  ngOnInit() {

    this.rolePosition = this.authService.getUserRole()

    if (this.authService.getAuth()) {
=======
   }

  ngOnInit() {
    
    this.rolePosition = this.authService.getUserRole()

    if(this.authService.getAuth()){
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
      this.loggedIn = true;
      this.loggedInUserName = this.localStorage.getItem('lsaUserName');
      this.userImg = this.commonSupport.prepareUserImgUrl();// + "?ver=" + this.commonSupport.getTime();
      console.log(this.userImg)
    }
<<<<<<< HEAD

=======
    
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
    else {
      this.loggedIn = false
    }

<<<<<<< HEAD
    $(window).resize(() => {
      if ($(window).width() <= 768) { this.screenStatus = true }
      else { this.screenStatus = false }
    });

=======
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
    $(window).scroll(() => {
      if ($(window).scrollTop() >= 60) { this.navStatus = true }
      else { this.navStatus = false }
    });
  }

<<<<<<< HEAD
  collapseShow() {
    let navbar = this.elem.nativeElement.querySelector('#top-navbar');
    let itemLength = navbar.querySelectorAll('li').length;
    let collDisplay = this.elem.nativeElement.querySelector('#navbar-primary');
    collDisplay = collDisplay.className.toString();
    let isShow = collDisplay.indexOf('collapse show');
    if (isShow == -1) {
      this.screenStatus = true;
      this.collapseStatus = true;
    } else {
      this.screenStatus = false;
      this.collapseStatus = false;
    }
  }
  newUser($event) {
    let dialogRef = this.dialog.open(NewUserComponent,
      { panelClass: 'dialog1' });
  }

  loginUser($event) {
    let dialogRef = this.dialog.open(LoginComponent,
      { panelClass: 'dialog1' });
  }

  onLogoutClick() {
    this.authService.loggingOut();
    this.ngOnInit();
=======
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
>>>>>>> d9c24f092e8c16736e2db959be9e76246e08f3b7
  }
}
