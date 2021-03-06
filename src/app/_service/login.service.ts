import { Router } from '@angular/router';
import { HOST, TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME } from './../_shared/var.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = `${environment.apiUrl}/oauth/token`;

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: string, contrasena: string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    });
  }

  estaLogeado() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    return token != null;
  }

  cerrarSesion(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    this.http.get(`${environment.apiUrl}/usuarios/anular/${access_token}`).subscribe(() => {
      sessionStorage.clear();
      this.router.navigate(['home']);
    });
  }

  decodeToken(): string{
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return jwt_decode(access_token);
  }

}
