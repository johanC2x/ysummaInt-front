import { AfterViewInit, Component, OnInit, ViewChild,  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Access } from '../_model/access.model';
import { AccessService } from '../_service/access.service';
import { DialogAccessComponent } from './dialog/dialog-access/dialog-access.component';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit  {

  data: Access[] = [];
  form: FormGroup;
  displayedColumns: string[] = ['appName', 'token', 'description'];
  dataSource: MatTableDataSource<Access>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    private service: AccessService,
    private dialog: MatDialog
  ) { 
    this.form = new FormGroup({
      'appName': new FormControl(''),
      'webSite': new FormControl(''),
      'description': new FormControl('')
    });
  }

  ngOnInit(): void {
    this.listarPorUsuario();
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }
  
  listarPorUsuario(){
    this.service.listarPorUsuario().subscribe(response => {
      response.map(x => {
        let access = new Access();
        access.idAccess = x.idAccess;
        access.appName = x.appName;
        access.description = x.description;
        access.token = x.token;
        access.webSite = x.webSite;
        this.data.push(access);
      });
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(access?: Access){
    let model = access != null ? access : new Access();
    this.dialog.open(DialogAccessComponent, {
      width: '350px',
      data: model
    });
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
];