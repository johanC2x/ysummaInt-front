import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../_model/account.model';
import { Transaction } from '../_model/transaction.model';
import { AccountService } from '../_service/account.service';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['demo-position', 'demo-text', 'demo-description'];
  //dataSource = DATA;
  //dataSource: Row[] = [];
  dataSource: MatTableDataSource<Row>;

  transaction: Transaction = null;

  constructor(
    private accountService: AccountService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    //this.getAccount();
  }

  ngAfterViewInit(): void {
    this.getAccount();
  }

  getAccount() {
    let dataToken = this.loginService.decodeToken();
    let userName = dataToken["user_name"];

    this.accountService.accountList().subscribe(response => {
      this.transaction = new Transaction();
      this.transaction.totalTransaction = response.totalTransaction;
      let account = new Account();

      DATA = [];

      account = response.accounts.find(x => x.active);
      
      let row = new Row();
      row.position = 1;
      row.text = 'Nombre de usuario';
      row.description = `Está registrado con el usuario  ${userName}` ;
      DATA.push(row);

      let row1 = new Row();
      row1.position = 2;
      row1.text = 'Total de transacciones';
      row1.description = `Se han ejecutado ${response.totalTransaction.toString()} transacciones` ;
      DATA.push(row1);

      if(account !== undefined){
        let row2 = new Row();
        row2.position = 3;
        row2.text = 'Nombre de plan';
        row2.description = `Actualmente tienes un plan ${account.accountType}` ;
        DATA.push(row2);
      }

      this.dataSource = new MatTableDataSource(DATA);
    });
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export class Row {
  position: number;
  text: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Nombre de usuario', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Nombre de plan', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Total de transacciones', weight: 6.941, symbol: 'Li'}
];

let DATA: Row[] = [];