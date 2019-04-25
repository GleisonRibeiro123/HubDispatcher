import { Component, OnInit } from '@angular/core';
import { EventDispatcherService } from '../_services/event-dispatcher.service';
import { Constants } from 'src/app/util/constants';
import { SignalRService } from 'src/app/_services/signal-r.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  // Lista Para inserir as notificações que chegarão do Hub.
  notificationList = [];

  // Contador de notificações
  counter = 0;

  constructor(
    // private signalRService: SignalRService,
  ) { }

  ngOnInit() {

    // Se inscrevendo no dispatcher para receber as notificações que irão chegar do Hub
    EventDispatcherService.subscribe(Constants.NOTIFICACAO, (notificacao) => {
      this.notificationList.push(notificacao);
      this.counter++;
    });
  }

  // Para zerar o contador
  sininhoClick() {
    this.counter = 0;
  }

  // Método para o botão emitir uma notificação
  emitirNotificacao() {
    // this.signalRService.emitirNotificacao();
  }

}
