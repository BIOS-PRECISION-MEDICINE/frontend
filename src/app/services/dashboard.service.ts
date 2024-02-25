import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Services.
import { AlertPersonalService } from 'src/app/services/alert-custome.service';

// Models, Constants adn envs.
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

//Interfaces
import { ResponseApi } from '../interfaces/responseApi';
import { ALERT_TYPE } from '../constants/alerts.constans';
import { Datum } from '../models/datum.model';

const URL_DASHBOARD = 'environment.url_api_data';
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public fake_data_patients = { valor: "5.478", desc: "Total pacientes registrados en la app." };
  public fake_data_exams = { valor: "12.789", desc: "Total examenes creados en la app." };
  public fake_data_finished = { valor: "2.023", desc: "Total pruebas finalizadas en la app." };
  public fake_data_test = { valor: "10.516", desc: "Pruebas en proceso" };
  public fake_data_default = { valor: "0", desc: "Sin datos." };
  public fake_data_graphic = { data: [] };
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) { }


  //Obtiene datos para las métricas de la dashboard
  getMetricByType(metric_type: string): Observable<any> {
    let url = URL_DASHBOARD + '/' + metric_type;
    $('.preloader').show();
    switch (metric_type) {
      case 'patients':
        return of(this.fake_data_patients);
        break;
      case 'exams':
        return of(this.fake_data_exams);
        break;
      case 'exams_finished':
        return of(this.fake_data_finished);
        break;
      case 'exams_process':
        return of(this.fake_data_test);
        break
      default:
        return of(this.fake_data_default);
    }
    /*return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      }), catchError((error) => {
        $('.preloader').hide();
        let msg = this.getErrorResponse(error);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al obtener metricas de dashboard',
          'Error inesperado'
        );
        return of({
          Data: null,
          Meta: {
            StatusCode: 500,
            ResultadoExitoso: false,
            TipoRespuesta: msg,
          },
        });
      })
    );*/
  }

  //Obtiene datos para las métricas de la dashboard
  getDataGraphicByType(graphic_type: string): Observable<any> {
    let url = URL_DASHBOARD + '/' + graphic_type;
    $('.preloader').show();
    switch (graphic_type) {
      case 'graphic_1':
        return of(this.fake_data_graphic);
        break;
      case 'graphic_2':
        return of(this.fake_data_graphic);
        break;
      case 'graphic_3':
        return of(this.fake_data_graphic);
      default:
        return of(this.fake_data_graphic);
    }
    /*return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      }), catchError((error) => {
        $('.preloader').hide();
        let msg = this.getErrorResponse(error);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al obtener metricas de dashboard',
          'Error inesperado'
        );
        return of({
          Data: null,
          Meta: {
            StatusCode: 500,
            ResultadoExitoso: false,
            TipoRespuesta: msg,
          },
        });
      })
    );*/
  }

  getErrorResponse(error: any): string {
    let msg = '';
    let errors = error.errors;
    if (errors) {
      for (var i = 0; i < errors.length; i++) {
        msg += errors[i].field + ' : ' + errors[i].message + '\n';
      }
    } else if (error.message) {
      msg = error.message;
    }
    return msg;
  }
}
