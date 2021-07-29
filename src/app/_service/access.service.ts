import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

//import { Observable } from 'rxjs/Observable';
//import { Subject } from 'rxjs/Subject';

import { Access } from '../_model/access.model';
import { HOST, TOKEN_NAME } from '../_shared/var.constants';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  medicosCambio = new Subject<Access[]>();

  url: string = `${environment.apiUrl}/user/access`;
  data: Access[] = [];
  access$ = new Subject<Access[]>();

  constructor(
    private http: HttpClient
  ) { }

  listarPorUsuario(){
    this.http.get<Access[]>(this.url).subscribe(response => {
      this.data = [];
      response.map(x => {
        let access = new Access();
        access.idAccess = x.idAccess;
        access.appName = x.appName;
        access.description = x.description;
        access.token = x.token;
        access.webSite = x.webSite;
        this.data.push(access);
      });
      this.access$.next(this.data);
    });
    return this.access$.asObservable();
  }

  crearApp(access: Access){
    return this.http.post(this.url, access);
  }

  eliminar(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
