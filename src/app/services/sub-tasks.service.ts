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
import { SubTarea } from '../models/subtarea.model';
import { ALERT_TYPE } from '../constants/alerts.constans';

const URL_SUBTASKS = environment.url_api_subtasks;
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class SubTasksService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de tareas activos en el sistema
  getListingSubTasks(current_page: number): Observable<ResponseApi> {
    let url = URL_SUBTASKS + '?page=' + current_page + '&per_page=' + per_page;
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene listado de tareas activos en el sistema
  getListingSubTasksByFilters(
    id_process: number,
    order_task: number,
    order_subtask: number
  ): Observable<any> {
    let url = URL_SUBTASKS;
    url+= (order_task <0) ?  '?process_id='+id_process :'?process_id='+id_process+'&order_task='+order_task+'&order_subtask='+order_subtask;
    
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
    
  }

  //Obtiene listado de todos las subTareas activos en el sistema
  getAllListingSubTasks(): Observable<ResponseApi> {
    let url = URL_SUBTASKS + '?page=1&per_page=1000';
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene subTarea especificada por id activo en el sistema
  getSubtaskById(id_sub_task: string): Observable<any> {
    let url = URL_SUBTASKS + '/' + id_sub_task;
    return this.http.get<any>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Crea e inserta una nueva subtarea en el sistema
  createNewSubTask(subtarea: SubTarea): Observable<any> {
    return this.http.post(URL_SUBTASKS + '/', subtarea, {}).pipe(
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
          'Ocurrio un error al realizar la creación de una subtarea',
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
  updateSubTask(subTarea: SubTarea): Observable<any> {
    return this.http.put(URL_SUBTASKS + '/' + subTarea.id, subTarea, {}).pipe(
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
          'Ocurrio un error al realizar la edición una subTarea',
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

  //Elimina una subTarea del sistema
  deleteSubTask(id_subtarea: string): Observable<any> {
    return this.http.delete(URL_SUBTASKS + '/' + id_subtarea, {}).pipe(
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
          'Ocurrio un error al realizar la eliminación de una subtarea',
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
