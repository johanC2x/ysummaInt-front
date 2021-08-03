import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../_model/transaction.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url: string = `${environment.apiUrl}/account`;

  constructor(
    private http: HttpClient
  ) { }

  accountList(){
    return this.http.get<Transaction>(`${this.url}/byUser`);
  }

}
