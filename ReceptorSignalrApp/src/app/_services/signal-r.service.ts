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

  private counter = 0;

  // coleção que relaciona rotas com hubs. Inicializada no construtor. Utilizada para realizar a conexão com os hubs
  private routeWithHub: { [rota: string]: string } = {};

  constructor() {
    this.routeWithHub['chart'] = 'chart';
    this.routeWithHub['notify'] = 'message';
    this.routeWithHub['table'] = 'table';
  }

  verifyHubConnections() {
    for (let i = this.hubsBeingClosed.length - 1; i >= 0; i--) {
      const element = this.hubsBeingClosed[i];
      console.log(this.hubsBeingClosed.length);
      if (element.state === HubConnectionState.Connected) {
        console.log("Element: ", element);
        element.stop();

      }
      //this.hubsBeingClosed.pop();
    }
    // console.log('Element:' , element);
    console.log('verifyHubConnections finished');
  }

  rotaPossuiHub(rota: string) {
    return this.routeWithHub[rota] != undefined;
  }

  // Inicia uma conexão Geral
  startConnectionGeral() {
    const hub = this.routeWithHub['notify'];

    // Constroi a conexão com o Hub dependendo da rota.
    this._hubConnectionGeral = new HubConnectionBuilder()
      .withUrl(`http://localhost:5000/${hub}`)
      .build();

    // Inicia a conexão com o hub ou mostra o erro caso aconteça.
    try {
      this._hubConnectionGeral
        .start()
        .then(
          () => console.log(`Connection started at hub '${hub}'!`),
          () => {}
        )
        .catch(err => console.log('Error while establishing connection :('));
    } catch {}

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

  async fecharConn(hubidx: number) {
    console.log('fecharConn');
    // console.log(this.hubsBeingClosed[hubidx]);
    if (this.hubsBeingClosed[hubidx].state === HubConnectionState.Connected) {
      try {
        await this.hubsBeingClosed[hubidx].stop().then(
          () => {
            console.log(`Connection stoped at hub rotas!`);
          },
          () => {}
        );
      } catch {
        console.log('puff');
      }
      // .catch(err => console.log(err));
    }
  }

  // Inicia conexão com rotas.
  startConnectionRotas(rota: string) {
    // Pega a rota para poder usa-la quando criar uma nova conexão.
    const hub = this.routeWithHub[rota];

    //Recebe a conexão que estava aberta.
    //Quando sair da rota essa variável será iniciada.
    const hubConn = this._hubConnectionRotas;

    //Confere se você continua na rota, senão estiver irá parar a conexão.
    if (hubConn != null) {
      hubConn.onclose(() => {
        console.log('ONCLOSE HUB');
      });

      hubConn.off('BroadcastMessage');

      // if (hubConn.state == HubConnectionState.Connected) {
      try {
        const idxhub = this.hubsBeingClosed.push(this._hubConnectionRotas) - 1;
        this.fecharConn(idxhub);
        console.log();
      } catch {
        console.log(`Olokinho, meu. Tivemos um errinho`);
      }
      // }
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
      this._hubConnectionRotas
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
  finishConnectionRota() {
    const hubConn = this._hubConnectionRotas;

    if (
      hubConn != undefined &&
      hubConn.state === HubConnectionState.Connected
    ) {
      return hubConn.stop();
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
