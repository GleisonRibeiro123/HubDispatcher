import { Constants } from './../util/constants';
import { Injectable } from '@angular/core';
import { EventDispatcherService } from './event-dispatcher.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private contador = 0;
  private cntChrt = 0;

  private _hubConnection: HubConnection = null;

  private idx = 0;

  constructor() {}

  startConnection(rota: string) {
    if(this._hubConnection != null){
      this._hubConnection.stop();
    }

    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`http://localhost:5000/${rota}`)
      .build();



    this._hubConnection
      .start()
      .then(() => console.log(`Connection started at hub '${rota}'!`))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on(
      'BroadcastMessage',
      (type: string, payload: any) => {
        // console.log({ type, payload });

        EventDispatcherService.publish(type, payload);
      }
    );


  }

  finishConnection() {

  }

  emitirNotificacao() {

    this.contador++;

    EventDispatcherService.publish(Constants.NOTIFICACAO, {
      title: 'Avaliar Prazo · ontem',
      info: `Projeto ${100 + this.contador}, Nova Funcionalidade`
    });

    // while (this.contador <= 15000) {
    //   this.contador++;
    //   console.log(this.contador);

    //   this.eventDispatcher.publish('notificacao', {
    //     title: 'Avaliar Prazo · ontem',
    //     info: `Projeto ${100 + this.contador}, Nova Funcionalidade`
    //   });
    // }
  }

  emitirAtualizacaoChart() {
    this.cntChrt++;
    EventDispatcherService.publish(Constants.ATUALIZACAO_CHART, {
      labels: ['lb1', 'lb2'],
      data: [1 + this.cntChrt, 1]
    });
  }
}
