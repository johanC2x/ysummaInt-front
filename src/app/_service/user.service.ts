import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { HOST } from '../_shared/var.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = `${HOST}/user`;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { 

  }

  crearUSuario(user: User){
    return this.http.post(this.url, user);
  }

}
