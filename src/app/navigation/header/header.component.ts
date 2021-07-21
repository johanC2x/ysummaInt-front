import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/_service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  
  constructor(
    public loginService : LoginService
  ) { }

  ngOnInit(): void {
  }
  
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
