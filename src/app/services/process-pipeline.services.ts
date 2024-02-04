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
import { Parametro } from '../models/parametro.model';

const URL_PROCESS_PIPELINE = environment.url_api_process_pipeline;
const URL_EXAMS_XID_PROCESS = environment.url_api_get_exams_by_idprocess;
const per_page: number = environment.pagination_size;

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ProcessPipelineService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _alerService: AlertPersonalService
  ) {}

  //Obtiene listado de todos procesos pipeline activos en el sistema
  getListingAllProcessPipeline(): Observable<ResponseApi> {
    let url = URL_PROCESS_PIPELINE + '?page=1&per_page=1000';
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  //Obtiene listado de procesos pipeline activos en el sistema
  getListingProcessPipeline(current_page: number): Observable<ResponseApi> {
    let url =
      URL_PROCESS_PIPELINE + '?page=' + current_page + '&per_page=' + per_page;
    /*
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
    */
    return of({
      meta: {
        current_page: 1,
        first_page: 1,
        first_page_url: 'string',
        last_page: 1,
        last_page_url: 'string',
        next_page_url: 'string',
        per_page: 10,
        previous_page_url: 'string',
        total: 1,
      },
      data: [
        {
          id_exam: 1,
          name_exam: 'pruebas 1',
          id_patient: 2,
          name_patient: 'pedro pablo',
          id_current_task: 3,
          name_current_task: 'Mapeo',
          updated_at: new Date(),
        },
      ],
    });
  }

  //Obtiene listado de examenes x id_proceso activos en el sistema
  getListingExamsByIdProcess(id_exam: string): Observable<any> {
    let url = URL_EXAMS_XID_PROCESS;
    /*
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
    */
   
    return of([
      {
        id:1,
        name: 'examen 1',
        patient_id: 2,
        patient_name: 'Patricia,Rosales',
      },
    ]);
  }

  //Obtiene listado de parámetros x id_exam activos en el sistema
  getListingParamsByIdExam(id_exam: string): Observable<any> {
    let url = URL_EXAMS_XID_PROCESS;
    /*
    return this.http.get<ResponseApi>(url).pipe(
      map((resp) => {
        return resp;
      })
    );
    */
    return of([
      {
        id_task: 1,
        name_task: 'Llamado de Bases',
        order: 1,
        description: 'Descripción de la tarea ....',
        subtasks: [
          {
            id: 1,
            subtask_param_id:1,
            type_subtask_param:'input',
            name: 'Ejecución llamado de bases',
            description: 'Descripción de la subtarea',
            order: 1,
            command: 'string',
            default_value: 'none',
            params: [
              {
                id: 1,
                datum_id:2,
                name: 'ntasks',
                type: 'integer',
                optional: 1,
                value: 'CTR + L',
              },
              {
                id: 2,
                datum_id:4,
                name: 'ntasks2',
                type: 'integer',
                optional: 0,
                value: 'CTR + L2',
              },
              {
                id: 3,
                datum_id:5,
                name: 'ntasks3',
                type: 'integer',
                optional: 1,
                value: 'CTR + L3',
              },
              {
                id: 4,
                datum_id:1,
                name: 'ntasks4',
                type: 'integer',
                optional: 1,
                value: 'CTR + L4',
              },
              {
                id: 5,
                datum_id:6,
                name: 'ntasks5',
                type: 'integer',
                optional: 0,
                value: 'CTR + L5',
              },
            ],
          },
        ],
      },
    ]);
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
