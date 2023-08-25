import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {PopulationService} from '../service/population.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-demo-chart',
  templateUrl: './demo-chart.component.html',
  styleUrls: ['./demo-chart.component.css']
})
export class DemoChartComponent implements OnInit, OnDestroy {
  populationDataSubscription$!: Subscription

  constructor(private populationService: PopulationService) {
  }

  ngOnInit(): void {

    this.populationDataSubscription$ = this.populationService.getPopulationData().subscribe(data => {
      const chartData = data.map(item => ({
        name: item.Country,
        y: parseInt(item.Population.replace(/,/g, '')),
        countryInfo: item.Country,
        populationInfo: item.Population,
        netChangeInfo: item.NetChange,
        worldSharePercent: parseFloat(item.WorldShare.replace('%', ''))
      }));

      const lineSeriesData = chartData.map(item => ({
        name: item.name,
        y: item.worldSharePercent,
        country: item.countryInfo
      }));

      Highcharts.chart('chartContainer', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Population and World Share by top 20 Countries'
        },
        xAxis: {
          type: 'category',
          labels: {
            style: {
              fontSize: '13px',
              fontFamily: 'Arial, sans-serif'
            }
          },
          crosshair: true,
        },
        yAxis: [
          {
            title: {
              text: 'Population'
            }
          },
          {
            title: {
              text: 'World Share (%)'
            },
            opposite: true
          }
        ],
        legend: {
          enabled: true
        },
        tooltip: {
          headerFormat: '<table>',
          pointFormat: '<tr><td style="color:#666666; padding:3px; font-size:13px;">Country: </td>'
            + '<td style="color:#333333; font-size:13px; padding-left:20px;text-align: right;"><b>{point.countryInfo}</b></td></tr>'
            + '<tr><td style="color:#666666; padding:3px; font-size:13px;">Population: </td>'
            + '<td style="color:#333333; font-size:13px; padding-left:20px;text-align: right;"><b>{point.populationInfo}</b></td></tr>'
            + '<tr><td style="color:#666666; padding:3px; font-size:13px;">Net Change: </td>'
            + '<td style="color:#333333; font-size:13px; padding-left:20px;text-align: right;"><b>{point.netChangeInfo}</b></td></tr>',
          footerFormat: '</table>',
          shared: false,
          useHTML: true,
        },
        series: [
          {
            name: 'Population',
            type: 'column',
            data: chartData,
            yAxis: 0,
          },
          {
            name: 'World Share (%)',
            type: 'spline',
            data: lineSeriesData,
            yAxis: 1,
            dataLabels: {
              enabled: true,
              format: '{y}%',
            },
            tooltip: {
              headerFormat: '<table>',
              pointFormat: '<tr><td style="color:#666666; padding:3px; font-size:13px;">Country: </td>'
                + '<td style="color:#333333; font-size:13px; padding-left:20px;text-align: right;"><b>{point.country}</b></td></tr>'
                + '<tr><td style="color:#666666; padding:3px; font-size:13px;">% World\'s share: </td>'
                + '<td style="color:#333333; font-size:13px; padding-left:20px;text-align: right;"><b>{point.y}%</b></td></tr>',
              footerFormat: '</table>',
              shared: false,
              useHTML: true,
            },
          },
        ],
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderRadius: 0,
            pointWidth: 30,
            color: "#4472c4",
          },
          spline: {
            lineWidth: 2,
            color: "#ed7d31",
          },
        }
      } as any);
    });
  }

  ngOnDestroy() {
    if (this.populationDataSubscription$) {
      this.populationDataSubscription$.unsubscribe();
    }
  }
}
