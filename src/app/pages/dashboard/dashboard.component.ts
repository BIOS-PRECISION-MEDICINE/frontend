import { Component } from '@angular/core';
import { AlertPersonalService } from 'src/app/services/alert-custome.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  public dataPatients: any;
  public dataExams: any;
  public dataTestsFinished: any;
  public dataTests: any;

  constructor(
    private _dashboard_service: DashboardService,
    private _alert: AlertPersonalService
  ) { }

  ngOnInit(): void {
    this.initMetricCards();
    this.initGraphicCards();
  }

  initMetricCards(): void {
    $('.preloader').show();
    this._dashboard_service.getMetricByType('patients').
      subscribe((resp: any) => {
        this.dataPatients = resp;
        $('.preloader').hide();
      });

    $('.preloader').show();
    this._dashboard_service.getMetricByType('exams').
      subscribe((resp: any) => {
        this.dataExams = resp;
        $('.preloader').hide();
      });

    $('.preloader').show();
    this._dashboard_service.getMetricByType('exams_finished').
      subscribe((resp: any) => {
        this.dataTestsFinished = resp;
        $('.preloader').hide();
      });

    $('.preloader').show();
    this._dashboard_service.getMetricByType('exams_process').
      subscribe((resp: any) => {
        this.dataTests = resp;
        $('.preloader').hide();
      });
  }

  initGraphicCards(): void {
    $('.preloader').show();
    this._dashboard_service.getDataGraphicByType('graphic_1').
      subscribe((resp: any) => {
        this.showGraphicsByType(resp.data, 'graphic_1');
        $('.preloader').hide();
      });
    $('.preloader').show();
    this._dashboard_service.getDataGraphicByType('graphic_2').
      subscribe((resp: any) => {
        this.showGraphicsByType(resp.data, 'graphic_2');
        $('.preloader').hide();
      });
    $('.preloader').show();
    this._dashboard_service.getDataGraphicByType('graphic_3').
      subscribe((resp: any) => {
        this.showGraphicsByType(resp.data, 'graphic_3');
        $('.preloader').hide();
      });
  }

  showGraphicsByType(data: any, type: string): void {
    let container: any = $('#' + type);
    if (container) {
      $('.preloader').show();
      switch (type) {
        case 'graphic_1':
          if (data.length == 0) {
            let tag: any = document.createElement("H4");
            var text = document.createTextNode('Graphic to define');
            tag.appendChild(text);
            container[0].appendChild(tag);
            container[0].classList.add("watermark");
          }
          break;
        case 'graphic_2':
          if (data.length == 0) {
            let tag: any = document.createElement("H4");
            var text = document.createTextNode('Graphic to define');
            tag.appendChild(text);
            container[0].appendChild(tag);
            container[0].classList.add("watermark");
          }
          break;
        case 'graphic_3':
          if (data.length == 0) {
            let tag: any = document.createElement("H4");
            var text = document.createTextNode('Graphic to define');
            tag.appendChild(text);
            container[0].appendChild(tag);
            container[0].classList.add("watermark");
          }
          break;
        default:
          if (data.length == 0) {
            let tag: any = document.createElement("H4");
            var text = document.createTextNode('Graphic to define');
            tag.appendChild(text);
            container[0].appendChild(tag);
            container[0].classList.add("watermark");
          }
          break;
      }
    }
  }
}
