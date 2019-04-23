import { Component, OnInit } from '@angular/core';
import { EventDispatcherService } from '../../_services/event-dispatcher.service';
import { Constants } from 'src/app/util/constants';
import { SignalRService } from 'src/app/_services/signal-r.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  notificationList = [];

  counter = 0;

  constructor(
    // private signalRService: SignalRService,
  ) { }

  ngOnInit() {
    EventDispatcherService.subscribe(Constants.NOTIFICACAO, (notificacao) => {
      this.notificationList.push(notificacao);
      this.counter++;
    });
  }

  sininhoClick() {
    this.counter = 0;
  }

  emitirNotificacao() {
    // this.signalRService.emitirNotificacao();
  }

}
