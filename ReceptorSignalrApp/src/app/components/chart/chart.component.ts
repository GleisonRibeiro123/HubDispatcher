import { EventDispatcherService } from './../../_services/event-dispatcher.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { Constants } from 'src/app/util/constants';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('cnvsPiePizza') cnvsPiePizza: ElementRef;
  @ViewChild('cnvsNotify') cnvsNotify: ElementRef;

  title = 'Dispatcher';

  bgColor1 = ['rgb(100,200,255)', '#FDB45C', '#46BFBD'];

  datasetGeral;
  chartGeral: Chart;

  datasetNotify;
  chartNotify: Chart;

  confNotificacao = 0;

  constructor(
  ) {}

  ngOnInit() {
    EventDispatcherService.subscribe(Constants.ATUALIZACAO_CHART, (dados) => {
      this.carregaGeral(dados);
    });
    console.log('inscreveu atualizacao chart');

    EventDispatcherService.subscribe(Constants.NOTIFICACAO, () => {
      this.confNotificacao++;

      this.carregaNotify({
        labels: ['notificacoes', 'deixa estar'],
        data: [this.confNotificacao, 10]
      });
    });
  }

  carregaGeral(dados: any) {

    this.datasetGeral = {
      datasets: [
        {
          data: dados.data,
          backgroundColor: this.bgColor1
        }
      ],
      labels: dados.labels
    };

    this.criaChartGeral();
  }

  criaChartGeral() {
    const cnvsPiePizza = this.cnvsPiePizza.nativeElement;

    if (this.chartGeral != undefined) {
      this.chartGeral.data.labels = this.datasetGeral.labels;
      this.chartGeral.data.datasets = this.datasetGeral.datasets;
      this.chartGeral.update();
    } else {
      this.chartGeral = new Chart(cnvsPiePizza, {
        type: 'pie',
        data: this.datasetGeral
      });
    }
  }

  carregaNotify(dados: any) {

    this.datasetNotify = {
      labels: dados.labels,
      datasets: [
        {
          label: dados.labels,
          backgroundColor: this.bgColor1,
          data: dados.data
        }
      ]
    };

    this.criaChartNotify();
  }

  criaChartNotify() {

    const option = {
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
              color: 'rgba(200,200,200,0.2)'
            }
          }
        ],
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false
            }
          }
        ]
      }
    };

    if (this.chartNotify != undefined) {
      this.chartNotify.data.labels = this.datasetNotify.labels;
      this.chartNotify.data.datasets = this.datasetNotify.datasets;
      this.chartNotify.update();
    } else {
      this.chartNotify = Chart.Bar(this.cnvsNotify.nativeElement, {
        data: this.datasetNotify,
        options: option
      });
    }
  }
}
