import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { HOST } from '../_shared/var.constants';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = `${environment.apiUrl}/user`;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { 

  }

  crearUSuario(user: User){
    return this.http.post(this.url, user);
  }

  sendEmail(email: string){
    return this.http.get(`${this.url}/send/${email}`);
  }

  reset(user: User){
    return this.http.post(`${this.url}/reset`, user);
  }
}
