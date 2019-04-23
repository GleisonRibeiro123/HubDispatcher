import { Component, OnInit } from '@angular/core';
import { fade } from './animations';
import { SignalRService } from './_services/signal-r.service';
import {
  Router,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: fade
})
export class AppComponent implements OnInit {
  constructor(
    private signalRService: SignalRService,
    private router: Router,
  ) {}
  emitirNotificacao() {
    this.signalRService.emitirNotificacao();
  }
  emitirAttChart() {
    this.signalRService.emitirAtualizacaoChart();
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd)  => {
      this.signalRService.startConnection(e.url.substring(1, e.url.length));
    });
  }
}
