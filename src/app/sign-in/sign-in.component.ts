import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../_service/login.service.js';
import { TOKEN_NAME } from './../_shared/var.constants';
import './../login-animation.js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  get getControl(){
    return this.form.controls;
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
      }, (error) => {
        this.snackBar.open('Tu usuario o contraseña son incorrectos', 'Cerrar');
      });
      this.spinner.hide();
    }, 5000);
  }

  onSubmit(){
    this.iniciarSesion();
  }

}
