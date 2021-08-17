import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  @Output() propagar: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private service: AccessService,
    private dialogRef: MatDialogRef<DialogAccessComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Access,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {
    /*
    this.form = new FormGroup({
      'appName': new FormControl('', [Validators.required]),
      'webSite': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });
    */
    this.form = this.formBuilder.group({
      appName: ['', [Validators.required]],
      webSite: ['', Validators.required],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  get getControl(){
    return this.form.controls;
  }

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
      this.access.appName = this.form.value['appName'];
      this.access.webSite = this.form.value['webSite'];
      this.access.description = this.form.value['description'];
      this.service.crearApp(this.access).subscribe(response => {
        this.service.listarPorUsuario();
        this.dialogRef.close();
        this.propagar.emit(true);
      }, error => {
        console.log(error);
      });
/*
    this.spinner.show();
    setTimeout(() => {
      
    }, 5000);
    this.spinner.hide();
    */
  }

}
