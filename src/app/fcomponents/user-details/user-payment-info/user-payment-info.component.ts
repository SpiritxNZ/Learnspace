import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StripePaymentComponent } from '../../support/stripe-payment/stripe-payment.component';
import { UserService } from '../../../services/servercalls/user.service';

@Component({
  selector: 'app-user-payment-info',
  templateUrl: './user-payment-info.component.html',
  styleUrls: ['./user-payment-info.component.css']
})
export class UserPaymentInfoComponent implements OnInit {

  // user information
  userBasicInfo: object = {};
  // has payment info
  hasPaymentInfo: boolean = false;

  // dialog width
  dialogWidth: number = 500;
  dialogHeight: number = 500;

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.showUserInfo().subscribe(
      result => {
        console.log(result);
        this.userBasicInfo = result['dataCon']['userBasic'];
        if (result['dataCon']['userBasic']['stripe_id'] != null) {
          this.hasPaymentInfo = true;
        } else {
          this.hasPaymentInfo = false;
        }
      }
    );
  }

  // modify payment card
  modifyPaymentCard() {
    console.log("Modify Card");
    // convert dialog width and height
    let wd = this.dialogWidth.toString();
    let ht = this.dialogHeight.toString();
    const dialogRef = this.dialog.open(StripePaymentComponent, {
      disableClose: true,
      width: wd + 'px',
      height: ht + 'px',
      data: {
        width: wd + 'px',
        height: ht + 'px'
      }
    });
  }

}
