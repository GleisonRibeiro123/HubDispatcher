import { Constants } from './../util/constants';
import { Injectable } from '@angular/core';
import { EventDispatcherService } from './event-dispatcher.service';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  HttpTransportType
} from '@aspnet/signalr';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  // Contador para aprensentar o numero de notificações recebidas
  private contador = 0;
  private cntChrt = 0;

  // hub fixo para app.component, usado na notificationBar
  private _hubConnectionGeral: HubConnection;
  // hub variavel para cada rota
  private _hubConnectionRotas: HubConnection;

  private hubsBeingClosed: HubConnection[] = [];

  private idx = 0;

  // coleção que relaciona rotas com hubs. Inicializada no construtor. Utilizada para realizar a conexão com os hubs
  private routeWithHub: { [rota: string]: string } = {};

  constructor() {
    this.routeWithHub['chart'] = 'chart';
    this.routeWithHub['notify'] = 'message';
    this.routeWithHub['table'] = 'table';
  }

  rotaPossuiHub(rota: string) {
    return this.routeWithHub[rota] != undefined;
  }

  // Inicia uma conexão Geral
  async startConnectionGeral() {
    const hub = this.routeWithHub['notify'];
    // this.startConnection(this._hubConnectionGeral, 'notify');
    try {
    // Constroi a conexão com o Hub dependendo da rota.
    this._hubConnectionGeral = new HubConnectionBuilder()
      .withUrl(`http://localhost:5000/${hub}`)
      .build();

    // Inicia a conexão com o hub ou mostra o erro caso aconteça.

    this._hubConnectionGeral
        .start()
        .then(() => console.log(`Connection started at hub '${hub}'!`))
        .catch(err => console.log('Error while establishing connection :('));
    } catch {

    }

    // registra os dados que serão enviados.
    this._hubConnectionGeral.on(
      'BroadcastMessage',
      (type: string, payload: any) => {
        // console.log({ type, payload });

        // Método para liberar as informações que os componente irão usar.
        EventDispatcherService.publish(type, payload);
      }
    );
  }
   finishConnection() {

    this._hubConnectionRotas.stop();
    console.log('finishConnection');
  }

  // Inicia conexão com rotas.
  async startConnectionRotas(rota: string) {
    const hub = this.routeWithHub[rota];
    // this.startConnection(this._hubConnectionRotas, rota);

    const hubConn = this._hubConnectionRotas;

    // // Confere se você continua na rota,senão estiver irá parar a conexão
    if (hubConn != null) {
      await hubConn.off('BroadcastMessage');
      console.log(`desligou escuta`);

      await this.finishConnectionRota();
    }

    // Constroi a conexão com os Hubs dependendo das rota.
    this._hubConnectionRotas = new HubConnectionBuilder()
      .withUrl(`http://localhost:5000/${hub}`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();

    // Inicia a conexão com o Hub da rota específica.
    try {
      await this._hubConnectionRotas
      .start()
      .then(() => console.log(`Connection started at hub rotas!`))
      .catch(err => console.log('Error while establishing connection :('));
    } catch (error) {
      console.log(`Erro ao iniciar conexão.`);
    }

    // Registra os dados que serão enviados.
    this._hubConnectionRotas.on(
      'BroadcastMessage',
      (type: string, payload: any) => {
        // console.log({ type, payload });

        // Método para liberar as informaçõs que os componentes irão usar
        EventDispatcherService.publish(type, payload);
      }
    );
  }

  // Finaliza a conexão de rotas.
  async finishConnectionRota() {
    const hubConn = this._hubConnectionRotas;
    // console.log(hubConn.state);
    // console.log(HubConnectionState.Connected);

    if (
      hubConn.state === HubConnectionState.Connected
    ) {
      return await hubConn.stop();
    }
  }

  hubRotasEstaConectado() {
    return this._hubConnectionRotas.state === HubConnectionState.Connected;
  }

  hubRotasExiste() {
    return this._hubConnectionRotas != undefined;
  }

  // Método usado no botão para testar sem usar o método Post, executando em memory.
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

  // Método usado no botão para testar sem usar o método Post, executando em memory.
  emitirAtualizacaoChart() {
    this.cntChrt++;
    EventDispatcherService.publish(Constants.ATUALIZACAO_CHART, {
      labels: ['lb1', 'lb2'],
      data: [1 + this.cntChrt, 1]
    });
  }
}
