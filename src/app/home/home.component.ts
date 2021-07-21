import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public loginService : LoginService
  ) { }

  ngOnInit(): void {
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }
  
}
