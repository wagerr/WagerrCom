import {Component, Inject, Input, LOCALE_ID, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {formatDate} from '@angular/common';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Color, Label, PluginServiceGlobalRegistrationAndOptions} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() eventData: any;
  @Input() type: string;

  chartData: any;

  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDatasetsDraw: function(chart: any) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const activePoint = chart.tooltip._active[0],
          ctx = chart.ctx,
          y_axis = chart.scales['y-axis-0'],
          x = activePoint.tooltipPosition().x,
          topY = y_axis.top,
          bottomY = y_axis.bottom;
        // draw line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#4D4D4D';
        ctx.stroke();
        ctx.restore();
      }
    }
  }];

  public lineChartData: ChartDataSets[] = [
    {data: [], label: ''},
    {data: [], label: ''},
    {data: [], label: ''},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    legend: {
      labels: {
        fontFamily: 'arboria'
      }
    },
    tooltips: {
      borderColor: '#4a4949',
      borderWidth: 1,
      backgroundColor: '#212121',
      bodyFontFamily: 'arboria',
      bodyFontStyle: 'bold',
      bodyFontSize: 15,
      titleFontFamily: 'arboria',
      titleFontStyle: 'bold',
      titleFontSize: 16,
      mode: 'index',
      intersect: false
    },
    hover: {
      mode: 'index',
      intersect: false
    }
  };
  public lineChartColors: Color[] = [
    { // grey
      // backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgb(255,255,255)',
      pointBackgroundColor: 'rgb(255,255,255)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgb(255,255,255)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      // backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: '#FF0000',
      pointBackgroundColor: '#FF0000',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#FF0000',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      // backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(148,159,177,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [this.doughnutChartPlugins];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.eventData = [];
    this.chartData = [];
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.lineChartData[2].data = [];
    this.lineChartLabels = [];
  }

  ngOnDestroy(): void {
    this.eventData = [];
    this.chartData = [];
    this.lineChartData[0].data = [];
    this.lineChartData[1].data = [];
    this.lineChartData[2].data = [];
    this.lineChartLabels = [];

  }

  ngOnInit(): void {
    if (this.type === 'moneyline' || this.type === 'spread') {
      this.lineChartColors[0].borderColor = this.eventData.home;
      this.lineChartColors[0].pointBackgroundColor = this.eventData.home;
      this.lineChartColors[0].pointHoverBackgroundColor = this.eventData.home;
      this.lineChartColors[1].borderColor = this.eventData.away;
      this.lineChartColors[1].pointBackgroundColor = this.eventData.away;
      this.lineChartColors[1].pointHoverBackgroundColor = this.eventData.away;
    }
    const postedData = this.eventData.postedData;
    this.chartData = postedData
      .filter((event: any) => (event.type.toLowerCase().includes(this.type.toLowerCase())))
      .reverse();
    this.processChartData();
  }

  processChartData(): void {
    if (this.chartData.length > 0) {
      this.chartData.forEach((posted: any, key: number) => {
        let data: any = '';
        try {
          data = JSON.parse(posted.data);
        } catch (e) {
          data = posted.data;
        }
        this.chartData[key].data = data;
        if (this.type === 'moneyline') {
          this.lineChartData[0].data.push(+this.updateTrueOdds(data.moneyline.home_odds / 10000).toFixed(2));
          this.lineChartData[0].label = this.eventData.eventDB.hometeam;
          if (data.moneyline.draw_odds > 0) {
            this.lineChartData[2].data.push(+this.updateTrueOdds(data.moneyline.draw_odds / 10000).toFixed(2));
            this.lineChartData[2].label = 'DRAW';
          }
          this.lineChartData[1].data.push(+this.updateTrueOdds(data.moneyline.away_odds / 10000).toFixed(2));
          this.lineChartData[1].label = this.eventData.eventDB.awayteam;
        } else if (this.type === 'spread') {
          this.lineChartData[0].data.push(+this.updateTrueOdds(data.spread.home_odds / 10000).toFixed(2));
          this.lineChartData[0].label = this.eventData.eventDB.hometeam;
          this.lineChartData[1].data.push(+this.updateTrueOdds(data.spread.away_odds / 10000).toFixed(2));
          this.lineChartData[1].label = this.eventData.eventDB.awayteam;
        } else if (this.type === 'total') {
          this.lineChartData[0].data.push(+this.updateTrueOdds(data.totals.over_odds / 10000).toFixed(2));
          this.lineChartData[0].label = 'OVER';
          this.lineChartData[1].data.push(+this.updateTrueOdds(data.totals.under_odds / 10000).toFixed(2));
          this.lineChartData[1].label = 'UNDER';
        }
        this.lineChartLabels.push(formatDate(posted.updated_at, 'MMM, dd', this.locale));
      });
    }
  }

  updateTrueOdds(amt: number): number {
    return 1 + (amt - 1) * 0.94;
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  // events
  public chartClicked({event, active}: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor(): void {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  private generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
}
