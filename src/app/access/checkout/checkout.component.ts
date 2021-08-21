import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Account } from 'src/app/_model/account.model';
import { AccountService } from 'src/app/_service/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  public checkout: Account = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private account: Account,
    private dialogRef: MatDialogRef<CheckoutComponent>,
    private accountService: AccountService
  ) {
    this.checkout = account;
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: this.checkout.currency,
      clientId: environment.paypalClientID,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: this.checkout.currency,
            value: `${this.checkout.amount}`,
            breakdown: {
              item_total: {
                currency_code: this.checkout.currency,
                value: `${this.checkout.amount}`
              }
            }
          },
          items: [{
            name: `Plan ${this.checkout.accountType}`,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: this.checkout.currency,
              value: `${this.checkout.amount}`,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove:async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.accountService.generateNewAccount(this.checkout.accountType).subscribe(response => {
          console.log(response);
        });
        this.dialogRef.close();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
