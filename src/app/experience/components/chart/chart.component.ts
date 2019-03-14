import { Component, OnInit } from '@angular/core';
import {ChartColor, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public colors = ['rgba(0, 99, 132, 0.6)',
    'rgba(30, 99, 132, 0.6)',
    'rgba(60, 99, 132, 0.6)',
    'rgba(90, 99, 132, 0.6)',
    'rgba(120, 99, 132, 0.6)',
    'rgba(150, 99, 132, 0.6)',
    'rgba(180, 99, 132, 0.6)',
    'rgba(210, 99, 132, 0.6)',
    'rgba(240, 99, 132, 0.6)'];

  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: { display: false },
    title: {
      display: true,
      text: 'My technology skills in percents'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
  };
  public barChartLabels: Label[] = ['JS', 'CSS', 'HTML', 'Typescript', 'Angular2+', 'NgRx', 'Rxjs', 'Git', 'Webpack'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [95, 95, 95, 90, 85, 80, 75, 75, 70],
      backgroundColor: this.colors,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
