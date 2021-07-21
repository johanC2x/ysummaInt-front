import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Access } from '../_model/access.model';
import { HOST, TOKEN_NAME } from '../_shared/var.constants';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  medicosCambio = new Subject<Access[]>();

  url: string = `${HOST}/user/access`;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {

  }

  listarPorUsuario(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Access[]>(this.url);
  }

  crearApp(access: Access){
    return this.http.post(this.url, access);
  }

}
