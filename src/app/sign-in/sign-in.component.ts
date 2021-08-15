import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_service/login.service.js';
import { TOKEN_NAME } from './../_shared/var.constants';
import './../login-animation.js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string = "";
  error: string = "";
  form: FormGroup;

  constructor(
    private loginService : LoginService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { 
    this.form = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl('')
    });
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion(): void {
    this.usuario = this.form.value['email'];
    this.clave = this.form.value['password'];
    this.spinner.show();

    setTimeout(() => {
      this.loginService.login(this.usuario, this.clave).subscribe(data => {
        if(data){
          const helper = new JwtHelperService();
  
          let token = JSON.stringify(data);
          sessionStorage.setItem(TOKEN_NAME, token);
  
          let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
          const decodedToken = helper.decodeToken(tk.access_token);
          
          this.router.navigate(['home']);
        }
      });
      this.spinner.hide();
    }, 5000);
  }

}
