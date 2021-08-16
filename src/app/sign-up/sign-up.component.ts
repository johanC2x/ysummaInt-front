import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MustMatch } from '../_helper/must-match.validator';
import { Rol } from '../_model/rol.model';
import { User } from '../_model/user.model';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  user: User;
  rol: Rol;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      nombres: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_repeat: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'password_repeat')
    });
  }

  ngOnInit(): void {
  }

  crearUsuario(){
    this.spinner.show();
    setTimeout(() => {
      this.rol = new Rol();
      this.rol.idRol = 1;

      this.user = new User();
      this.user.username = this.form.value['username'];
      this.user.nombres = this.form.value['nombres'];
      this.user.password = this.form.value['password'];
      this.user.enabled = true;
      this.user.edad = 0;
      this.user.rol = this.rol;

      this.service.crearUSuario(this.user).subscribe(data => {
        this.form = new FormGroup({
          'username': new FormControl('', [Validators.required]),
          'nombres': new FormControl(''),
          'password': new FormControl(''),
          'password_repeat': new FormControl('')
        });
        this.snackBar.open('Tu usuario ha sido creado', 'Cerrar');
      }, error => {
        console.log(error);
        this.snackBar.open('Error interno', 'Cerrar');
      });
      this.spinner.hide();
    }, 5000);
  }

  get getControl(){
    return this.form.controls;
  }

  onSubmit(){
    this.crearUsuario();
  }

}
