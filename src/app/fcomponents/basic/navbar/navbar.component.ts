import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
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
  loggedIn = <boolean>false
  loggedInUserName: string;
  navStatus = false;
  userImg: string;
  screenStatus = false;
  collapseStatus = false;
  baseImgUrl = environment.baseUserImgUrl;


  @Input() onwhichpage: string = "home";

  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    public dialog: MatDialog,
    private authService: AuthService,
    private elem: ElementRef,
    public router: Router,
    public route: ActivatedRoute,
    private commonSupport: CommonSupportService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val.url)
        if (val.url.indexOf("app") != -1) {
          this.onwhichpage = "dashboard";
          console.log(this.onwhichpage)
        } else {
          this.onwhichpage = "home";
          console.log(this.onwhichpage)
        }
      }
    })
  }

  ngOnInit() {

    this.rolePosition = this.authService.getUserRole()

    if (this.authService.getAuth()) {
      this.loggedIn = true;
      this.loggedInUserName = this.localStorage.getItem('lsaUserName');
      this.userImg = this.commonSupport.prepareUserImgUrl();// + "?ver=" + this.commonSupport.getTime();
      console.log(this.userImg)
    }

    else {
      this.loggedIn = false
    }

    $(window).resize(() => {
      if ($(window).width() <= 768) { this.screenStatus = true }
      else { this.screenStatus = false }
    });

    $(window).scroll(() => {
      if ($(window).scrollTop() >= 60) { this.navStatus = true }
      else { this.navStatus = false }
    });
  }

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
  }
}
