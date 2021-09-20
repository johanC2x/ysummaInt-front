import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { 
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }

  ngOnInit(): void {

  }

  get getControl(){
    return this.form.controls;
  }

  enviar(): void{
    this.spinner.show();
    let username = this.form.value['username'];
    this.userService.sendEmail(username).subscribe(response => {
      this.spinner.hide();
      this.snackBar.open('El correo ha sido enviado exitosamente', 'Cerrar');
    }, error => {
      console.log(error);
      this.spinner.hide();
      if(error.error.mensaje === 'El correo ingresado no existe'){
        this.snackBar.open(error.error.mensaje, 'Cerrar');
      }else{
        this.snackBar.open('Error interno', 'Cerrar');
      }
    });
  }

  onSubmit(){
    this.enviar();
  }

}
