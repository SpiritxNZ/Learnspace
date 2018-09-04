import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { environment } from '../../../../environments/environment.prod';

declare var Stripe: any;

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})

export class StripePaymentComponent implements OnInit {
  stripe: any;
  elements: any;
  paymentFormGroup: FormGroup;

  cardNumber: any;
  cardExpDate: any;
  cardCvc: any;

  isSending: boolean = false;
  isSuccess: boolean = false;
  dialogWidth: string;
  dialogHeight: string;

  baseUrl: string = environment.baseUrl;

  constructor(
    private fb: FormBuilder,
    public http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StripePaymentComponent>,
  ) {
    this.dialogWidth = this.data.width;
    this.dialogHeight = this.data.height;
  }

  ngOnInit() {
    this.paymentFormGroup = this.fb.group({
      cardHolder: ['']
    });
  }

  ngAfterViewInit() {
    this.stripe = Stripe('pk_test_QnlLgcUVpanU1ADbqEhtHzcf');
    this.elements = this.stripe.elements({
      fonts: [
        {weight: 'bold'}
      ]
    });
    this.populatePaymentForm();
  }

  // close dialog
  close() {
    this.dialogRef.close();
  }

  // collect payment form info
  collectPayInfo() {
    console.log(this.paymentFormGroup.value);
  }

  // populate payment form
  populatePaymentForm() {
    const style = {
      base: {
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        letterSpacing: '4px',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#A9A9A9'
        },
      }
    };

    // card number field
    const cardNumber = this.elements.create('cardNumber', { style: style, placeholder: "1234 1234 1234 1234" });
    // card expiry date
    const cardExpDate = this.elements.create('cardExpiry', { style: style });
    // card cvc
    const cardCvc = this.elements.create('cardCvc', { style: style });

    cardNumber.mount('#payment-cardnumber');
    cardExpDate.mount('#payment-cardexp');
    cardCvc.mount('#payment-cardcvc');

    // Handle real-time validation errors from the card Element.
    cardNumber.addEventListener('change', (event) => {
      let displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    cardExpDate.addEventListener('change', (event) => {
      let displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    cardCvc.addEventListener('change', (event) => {
      let displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    let form = document.getElementById('payment-form');
    let cardStripe = this.stripe;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.isSending = true;
      cardStripe.createToken(cardNumber, {
        name: document.getElementById('card-holder')['value']
      }).then((result)=> {
        if (result.error) {
          this.isSending = false;
          // Inform the user if there was an error.
          let errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server.
          console.log("result is: ");
          console.log(result);
          console.log(result['token']['id']);

          this.isSending = false;
          this.isSuccess = true;

          setTimeout(() => {
            this.close();
            console.log("CLoseddddddddd");
          }, 2000);

          // if success, close dialog and reload current page


          // this.close();
          // https://users/userid/credit
          // this.callApi(result['token']['id']).subscribe(
          //   (result) => {
          //     console.log(result);
          //   }
          // );
        }
      });
    });
  }

  callApi(token: any) {
    console.log("LLLLLLLLLLLl");
    let id = "1526601232527";
    let x = {
      'stripeToken': token
    };
    // return this.http.post(this.baseUrl+'/users/'+ id + '/credit', x);
  }
}
