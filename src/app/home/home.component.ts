import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: string = '';
  domain: string = '';

  constructor(
    public loginService : LoginService
  ) {
    this.message = environment.apiUrl;
    this.domain = environment.apiDomain;
  }

  ngOnInit(): void {
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }
  
}
