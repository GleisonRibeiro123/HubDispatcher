import { Component, OnInit } from '@angular/core';
import { EventDispatcherService } from '../_services/event-dispatcher.service';
import { Constants } from '../util/constants';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  informacoes = [];

  constructor() { }

  ngOnInit() {
    EventDispatcherService.subscribe(Constants.TABLE, (dados) => {
      this.informacoes = this.informacoes.concat(dados);
    });

  }

}
