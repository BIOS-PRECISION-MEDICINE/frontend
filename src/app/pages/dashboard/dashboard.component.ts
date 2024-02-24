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
}
