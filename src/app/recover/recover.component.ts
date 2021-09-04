import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MustMatch } from '../_helper/must-match.validator';
import { User } from '../_model/user.model';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  form: FormGroup;
  user: User;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_repeat: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'password_repeat')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params !== undefined){
        this.token = params['token'];
      }
    });
  }

  get getControl(){
    return this.form.controls;
  }

  recuperar(): void {
    this.user = new User();
    this.user.password = this.form.value['password'];
    this.user.token = this.token;

    this.spinner.show();
    this.userService.reset(this.user).subscribe(response => {
      this.spinner.hide();
      this.snackBar.open('Se ha cambiado la contraseña', 'Cerrar');
    }, error => {
      console.log(error);
      this.spinner.hide();
      this.snackBar.open('Error interno', 'Cerrar');
    });
  }

  onSubmit(){
    this.recuperar();
  }

}
