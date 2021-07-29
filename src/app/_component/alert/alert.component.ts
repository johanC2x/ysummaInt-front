import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AlertService } from '../../_service/alert.service';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/_model/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() type = ''; 
  @Input() message = ''; 
  @Input() model: Alert = null;

  @Output()
  action = new EventEmitter<string>();

  private subscription: Subscription;

  constructor() {
   }

  ngOnInit() {
  }

  actionEvent(type: string){
    this.action.emit(type);
  }


}
