import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    private service: UserService
  ) {
    this.form = new FormGroup({
      'username': new FormControl(''),
      'nombres': new FormControl(''),
      'password': new FormControl(''),
      'password_repeat': new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  crearUsuario(){
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
        'username': new FormControl(''),
        'nombres': new FormControl(''),
        'password': new FormControl(''),
        'password_repeat': new FormControl('')
      });
    }, error => {

    });
  }

}
