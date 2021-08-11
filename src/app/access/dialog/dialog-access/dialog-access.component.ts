import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Access } from 'src/app/_model/access.model';
import { AccessService } from 'src/app/_service/access.service';

@Component({
  selector: 'app-dialog-access',
  templateUrl: './dialog-access.component.html',
  styleUrls: ['./dialog-access.component.css']
})
export class DialogAccessComponent implements OnInit {

  form: FormGroup;
  access: Access;
  registerForm: FormGroup;

  constructor(
    private service: AccessService,
    private dialogRef: MatDialogRef<DialogAccessComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Access,
    private formBuilder: FormBuilder
  ) {
    this.form = new FormGroup({
      'appName': new FormControl('', [Validators.required]),
      'webSite': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      appName: ['', Validators.required],
      webSite: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  crearApp(): void {
    this.access = new Access();
    this.access.appName = this.form.value['appName'];
    this.access.webSite = this.form.value['webSite'];
    this.access.description = this.form.value['description'];
    this.service.crearApp(this.access).subscribe(response => {
      this.service.listarPorUsuario();
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

  onSubmit(){
    this.access = new Access();
    this.access.appName = this.registerForm.value['appName'];
    this.access.webSite = this.registerForm.value['webSite'];
    this.access.description = this.registerForm.value['description'];
    this.service.crearApp(this.access).subscribe(response => {
      this.service.listarPorUsuario();
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

}
