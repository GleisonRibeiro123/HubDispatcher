import { Component, OnInit, OnDestroy } from '@angular/core';
import { fade } from './animations';
import { SignalRService } from './_services/signal-r.service';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  NavigationStart,
  ActivatedRoute,
  NavigationEnd,
  RouterEvent
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: fade
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    /* Injetando signalService para poder ser usado */
    private signalRService: SignalRService,
    // private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  // Método botão para emiter uma notificação In-Memory.
  emitirNotificacao() {
    this.signalRService.emitirNotificacao();
  }

  // Método botão para atualizar o gráfico com dados In-Memory.
  emitirAttChart() {
    this.signalRService.emitirAtualizacaoChart();
  }

  ngOnInit() {
    // se inscreve nos eventos de rota e pega apenas aqueles que são NavigationEnd
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        // console.log(this.router.routerState);

        // Colocando a rota que está no final do header dentro da variável route
        const route = e.url.substring(1, e.url.length);
        console.log('rota: ' + route);

        // Se a rota(variável) não for home ou vazio irá abrir o Hub e pegar as informações.
        // if (this.signalRService.hubRotasExiste()
        // // && this.signalRService.hubRotasEstaConectado()
        // ) {
        // this.signalRService.finishConnectionRota().then(() => {
        if (this.signalRService.rotaPossuiHub(route)) {
          this.signalRService.startConnectionRotas(route);
        }
        // });
        // }
        // else {
        //   if (!this.signalRService.hubRotasExiste()) {
        //     if (this.signalRService.rotaPossuiHub(route)) {
        //       this.signalRService.startConnectionRotas(route);
        //     }
        //   }
        // }
      });

    // Criará uma conexão Geral para os componentes que estarão sempre visíveis.
    this.signalRService.startConnectionGeral();

    // this.router.events.pipe(
    //   filter(e => e instanceof RouterEvent)
    // ).subscribe((e: RouterEvent)  => {
    //   console.log(e);
    // });
  }

  ngOnDestroy() {}
}
