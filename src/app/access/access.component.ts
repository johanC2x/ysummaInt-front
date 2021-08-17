import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Access } from '../_model/access.model';
import { AccessService } from '../_service/access.service';
import { AccountService } from '../_service/account.service';
import { DialogAccessComponent } from './dialog/dialog-access/dialog-access.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatAccordion } from '@angular/material/expansion';
import { Alert } from '../_model/alert.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BEGINED_CREATE_APP, LINK_CREATE_APP, ACTION_OPEN_MODAL } from '../_shared/var.constants';
import { Transaction } from '../_model/transaction.model';
import { NgxSpinnerService } from "ngx-spinner";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { Account } from '../_model/account.model';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightblue' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightblue' }
  ];
  cards: Card[] = [];
  transaction: Transaction = null;
  account: Account = null;
  data: Access[] = [];
  form: FormGroup;
  displayedColumns: string[] = ['appName', 'token', 'description', 'action'];
  dataSource: MatTableDataSource<Access>;
  panelOpenState = false;

  alert: Alert = null;
  message: string;

  public payPalConfig?: IPayPalConfig;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private service: AccessService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {
    this.form = new FormGroup({
      'appName': new FormControl(''),
      'webSite': new FormControl(''),
      'description': new FormControl('')
    });
  }

  ngOnInit(): void {
    this.listarPorUsuario();
    this.getAccounts();
  }

  ngAfterViewInit() {
  }

  listarPorUsuario() {
    this.service.listarPorUsuario().subscribe(response => {
      if (response.length === 0) {
        this.alert = new Alert();
        this.alert.exists = true;
        this.alert.message = BEGINED_CREATE_APP;
        this.alert.linkExists = true;
        this.alert.linkMessage = LINK_CREATE_APP;
        this.alert.action = ACTION_OPEN_MODAL;
      } else {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openDialog(access?: Access) {
    let model = access != null ? access : new Access();
    this.dialog.open(DialogAccessComponent, {
      width: '350px',
      data: model
    });
  }

  processAction(action: string) {
    if (action === ACTION_OPEN_MODAL) {
      this.dialog.open(DialogAccessComponent, {
        width: '350px',
        data: null
      });
    }
  }

  delete(idAccess: number) {
    let idDeleted = confirm('¿Seguro deseas eliminar el registro?');
    if (idDeleted) {
      this.service.eliminar(idAccess).subscribe(response => {
        this.service.listarPorUsuario();
      }, (error) => {
        console.log(error);
        this.snackBar.open('Error interno', 'Cerrar');
      });
    }
  }

  getAccounts() {
    this.accountService.accountList().subscribe(response => {
      this.transaction = new Transaction();
      this.transaction.totalTransaction = response.totalTransaction;

      response.accounts.filter(x => x.accountType !== 'GRATUITO').forEach(x => {
        let obj = new Card();
        obj.color = x.active === true ?
          'lightblue' : 'ButtonFace';
        obj.cols = 1;
        obj.rows = 1;
        obj.text = x.accountType;
        obj.description = x.description;
        obj.maxTransaction = x.maxTransaction;
        obj.active = x.active;
        obj.currency = x.currency;
        obj.amount = x.amount;
        this.cards.push(obj);
      });

    });
  }

  changePlan(accountType: string) {
    this.cards.map(x => x.color = 'ButtonFace');
    this.cards.forEach(element => {
      if (element.text === accountType && element.active === true) {
        element.color = 'lightblue';
        this.snackBar.open('Actualmente tiene esta cuenta', 'Cerrar');
      } else if (element.text === accountType) {
        this.account = new Account();
        this.account.currency = element.currency;
        this.account.amount = element.amount;
        this.account.maxTransaction = element.maxTransaction;
        this.account.accountType = element.text;
        element.color = 'lightblue';
      }
    });
    this.checkout();
  }

  checkout() {
    this.dialog.open(CheckoutComponent, {
      width: '450px',
      data: this.account
    });
  }

  procesaPropagar(mensaje){
    console.log(mensaje);
  }

}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

export class Card {
  color: string;
  cols: number;
  rows: number;
  text: string;
  description: string;
  maxTransaction: number;
  active: boolean;
  currency: string;
  amount: number;
}