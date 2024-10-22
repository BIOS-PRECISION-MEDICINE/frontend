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
import { Proceso } from '../models/process.model';
import { ALERT_TYPE } from '../constants/alerts.constans';

const URL_PROCESSES = environment.url_api_processes;
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ProcessesService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de procesos activos en el sistema
  getListingProcesses(current_page: number): Observable<ResponseApi> {
    let url = URL_PROCESSES + '?page=' + current_page + '&per_page=' + per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

    //Obtiene listado de todos los procesos activos en el sistema
    getAllListingProcesses(): Observable<ResponseApi> {
      let url = URL_PROCESSES;
      return this.http.get<ResponseApi>(url).pipe(
        map((resp) => {
          return resp;
        })
      );
    }

  //Obtiene procesp especificado por id activo en el sistema
  getProcessById(id_process: string): Observable<any> {
    let url = URL_PROCESSES + '/' + id_process;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Crea e inserta un nuevo proceso en el sistema
  createNewProcess(process: Proceso): Observable<any> {
    return this.http.post(URL_PROCESSES + '/', process, {}).pipe(
      map((resp: any) => {
        return {
          Data: resp,
          Meta: {
            StatusCode: 200,
            ResultadoExitoso: true,
            TipoRespuesta: '',
          },
        };
      }),
      catchError((error) => {
        $('.preloader').hide();
        let msg = this.getErrorResponse(error);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la creación del proceso',
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
    );
  }

  //Actualiza un proceso en el sistema
  updateProcess(process: Proceso): Observable<any> {
    return this.http.put(URL_PROCESSES + '/' + process.id, process, {}).pipe(
      map((resp: any) => {
        return {
          Data: resp,
          Meta: {
            StatusCode: 200,
            ResultadoExitoso: true,
            TipoRespuesta: '',
          },
        };
      }),
      catchError((error) => {
        $('.preloader').hide();
        let msg = this.getErrorResponse(error);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la edición del proceso',
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
    );
  }

  //Elimina un proceso del sistema
  deleteProcess(id_process: string): Observable<any> {
    return this.http.delete(URL_PROCESSES + '/' + id_process, {}).pipe(
      map((resp: any) => {
        return {
          Data: resp,
          Meta: {
            StatusCode: 200,
            ResultadoExitoso: true,
            TipoRespuesta: '',
          },
        };
      }),
      catchError((error) => {
        $('.preloader').hide();
        let msg = this.getErrorResponse(error);
        this._alerService.mostrarAlertaSimplesPorTipo(
          ALERT_TYPE.ERROR,
          'Ocurrio un error al realizar la eliminación del proceso',
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
    );
  }

  getErrorResponse(error: any): string {
    let msg = '';
    let errors = error.errors;
    if (errors) {
      for (var i = 0; i < errors.length; i++) {
        msg += errors[i].field + ' : ' + errors[i].message + '\n';
      }
    }
    else if(error.message){
      msg=error.message;
    }
    return msg;
  }
}
