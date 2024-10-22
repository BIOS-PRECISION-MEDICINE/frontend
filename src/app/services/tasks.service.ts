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
import { Tarea } from '../models/tarea.model';
import { ALERT_TYPE } from '../constants/alerts.constans';

const URL_TASKS = environment.url_api_tasks;
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene tarea especificado por id activo en el sistema
  getTaskById(id_tarea: string): Observable<any> {
    let url = URL_TASKS + '/' + id_tarea;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene listado de tareas activos en el sistema
  getAllListingTasks(): Observable<ResponseApi> {
    let url = URL_TASKS + '?page=1&per_page=1000';
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene listado de tareas activos en el sistema
  getListingTasks(current_page: number): Observable<ResponseApi> {
    let url = URL_TASKS + '?page=' + current_page + '&per_page=' + per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Crea e inserta una nueva tarea en el sistema
  createNewTask(tarea: Tarea): Observable<any> {
    return this.http.post(URL_TASKS + '/', tarea, {}).pipe(
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
          'Ocurrio un error al realizar la creación de la tarea',
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

  //Actualiza una tarea en el sistema
  updateTask(tarea: Tarea): Observable<any> {
    return this.http.put(URL_TASKS + '/' + tarea.id, tarea, {}).pipe(
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
          'Ocurrio un error al realizar la edición de la tarea',
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

  //Elimina una tarea del sistema
  deleteTask(id_tarea: string): Observable<any> {
    return this.http.delete(URL_TASKS + '/' + id_tarea, {}).pipe(
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
          'Ocurrio un error al realizar la eliminación de la tarea',
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
    } else if (error.message) {
      msg = error.message;
    }
    return msg;
  }
}
