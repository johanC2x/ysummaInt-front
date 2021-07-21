import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private service: AccessService,
    private dialogRef: MatDialogRef<DialogAccessComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Access,
    private router: Router
  ) {
    this.form = new FormGroup({
      'appName': new FormControl(''),
      'webSite': new FormControl(''),
      'description': new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  crearApp(): void {
    this.access = new Access();
    this.access.appName = this.form.value['appName'];
    this.access.webSite = this.form.value['webSite'];
    this.access.description = this.form.value['description'];
    this.service.crearApp(this.access).subscribe(response => {
      this.dialogRef.close();
      this.router.navigate(['create-app']);
    }, error => {
      console.log(error);
    });
  }

}
